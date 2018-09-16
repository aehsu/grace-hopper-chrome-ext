setup();

function setup() {
    let days = getSessionInfoFromPage();
    bindCalendarView(days, getConstants());
    bindHorizontalScrolling();
}

function getConstants() {
    return  {
        pixelsPerMinute: 2,
        millisecondsPerMinute: 60000,
        minutesPerHour: 60,
        sessionBlockWidth: 185,
        sessionBlockMargin: 5,
        calendarLeftInset: 85,
        timeLabelWidth: 77
    }
}

function getSessionInfoFromPage() {
    let days = {};
    $(".reg-matrix-header-container").each(function (_, value) {
        let currentSession = parseSessionInfo(value);
        addSession(currentSession, days);
    });

    return days;
}

function parseSessionInfo(divObject) {
    let currentSession = {};
    currentSession['id'] = $(divObject).find(".reg-matrix-header").attr("id");
    let title = $(divObject).find(".reg-matrix-header").find('h3').text();
    currentSession['title'] = $.trim(title);
    //TODO: Add to agenda stuff

    let sessionInfo = $(divObject).find(".session-content").find(".session-info").find('p');

    let audienceLevel = sessionInfo.find("span:contains('Audience Level')").find(".date").text();
    currentSession['audience_level'] = $.trim(audienceLevel);

    let track = sessionInfo.find("span:contains('Track')").find(".date").text();
    currentSession['track'] = $.trim(track);

    let focusArea = sessionInfo.find("span:contains('Focus Area')").find(".date").text();
    currentSession['focus_area'] = $.trim(focusArea);

    let startDateString = $.trim(sessionInfo.find("span:contains('Start Date')").find(".date").text());
    currentSession['start_date'] = Date.parse(startDateString.concat(' 9:00 AM'));

    let startTimeString = $.trim(sessionInfo.find("span:contains('Start Time')").find(".date").text());
    let startDateTimeString = startDateString.concat(" ").concat(startTimeString);
    currentSession['start_time'] = Date.parse(startDateTimeString);

    let endTimeString = $.trim(sessionInfo.find("span:contains('End Time')").find(".date").text());
    let endDateTimeString = startDateString.concat(" ").concat(endTimeString);
    currentSession['end_time'] = Date.parse(endDateTimeString);

    let description = $(divObject).find(".session-content").find(".session-description").text();
    currentSession['description'] = $.trim(description);

    return currentSession;
}

function addSession(session, days) {
    let sessionDate = session.start_date;
    let startTime = getHalfHourStartTime(session.start_time);
    let endTime = getHalfHourEndTime(session.end_time);
    if (sessionDate in days) {
        days[sessionDate].sessions.push(session);

        if (startTime < days[sessionDate].first_session_start_time) {
            days[sessionDate].first_session_start_time = startTime
        }

        if (endTime > days[sessionDate].last_session_end_time) {
            days[sessionDate].last_session_end_time = endTime
        }
    } else {
        let dateDisplayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        days[sessionDate] = {
            display_date: new Date(sessionDate).toLocaleDateString([], dateDisplayOptions),
            first_session_start_time: startTime,
            last_session_end_time: endTime,
            sessions: [session]
        }
    }
}

function getHalfHourStartTime(time) {
    let originalTime = new Date(time);
    return originalTime.setMinutes(Math.floor(originalTime.getMinutes() / 30) * 30);
}

function getHalfHourEndTime(time) {
    let originalTime = new Date(time);
    return originalTime.setMinutes(Math.ceil(originalTime.getMinutes() / 30) * 30);
}

function bindHorizontalScrolling() {
    $(window).scroll(function () {
        $(".fixed_scrolling").css({left: this.scrollX + 5});
    });
}



function bindCalendarView(days, constantsObject) {
    $("#ctl00_container1").replaceWith("<div id='scheduleContainer'></div>");

    $("#scheduleContainer").load(ChromeHelper.getURL("/src/index.html"), function () {
        getVueInstance(days, constantsObject);
    });
}

function getVueInstance(days, constantsObject) {
    return new Vue({
        el: '#scheduleTable',
        data: {
            days: days,
            constantsObject: constantsObject
        },
        methods: {
            /// Converts the name of the track to a class name (e.g. from "Artificial Intelligence" to "artificial_intelligence"
            getTrackClass: function (session) {
                return session.track.toLowerCase().replace(/[^a-zA-Z ]/g, ' ').split(' ').join('_');
            },

            getHeightForSession: function (session) {
                return ((session.end_time - session.start_time) / constantsObject.millisecondsPerMinute) * constantsObject.pixelsPerMinute;
            },

            getTopOffsetForSession: function (session, day) {
                return ((session.start_time - day.first_session_start_time) / constantsObject.millisecondsPerMinute) * constantsObject.pixelsPerMinute;
            },

            getLeftInsetForSession: function (index) {
                return index * (constantsObject.sessionBlockWidth + constantsObject.sessionBlockMargin) + constantsObject.calendarLeftInset;
            },

            numHalfHoursInDay: function (sessionsStartTime, sessionsEndTime) {
                return Math.ceil(((sessionsEndTime - sessionsStartTime) / constantsObject.millisecondsPerMinute) / constantsObject.minutesPerHour) * 2;
            },

            getDisplayHours: function (startTime, hoursSince) {
                let timeDisplayOptions = {hour: 'numeric', minute: 'numeric'};
                let timeToDisplay = startTime + hoursSince * constantsObject.minutesPerHour * constantsObject.millisecondsPerMinute;
                return new Date(timeToDisplay).toLocaleTimeString([], timeDisplayOptions)
            },

            getFullDayWidth: function(numSessions) {
                return numSessions * (constantsObject.sessionBlockWidth + constantsObject.sessionBlockMargin) + constantsObject.calendarLeftInset;
            },

            getHalfHourHeight: function() {
                return constantsObject.pixelsPerMinute * constantsObject.minutesPerHour/2;
            }
        }
    });
}