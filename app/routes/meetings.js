// All shared /v60/* routes are registered by v60.js (loaded first in routes.js)

module.exports = router => {

    // meetings

    router.post('/v60/wft-meetings/new-task/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "ptm") {
            response.redirect("/v60/onb/manual-task")
        } else if (nextTask == "No task at this time") {
            response.redirect("/v60/onb/check-task?manualTask=no")
        } else {
            response.redirect("/v60/wft-meetings/new-task/purposet")
        }
    })

    router.post('/v60/wft-meetings/new-task/purposet-answer', function(request, response) {

        var purposet = request.session.data['purposet']
        if (purposet == "yes"){
            response.redirect("/v60/wft-meetings/new-task/task-due-date")
        } else {
            response.redirect("/v60/wft-meetings/new-task/task-due-date")
        }
    })

    router.post('/v60/wft-meetings/new-task/task-due-date-answer', function(request, response) {

        response.redirect("/v60/wft-meetings/new-task/check-task")
    })


          router.post('/ur/bfs/meetings-2//meetings-2/logging-answer', function(request, response) {

        var logging = request.session.data['logging']
        if (logging == "yes"){
            response.redirect("/ur/bfs/meetings-2/purpose2")
        } else {
            response.redirect("/ur/bfs/meetings-2/purpose")
        }
    })

    router.post('/logging-answer', function(request, response) {

        var logging = request.session.data['logging']
        if (logging == "yes"){
            response.redirect("/v50/meetings-2/purpose2")
        } else {
            response.redirect("/v50/meetings-2/purpose")
        }
    })

  
    router.post('/purpose-answer', function(request, response) {

        var purpose = request.session.data['purpose']
        if (purpose == "pre-trial"){
            response.redirect("/v50/meetings/did-victim-request")
        } else {
            response.redirect("/v50/meetings/did-victim-request")
        }
    })

       router.post('bfs/meetings-2/purpose2-answer', function(request, response) {

        var purpose = request.session.data['purpose2']
        if (purpose == "pre-trial"){
            response.redirect("/ur/bfs/meetings-2/has-meeting-been-offered")
        } else {
            response.redirect("/ur/bfs/meetings-2/has-meeting-been-offered")
        }
    })

    router.post('/purpose2-answer', function(request, response) {

        var purpose = request.session.data['purpose2']
        if (purpose == "pre-trial"){
            response.redirect("/v50/meetings/has-meeting-been-offered")
        } else {
            response.redirect("/v50/meetings/has-meeting-been-offered")
        }
    })




    router.post('/ur/bfs/meetings-2/purpose3-answer', function(request, response) {

        var purpose3 = request.session.data['purpose3']
        if (purpose3 == "pre-trial"){
            response.redirect("/ur/bfs/meetings-2/confirm-arrangements/who-requested-meeting")
        } else {
            response.redirect("/ur/bfs/meetings-2/confirm-arrangements/who-requested-meeting")
        }
    })

     router.post('/purpose3-answer', function(request, response) {

        var purpose3 = request.session.data['purpose3']
        if (purpose3 == "pre-trial"){
            response.redirect("/v50/meetings-2/due-date")
        } else {
            response.redirect("/v50/meetings-2/due-date")
        }
    })


      router.post('/ur/bfs/meetings-2/purpose4-answer', function(request, response) {

        var purpose4 = request.session.data['purpose4']
        if (purpose4 == "pre-trial"){
            response.redirect("/ur/bfs/meetings-2/has-meeting-been-offered")
        } else {
            response.redirect("/ur/bfs/meetings-2/has-meeting-been-offered")
        }
    })

    router.post('/purpose4-answer', function(request, response) {

        var purpose4 = request.session.data['purpose4']
        if (purpose4 == "pre-trial"){
            response.redirect("/v50/meetings-2/has-meeting-been-offered")
        } else {
            response.redirect("/v50/meetings-2/has-meeting-been-offered")
        }
    })

    

      router.post('/ur/bfs/meetings-2/has-meeting-been-offered', function(request, response) {

        var offered = request.session.data['offered']
        if (offered == "yes"){
            request.session.data['error'] = ''
            response.redirect("/ur/bfs/meetings-2/cps-offer/who-offered")
        } else {
            response.redirect("/ur/bfs/meetings-2/cps-offer/reason-why")
        }
    })
    router.post('/ur/bfs/meetings-2/who-offered-answer', function(request, response) {
        var selected = [].concat(request.session.data['offerRecipients'] || [])
        if (selected.length === 0){
            return response.redirect("/ur/bfs/meetings-2/cps-offer/who-offered?error=yes")
        }
        request.session.data['error'] = ''
        response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-offered?person=1")
    })

    router.post('/ur/bfs/meetings-2/who-declined-answer', function(request, response) {
        var selected = [].concat(request.session.data['declineRecipients'] || [])
        if (selected.length === 0){
            return response.redirect("/ur/bfs/meetings-2/cps-offer/who-declined?error=yes")
        }
        request.session.data['error'] = ''
        response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-declined?person=1")
    })

    router.post('/ur/bfs/meetings-2/who-accepted-answer', function(request, response) {
        var selected = [].concat(request.session.data['acceptRecipients'] || [])
        if (selected.length === 0){
            return response.redirect("/ur/bfs/meetings-2/cps-offer/who-accepted?error=yes")
        }
        request.session.data['error'] = ''
        response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-accepted?person=1")
    })

    router.post('/ur/bfs/meetings-2/log-offer-response-answer', function(request, response) {

        var offerResponse = request.session.data['offerResponse']
        if (offerResponse == "accepted") {
            response.redirect("/ur/bfs/meetings-2/cps-offer/log-accepted")
        } else if (offerResponse == "declined") {
            response.redirect("/ur/bfs/meetings-2/cps-offer/log-declined")
        } else {
            response.redirect("/ur/bfs/meetings-2/cps-offer/log-no-response")
        }
    })

    router.get('/ur/bfs/meetings-2/cps-offer/log-accepted', function(request, response) {

        // Work out which offered recipients are still to respond (not yet accepted or declined).
        var data = request.session.data
        var offered = [].concat(data['offerRecipients'] || [])
        var remaining = []
        offered.forEach(function(recipient, i){
            if (!data['recordaccepted' + (i + 1)] && !data['recorddeclined' + (i + 1)]) remaining.push(String(i + 1))
        })

        // With only one person left to respond, skip the "who accepted" question.
        if (remaining.length === 1){
            data['acceptRecipients'] = remaining
            response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-accepted?person=1")
        } else {
            data['error'] = ''
            response.redirect("/ur/bfs/meetings-2/cps-offer/who-accepted#communications")
        }
    })

    router.get('/ur/bfs/meetings-2/cps-offer/log-declined', function(request, response) {

        // Work out which offered recipients are still to respond (not yet declined).
        var data = request.session.data
        var offered = [].concat(data['offerRecipients'] || [])
        var remaining = []
        offered.forEach(function(recipient, i){
            if (!data['recorddeclined' + (i + 1)]) remaining.push(String(i + 1))
        })

        // With only one person left to respond, skip the "who declined" question.
        if (remaining.length === 1){
            data['declineRecipients'] = remaining
            response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-declined?person=1")
        } else {
            data['error'] = ''
            response.redirect("/ur/bfs/meetings-2/cps-offer/who-declined#communications")
        }
    })

    router.get('/ur/bfs/meetings-2/cps-offer/log-no-response', function(request, response) {

        var data = request.session.data

        // Snapshot the current offer details as a "no response" round so they are
        // retained (and can be shown in a Details component).
        var recipients = [].concat(data['offerRecipients'] || [])
        var now = new Date()
        var loggedDate = String(now.getDate()).padStart(2, '0') + '/' +
            String(now.getMonth() + 1).padStart(2, '0') + '/' + now.getFullYear()
        var round = []
        recipients.forEach(function(recipient, i){
            round.push({
                offeredTo: recipient,
                howOffered: data['howoffered' + (i + 1)],
                offerDate: data['offerDate' + (i + 1)],
                loggedDate: loggedDate
            })
        })
        var rounds = data['noResponseOffers'] || []
        rounds.push(round)
        data['noResponseOffers'] = rounds

        response.redirect("/ur/bfs/meetings-2/cps-offer/meeting-no-response#communications")
    })
    router.post('/has-meeting-been-offered', function(request, response) {

        var offered = request.session.data['offered']
        if (offered == "yes"){
            response.redirect("/v50/meetings-2/cps-offer/how-when-offered")
        } else {
            response.redirect("/v50/meetings-2/cps-offer/reason-why")
        }
    })

    router.post('/format-answer', function(request, response) {

        var format = request.session.data['format']
        if (format == "face-to-face"){
            response.redirect("/v50/meetings/location")
        } else {
            response.redirect("/v50/meetings/who-is-attending")
        }
    })



    router.post('/ur/bfs/meetings-2/format2-answer', function(request, response) {

        var format2 = request.session.data['format2']
        if (format2 == "face-to-face"){
            response.redirect("/ur/bfs/meetings-2/location")
        } else {
            response.redirect("/ur/bfs/meetings-2/who-is-attending")
        }
    })
    router.post('/format2-answer', function(request, response) {

        var format2 = request.session.data['format2']
        if (format2 == "face-to-face"){
            response.redirect("/v50/meetings-2/location")
        } else {
            response.redirect("/v50/meetings-2/who-is-attending")
        }
    })

    router.post('/ur/bfs/meetings-2/howoffered-answer', function(request, response) {

        // Meeting offer details are captured one recipient per page (person=1, 2, ...).
        // Move on to the next recipient until every offer has been recorded.
        var data = request.session.data
        var recipients = [].concat(data['offerRecipients'] || [])
        var person = Number.parseInt(data['person'], 10) || 1

        // Both "how" and "when" are mandatory. Re-display the page with errors if either is missing.
        var howMissing = !data['howoffered' + person]
        var whenMissing = !data['offerDate' + person]
        if (howMissing || whenMissing){
            return response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-offered?person=" + person
                + "&offerHowError=" + (howMissing ? "yes" : "no")
                + "&offerWhenError=" + (whenMissing ? "yes" : "no"))
        }
        data['offerHowError'] = ''
        data['offerWhenError'] = ''

        if (person < recipients.length){
            response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-offered?person=" + (person + 1))
            return
        }

        // All offers recorded: route to the confirmation page for the first matching
        // method by priority, aggregating every recipient's selected method.
        var howoffered = []
        Object.keys(data).forEach(function(key){
            if (key.indexOf('howoffered') === 0){
                howoffered = howoffered.concat(data[key])
            }
        })
        response.redirect("/ur/bfs/meetings-2/cps-offer/meeting-offered#communications")
    })


    router.post('/howoffered-answer', function(request, response) {

        var howoffered = request.session.data['howoffered']
        if (howoffered == "letter-post"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-offered-post#communications")
    }
    else if (howoffered == "letter-email"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-offered-email#communications")
        }

    else if (howoffered == "letter-isva"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-offered-isva#communications")
        }

    else if (howoffered == "letter-police"){
    response.redirect("/v50/meetings-2/cps-offer/meeting-offered-police#communications")


        } else {
            response.redirect("/v50/meetings-2/cps-offer/meeting-offered-telephone#communications")
        }
    })
    

     
    
    router.post('/ur/bfs/meetings-2/howoffered2-answer', function(request, response) {

        var howoffered2 = request.session.data['howoffered2']
        if (howoffered2 == "letter-post"){
            response.redirect("/ur/bfs/meetings-2/cps-offer/meeting-offered-post-2#communications")
        } else {
            response.redirect("/ur/bfs/meetings-2/cps-offer/meeting-offered#communications")
        }
    })


       router.post('/howoffered2-answer', function(request, response) {

        var howoffered2 = request.session.data['howoffered2']
        if (howoffered2 == "letter-post"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-offered-post-2#communications")
    }
    else if (howoffered2 == "letter-email"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-offered-email#communications")
        }

    else if (howoffered2 == "letter-isva"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-offered-isva#communications")
        }

    else if (howoffered2 == "letter-police"){
    response.redirect("/v50/meetings-2/cps-offer/meeting-offered-police#communications")


        } else {
            response.redirect("/v50/meetings-2/cps-offer/meeting-offered-telephone#communications")
        }
    })



    router.post('/ur/bfs/meetings-2/recordaccepted-answer', function(request, response) {

        // Acceptance details are captured one selected recipient per page (person=1, 2, ...).
        // Move on to the next selected recipient until this batch is recorded.
        var data = request.session.data
        var accepters = [].concat(data['acceptRecipients'] || [])
        var person = Number.parseInt(data['person'], 10) || 1
        var acceptIdx = accepters[person - 1]

        // Both "how" and "when" are mandatory. Re-display the page with errors if either is missing.
        var howMissing = !data['recordaccepted' + acceptIdx]
        var whenMissing = !data['acceptDate' + acceptIdx]
        if (howMissing || whenMissing){
            return response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-accepted?person=" + person
                + "&acceptHowError=" + (howMissing ? "yes" : "no")
                + "&acceptWhenError=" + (whenMissing ? "yes" : "no"))
        }
        data['acceptHowError'] = ''
        data['acceptWhenError'] = ''

        if (person < accepters.length){
            response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-accepted?person=" + (person + 1))
            return
        }

        // Track how many offered recipients are still to be accounted for
        // (either accepted or declined).
        var offered = [].concat(data['offerRecipients'] || [])
        var accountedCount = 0
        offered.forEach(function(recipient, i){
            if (data['recordaccepted' + (i + 1)] || data['recorddeclined' + (i + 1)]) accountedCount++
        })
        data['responsesRemaining'] = offered.length - accountedCount
        data['lastResponseType'] = 'accepted'

        response.redirect("/ur/bfs/meetings-2/cps-offer/meeting-responses#communications")
    })


    router.post('/recordaccepted-answer', function(request, response) {

        var recordaccepted = request.session.data['recordaccepted']
        if (recordaccepted == "letter-post"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-accepted-post#communications")
    }
    else if (recordaccepted == "letter-email"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-accepted-email#communications")
        }

    else if (recordaccepted == "letter-isva"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-accepted-isva#communications")
        }

    else if (recordaccepted == "letter-police"){
    response.redirect("/v50/meetings-2/cps-offer/meeting-accepted-police#communications")


        } else {
            response.redirect("/v50/meetings-2/cps-offer/meeting-accepted-telephone#communications")
        }
    })

       router.post('/ur/bfs/meetings-2/recorddeclined-answer', function(request, response) {

        // Decline details are captured one selected recipient per page (person=1, 2, ...).
        // Move on to the next selected recipient until this batch is recorded.
        var data = request.session.data
        var decliners = [].concat(data['declineRecipients'] || [])
        var person = Number.parseInt(data['person'], 10) || 1
        var declineIdx = decliners[person - 1]

        // Both "how" and "when" are mandatory. Re-display the page with errors if either is missing.
        var howMissing = !data['recorddeclined' + declineIdx]
        var whenMissing = !data['declineDate' + declineIdx]
        if (howMissing || whenMissing){
            return response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-declined?person=" + person
                + "&declineHowError=" + (howMissing ? "yes" : "no")
                + "&declineWhenError=" + (whenMissing ? "yes" : "no"))
        }
        data['declineHowError'] = ''
        data['declineWhenError'] = ''

        if (person < decliners.length){
            response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-declined?person=" + (person + 1))
            return
        }

        // Track how many offered recipients are still to be accounted for
        // (either accepted or declined).
        var offered = [].concat(data['offerRecipients'] || [])
        var accountedCount = 0
        offered.forEach(function(recipient, i){
            if (data['recordaccepted' + (i + 1)] || data['recorddeclined' + (i + 1)]) accountedCount++
        })
        data['responsesRemaining'] = offered.length - accountedCount
        data['lastResponseType'] = 'declined'

        response.redirect("/ur/bfs/meetings-2/cps-offer/meeting-responses#communications")
    })


    router.post('/recorddeclined-answer', function(request, response) {

        var recorddeclined = request.session.data['recorddeclined']
        if (recorddeclined == "letter-post"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-declined-post#communications")
    }
    else if (recorddeclined == "letter-email"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-declined-email#communications")
        }

    else if (recorddeclined == "letter-isva"){
            response.redirect("/v50/meetings-2/cps-offer/meeting-declined-isva#communications")
        }

    else if (recorddeclined == "letter-police"){
    response.redirect("/v50/meetings-2/cps-offer/meeting-declined-police#communications")


        } else {
            response.redirect("/v50/meetings-2/cps-offer/meeting-declined-telephone#communications")
        }
    })


    router.post('/location-answer', function(request, response) {

        var location = request.session.data['location']
        if (location == "cps"){
            response.redirect("/v50/meetings/cps-location")
    }
    else if (location == "magistrate"){
            response.redirect("/v50/meetings/magistrate-location")
        }

    else if (location == "crown"){
    response.redirect("/v50/meetings/crown-location")

        } else {
            response.redirect("/v50/meetings/police-station")
        }
    })


    router.post('/ur/bfs/meetings-2/location2-answer', function(request, response) {

        var location2 = request.session.data['location2']
        if (location2 == "cps"){
            response.redirect("/ur/bfs/meetings-2/who-is-attending")
    }
    else if (location2 == "magistrate"){
            response.redirect("/ur/bfs/meetings-2/who-is-attending")
        }

    else if (location2 == "crown"){
    response.redirect("/ur/bfs/meetings-2/who-is-attending")

        } else {
            response.redirect("/ur/bfs/meetings-2/who-is-attending")
        }
    })

    router.post('/location2-answer', function(request, response) {

        var location2 = request.session.data['location2']
        if (location2 == "cps"){
            response.redirect("/v50/meetings-2/who-is-attending")
    }
    else if (location2 == "magistrate"){
            response.redirect("/v50/meetings-2/who-is-attending")
        }

    else if (location2 == "crown"){
    response.redirect("/v50/meetings-2/who-is-attending")

        } else {
            response.redirect("/v50/meetings-2/who-is-attending")
        }
    })


    router.post('/log-outcome/did-meeting-happen-answer', function(request, response) {

        var meeting = request.session.data['meeting']
        if (meeting == "yes"){
            response.redirect("/v50/meetings/log-outcome/duration")
        } else {
            response.redirect("/v50/meetings/log-outcome/reason-why")
        }
    })



    router.post('/ur/bfs/meetings-2/log-outcome/did-meeting-happen2-answer', function(request, response) {

        var meeting3 = request.session.data['meeting3']
        if (meeting3 == "yes"){
            response.redirect("/ur/bfs/meetings-2/log-outcome/duration")
        } else {
            response.redirect("/ur/bfs/meetings-2/log-outcome/reason-why")
        }
    })

    router.post('/log-outcome/did-meeting-happen2-answer', function(request, response) {

        var meeting3 = request.session.data['meeting3']
        if (meeting3 == "yes"){
            response.redirect("/v50/meetings-2/log-outcome/duration")
        } else {
            response.redirect("/v50/meetings-2/log-outcome/reason-why")
        }
    })

    router.post('/did-victim-request', function(request, response) {

        var meeting = request.session.data['meeting']
        if (meeting == "yes"){
            response.redirect("/v50/meetings/meeting-date")
        } else {
            response.redirect("/v50/meetings/meeting-date")
        }
    })

    // --- Confirm meeting arrangements flow (shared: ur/bfs, v50, v51) ---
    function registerConfirmArrangements(caBase) {

    router.post(caBase + 'who-requested-meeting-answer', function(request, response) {
        var data = request.session.data
        if (!data['meetingRequestedBy']){
            return response.redirect(caBase + 'who-requested-meeting?meetingRequestedByError=yes')
        }
        data['meetingRequestedByError'] = ''
        response.redirect(caBase + 'meeting-date')
    })

    router.post(caBase + 'meeting-date-answer', function(request, response) {
        var data = request.session.data
        var dateMissing = !data['meetingDate']
        var timeMissing = !data['meetingHour'] || !data['meetingMinutes']
        if (dateMissing || timeMissing){
            return response.redirect(caBase + 'meeting-date?meetingDateError=' + (dateMissing ? 'yes' : 'no')
                + '&meetingTimeError=' + (timeMissing ? 'yes' : 'no'))
        }
        data['meetingDateError'] = ''
        data['meetingTimeError'] = ''
        response.redirect(caBase + 'meeting-format')
    })

    router.post(caBase + 'meeting-format-answer', function(request, response) {
        var data = request.session.data
        if (!data['meetingFormat']){
            return response.redirect(caBase + 'meeting-format?meetingFormatError=yes')
        }
        data['meetingFormatError'] = ''
        if (data['meetingFormat'] == 'virtual'){
            response.redirect(caBase + 'attendees')
        } else {
            response.redirect(caBase + 'meeting-location')
        }
    })

    router.post(caBase + 'meeting-location-answer', function(request, response) {
        var data = request.session.data
        var type = data['meetingLocationType']
        if (!type){
            return response.redirect(caBase + 'meeting-location?meetingLocationTypeError=yes')
        }
        var detailKeys = { cps: 'cpsLocation', magistrates: 'magistratesLocation', crown: 'crownLocation', police: 'policeStationLocation', other: 'otherLocation' }
        var detailMissing = !data[detailKeys[type]]
        if (detailMissing){
            return response.redirect(caBase + 'meeting-location?meetingLocationDetailError=yes')
        }
        data['meetingLocationTypeError'] = ''
        data['meetingLocationDetailError'] = ''
        response.redirect(caBase + 'attendees')
    })

    router.post(caBase + 'attendees-answer', function(request, response) {
        var data = request.session.data
        var attendees = [].concat(data['attendees'] || []).filter(function(a){ return a && a !== '_unchecked' })
        if (attendees.length === 0){
            return response.redirect(caBase + 'attendees?attendeesError=yes')
        }
        data['attendeesError'] = ''
        response.redirect(caBase + 'meeting-lead')
    })

    router.post(caBase + 'meeting-lead-answer', function(request, response) {
        var data = request.session.data
        if (!data['meetingLead']){
            return response.redirect(caBase + 'meeting-lead?meetingLeadError=yes')
        }
        data['meetingLeadError'] = ''
        response.redirect(caBase + 'support-needs')
    })

    router.post(caBase + 'support-needs-answer', function(request, response) {
        var data = request.session.data
        var interpreterMissing = !data['interpreterNeeded']
        var supportMissing = !data['supportPersonNeeded']
        if (interpreterMissing || supportMissing){
            return response.redirect(caBase + 'support-needs?interpreterNeededError=' + (interpreterMissing ? 'yes' : 'no')
                + '&supportPersonNeededError=' + (supportMissing ? 'yes' : 'no'))
        }
        data['interpreterNeededError'] = ''
        data['supportPersonNeededError'] = ''
        response.redirect(caBase + 'check-answers')
    })

    router.post(caBase + 'check-answers-answer', function(request, response) {
        response.redirect(caBase + 'meeting-confirmed#communications')
    })

    }

    registerConfirmArrangements('/ur/bfs/meetings-2/confirm-arrangements/')
    registerConfirmArrangements('/v50/meetings-2/confirm-arrangements/')
    registerConfirmArrangements('/v51/meetings-2/confirm-arrangements/')

    router.post('/did-victim-request2', function(request, response) {

        var meeting2 = request.session.data['meeting2']
        if (meeting2 == "yes"){
            response.redirect("/v50/meetings-2/meeting-date")
        } else {
            response.redirect("/v50/meetings-2/choose-meeting")
        }
    })

       router.post('/ur/bfs/meetings-2/did-victim-request3', function(request, response) {

        var meeting4 = request.session.data['meeting4']
        if (meeting4 == "yes"){
            response.redirect("/ur/bfs/meetings-2/cps-offer/log-accepted")
        } else {
            response.redirect("/ur/bfs/meetings-2/cps-offer/how-when-offered-2")
        }
    })

    router.post('/did-victim-request3', function(request, response) {

        var meeting4 = request.session.data['meeting4']
        if (meeting4 == "yes"){
            response.redirect("/v50/meetings-2/cps-offer/how-when-accepted")
        } else {
            response.redirect("/v50/meetings-2/cps-offer/how-when-offered-2")
        }
    })

    router.post('/log-outcome/any-actions-agreed-answer', function(request, response) {

        var actionsAgreed = request.session.data['actionsAgreed']
        if (actionsAgreed == "yes"){
            response.redirect("/v50/meetings/log-outcome/actions")
        } else {
            response.redirect("/v50/meetings/log-outcome/check-answers")
        }
    })

        router.post('/ur/bfs/meetings-2/log-outcome/any-actions-agreed2-answer', function(request, response) {

        var actionsAgreed2 = request.session.data['actionsAgreed2']
        if (actionsAgreed2 == "yes"){
            response.redirect("/ur/bfs/meetings-2/log-outcome/check-answers")
        } else {
            response.redirect("/ur/bfs/meetings-2/log-outcome/check-answers-no")
        }
    })


    router.post('/log-outcome/any-actions-agreed2-answer', function(request, response) {

        var actionsAgreed2 = request.session.data['actionsAgreed2']
        if (actionsAgreed2 == "yes"){
            response.redirect("/v50/meetings-2/log-outcome/check-answers")
        } else {
            response.redirect("/v50/meetings-2/log-outcome/check-answers-no")
        }
    })


    // v51 meetings — mirror of the v50 flows, redirecting to /v51 pages.

    router.post('/v51/logging-answer', function(request, response) {
        var logging = request.session.data['logging']
        if (logging == "yes"){
            response.redirect("/v51/meetings-2/purpose2")
        } else {
            response.redirect("/v51/meetings-2/purpose")
        }
    })

    router.post('/v51/purpose-answer', function(request, response) {
        response.redirect("/v51/meetings/did-victim-request")
    })

    router.post('/v51/purpose2-answer', function(request, response) {
        response.redirect("/v51/meetings/has-meeting-been-offered")
    })

    router.post('/v51/purpose3-answer', function(request, response) {
        response.redirect("/v51/meetings-2/due-date")
    })

    router.post('/v51/purpose4-answer', function(request, response) {
        response.redirect("/v51/meetings-2/has-meeting-been-offered")
    })

    router.post('/v51/has-meeting-been-offered', function(request, response) {
        var offered = request.session.data['offered']
        if (offered == "yes"){
            response.redirect("/v51/meetings-2/cps-offer/how-when-offered")
        } else {
            response.redirect("/v51/meetings-2/cps-offer/reason-why")
        }
    })

    router.post('/v51/format-answer', function(request, response) {
        var format = request.session.data['format']
        if (format == "face-to-face"){
            response.redirect("/v51/meetings/location")
        } else {
            response.redirect("/v51/meetings/who-is-attending")
        }
    })

    router.post('/v51/format2-answer', function(request, response) {
        var format2 = request.session.data['format2']
        if (format2 == "face-to-face"){
            response.redirect("/v51/meetings-2/location")
        } else {
            response.redirect("/v51/meetings-2/who-is-attending")
        }
    })

    router.post('/v51/howoffered-answer', function(request, response) {
        var howoffered = request.session.data['howoffered']
        if (howoffered == "letter-post"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-offered-post#communications")
        } else if (howoffered == "letter-email"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-offered-email#communications")
        } else if (howoffered == "letter-isva"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-offered-isva#communications")
        } else if (howoffered == "letter-police"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-offered-police#communications")
        } else {
            response.redirect("/v51/meetings-2/cps-offer/meeting-offered-telephone#communications")
        }
    })

    router.post('/v51/howoffered2-answer', function(request, response) {
        var howoffered2 = request.session.data['howoffered2']
        if (howoffered2 == "letter-post"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-offered-post-2#communications")
        } else if (howoffered2 == "letter-email"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-offered-email#communications")
        } else if (howoffered2 == "letter-isva"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-offered-isva#communications")
        } else if (howoffered2 == "letter-police"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-offered-police#communications")
        } else {
            response.redirect("/v51/meetings-2/cps-offer/meeting-offered-telephone#communications")
        }
    })

    router.post('/v51/recordaccepted-answer', function(request, response) {
        var recordaccepted = request.session.data['recordaccepted']
        if (recordaccepted == "letter-post"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-accepted-post#communications")
        } else if (recordaccepted == "letter-email"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-accepted-email#communications")
        } else if (recordaccepted == "letter-isva"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-accepted-isva#communications")
        } else if (recordaccepted == "letter-police"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-accepted-police#communications")
        } else {
            response.redirect("/v51/meetings-2/cps-offer/meeting-accepted-telephone#communications")
        }
    })

    router.post('/v51/recorddeclined-answer', function(request, response) {
        var recorddeclined = request.session.data['recorddeclined']
        if (recorddeclined == "letter-post"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-declined-post#communications")
        } else if (recorddeclined == "letter-email"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-declined-email#communications")
        } else if (recorddeclined == "letter-isva"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-declined-isva#communications")
        } else if (recorddeclined == "letter-police"){
            response.redirect("/v51/meetings-2/cps-offer/meeting-declined-police#communications")
        } else {
            response.redirect("/v51/meetings-2/cps-offer/meeting-declined-telephone#communications")
        }
    })

    router.post('/v51/location-answer', function(request, response) {
        var location = request.session.data['location']
        if (location == "cps"){
            response.redirect("/v51/meetings/cps-location")
        } else if (location == "magistrate"){
            response.redirect("/v51/meetings/magistrate-location")
        } else if (location == "crown"){
            response.redirect("/v51/meetings/crown-location")
        } else {
            response.redirect("/v51/meetings/police-station")
        }
    })

    router.post('/v51/location2-answer', function(request, response) {
        response.redirect("/v51/meetings-2/who-is-attending")
    })

    router.post('/v51/did-victim-request', function(request, response) {
        response.redirect("/v51/meetings/meeting-date")
    })

    router.post('/v51/did-victim-request2', function(request, response) {
        var meeting2 = request.session.data['meeting2']
        if (meeting2 == "yes"){
            response.redirect("/v51/meetings-2/meeting-date")
        } else {
            response.redirect("/v51/meetings-2/choose-meeting")
        }
    })

    router.post('/v51/did-victim-request3', function(request, response) {
        var meeting4 = request.session.data['meeting4']
        if (meeting4 == "yes"){
            response.redirect("/v51/meetings-2/cps-offer/how-when-accepted")
        } else {
            response.redirect("/v51/meetings-2/cps-offer/how-when-offered-2")
        }
    })

    router.post('/v51/log-outcome/did-meeting-happen-answer', function(request, response) {
        var meeting = request.session.data['meeting']
        if (meeting == "yes"){
            response.redirect("/v51/meetings/log-outcome/duration")
        } else {
            response.redirect("/v51/meetings/log-outcome/reason-why")
        }
    })

    router.post('/v51/log-outcome/did-meeting-happen2-answer', function(request, response) {
        var meeting3 = request.session.data['meeting3']
        if (meeting3 == "yes"){
            response.redirect("/v51/meetings-2/log-outcome/duration")
        } else {
            response.redirect("/v51/meetings-2/log-outcome/reason-why")
        }
    })

    router.post('/v51/log-outcome/any-actions-agreed-answer', function(request, response) {
        var actionsAgreed = request.session.data['actionsAgreed']
        if (actionsAgreed == "yes"){
            response.redirect("/v51/meetings/log-outcome/actions")
        } else {
            response.redirect("/v51/meetings/log-outcome/check-answers")
        }
    })

    router.post('/v51/log-outcome/any-actions-agreed2-answer', function(request, response) {
        var actionsAgreed2 = request.session.data['actionsAgreed2']
        if (actionsAgreed2 == "yes"){
            response.redirect("/v51/meetings-2/log-outcome/check-answers")
        } else {
            response.redirect("/v51/meetings-2/log-outcome/check-answers-no")
        }
    })

    // v51 meetings-2 new-task — mirror of the v50 relative-redirect handlers.

    router.post('/v51/meetings-2/new-task/next-task-answer', function(request, response) {
        var nextTask = request.session.data['nextTask']
        if (nextTask == "dtc") {
            response.redirect("next-task-due-date?pcdType=dtc")
        } else if (nextTask == "nfa") {
            response.redirect("next-task-due-date?pcdType=nfa")
        } else if (nextTask == "stopped-charge") {
            response.redirect("next-task-due-date?vclType=stopped-charge")
        } else if (nextTask == "altered-charge") {
            response.redirect("next-task-due-date?vclType=altered-charge")
        } else if (nextTask == "other") {
            response.redirect("manual-task")
        } else if (nextTask == "no-task") {
            response.redirect("check-task")
        } else if (nextTask == "meeting-offer" || nextTask == "meeting-arranged" || nextTask == "meeting-outcome") {
            response.redirect("meeting-purpose")
        } else {
            response.redirect("task-due-date")
        }
    })

    router.post('/v51/meetings-2/new-task/next-task-due-date-answer', function(request, response) {
        response.redirect("check-task?manualTask=no")
    })

    router.post('/v51/meetings-2/new-task/meeting-purpose-answer', function(request, response) {
        var meetingPurpose = request.session.data['meetingPurpose']
        if (meetingPurpose === 'pre-trial') {
            response.redirect('not-guilty-plea-date')
        } else {
            response.redirect('next-task-due-date')
        }
    })

}
