let toggleButton = document.getElementById('toggleCalendarView');
const showingCalendarKey = ChromeHelper.keys().showing_calendar;

ChromeHelper.loadData(showingCalendarKey, setUpButton);

function setUpButton(calendarShowing) {
    toggleButton.innerText = calendarShowing ? 'Hide Calendar': 'Show Calendar';
}

toggleButton.onclick = function() {
    ChromeHelper.loadData(showingCalendarKey, toggleCalendarView);
};

function toggleCalendarView(calendarShowing) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, getScriptDetails(calendarShowing), function () {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                }
            });
    });

    setUpButton(!calendarShowing);
    ChromeHelper.setData(showingCalendarKey, !calendarShowing);
    window.close();
}

function getScriptDetails(calendarShowing) {
    return calendarShowing ? {  code: 'window.location.reload();' } : { file: "./src/calendar_generator.js" }
}