setup();

function setup() {
    let days = getSessionInfoFromPage();
    const constants = getConstants();
    addDisplayProperties(days, constants);
    bindCalendarView(days, constants);
}

function getConstants() {
    return  {
        pixelsPerMinute: 2,
        millisecondsPerMinute: 60000,
        minutesPerHour: 60,
        sessionBlockWidth: 185,
        sessionBlockMargin: 5,
        calendarLeftInset: 85,
        timeLabelWidth: 77,
        pageSize: 7
    }
}

function getSessionInfoFromPage() {
    let days = {};
    $(".reg-matrix-header-container").each(function(_, value) {
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
        let day = days[sessionDate];
        day.all_sessions.push(session);

        if (startTime < day.first_session_start_time) {
            day.first_session_start_time = startTime
        }

        if (endTime > day.last_session_end_time) {
            day.last_session_end_time = endTime
        }

    } else {
        days[sessionDate] = {
            date: sessionDate,
            first_session_start_time: startTime,
            last_session_end_time: endTime,
            all_sessions: [session],
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

function addDisplayProperties(days, constantsObject) {
    Object.keys(days).forEach(function(date) {
        let day = days[date];
        day.current_page = 0;
        day.num_pages = Math.floor(day.all_sessions.length/constantsObject.pageSize);
        day.display_sessions = day.all_sessions.slice(0, constantsObject.pageSize);
    });
}

function bindCalendarView(days, constantsObject) {
    $("#ctl00_container1").replaceWith("<div id='scheduleContainer'></div>");

    $("#scheduleContainer").load(ChromeHelper.getURL("/src/index.html"), function() {
        const modalVueInstance = getModalVueInstance();
        getCalendarVueInstance(days, constantsObject, modalVueInstance);
    });
}

function getCalendarVueInstance(days, constantsObject, modalVueInstance) {
    return new Vue({
        el: '#scheduleTable',
        data: {
            days: days,
            constantsObject: constantsObject,

        },
        methods: {
            getNextPage: function(date) {
                let day = this.$data.days[date];
                day.current_page++;
                const start = day.current_page * constantsObject.pageSize;
                const end = start + constantsObject.pageSize;
                day.display_sessions = day.all_sessions.slice(start, end);

            },

            getPreviousPage: function(date) {
                let day = this.$data.days[date];
                day.current_page--;
                const start = day.current_page * constantsObject.pageSize;
                const end = start + constantsObject.pageSize;
                day.display_sessions = day.all_sessions.slice(start, end);
            },

            /// Converts the name of the track to a class name (e.g. from "Artificial Intelligence" to "artificial_intelligence"
            getTrackClass: function(session) {
                return session.track.toLowerCase().replace(/[^a-zA-Z ]/g, ' ').split(' ').join('_');
            },

            getHeightForSession: function(session) {
                return ((session.end_time - session.start_time) / constantsObject.millisecondsPerMinute) * constantsObject.pixelsPerMinute;
            },

            getTopOffsetForSession: function(session, day) {
                return ((session.start_time - day.first_session_start_time) / constantsObject.millisecondsPerMinute) * constantsObject.pixelsPerMinute;
            },

            getLeftInsetForSession: function(index) {
                return index * (constantsObject.sessionBlockWidth + constantsObject.sessionBlockMargin) + constantsObject.calendarLeftInset;
            },

            numHalfHoursInDay: function(sessionsStartTime, sessionsEndTime) {
                return Math.ceil(((sessionsEndTime - sessionsStartTime) / constantsObject.millisecondsPerMinute) / constantsObject.minutesPerHour) * 2;
            },

            getFullDisplayDate: function(date) {
                let dateDisplayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(date).toLocaleDateString([], dateDisplayOptions);
            },

            getDisplayHours: function(startTime, hoursSince) {
                let timeDisplayOptions = { hour: 'numeric', minute: 'numeric' };
                let timeToDisplay = startTime + hoursSince * constantsObject.minutesPerHour * constantsObject.millisecondsPerMinute;
                return new Date(timeToDisplay).toLocaleTimeString([], timeDisplayOptions)
            },

            getDayOfWeekName: function(date) {
                let options = { weekday: 'long' }
                return new Date(date).toLocaleDateString([], options);
            },

            getFullDayWidth: function() {
                return constantsObject.pageSize * (constantsObject.sessionBlockWidth + constantsObject.sessionBlockMargin) + constantsObject.calendarLeftInset;
            },

            getFullDayHeight: function(sessionsStartTime, sessionsEndTime) {
                return this.numHalfHoursInDay(sessionsStartTime, sessionsEndTime) * (constantsObject.pixelsPerMinute * constantsObject.minutesPerHour/2);
            },

            getHalfHourHeight: function() {
                return constantsObject.pixelsPerMinute * constantsObject.minutesPerHour/2;
            },

            launchModal: function(session) {
                launchModal(session, modalVueInstance)
            }
        }
    });
}

function getModalVueInstance() {
    return new Vue({
        el: '#sessionModal',
        data: {
            session: {},
        },
        methods: {
            getDisplayTime: function(time) {
                let timeDisplayOptions = {hour: 'numeric', minute: 'numeric'};
                return new Date(time).toLocaleTimeString([], timeDisplayOptions)
            }
        }
    });
}

function launchModal(session, modalVueInstance) {
    modalVueInstance.$data.session = session
    $('#sessionModal').modal('show');
}