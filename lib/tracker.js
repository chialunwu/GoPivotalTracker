const notifier = require('node-notifier');
const PivotalTrackerAPI = require('./api');

const MAX_NUM_STARTED_STORIES = 1;

class Tracker {

    constructor(options) {
        const { apiToken, projectName } = options;

        this._api = new PivotalTrackerAPI({ apiToken, projectName });
    }

    _notifyNoStartedStories() {
        notifier.notify({
            title: this._api.getProjectName(),
            message: 'You don\'t have started stories!',
        });
    }

    _notifyNoMultipleStartedStories(n) {
        notifier.notify({
            title: this._api.getProjectName(),
            message: `You have ${n} started storeis!`,
        });
    }

    _notifyUnstartStories(n) {
        notifier.notify({
            title: this._api.getProjectName(),
            message: `Auto unstarted ${n} storeis`,
        });
    }

    checkStartedStoriesStatus() {
        return this._api.getStartedStories()
            .then((startedStories) => {
                const numStartedStories = startedStories.length;

                if (numStartedStories > MAX_NUM_STARTED_STORIES) {
                    this._notifyNoMultipleStartedStories(numStartedStories);
                } else if (numStartedStories === 0) {
                    this._notifyNoStartedStories();
                }
            });
    }

    unstartAllStories() {
        return this._api.unstartAllStories()
            .then((numStories) => {
                if (numStories > 0) {
                    this._notifyUnstartStories(numStories);
                }
            });
    }
}

module.exports = Tracker;
