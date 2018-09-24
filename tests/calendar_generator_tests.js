
describe("Calendar Generator", function() {
    beforeAll(function (done) {
        $(document.body).load('base/tests/helpers/schedule_dom.html', function() {
            done();
        });
    });

    // Make sure sessions are sorted at the end properly
    it("should get correct session info from page", function() {
        let days = getSessionInfoFromPage();
        const tuesdayDate = 1537880400000;
        const tuesdayObject = {
            date: 1537880400000,
            first_session_start_time: 1537907400000,
            last_session_end_time: 1537920000000
        };

        const wednesdayDate = 1537966800000;
        const wednesdayObject = {
            date: 1537966800000,
            first_session_start_time: 1537957800000,
            last_session_end_time: 1538004600000
        };

        const thursdayDate = 1538053200000;
        const thursdayObject = {
            date: 1538053200000,
            first_session_start_time: 1538047800000,
            last_session_end_time: 1538083800000
        };

        const fridayDate = 1538139600000;
        const fridayObject = {
            date: 1538139600000,
            first_session_start_time: 1538139600000,
            last_session_end_time: 1538190000000
        };

        // Tuesday
        expect(days[tuesdayDate].date).toBe(tuesdayObject.date);
        expect(days[tuesdayDate].first_session_start_time).toBe(tuesdayObject.first_session_start_time);
        expect(days[tuesdayDate].last_session_end_time).toBe(tuesdayObject.last_session_end_time);
        expect(days[tuesdayDate].all_sessions.length).toBe(5);

        // Wednesday
        expect(days[wednesdayDate].date).toBe(wednesdayObject.date);
        expect(days[wednesdayDate].first_session_start_time).toBe(wednesdayObject.first_session_start_time);
        expect(days[wednesdayDate].last_session_end_time).toBe(wednesdayObject.last_session_end_time);
        expect(days[wednesdayDate].all_sessions.length).toBe(126);

        // Thursday
        expect(days[thursdayDate].date).toBe(thursdayObject.date);
        expect(days[thursdayDate].first_session_start_time).toBe(thursdayObject.first_session_start_time);
        expect(days[thursdayDate].last_session_end_time).toBe(thursdayObject.last_session_end_time);
        expect(days[thursdayDate].all_sessions.length).toBe(172);

        // Friday
        expect(days[fridayDate].date).toBe(fridayObject.date);
        expect(days[fridayDate].first_session_start_time).toBe(fridayObject.first_session_start_time);
        expect(days[fridayDate].last_session_end_time).toBe(fridayObject.last_session_end_time);
        expect(days[fridayDate].all_sessions.length).toBe(104);
    });

    // Tests parseSessionInfo from various sessions
    it('parseSessionInfo returns the correct session object', function(){
        const divObject = '<div class="reg-matrix-header-container">\n' +
            '                <div class="reg-matrix-header" id="agenda_div5eeeadde-a314-4f99-88f7-d685d30e8a52">\n' +
            '                    <h3 id="ctl00_ContentPlaceHolder1_ctl00_rptSession_ctl204_h3ItemName">\n' +
            '                        SP548: Cybersecurity: Where Everything Old is New Again!\n' +
            '                    </h3>\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="session-content">\n' +
            '                    <div class="session-info">\n' +
            '                        <p><span>Audience Level: <span class="date">Beginner Tech</span></span> | <span>Track: <span class="date">Security/Privacy</span></span> | <span>Focus Area: <span class="date">Data Anonymization &amp; Privacy in the world of IoT and ever growing apps</span></span> | <span style="white-space: nowrap;">Start Date: <span class="date">Thursday, September 27, 2018</span></span> | <span style="white-space: nowrap;">Start Time: <span class="date">12:15 PM</span></span> | <span style="white-space: nowrap;">End Time: <span class="date">1:15 PM</span></span> | <span>Location: <span class="date">GRB General Assembly C</span></span> | Speakers: <span class="speaker-name"><a href="#" id="lnkSpeakeree145eee" onclick="javascript:ShowSpeakerPopup(\'lnkSpeakeree145eee\',\'ee14ef64-55c0-4634-8629-fcfcea73ac1c\',\'5eeeadde-a314-4f99-88f7-d685d30e8a52\',\'6083a0df-7383-43e2-ad8b-262237e56423\')">Michele Guel</a>, <a href="#" id="lnkSpeaker459c5eee" onclick="javascript:ShowSpeakerPopup(\'lnkSpeaker459c5eee\',\'459cabaa-f830-4db8-9017-4c038a73ae33\',\'5eeeadde-a314-4f99-88f7-d685d30e8a52\',\'6083a0df-7383-43e2-ad8b-262237e56423\')">Meg Layton</a>, <a href="#" id="lnkSpeaker66b45eee" onclick="javascript:ShowSpeakerPopup(\'lnkSpeaker66b45eee\',\'66b4bf44-3f96-4711-86b3-05086ce79256\',\'5eeeadde-a314-4f99-88f7-d685d30e8a52\',\'6083a0df-7383-43e2-ad8b-262237e56423\')">Amy Twum-Barimah</a>, <a href="#" id="lnkSpeaker79735eee" onclick="javascript:ShowSpeakerPopup(\'lnkSpeaker79735eee\',\'7973dc06-6ac2-4d56-806c-33c793a30e96\',\'5eeeadde-a314-4f99-88f7-d685d30e8a52\',\'6083a0df-7383-43e2-ad8b-262237e56423\')">Tim Gallo</a>, <a href="#" id="lnkSpeaker64f95eee" onclick="javascript:ShowSpeakerPopup(\'lnkSpeaker64f95eee\',\'64f93435-0dbc-4e30-b8a5-eea3986fc88d\',\'5eeeadde-a314-4f99-88f7-d685d30e8a52\',\'6083a0df-7383-43e2-ad8b-262237e56423\')">Amelia Estwick</a></span></p>\n' +
            '                        <p><a name="SessionDesc" href="#">View Description</a><a name="SessionDesc" href="#" style="display:none;">Hide Description</a></p>\n' +
            '\n' +
            '                    </div>\n' +
            '                    <div class="session-description" style="display:none;">\n' +
            '                        Every week something new about cybersecurity attacks appears in the news, from APT to  viruses. Organizations are often left wondering what to do - is it really as simple as applying patches in a timely manner? The short answer is: no.  This panel of industry professionals revisit memorable attacks from the past and provide insights into lessons learned that can help the future defensive position.\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '            </div>'
        const sessionObject = {
            id: 'agenda_div5eeeadde-a314-4f99-88f7-d685d30e8a52',
            title: 'SP548: Cybersecurity: Where Everything Old is New Again!',
            audience_level: 'Beginner Tech',
            track: 'Security/Privacy',
            focus_area: 'Data Anonymization & Privacy in the world of IoT and ever growing apps',
            start_date: 1538053200000,
            start_time: 1538064900000,
            end_time: 1538068500000,
            description: 'Every week something new about cybersecurity attacks appears in the news, from APT to  viruses. Organizations are often left wondering what to do - is it really as simple as applying patches in a timely manner? The short answer is: no.  This panel of industry professionals revisit memorable attacks from the past and provide insights into lessons learned that can help the future defensive position.'
        };

        let parsedSession = parseSessionInfo(divObject);
        expect(parsedSession.id).toBe(sessionObject.id);
        expect(parsedSession.title).toBe(sessionObject.title);
        expect(parsedSession.audience_level).toBe(sessionObject.audience_level);
        expect(parsedSession.track).toBe(sessionObject.track);
        expect(parsedSession.focus_area).toBe(sessionObject.focus_area);
        expect(parsedSession.start_date).toBe(sessionObject.start_date);
        expect(parsedSession.start_time).toBe(sessionObject.start_time);
        expect(parsedSession.end_time).toBe(sessionObject.end_time);
        expect(parsedSession.description).toBe(sessionObject.description);

    });

    it('parseSessionInfo returns the correct session object', function(){
        const divObject = '            <div class="reg-matrix-header-container">\n' +
            '                <div class="reg-matrix-header" id="agenda_div8886aa64-3c3c-4961-b628-2025426407b8">\n' +
            '                    <h3 id="ctl00_ContentPlaceHolder1_ctl00_rptSession_ctl271_h3ItemName">\n' +
            '                        How Google Sheets and the Google Cloud Natural Language API Made Open-Ended Feedback Useful (Google)\n' +
            '                    </h3>\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="session-content">\n' +
            '                    <div class="session-info">\n' +
            '                        <p><span>Audience Level: <span class="date">All</span></span> | <span>Track: <span class="date">Technology Showcase</span></span> | <span style="white-space: nowrap;">Start Date: <span class="date">Thursday, September 27, 2018</span></span> | <span style="white-space: nowrap;">Start Time: <span class="date">3:30 PM</span></span> | <span style="white-space: nowrap;">End Time: <span class="date">3:45 PM</span></span> | <span>Location: <span class="date">Technology Showcase Theater - GRB Exhibit Hall D</span></span> | Speakers: <span class="speaker-name"><a href="#" id="lnkSpeaker1d478886" onclick="javascript:ShowSpeakerPopup(\'lnkSpeaker1d478886\',\'1d4718e5-9ed1-4ac5-823a-0c5f07bf9c2f\',\'8886aa64-3c3c-4961-b628-2025426407b8\',\'6083a0df-7383-43e2-ad8b-262237e56423\')">Joanna Smith</a></span></p>\n' +
            '                        <p><a name="SessionDesc" href="#">View Description</a><a name="SessionDesc" href="#" style="display:none;">Hide Description</a></p>\n' +
            '\n' +
            '                    </div>\n' +
            '                    <div class="session-description" style="display:none;">\n' +
            '                        Joanna Smith, a Google Developer Advocate, will explore&nbsp;how one woman with a curious mind, and without a computer science background, used Google Cloud Platform and G Suite to analyze open-ended survey feedback.\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '            </div>'
        const sessionObject = {
            id: 'agenda_div8886aa64-3c3c-4961-b628-2025426407b8',
            title: 'How Google Sheets and the Google Cloud Natural Language API Made Open-Ended Feedback Useful (Google)',
            audience_level: 'All',
            track: 'Technology Showcase',
            focus_area: '',
            start_date: 1538053200000,
            start_time: 1538076600000,
            end_time: 1538077500000,
            description: 'Joanna Smith, a Google Developer Advocate, will explore how one woman with a curious mind, and without a computer science background, used Google Cloud Platform and G Suite to analyze open-ended survey feedback.'
        };

        let parsedSession = parseSessionInfo(divObject);
        expect(parsedSession.id).toBe(sessionObject.id);
        expect(parsedSession.title).toBe(sessionObject.title);
        expect(parsedSession.audience_level).toBe(sessionObject.audience_level);
        expect(parsedSession.track).toBe(sessionObject.track);
        expect(parsedSession.focus_area).toBe(sessionObject.focus_area);
        expect(parsedSession.start_date).toBe(sessionObject.start_date);
        expect(parsedSession.start_time).toBe(sessionObject.start_time);
        expect(parsedSession.end_time).toBe(sessionObject.end_time);
        expect(parsedSession.description).toBe(sessionObject.description);
    });

    it('parseSessionInfo returns the correct session object', function(){
        const divObject = '            <div class="reg-matrix-header-container">\n' +
            '                <div class="reg-matrix-header" id="agenda_div8314da0d-083c-421a-82c6-887b76e31361">\n' +
            '                    <h3 id="ctl00_ContentPlaceHolder1_ctl00_rptSession_ctl273_h3ItemName">\n' +
            '                        CR407: Managing Change in Your Career and Your Organization\n' +
            '                    </h3>\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="session-content">\n' +
            '                    <div class="session-info">\n' +
            '                        <p><span>Audience Level: <span class="date">Senior/Executive</span></span> | <span>Track: <span class="date">Career</span></span> | <span style="white-space: nowrap;">Start Date: <span class="date">Thursday, September 27, 2018</span></span> | <span style="white-space: nowrap;">Start Time: <span class="date">3:40 PM</span></span> | <span style="white-space: nowrap;">End Time: <span class="date">4:00 PM</span></span> | <span>Location: <span class="date">MMQ Texan Ballroom C</span></span> | Speakers: <span class="speaker-name"><a href="#" id="lnkSpeakerdf618314" onclick="javascript:ShowSpeakerPopup(\'lnkSpeakerdf618314\',\'df61c3be-2bcb-4070-b793-c21ed9f39b25\',\'8314da0d-083c-421a-82c6-887b76e31361\',\'6083a0df-7383-43e2-ad8b-262237e56423\')">Kye Mitchell</a></span></p>\n' +
            '                        <p><a name="SessionDesc" href="#">View Description</a><a name="SessionDesc" href="#" style="display:none;">Hide Description</a></p>\n' +
            '\n' +
            '                    </div>\n' +
            '                    <div class="session-description" style="display:none;">\n' +
            '                        Change touches all of us, no matter our career level or industry. Those who understand how to manage and thrive during career and organizational changes are the ones who will succeed. Attendees who are transitioning from tactical to strategic roles will be armed with advice on how to leverage authenticity, shatter boundaries and prosper, no matter what changes lie ahead.\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '            </div>'
        const sessionObject = {
            id: 'agenda_div8314da0d-083c-421a-82c6-887b76e31361',
            title: 'CR407: Managing Change in Your Career and Your Organization',
            audience_level: 'Senior/Executive',
            track: 'Career',
            focus_area: '',
            start_date: 1538053200000,
            start_time: 1538077200000,
            end_time: 1538078400000,
            description: "Change touches all of us, no matter our career level or industry. Those who understand how to manage and thrive during career and organizational changes are the ones who will succeed. Attendees who are transitioning from tactical to strategic roles will be armed with advice on how to leverage authenticity, shatter boundaries and prosper, no matter what changes lie ahead."
        };

        let parsedSession = parseSessionInfo(divObject);
        expect(parsedSession.id).toBe(sessionObject.id);
        expect(parsedSession.title).toBe(sessionObject.title);
        expect(parsedSession.audience_level).toBe(sessionObject.audience_level);
        expect(parsedSession.track).toBe(sessionObject.track);
        expect(parsedSession.focus_area).toBe(sessionObject.focus_area);
        expect(parsedSession.start_date).toBe(sessionObject.start_date);
        expect(parsedSession.start_time).toBe(sessionObject.start_time);
        expect(parsedSession.end_time).toBe(sessionObject.end_time);
        expect(parsedSession.description).toBe(sessionObject.description);
    });

    it('parseSessionInfo returns the correct session object', function(){
        const divObject = '<div class="reg-matrix-header-container">\n' +
            '                <div class="reg-matrix-header" id="agenda_div47a28dd9-e6f3-4376-94f0-7692938f9781">\n' +
            '                    <h3 id="ctl00_ContentPlaceHolder1_ctl00_rptSession_ctl305_h3ItemName">\n' +
            '                        Gallery: Our Time\n' +
            '                    </h3>\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="session-content">\n' +
            '                    <div class="session-info">\n' +
            '                        <p><span>Audience Level: <span class="date">All</span></span> | <span style="white-space: nowrap;">Start Date: <span class="date">Friday, September 28, 2018</span></span> | <span style="white-space: nowrap;">Start Time: <span class="date">9:00 AM</span></span> | <span style="white-space: nowrap;">End Time: <span class="date">2:00 PM</span></span> | <span>Location: <span class="date">GRB Exhibit Hall D</span></span></p>\n' +
            '                        <p><a name="SessionDesc" href="#">View Description</a><a name="SessionDesc" href="#" style="display:none;">Hide Description</a></p>\n' +
            '\n' +
            '                    </div>\n' +
            '                    <div class="session-description" style="display:none;">\n' +
            '                        Come reflect on your personal "coming-up" story and share your experience with all the women who have come before you and are yet to come. Reflect on your time here at GHC 18 and how you, and the women around you, can contribute to a new tech industry created by and for the women in this room. Open each day during Expo hours.\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '            </div>'
        const sessionObject = {
            id: 'agenda_div47a28dd9-e6f3-4376-94f0-7692938f9781',
            title: 'Gallery: Our Time',
            audience_level: 'All',
            track: '',
            focus_area: '',
            start_date: 1538139600000,
            start_time: 1538139600000,
            end_time: 1538157600000,
            description: 'Come reflect on your personal "coming-up" story and share your experience with all the women who have come before you and are yet to come. Reflect on your time here at GHC 18 and how you, and the women around you, can contribute to a new tech industry created by and for the women in this room. Open each day during Expo hours.'
        };

        let parsedSession = parseSessionInfo(divObject);
        expect(parsedSession.id).toBe(sessionObject.id);
        expect(parsedSession.title).toBe(sessionObject.title);
        expect(parsedSession.audience_level).toBe(sessionObject.audience_level);
        expect(parsedSession.track).toBe(sessionObject.track);
        expect(parsedSession.focus_area).toBe(sessionObject.focus_area);
        expect(parsedSession.start_date).toBe(sessionObject.start_date);
        expect(parsedSession.start_time).toBe(sessionObject.start_time);
        expect(parsedSession.end_time).toBe(sessionObject.end_time);
        expect(parsedSession.description).toBe(sessionObject.description);
    });

    it('parseSessionInfo returns the correct session object', function(){
        const divObject = '<div class="reg-matrix-header-container">\n' +
            '                <div class="reg-matrix-header" id="agenda_div1ed6f9ec-0948-45db-b7e2-11537b14cc5d">\n' +
            '                    <h3 id="ctl00_ContentPlaceHolder1_ctl00_rptSession_ctl70_h3ItemName">\n' +
            '                        IW654: Robocar: How to Build Your Own Autonomous Vehicle\n' +
            '                    </h3>\n' +
            '                </div>\n' +
            '\n' +
            '                <div class="session-content">\n' +
            '                    <div class="session-info">\n' +
            '                        <p><span>Audience Level: <span class="date">Intermediate Tech</span></span> | <span>Track: <span class="date">Internet of Things/Wearable Technology</span></span> | <span>Focus Area: <span class="date">Smart and Secure Internet of Things</span></span> | <span style="white-space: nowrap;">Start Date: <span class="date">Wednesday, September 26, 2018</span></span> | <span style="white-space: nowrap;">Start Time: <span class="date">2:10 PM</span></span> | <span style="white-space: nowrap;">End Time: <span class="date">2:30 PM</span></span> | <span>Location: <span class="date">GRB 362C</span></span> | Speakers: <span class="speaker-name"><a href="#" id="lnkSpeaker95e71ed6" onclick="javascript:ShowSpeakerPopup(\'lnkSpeaker95e71ed6\',\'95e7ba27-253d-43ad-adb7-34fcec4f31e0\',\'1ed6f9ec-0948-45db-b7e2-11537b14cc5d\',\'6083a0df-7383-43e2-ad8b-262237e56423\')">Corey Salzer</a></span></p>\n' +
            '                        <p><a name="SessionDesc" href="#">View Description</a><a name="SessionDesc" href="#" style="display:none;">Hide Description</a></p>\n' +
            '\n' +
            '                    </div>\n' +
            '                    <div class="session-description" style="display:none;">\n' +
            '                        Interested in integrating IoT and AI into software engineering projects? In this session, I\'ll show how I built an autonomous car leveraging supervised deep learning in the cloud to make real-time driving decisions and a front end to interact with the car. Expect a live demo, code and integration explanations, and to leave confident about building your own and using IoT and AI in future projects.\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '\n' +
            '            </div>'
        const sessionObject = {
            id: 'agenda_div1ed6f9ec-0948-45db-b7e2-11537b14cc5d',
            title: 'IW654: Robocar: How to Build Your Own Autonomous Vehicle',
            audience_level: 'Intermediate Tech',
            track: 'Internet of Things/Wearable Technology',
            focus_area: 'Smart and Secure Internet of Things',
            start_date: 1537966800000,
            start_time: 1537985400000,
            end_time: 1537986600000,
            description: "Interested in integrating IoT and AI into software engineering projects? In this session, I'll show how I built an autonomous car leveraging supervised deep learning in the cloud to make real-time driving decisions and a front end to interact with the car. Expect a live demo, code and integration explanations, and to leave confident about building your own and using IoT and AI in future projects."
        };


        let parsedSession = parseSessionInfo(divObject);
        expect(parsedSession.id).toBe(sessionObject.id);
        expect(parsedSession.title).toBe(sessionObject.title);
        expect(parsedSession.audience_level).toBe(sessionObject.audience_level);
        expect(parsedSession.track).toBe(sessionObject.track);
        expect(parsedSession.focus_area).toBe(sessionObject.focus_area);
        expect(parsedSession.start_date).toBe(sessionObject.start_date);
        expect(parsedSession.start_time).toBe(sessionObject.start_time);
        expect(parsedSession.end_time).toBe(sessionObject.end_time);
        expect(parsedSession.description).toBe(sessionObject.description);
    });

    // Test getHalfHourStartTime
    it('get half hour start time for start on the hour', function(){
        expect(getHalfHourStartTime(1538139600000)).toBe(1538139600000);
    });

    it('get half hour start time for 15 minute start', function() {
        expect(getHalfHourStartTime(1538147700000)).toBe(1538146800000);
    });

    it('get half hour start time for half hour', function() {
        expect(getHalfHourStartTime(1537907400000)).toBe(1537907400000);
    });

    it('get half hour start time for 45 minute start', function() {
        expect(getHalfHourStartTime(1537958700000)).toBe(1537957800000);
    });

    it('get half hour start time for 20 minute start', function() {
        expect(getHalfHourStartTime(1538061600000)).toBe(1538060400000);
    });

    it('get half hour start time for 40 minute start', function() {
        expect(getHalfHourStartTime(1537987200000)).toBe(1537986600000);
    });

    // Test getHalfHourEndTime
    it('get half hour end time for end on the hour', function(){
        expect(getHalfHourEndTime(1538139600000)).toBe(1538139600000);
    });

    it('get half hour end time for 15 minute end', function() {
        expect(getHalfHourEndTime(1538147700000)).toBe(1538148600000);
    });

    it('get half hour end time for half hour', function() {
        expect(getHalfHourEndTime(1537907400000)).toBe(1537907400000);
    });

    it('get half hour end time for 45 minute end', function() {
        expect(getHalfHourEndTime(1537958700000)).toBe(1537959600000);
    });

    it('get half hour end time for 20 minute end', function() {
        expect(getHalfHourEndTime(1538061600000)).toBe(1538062200000);
    });

    it('get half hour end time for 40 minute end', function() {
        expect(getHalfHourEndTime(1537987200000)).toBe(1537988400000);
    });


});

