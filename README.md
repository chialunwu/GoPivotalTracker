GoPivotalTracker
=================
A lightweight command line tool to help [Pivotal Tracker](https://www.pivotaltracker.com) users to have legit status of stories by notifying users using native desktop notification if the following rules are violated.
1. Should have started stories during working hours
2. Should have only 1 started stories at the same time

Also, GoPivotalTracker provides the functionality of auto unstarting all started stories at the end of working hours.

## Installation
```
npm install -g gopivotaltracker
```
## Usage
The options - `token` and `project` are mandatory when running for the first time. Future runnings will read the settings from `~/.gopivotaltracker.settings` if the options are not provided.

    [node] gopivotaltracker [options]
    Options:
        -V, --version             output the version number
        -t, --token <string>      Set API token (required at first time)
        -p, --project <string>    Set project name (required at first time)
        -f, --frequency <string>  Set tracking freqeuncy in minuites (default=10)
        -h, --hours <string>      Set tracking hours (default=10-13,14-19')
        -w, --weekdays <string>   Set tracking weekdays (default=1-5)')
        -z, --timezone <string>   Set timezone (default=your local timezone)')
        --autounstart             Auto unstart all stories at the end of tracking time everyday
        -h, --help                output usage information
## Example
	gopivotaltracker -t "Your API token" -p "Project name" -f 15 -h 10-13,14-19 -w 1-5 -z "Asia/Taipei" --autounstart

This will check the stories status every **15** minuites during **10:00-13:00** and **14:00-19:00** from **Monday** to **Friday** (**NOTE**: Sunday is 0) in the timezone **Asia/Taipei**, and will auto unstart all started stories at **19:00**.

## License

[MIT](LICENSE)