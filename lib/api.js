const request = require('request-promise');

const API_ROOT = 'https://www.pivotaltracker.com/services/v5';

class PivotalTrackerAPI {

    constructor(options) {
        const {
            apiToken,
            projectName,
        } = options;

        this._apiToken = apiToken;
        this._projectName = projectName;
        this._projectId = null;
        this._userInfo = {};

        this._init();
    }

    _getRequestOptions(options) {
        options.headers = options.headers || {};
        options.headers['X-TrackerToken'] = this._apiToken;

        return options;
    }

    _init() {
        if (this._projectId) {
            return Promise.resolve();
        }

        const options = this._getRequestOptions({
            url: `${API_ROOT}/me`,
            json: true,
        });

        return request(options)
            .then((user) => {
                this._userInfo.id = user.id;
                this._userInfo.name = user.username;
                this._projectId = user.projects.filter((project) => (
                    project['project_name'] === this._projectName
                ))[0]['project_id'];
            });
    }

    getProjectName() {
        return this._projectName;
    }

    getStartedStories() {
        return this._init()
            .then(() => {
                const query = encodeURI(`owned_by:${this._userInfo.id} AND state:started`);
                const options = this._getRequestOptions({
                    url: `${API_ROOT}/projects/${this._projectId}/stories?filter=${query}`,
                    json: true,
                });

                return request(options);
            });
    }

    unstartAllStories() {
        return this.getStartedStories()
            .then((stories) => {
                const promises = [];

                stories.forEach((story) => {
                    const options = this._getRequestOptions({
                        url: `${API_ROOT}/projects/${this._projectId}/stories/${story.id}`,
                        method: 'PUT',
                        body: {
                            'current_state': 'unstarted',
                        },
                        json: true,
                    });

                    promises.push(request(options));
                });

                return Promise.all(promises)
                    .then(() => {
                        return stories.length;
                    });
            });
    }
}

module.exports = PivotalTrackerAPI;
