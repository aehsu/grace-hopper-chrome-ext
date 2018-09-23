class ChromeHelper {
    static keys() {
        return {
            showing_calendar: 'showing_calendar',
            hidden_sessions: 'hidden_sessions',
            favorited_sessions: 'favorited_sessions',
            review_later_sessions: 'review_later_sessions',
        };
    }

    static getURL(url) {
        return chrome.runtime.getURL(url);
    }

    static loadData(key, callback) {
        chrome.storage.sync.get(key, function(data) {
            callback(data[key])
        });
    }

    static setData(key, value) {
        let dataObject = {};
        dataObject[key] = value;
        chrome.storage.sync.set(dataObject, function() {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            }
        });
    }
}