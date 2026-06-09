// Convert DD/MM/YYYY + optional HH:MM to YYYY-MM-DDTHH:MM for sorting
function toSortDate(dateString, hour, minutes) {
    if (!dateString || !dateString.includes('/')) return ''
    var parts = dateString.split('/')
    if (parts.length !== 3) return ''
    var h = (hour || '00').toString().padStart(2, '0')
    var m = (minutes || '00').toString().padStart(2, '0')
    return parts[2] + '-' + parts[1] + '-' + parts[0] + 'T' + h + ':' + m
}

module.exports = router => {

    // Clear success flags when navigating between pages (GET requests).
    // Success banners are triggered via redirects with ?success=yes (or
    // ?successNotification=yes). The prototype kit copies session.data into
    // res.locals.data BEFORE this handler runs, so we must update both for
    // the template to see the cleared values.
    router.get('/v60/*', function(request, response, next) {
        if (request.query.success === undefined) {
            request.session.data.success = 'no'
            request.session.data.successReason = ''
            response.locals.data.success = 'no'
            response.locals.data.successReason = ''
        }
        if (request.query.successNotification === undefined) {
            request.session.data.successNotification = 'no'
            response.locals.data.successNotification = 'no'
        }
        next()
    })

    //onb

    router.post('/v60/sign-in-answer', function(request, response) {

        response.redirect("/v60/overview")
    })

    router.post('/v60/onb/service-lead-answer', function(request, response) {

        response.redirect("/v60/onb/check-details?successNotification=yes&onboardedStatus=Yes")
    })

    router.post('/v60/check-details/case-type-answer', function(request, response) {

        response.redirect("/v60/onb/check-details?successNotification=yes")
    })

    router.post('/v60/check-details/risk-level-answer', function(request, response) {

        response.redirect("/v60/onb/check-details?successNotification=yes")
    })

    router.post('/v60/check-details/pmoc-answer', function(request, response) {

        response.redirect("/v60/onb/check-details?successNotification=yes")
    })

    router.post('/v60/check-details/preferred-name-answer', function(request, response) {

        response.redirect("/v60/onb/check-details?successNotification=yes")
    })

    router.post('/v60/check-details/preferred-contact-times-answer', function(request, response) {

        response.redirect("/v60/onb/check-details?successNotification=yes")
    })

    router.post('/v60/check-details/preferred-correspondence-language-answer', function(request, response) {

        response.redirect("/v60/onb/check-details?successNotification=yes")
    })

    router.post('/v60/check-details/translator-needed-answer', function(request, response) {

        response.redirect("/v60/onb/check-details?successNotification=yes")
    })

    router.post('/v60/check-details/vps-status-answer', function(request, response) {

        response.redirect("/v60/onb/check-details?successNotification=yes")
    })

    // Victim details change pages

    router.post('/v60/victim-details/risk-level-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=risk-level-updated#victim-details")
    })

    router.post('/v60/victim-details/translator-needed-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=translator-needed-updated#victim-details")
    })

    router.post('/v60/victim-details/vps-status-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=vps-status-updated#victim-details")
    })

    router.post('/v60/victim-details/service-answer', function(request, response) {

        request.session.data['serviceLead'] = request.body['serviceLead'] || ''

        response.redirect("/v60/victim?success=yes&successReason=service-updated#victim-details")
    })


    // Victim details - new change routes

    router.post('/v60/victim-details/name-and-title-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=name-and-title-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/preferred-name-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=preferred-name-updated&secondaryNav=victim-details#victim-details")
    })

    

    router.post('/v60/victim-details/date-of-birth-answer', function(request, response) {

        var day = request.body['victimDobDay'] || ''
        var month = request.body['victimDobMonth'] || ''
        var year = request.body['victimDobYear'] || ''
        if (day && month && year) {
            request.session.data['victimDateOfBirth'] = day + '/' + month + '/' + year
        }

        response.redirect("/v60/victim?success=yes&successReason=date-of-birth-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/sex-and-gender-identity-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=sex-and-gender-identity-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/previous-convictions-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=previous-convictions-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/health-conditions-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=health-conditions-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/ethnic-group-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=ethnic-group-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/ethnic-background-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=ethnic-background-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/religion-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=religion-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/categories-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=categories-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/special-measures-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=special-measures-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/wants-to-be-contacted-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=wants-to-be-contacted-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/preferred-correspondence-language-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=preferred-correspondence-language-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/preferred-contact-times-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=preferred-contact-times-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/telephone-numbers-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=telephone-numbers-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/email-address-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=email-address-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/address-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=address-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/victim-rep-name-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=victim-rep-name-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/victim-rep-phone-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=victim-rep-phone-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/victim-rep-email-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=victim-rep-email-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/poa-name-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=poa-name-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/poa-phone-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=poa-phone-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/victim-details/poa-email-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=poa-email-updated&secondaryNav=victim-details#victim-details")
    })

    router.post('/v60/onb/check-details-answer', function(request, response) {

        response.redirect("/v60/onb/next-task?successNotification=false")
    })

    router.post('/v60/onb/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "other") {
            response.redirect("/v60/onb/manual-task")
        } else if (nextTask == "no-task") {
            response.redirect("/v60/onb/check-task?manualTask=no")
        } else if (nextTask == "meeting-offer" || nextTask == "meeting-arranged" || nextTask == "meeting-outcome") {
            response.redirect("/v60/onb/meeting-purpose")
        } else {
            response.redirect("/v60/onb/next-task-due-date")
        }
    })

    router.post('/v60/onb/meeting-purpose-answer', function(request, response) {

        response.redirect("/v60/onb/next-task-due-date")
    })

    router.post('/v60/onb/next-task-due-date-answer', function(request, response) {

        response.redirect("/v60/onb/check-task?manualTask=no")
    })

    router.post('/v60/onb/manual-task-answer', function(request, response) {

        response.redirect("/v60/onb/check-task?manualTask=yes")
    })

    router.post('/v60/onb/check-task-answer', function(request, response) {

        response.redirect("/v60/onb/onboarded")
    })

    router.post('/v60/onb/vlo-answer', function(request, response) {

        // Store vlo in session
        request.session.data['vlo'] = request.body.vlo || ''

        response.redirect("/v60/victims?success=yes&successReason=vlo-updated")
    })

    router.post('/v60/onb/task-assignee-answer', function(request, response) {

        // Store task assignee in session
        request.session.data['task-assignee'] = request.body['task-assignee'] || ''

        response.redirect("/v60/onb/tasks?success=yes&successReason=assignee-updated")
    })

    router.get('/v60/victim/new-task/task-selection', function(request, response) {
        var fromCheck = request.query.fromCheck === 'yes'
        delete request.session.data['fromCheck']
        response.render('v60/victim/new-task/task-selection', {
            fromCheck: fromCheck
        })
    })

    router.post('/v60/victim/new-task/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "dtc") {
            response.redirect("/v60/victim/new-task/task-due-date?pcdType=dtc")
        } else if (nextTask == "nfa") {
            response.redirect("/v60/victim/new-task/task-due-date?pcdType=nfa")
        } else if (nextTask == "stopped-charge") {
            response.redirect("/v60/victim/new-task/task-due-date?vclType=stopped-charge")
        } else if (nextTask == "altered-charge") {
            response.redirect("/v60/victim/new-task/task-due-date?vclType=altered-charge")
        } else if (nextTask == "other") {
            response.redirect("/v60/victim/new-task/manual-task")
        } else if (nextTask == "no-task") {
            response.redirect("/v60/victim/new-task/check-task")
        } else if (nextTask == "meeting-offer" || nextTask == "meeting-arranged" || nextTask == "meeting-outcome") {
            response.redirect("/v60/victim/new-task/meeting-purpose")
        } else {
            response.redirect("/v60/victim/new-task/task-due-date")
        }
    })


    router.post('/ur/bfs/onb/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "dtc") {
            response.redirect("/ur/bfs/onb/new-task/next-task-due-date?pcdType=dtc")
        } else if (nextTask == "nfa") {
            response.redirect("/ur/bfs/onb/new-task/next-task-due-date?pcdType=nfa")
        } else if (nextTask == "stopped-charge") {
            response.redirect("/ur/bfs/onb/new-task/next-task-due-date?vclType=stopped-charge")
        } else if (nextTask == "altered-charge") {
            response.redirect("/ur/bfs/onb/new-task/next-task-due-date?vclType=altered-charge")
        } else if (nextTask == "other") {
            response.redirect("/ur/bfs/onb/new-task/manual-task")
        } else if (nextTask == "no-task") {
            response.redirect("/ur/bfs/onb/new-task/check-task")
        } else if (nextTask == "meeting-offer" || nextTask == "meeting-arranged" || nextTask == "meeting-outcome") {
            response.redirect("/ur/bfs/onb/new-task/meeting-purpose")
        } else {
            response.redirect("/ur/bfs/onb/new-task/task-due-date")
        }
    })

    router.post('/v60/victim/new-task/meeting-purpose-answer', function(request, response) {

        response.redirect("/v60/victim/new-task/task-due-date")
    })

    router.get('/v60/victim/new-task/task-due-date', function(request, response) {
        var fromCheck = request.query.fromCheck === 'yes'
        delete request.session.data['fromCheck']
        response.render('v60/victim/new-task/task-due-date', {
            fromCheck: fromCheck
        })
    })

    router.post('/v60/victim/new-task/task-due-date-answer', function(request, response) {

        response.redirect("/v60/victim/new-task/check-task")
    })

    router.post('/v60/victim/new-task/manual-task-answer', function(request, response) {

        response.redirect("/v60/victim/new-task/check-task?manualTask=yes")
    })


       router.post('/ur/bfs/onb/new-task/manual-task-answer', function(request, response) {

        response.redirect("/ur/bfs/onb/new-task/check-task?manualTask=yes")
    })

    router.post('/v60/victim/new-task/check-task-answer', function(request, response) {

        // Update existing task tracking when a task is confirmed
        request.session.data['existingTask'] = request.session.data['nextTask'] || ''
        request.session.data['existingMeetingPurpose'] = request.session.data['meetingPurpose'] || ''

        response.redirect("/v60/victim/new-task/task-created")
    })

    router.post('/v60/victim/new-task/task-created-answer', function(request, response) {

        response.redirect("/v60/victim/tasks")
    })

    router.post('/v60/task-assignee-answer', function(request, response) {

        // Store task assignee in session
        request.session.data['task-assignee'] = request.body['task-assignee'] || ''

        response.redirect("/v60/tasks?success=yes&successReason=assignee-updated")
    })

    router.post('/v60/change-task-due-date-answer', function(request, response) {
        
        response.redirect("/v60/tasks?success=yes&successReason=due-date-updated")
    })

    router.post('/v60/change-service-answer', function(request, response) {

        request.session.data['serviceLead'] = request.body['serviceLead'] || ''

        response.redirect("/v60/victims?success=yes&successReason=service-updated")
    })

    router.post('/v60/update-manual-task-answer', function(request, response) {

        // Store task action in session
        request.session.data['taskAction'] = request.body['taskAction'] || ''

        if (request.body['taskAction'] === 'complete') {
            response.redirect("/v60/tasks?success=yes&successReason=manual-task-completed")
        } else {
            response.redirect("/v60/tasks")
        }
    })

    //pcd

    router.post('/v60/pcd/sign-in-answer', function(request, response) {

        response.redirect("/v60/pcd/overview")
    })

    router.get('/v60/pcd/pre-draft/check-details-answer', function(request, response) {

        response.redirect("/v60/pcd/pre-draft/contacted-by?pcdStatus=log-not-started")
    })

    router.post('/v60/pcd/pre-draft/contacted-by-answer', function(request, response) {

        var contactedBy = request.session.data['contactedBy']

        if (contactedBy == "call") {
            response.redirect("/v60/pcd/call/phone-call-1")
        } else if (contactedBy == "email") {
            response.redirect("/v60/pcd/send/email-details")
        } else if (contactedBy == "post") {
            response.redirect("/v60/pcd/send/letter-details")
        } else if (contactedBy == "not-contacted") {
            response.redirect("/v60/pcd/pre-draft/not-contacted-reason")
        } else {
            response.redirect("/v60/pcd/pre-draft/contact-details?contactMethod=other")
        }
    })

    router.post('/v60/pcd/pre-draft/not-contacted-reason-answer', function(request, response) {

        response.redirect("/v60/victim?secondaryNav=pcd&pcdStatus=not-contacted-logged&success=yes&successReason=not-contacted-logged#communications")
    })

    router.post('/v60/pcd/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/v60/pcd/draft/under-review?pcdStatus=draft-under-review")
    })

    router.post('/v60/pcd/call/phone-call-1-answer', function(request, response) {

        var pcdVictimInformed1 = request.session.data['pcdVictimInformed1']

        if (pcdVictimInformed1 == "Yes"){
            response.redirect("/v60/pcd/call/follow-up-moc?pcdStatus=select-fumoc&pcdCallAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/v60/pcd/call/was-text-message-sent?pcdStatus=before-text-logged&pcdCallAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/v60/pcd/call/was-text-message-sent-answer', function(request, response) {

        var pcdWasTextMessageSent = request.session.data['pcdWasTextMessageSent']

        if (pcdWasTextMessageSent == "Yes"){
            response.redirect("/v60/pcd/call/text-message-details")
        } else {
            response.redirect("/v60/victim?pmoc=mobile&pcdStatus=after-call-attempt-1&secondaryNav=pcd")
        }
    })

    router.post('/v60/pcd/call/text-message-details-answer', function(request, response) {

        response.redirect("/v60/victim?pcdStatus=after-call-attempt-1&secondaryNav=pcd")
    })

    router.post('/v60/pcd/call/next-attempt-moc-answer', function(request, response) {

        var pcdAttemptToContactAgain = request.session.data['pcdAttemptToContactAgain']
        var pcdCallAttempt = request.session.data['pcdCallAttempt']

        if (pcdAttemptToContactAgain == "call") {
            if (pcdCallAttempt == "1") {
                response.redirect("/v60/pcd/call/phone-call-2")
            } else {
                response.redirect("/v60/pcd/call/phone-call-3")
            }

        } else if (pcdAttemptToContactAgain == "email") {
            if (pcdCallAttempt == "1") {
                response.redirect("/v60/pcd/send/email-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v60/pcd/send/email-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            } else {
                response.redirect("/v60/pcd/send/email-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            }
            
        } else {
            response.redirect("/v60/pcd/send/letter-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=post&secondaryNav=pcd")
        }
    })

    router.post('/v60/pcd/call/phone-call-2-answer', function(request, response) {

        var pcdVictimInformed2 = request.session.data['pcdVictimInformed2']
        if (pcdVictimInformed2 == "Yes"){
            response.redirect("/v60/pcd/call/follow-up-moc?pcdStatus=select-fumoc&pcdCallAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/v60/victim?pcdStatus=after-call-attempt-2&pcdCallAttempt=2&success=yes&successReason=not-informed-after-call-2&secondaryNav=pcd")
        }
    })

    router.post('/v60/pcd/call/follow-up-moc-answer', function(request, response) {

        var pcdFumoc = request.session.data['pcdFumoc']
        var pcdCallAttempt = request.session.data['pcdCallAttempt']

        if (pcdFumoc == "Email"){
            if (pcdCallAttempt == "1") {
                response.redirect("/v60/pcd/send/email-details?pcdStatus=informed-after-call-1&pcdFumoc=Email&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v60/pcd/send/email-details?pcdStatus=informed-after-call-2&pcdFumoc=Email&secondaryNav=pcd")
            } else {
                response.redirect("/v60/pcd/send/email-details?pcdStatus=informed-after-call-3&pcdFumoc=Email&secondaryNav=pcd")
            }

        } else if (pcdFumoc == "Post") {
            if (pcdCallAttempt == "1") {
                response.redirect("/v60/pcd/send/letter-details?pcdStatus=informed-after-call-1&pcdFumoc=Post&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v60/pcd/send/letter-details?pcdStatus=informed-after-call-2&pcdFumoc=Post&secondaryNav=pcd")
            } else {
                response.redirect("/v60/pcd/send/letter-details?pcdStatus=informed-after-call-3&pcdFumoc=Post&secondaryNav=pcd")
            }

        } else {
            if (pcdCallAttempt == "1") {
                response.redirect("/v60/victim?pcdStatus=informed-after-call-1&pcdFumoc=None&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v60/victim?pcdStatus=informed-after-call-2&pcdFumoc=None&secondaryNav=pcd")
            } else {
                response.redirect("/v60/victim?pcdStatus=informed-after-call-3&pcdFumoc=None&secondaryNav=pcd")
            }
        }
    })

    router.post('/v60/pcd/call/phone-call-3-answer', function(request, response) {

        var pcdVictimInformed3 = request.session.data['pcdVictimInformed3']

        if (pcdVictimInformed3 == "Yes"){
            response.redirect("/v60/pcd/call/follow-up-moc?pcdStatus=select-fumoc&pcdCallAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/v60/victim?pcdStatus=after-call-attempt-3&pcdCallAttempt=3&success=yes&successReason=not-informed-after-call-3&secondaryNav=pcd")
        }
    })

    router.post('/v60/pcd/send/email-details-answer', function(request, response) {

        response.redirect("/v60/pcd/send/email-logged")
    })

    router.post('/v60/pcd/send/letter-details-answer', function(request, response) {

        response.redirect("/v60/pcd/send/letter-logged")
    })

    router.post('/v60/pcd/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=pmoc-updated#victim-details")
    })

    //vcl

    router.post('/v60/vcl/pre-draft/contacted-by-answer', function(request, response) {

        var contactedBy = request.session.data['contactedBy']

        if (contactedBy == "call") {
            response.redirect("/v60/vcl/call/phone-call-1")
        } else if (contactedBy == "email") {
            response.redirect("/v60/vcl/send/email-details")
        } else if (contactedBy == "post") {
            response.redirect("/v60/vcl/send/letter-details")
        } else {
            response.redirect("/v60/vcl/pre-draft/contact-details?contactMethod=other")
        }
    })

    router.get('/v60/vcl/pre-draft/check-details-answer', function(request, response) {

        var vclType = request.session.data['vclType']

        if (vclType == "stopped-charge") {
            response.redirect("/v60/vcl/draft/stopped-charge")
        } else {
            response.redirect("/v60/vcl/draft/substantially-altered-charge")
        }
    })

    router.post('/v60/vcl/draft/stopped-charge-answer', function(request, response) {

        response.redirect("/v60/vcl/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/v60/vcl/draft/altered-charge-answer', function(request, response) {

        response.redirect("/v60/vcl/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/v60/vcl/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/v60/vcl/draft/under-review?vclStatus=draft-under-review")
    })

    router.post('/v60/vcl/call/phone-call-1-answer', function(request, response) {

        var vclVictimInformed1 = request.session.data['vclVictimInformed1']

        if (vclVictimInformed1 == "Yes"){
            response.redirect("/v60/vcl/call/follow-up-moc?vclStatus=select-fumoc&vclCallAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/v60/vcl/call/was-text-message-sent?vclStatus=before-text-logged&vclCallAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/v60/vcl/call/was-text-message-sent-answer', function(request, response) {

        var vclWasTextMessageSent = request.session.data['vclWasTextMessageSent']

        if (vclWasTextMessageSent == "Yes"){
            response.redirect("/v60/vcl/call/text-message-details")
        } else {
            response.redirect("/v60/victim?pmoc=mobile&vclStatus=after-call-attempt-1&secondaryNav=vcl")
        }
    })

    router.post('/v60/vcl/call/text-message-details-answer', function(request, response) {

        response.redirect("/v60/victim?vclStatus=after-call-attempt-1&secondaryNav=vcl")
    })

    router.post('/v60/vcl/call/next-attempt-moc-answer', function(request, response) {

        var vclAttemptToContactAgain = request.session.data['vclAttemptToContactAgain']
        var vclCallAttempt = request.session.data['vclCallAttempt']

        if (vclAttemptToContactAgain == "call") {
            if (vclCallAttempt == "1") {
                response.redirect("/v60/vcl/call/phone-call-2")
            } else {
                response.redirect("/v60/vcl/call/phone-call-3")
            }

        } else if (vclAttemptToContactAgain == "email") {
            if (vclCallAttempt == "1") {
                response.redirect("/v60/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=email&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/v60/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=email&secondaryNav=vcl")
            } else {
                response.redirect("/v60/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=email&secondaryNav=vcl")
            }
            
        } else {
            response.redirect("/v60/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=post&secondaryNav=vcl")
        }
    })

    router.post('/v60/vcl/call/phone-call-2-answer', function(request, response) {

        var vclVictimInformed2 = request.session.data['vclVictimInformed2']

        if (vclVictimInformed2 == "Yes"){
            response.redirect("/v60/vcl/call/follow-up-moc?vclStatus=select-fumoc&vclCallAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/v60/victim?vclStatus=after-call-attempt-2&vclCallAttempt=2&success=yes&successReason=not-informed-after-call-2&secondaryNav=vcl")
        }
    })

    router.post('/v60/vcl/call/follow-up-moc-answer', function(request, response) {

        var vclFumoc = request.session.data['vclFumoc']
        var vclCallAttempt = request.session.data['vclCallAttempt']

        if (vclFumoc == "Email"){
            if (vclCallAttempt == "1") {
                response.redirect("/v60/vcl/send/email-details?vclStatus=informed-after-call-1&vclFumoc=Email&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/v60/vcl/send/email-details?vclStatus=informed-after-call-2&vclFumoc=Email&secondaryNav=vcl")
            } else {
                response.redirect("/v60/vcl/send/email-details?vclStatus=informed-after-call-3&vclFumoc=Email&secondaryNav=vcl")
            }

        } else if (vclFumoc == "Post") {
            if (vclCallAttempt == "1") {
                response.redirect("/v60/vcl/send/letter-details?vclStatus=informed-after-call-1&vclFumoc=Post&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/v60/vcl/send/letter-details?vclStatus=informed-after-call-2&vclFumoc=Post&secondaryNav=vcl")
            } else {
                response.redirect("/v60/vcl/send/letter-details?vclStatus=informed-after-call-3&vclFumoc=Post&secondaryNav=vcl")
            }

        } else {
            if (vclCallAttempt == "1") {
                response.redirect("/v60/victim?vclStatus=informed-after-call-1&vclFumoc=None&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/v60/victim?vclStatus=informed-after-call-2&vclFumoc=None&secondaryNav=vcl")
            } else {
                response.redirect("/v60/victim?vclStatus=informed-after-call-3&vclFumoc=None&secondaryNav=vcl")
            }
        }
    })

    router.post('/v60/vcl/call/phone-call-3-answer', function(request, response) {

        var vclVictimInformed3 = request.session.data['vclVictimInformed3']

        if (vclVictimInformed3 == "Yes"){
            response.redirect("/v60/vcl/call/follow-up-moc?vclCallAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/v60/victim?vclStatus=after-call-attempt-3&vclCallAttempt=3&success=yes&successReason=not-informed-after-call-3&secondaryNav=vcl")
        }
    })

    router.post('/v60/vcl/send/check-email-details-answer', function(request, response) {

        var sendEmailNow = request.session.data['sendEmailNow']

        if (sendEmailNow == "Yes"){
            response.redirect("/v60/vcl/send/delivered")
        } else {
            response.redirect("/v60/victim?vclStatus=approved-to-send&pmoc=mobile&vclFumoc=email&secondaryNav=vcl")
        }
    })

    router.post('/v60/vcl/send/check-letter-details-answer', function(request, response) {

        response.redirect("/v60/vcl/send/letter-added-to-print-queue")
    })

    router.post('/v60/vcl/send/email-details-answer', function(request, response) {

        response.redirect("/v60/vcl/send/email-logged")
    })

    router.post('/v60/vcl/send/letter-details-answer', function(request, response) {

        response.redirect("/v60/vcl/send/letter-logged")
    })

    router.post('/v60/vcl/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/v60/victim?success=yes&successReason=pmoc-updated#victim-details")
    })

    // Other

    router.post('/v60/other/contacted-by-answer', function(request, response) {

        var contactedBy = request.session.data['contactedBy']

        if (contactedBy == "call") {
            response.redirect("/v60/other/telephone-call")
        } else if (contactedBy == "email") {
            response.redirect("/v60/other/email-details")
        } else if (contactedBy == "post") {
            response.redirect("/v60/other/letter-details")
        } else if (contactedBy == "text") {
            response.redirect("/v60/other/text-message")
        } else if (contactedBy == "in-person") {
            response.redirect("/v60/other/in-person")
        } else if (contactedBy == "other") {
            response.redirect("/v60/other/other")
        } else {
            response.redirect("/v60/other/contact-details?contactMethod=other")
        }
    })

    router.post('/v60/other/telephone-call-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'call',
            sortDate: toSortDate(request.session.data['otherCallDate'], request.session.data['otherCallHour'], request.session.data['otherCallMinutes']),
            otherCallDate: request.session.data['otherCallDate'],
            otherCallHour: request.session.data['otherCallHour'],
            otherCallMinutes: request.session.data['otherCallMinutes'],
            otherCallType: request.session.data['otherCallType'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v60/other/call-logged")
    })

    router.post('/v60/other/email-details-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'email',
            sortDate: toSortDate(request.session.data['otherEmailDate'], request.session.data['otherEmailHour'], request.session.data['otherEmailMinutes']),
            otherEmailDate: request.session.data['otherEmailDate'],
            otherEmailHour: request.session.data['otherEmailHour'],
            otherEmailMinutes: request.session.data['otherEmailMinutes'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v60/other/email-logged")
    })

    router.post('/v60/other/letter-details-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'post',
            sortDate: toSortDate(request.session.data['otherLetterDate'], request.session.data['otherLetterHour'], request.session.data['otherLetterMinutes']),
            otherLetterDate: request.session.data['otherLetterDate'],
            otherLetterHour: request.session.data['otherLetterHour'],
            otherLetterMinutes: request.session.data['otherLetterMinutes'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v60/other/letter-logged")
    })
    
    router.post('/v60/other/text-message-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'text',
            sortDate: toSortDate(request.session.data['otherTextMessageDate'], request.session.data['otherTextMessageHour'], request.session.data['otherTextMessageMinutes']),
            otherTextMessageDate: request.session.data['otherTextMessageDate'],
            otherTextMessageHour: request.session.data['otherTextMessageHour'],
            otherTextMessageMinutes: request.session.data['otherTextMessageMinutes'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v60/other/text-message-logged")
    })

    router.post('/v60/other/in-person-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'in-person',
            sortDate: toSortDate(request.session.data['otherInPersonDate'], request.session.data['otherInPersonHour'], request.session.data['otherInPersonMinutes']),
            otherInPersonDate: request.session.data['otherInPersonDate'],
            otherInPersonHour: request.session.data['otherInPersonHour'],
            otherInPersonMinutes: request.session.data['otherInPersonMinutes'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v60/other/in-person-logged")
    })

    router.post('/v60/other/other-details-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'other',
            otherContactMethod: request.session.data['otherContactMethod'],
            sortDate: toSortDate(request.session.data['otherCommsDate'], request.session.data['otherCommsHour'], request.session.data['otherCommsMinutes']),
            otherCommsDate: request.session.data['otherCommsDate'],
            otherCommsHour: request.session.data['otherCommsHour'],
            otherCommsMinutes: request.session.data['otherCommsMinutes'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v60/other/other-logged")
    })

}