describe("Vue Instance Methods", function() {
    document.body.innerHTML = '<div id="scheduleTable"></div>';
    const constants = getConstants();
    const VueInstance = getCalendarVueInstance({}, constants, {});
    const methods = VueInstance.$options.methods;


    it('sets the correct data from the arguments', function() {
        expect(constants.minutesPerHour).toEqual(60)
        // expect(typeof VueInstance.data).toBe('function');
        const data = VueInstance.$data;
        // expect(data.days).toBe({});
        expect(data.constantsObject).toBe(constants);
    });

    // Tests for getTrackClass
    it('get correct class for Open Source Track', function() {
        const session = {
            id: 'agenda_divaad55ef2-c6d2-48e4-8602-64172893bf42',
            title: 'Open Source Day Code-a-thon for Humanity',
            audience_level: 'All',
            track: 'Open Source',
            focus_area: '',
            start_date: 1538053200000,
            start_time: 1538055000000,
            end_time: 1538083800000,
            description: 'Providing women of all skill levels with the opportunity to collaborate and make a change, beginners and experienced coders alike can join this hackathon to develop projects to improve the world we live in. Participants will use open source software (OSS) on these humanitarian projects and gain some practical coding skills, see sponsors demos, while networking with others in this annual event! To ensure requirements are met for each project in OSD, if you are interested in participating please register for the event. You will receive an email from us within a few weeks to sign up for a specific project. Project details can be viewed on our website.'
        };

        expect(methods.getTrackClass(session)).toBe("open_source");
    });

    it('get correct class for Artificial Intelligence Track', function() {
        const session = {
            id: 'agenda_div0e0ffc0e-60f5-469e-a853-329aa7bd99c4',
            title: 'AI501: Tagging Videos with Skills Under Weak Supervision',
            audience_level: 'Beginner Tech',
            track: 'Artificial Intelligence',
            focus_area: 'Applications in AI',
            start_date: 1538053200000,
            start_time: 1538058900000,
            end_time: 1538060100000,
            description: 'In industry settings, getting large quantities of data is easy, but getting high-quality labels to perform certain tasks is a bottleneck. In this talk, we look at one such use-case: the task of tagging courses and the videos with skills where there is limited or no labeled data. We present techniques that fall under the umbrella of weak supervision and demonstrate their usability.'
        };

        expect(methods.getTrackClass(session)).toBe("artificial_intelligence");
    });

    it('get correct class for Community Track', function() {
        const session = {
            id: 'agenda_diveaebb15e-6bfa-4508-b411-2a46c8bd6c2a',
            title: 'Social Celebrating Chinese Women in Technical Roles',
            audience_level: 'All',
            track: 'Community',
            focus_area: '',
            start_date: 1538053200000,
            start_time: 1538059500000,
            end_time: 1538063100000,
            description: 'Social to celebrate Chinese Women in Computing Community. Community members will have the opportunity to meet and network with other community members, connect with strong role models, and celebrate their accomplishments. Leaders will address their members with Community updates and information.'
        };

        expect(methods.getTrackClass(session)).toBe("community");
    });

    it('get correct class for Security/Privacy Track', function() {
        const session = {
            id: 'agenda_div5eeeadde-a314-4f99-88f7-d685d30e8a52',
            title: 'SP548: Cybersecurity: Where Everything Old is New Again!',
            audience_level: 'Beginner Tech',
            track: 'Security/Privacy',
            focus_area: 'Data Anonymization & Privacy in the world of IoT and ever growing apps',
            start_date: 1538053200000,
            start_time: 1538064900000,
            end_time: 1538068500000,
            description: 'Every week something new about cybersecurity attacks appears in the news, from APT to  viruses. Organizations are often left wondering what to do - is it really as simple as applying patches in a timely manner? The short answer is: no.  This panel of industry professionals revisit memorable attacks from the past and provide insights into lessons learned that can help the future defensive position.'
        };

        expect(methods.getTrackClass(session)).toBe("security_privacy");
    });


    it('get correct class for IoT Track', function() {
        const session = {
            id: 'agenda_div3eaf4a99-426b-42b1-8e9a-602febf61885',
            title: 'IW655: Building an Open Ecosystem Smart Speaker',
            audience_level: 'Intermediate Tech',
            track: 'Internet of Things/Wearable Technology',
            focus_area: 'Building Ecosystems in the Internet of Things',
            start_date: 1538053200000,
            start_time: 1538070600000,
            end_time: 1538071800000,
            description: "Voice can be a natural interaction with a product but can feel awkward if not done properly. Come see what we've learned while developing an open ecosystem smart speaker that aims for continuity of experience across voice assistants, mobile app and physical device. Learn research finding of users cognitive understanding of assistants, some new techniques to conventional user research and how to overcome challenges traditional development poses for voice experiences."
        };

        expect(methods.getTrackClass(session)).toBe("internet_of_things_wearable_technology");
    });

    // Tests for getHeightForSession
    it('get height for 8 hour session session', function() {
        const session = {
            id: 'agenda_divaad55ef2-c6d2-48e4-8602-64172893bf42',
            title: 'Open Source Day Code-a-thon for Humanity',
            audience_level: 'All',
            track: 'Open Source',
            focus_area: '',
            start_date: 1538053200000,
            start_time: 1538055000000,
            end_time: 1538083800000,
            description: 'Providing women of all skill levels with the opportunity to collaborate and make a change, beginners and experienced coders alike can join this hackathon to develop projects to improve the world we live in. Participants will use open source software (OSS) on these humanitarian projects and gain some practical coding skills, see sponsors demos, while networking with others in this annual event! To ensure requirements are met for each project in OSD, if you are interested in participating please register for the event. You will receive an email from us within a few weeks to sign up for a specific project. Project details can be viewed on our website.'
        };

        expect(methods.getHeightForSession(session)).toBe(960);
    });

    it('get height for 15 minute session', function() {
        const session = {
            id: 'agenda_div8886aa64-3c3c-4961-b628-2025426407b8',
            title: 'How Google Sheets and the Google Cloud Natural Language API Made Open-Ended Feedback Useful (Google)',
            audience_level: 'All',
            track: 'Technology Showcase',
            focus_area: '',
            start_date: 1538053200000,
            start_time: 1538076600000,
            end_time: 1538077500000,
            description: 'Joanna Smith, a Google Developer Advocate, will explore how one woman with a curious mind, and without a computer science background, used Google Cloud Platform and G Suite to analyze open-ended survey feedback.'
        };

        expect(methods.getHeightForSession(session)).toBe(30);
    });

    it('get height for 1 hour session', function() {
        const session = {
            id: 'agenda_div2c09e9e9-55f3-4ffc-b6c0-972924c5b78e',
            title: 'CR318: Nail Your Promotion',
            audience_level: 'Mid-Career',
            track: 'Career',
            focus_area: '',
            start_date: 1537966800000,
            start_time: 1537986600000,
            end_time: 1537990200000,
            description: 'Are you working hard, yet not earning promotions? This extremely popular workshop from last year presents a 5-step framework for earning promotions and 5 supplemental super skills to accelerate career growth. It comes alive with personal stories and includes hands-on practice activities focusing on the things women often need to do besides working hard at a job, to rise higher in their careers.'
        };

        expect(methods.getHeightForSession(session)).toBe(120);
    });


    it('get height for 2 hour session', function() {
        const session = {
            id: 'agenda_divf4567e07-c2da-4640-bb6b-154e91565784',
            title: 'Professional Development Leadership Workshop: Confidence: How do I Get More of That?',
            audience_level: 'All',
            track: 'Special Session',
            focus_area: '',
            start_date: 1538053200000,
            start_time: 1538055900000,
            end_time: 1538063100000,
            description: "What does it take to be more confident, in new situations, high-stress settings or when we may not have support? Is confidence something you're born with or is it a mindset to shift? We'll explore the answers to these questions as well as share our tactics for building confidence, appearing confident and what it takes to set ourselves up for success no matter what situation we're walking in to."
        };

        expect(methods.getHeightForSession(session)).toBe(240);
    });

    // Tests getTopOffsetForSession
    it('get top offset for 11:30am session on Wednesday', function() {
        const day = {
            display_date: 1537880400000,
            first_session_start_time: 1537907400000,
            last_session_end_time: 1537920000000,
        };
        const session1 = {
            id: 'agenda_div6ad3e6de-7ce9-4124-8370-4f4c33e9bf96',
            title: 'Session Chair Orientation (Invite Only)',
            audience_level: 'Invite Only',
            track: '',
            focus_area: '',
            start_date: 1537880400000,
            start_time: 1537907400000,
            end_time: 1537911000000,
            description: "If you've been selected to serve as a session chair, thank you! Come for a brief overview of duties, rules for speakers and reporting expectations. Bring your questions and we will be ready with answers."
        };

        const session2 = {
            id: 'agenda_div25c9e0ee-6dfb-49d3-9c0a-c26af9f07929',
            title: "First Timer's Orientation",
            audience_level: 'All',
            track: 'Special Session',
            focus_area: '',
            start_date: 1537880400000,
            start_time: 1537909200000,
            end_time: 1537912800000,
            description: "Come learn about all of the exciting opportunities available at GHC 18. Hear from organizers of the event and learn tips and tricks to get the most out of your time.This session is filling up quickly. There will be seating for all that pre-register, although some seats will be in an overflow room. There will also be a small percentage of seats available for walk-ins."
        };

        const session3 = {
            id: 'agenda_divcbcdc1a6-a954-418b-a1f7-25fdc813c5d4',
            title: 'AnitaB.org Community Leadership Dinner (Invite Only)',
            audience_level: 'Invite Only',
            track: '',
            focus_area: '',
            start_date: 1537880400000,
            start_time: 1537914600000,
            end_time: 1537920000000,
            description: "By Invitation only. Dinner to celebrate the AnitaB.org Community Leaders. Leaders will network with other Community leaders, discuss collaborations or ideas for programming and events, and receive updates on AnitaB.org mission and strategy for 2019."
        };

        const session4 = {
            id: 'agenda_divc62b0b2e-8553-48a7-8d85-72265303d8ce',
            title: 'Hoppers Orientation (Invite Only)',
            audience_level: 'Invite Only',
            track: '',
            focus_area: '',
            start_date: 1537880400000,
            start_time: 1537914600000,
            end_time: 1537918200000,
            description: "Hoppers will meet other Hoppers, hear about their assignments and learn the rules they must follow while fulfilling their duties. You will also receive your Hopper t-shirt. This session is required for all Hoppers."
        };

        expect(methods.getTopOffsetForSession(session1, day)).toBe(0);
        expect(methods.getTopOffsetForSession(session2, day)).toBe(60);
        expect(methods.getTopOffsetForSession(session3, day)).toBe(240);
        expect(methods.getTopOffsetForSession(session4, day)).toBe(240);
    });

    // Test getLeftInsetForSession
    it('left inset for session 0 is calculated correctly', function() {
        expect(methods.getLeftInsetForSession(0)).toBe(85);
    });

    it('left inset for session 1 is calculated correctly', function() {
        expect(methods.getLeftInsetForSession(1)).toBe(275);
    });

    it('left inset for session 37 is calculated correctly', function() {
        expect(methods.getLeftInsetForSession(37)).toBe(7115);
    });

    // Test getNumHalfHoursInDay
    it('correctly calculate number of half hours in a day that starts on a half hour and ends on an hour', function() {
        expect(methods.numHalfHoursInDay(1537907400000, 1537920000000)).toBe(8);
    });

    it('correctly calculate number of half hours in a day that starts and ends on a half hour', function() {
        expect(methods.numHalfHoursInDay(1537957800000, 1538004600000)).toBe(26);
    });


    // TODO: These tests will probably fail in other timezones
    // Test getFullDisplayDate
    it('correctly print out the full date', function() {
        expect(methods.getFullDisplayDate(1537880400000)).toBe("Tuesday, September 25, 2018");
        expect(methods.getFullDisplayDate(1537966800000)).toBe("Wednesday, September 26, 2018");
        expect(methods.getFullDisplayDate(1538053200000)).toBe("Thursday, September 27, 2018");
        expect(methods.getFullDisplayDate(1538139600000)).toBe("Friday, September 28, 2018");
    });

    // Test getDisplayHours
    it('correctly display first hour of the day', function() {
        expect(methods.getDisplayHours(1538139600000, 0)).toBe("9:00 AM");
    });

    it('correctly display third hour of the day', function() {
        expect(methods.getDisplayHours(1538139600000, 3)).toBe("12:00 PM");
    });

    it('correctly display a half hour of the day', function() {
        expect(methods.getDisplayHours(1538139600000, 4.5)).toBe("1:30 PM");
    });


    // Test getDayOfWeekName
    it('correctly print out the full date', function() {
        expect(methods.getDayOfWeekName(1537880400000)).toBe("Tuesday");
        expect(methods.getDayOfWeekName(1537966800000)).toBe("Wednesday");
        expect(methods.getDayOfWeekName(1538053200000)).toBe("Thursday");
        expect(methods.getDayOfWeekName(1538139600000)).toBe("Friday");
    });

    // Test getFullDayWidth
    it('full day width is calculated correctly', function() {
        expect(methods.getFullDayWidth()).toBe(1415);
    });

    // Test getFullDayHeight
    it('correctly calculate the height of a 4 hour day', function() {
        expect(methods.getFullDayHeight(1537907400000, 1537920000000)).toBe(480);
    });

    it('correctly calculate the height of a 13 hour day', function() {
        expect(methods.getFullDayHeight(1537957800000, 1538004600000)).toBe(1560);
    });

    // Test getHalfHourHeight
    it('half hour block height is calculated correctly', function() {
        expect(methods.getHalfHourHeight()).toBe(60);
    });
});