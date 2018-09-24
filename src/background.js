chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set( {
        showing_calendar: false,
        hidden_sessions: [],
        favorited_sessions: [],
        review_later_sessions: [],
    }, function() {
        console.log("The calendar is not displayed by default.");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'www.cvent.com'}
            })],

            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});