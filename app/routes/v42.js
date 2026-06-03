module.exports = router => {

    //onb

    router.post('/v42/sign-in-answer', function(request, response) {

        response.redirect("/v42/overview")
    })

    router.post('/v42/onb/service-lead-answer', function(request, response) {

        response.redirect("/v42/onb/check-details?successNotification=yes&onboardedStatus=Yes")
    })

    router.post('/v42/check-details/case-type-answer', function(request, response) {

        response.redirect("/v42/onb/check-details?successNotification=yes")
    })

    router.post('/v42/check-details/risk-level-answer', function(request, response) {

        response.redirect("/v42/onb/check-details?successNotification=yes")
    })

    router.post('/v42/check-details/pmoc-answer', function(request, response) {

        response.redirect("/v42/onb/check-details?successNotification=yes")
    })

    router.post('/v42/check-details/preferred-name-answer', function(request, response) {

        response.redirect("/v42/onb/check-details?successNotification=yes")
    })

    router.post('/v42/check-details/preferred-contact-times-answer', function(request, response) {

        response.redirect("/v42/onb/check-details?successNotification=yes")
    })

    router.post('/v42/check-details/preferred-correspondence-language-answer', function(request, response) {

        response.redirect("/v42/onb/check-details?successNotification=yes")
    })

    router.post('/v42/check-details/translator-needed-answer', function(request, response) {

        response.redirect("/v42/onb/check-details?successNotification=yes")
    })

    router.post('/v42/check-details/vps-status-answer', function(request, response) {

        response.redirect("/v42/onb/check-details?successNotification=yes")
    })

    router.post('/v42/onb/check-details-answer', function(request, response) {

        response.redirect("/v42/onb/next-task?successNotification=false")
    })

    router.post('/v42/onb/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "Other") {
            response.redirect("/v42/onb/manual-task")
        } else if (nextTask == "No task at this time") {
            response.redirect("/v42/onb/check-task?manualTask=no")
        } else {
            response.redirect("/v42/onb/next-task-due-date")
        }
    })

    router.post('/v42/onb/next-task-due-date-answer', function(request, response) {

        response.redirect("/v42/onb/check-task?manualTask=no")
    })

    router.post('/v42/onb/manual-task-answer', function(request, response) {

        response.redirect("/v42/onb/check-task?manualTask=yes")
    })

    router.post('/v42/onb/check-task-answer', function(request, response) {

        response.redirect("/v42/onb/onboarded")
    })

    router.post('/v42/onb/vlo-answer', function(request, response) {

        // Store vlo in session
        request.session.data['vlo'] = request.body.vlo || ''

        response.redirect("/v42/victims?success=yes&successReason=vlo-updated")
    })

    router.post('/v42/onb/task-assignee-answer', function(request, response) {

        // Store task assignee in session
        request.session.data['task-assignee'] = request.body['task-assignee'] || ''

        response.redirect("/v42/onb/tasks?success=yes&successReason=assignee-updated")
    })

    router.post('/v42/victim/new-task/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "Other") {
            response.redirect("/v42/victim/new-task/manual-task")
        } else if (nextTask == "No task at this time") {
            response.redirect("/v42/victim/new-task/check-task")
        } else {
            response.redirect("/v42/victim/new-task/task-due-date")
        }
    })

    router.post('/v42/victim/new-task/task-due-date-answer', function(request, response) {

        response.redirect("/v42/victim/new-task/check-task")
    })

    router.post('/v42/victim/new-task/manual-task-answer', function(request, response) {

        response.redirect("/v42/victim/new-task/check-task?manualTask=yes")
    })

    router.post('/v42/victim/new-task/check-task-answer', function(request, response) {

        response.redirect("/v42/victim/new-task/task-created")
    })

    router.post('/v42/victim/new-task/task-created-answer', function(request, response) {

        response.redirect("/v42/victim/tasks")
    })

    router.post('/v42/task-assignee-answer', function(request, response) {

        // Store task assignee in session
        request.session.data['task-assignee'] = request.body['task-assignee'] || ''

        response.redirect("/v42/tasks?success=yes&successReason=assignee-updated")
    })

    router.post('/v42/change-task-due-date-answer', function(request, response) {
        
        response.redirect("/v42/tasks?success=yes&successReason=due-date-updated")
    })

    //pcd

    router.post('/v42/pcd/sign-in-answer', function(request, response) {

        response.redirect("/v42/pcd/overview")
    })

    router.get('/v42/pcd/pre-draft/check-details-answer', function(request, response) {

        response.redirect("/v42/pcd/draft/compose-letter?pcdStatus=draft-in-progress")
    })

    router.post('/v42/pcd/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/v42/pcd/draft/under-review?pcdStatus=draft-under-review")
    })

    router.post('/v42/pcd/call/phone-call-1-answer', function(request, response) {

        var pcdVictimInformed1 = request.session.data['pcdVictimInformed1']

        if (pcdVictimInformed1 == "Yes"){
            response.redirect("/v42/pcd/call/follow-up-moc?pcdCallAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/v42/pcd/call/was-text-message-sent?pcdCallAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/v42/pcd/call/was-text-message-sent-answer', function(request, response) {

        var pcdWasTextMessageSent = request.session.data['pcdWasTextMessageSent']

        if (pcdWasTextMessageSent == "Yes"){
            response.redirect("/v42/pcd/call/text-message-details")
        } else {
            response.redirect("/v42/victim?pmoc=mobile&pcdStatus=after-call-attempt-1&secondaryNav=pcd")
        }
    })

    router.post('/v42/pcd/call/text-message-details-answer', function(request, response) {

        response.redirect("/v42/victim?pcdStatus=after-call-attempt-1&secondaryNav=pcd")
    })

    router.post('/v42/pcd/call/next-attempt-moc-answer', function(request, response) {

        var pcdAttemptToContactAgain = request.session.data['pcdAttemptToContactAgain']
        var pcdCallAttempt = request.session.data['pcdCallAttempt']

        if (pcdAttemptToContactAgain == "call") {
            if (pcdCallAttempt == "1") {
                response.redirect("/v42/pcd/call/phone-call-2")
            } else {
                response.redirect("/v42/pcd/call/phone-call-3")
            }

        } else if (pcdAttemptToContactAgain == "email") {
            if (pcdCallAttempt == "1") {
                response.redirect("/v42/victim?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v42/victim?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            } else {
                response.redirect("/v42/victim?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            }
            
        } else {
            response.redirect("/v42/victim?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=post&secondaryNav=pcd")
        }
    })

    router.post('/v42/pcd/call/phone-call-2-answer', function(request, response) {

        var pcdVictimInformed2 = request.session.data['pcdVictimInformed2']
        if (pcdVictimInformed2 == "Yes"){
            response.redirect("/v42/pcd/call/follow-up-moc?pcdCallAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/v42/victim?pcdStatus=after-call-attempt-2&pcdCallAttempt=2&success=yes&successReason=not-informed-after-call-2&secondaryNav=pcd")
        }
    })

    router.post('/v42/pcd/call/follow-up-moc-answer', function(request, response) {

        var pcdFumoc = request.session.data['pcdFumoc']
        var pcdCallAttempt = request.session.data['pcdCallAttempt']

        if (pcdFumoc == "Email"){
            if (pcdCallAttempt == "1") {
                response.redirect("/v42/victim?pcdStatus=informed-after-call-1&pcdFumoc=email&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v42/victim?pcdStatus=informed-after-call-2&pcdFumoc=email&secondaryNav=pcd")
            } else {
                response.redirect("/v42/victim?pcdStatus=informed-after-call-3&pcdFumoc=email&secondaryNav=pcd")
            }

        } else if (pcdFumoc == "Post") {
            if (pcdCallAttempt == "1") {
                response.redirect("/v42/victim?pcdStatus=informed-after-call-1&pcdFumoc=post&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v42/victim?pcdStatus=informed-after-call-2&pcdFumoc=post&secondaryNav=pcd")
            } else {
                response.redirect("/v42/victim?pcdStatus=informed-after-call-3&pcdFumoc=post&secondaryNav=pcd")
            }

        } else {
            if (pcdCallAttempt == "1") {
                response.redirect("/v42/victim?pcdStatus=informed-after-call-1&pcdFumoc=none&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v42/victim?pcdStatus=informed-after-call-2&pcdFumoc=none&secondaryNav=pcd")
            } else {
                response.redirect("/v42/victim?pcdStatus=informed-after-call-3&pcdFumoc=none&secondaryNav=pcd")
            }
        }
    })

    router.post('/v42/pcd/call/phone-call-3-answer', function(request, response) {

        var pcdVictimInformed3 = request.session.data['pcdVictimInformed3']

        if (pcdVictimInformed3 == "Yes"){
            response.redirect("/v42/pcd/call/follow-up-moc?pcdCallAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/v42/victim?pcdStatus=after-call-attempt-3&pcdCallAttempt=3&success=yes&successReason=not-informed-after-call-3&secondaryNav=pcd")
        }
    })

    router.post('/v42/pcd/send/check-email-details-answer', function(request, response) {

        var sendEmailNow = request.session.data['sendEmailNow']

        if (sendEmailNow == "Yes"){
            response.redirect("/v42/pcd/send/delivered")
        } else {
            response.redirect("/v42/victim?pcdStatus=approved-to-send&pmoc=mobile&pcdFumoc=email&secondaryNav=pcd")
        }
    })

    router.post('/v42/pcd/send/check-letter-details-answer', function(request, response) {

        response.redirect("/v42/pcd/send/letter-added-to-print-queue")
    })

    router.post('/v42/pcd/send/letter-details-answer', function(request, response) {

        response.redirect("/v42/pcd/send/letter-logged")
    })

    router.post('/v42/pcd/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/v42/victim?success=yes&successReason=pmoc-updated#victim-details")
    })

    //vcl

    router.get('/v42/vcl/pre-draft/check-details-answer', function(request, response) {

        var vclType = request.session.data['vclType']

        if (vclType == "stopped-charge") {
            response.redirect("/v42/vcl/draft/stopped-charge")
        } else {
            response.redirect("/v42/vcl/draft/substantially-altered-charge")
        }
    })

    router.post('/v42/vcl/draft/stopped-charge-answer', function(request, response) {

        response.redirect("/v42/vcl/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/v42/vcl/draft/altered-charge-answer', function(request, response) {

        response.redirect("/v42/vcl/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/v42/vcl/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/v42/vcl/draft/under-review?vclStatus=draft-under-review")
    })

    router.post('/v42/vcl/call/phone-call-1-answer', function(request, response) {

        var vclVictimInformed1 = request.session.data['vclVictimInformed1']

        if (vclVictimInformed1 == "Yes"){
            response.redirect("/v42/vcl/call/follow-up-moc?vclCallAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/v42/vcl/call/was-text-message-sent?vclCallAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/v42/vcl/call/was-text-message-sent-answer', function(request, response) {

        var vclWasTextMessageSent = request.session.data['vclWasTextMessageSent']

        if (vclWasTextMessageSent == "Yes"){
            response.redirect("/v42/vcl/call/text-message-details")
        } else {
            response.redirect("/v42/victim?pmoc=mobile&vclStatus=after-call-attempt-1&secondaryNav=vcl")
        }
    })

    router.post('/v42/vcl/call/text-message-details-answer', function(request, response) {

        response.redirect("/v42/victim?vclStatus=after-call-attempt-1&secondaryNav=vcl")
    })

    router.post('/v42/vcl/call/next-attempt-moc-answer', function(request, response) {

        var vclAttemptToContactAgain = request.session.data['vclAttemptToContactAgain']
        var vclCallAttempt = request.session.data['vclCallAttempt']

        if (vclAttemptToContactAgain == "call") {
            if (vclCallAttempt == "1") {
                response.redirect("/v42/vcl/call/phone-call-2")
            } else {
                response.redirect("/v42/vcl/call/phone-call-3")
            }

        } else if (vclAttemptToContactAgain == "email") {
            if (vclCallAttempt == "1") {
                response.redirect("/v42/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=email&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/v42/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=email&secondaryNav=vcl")
            } else {
                response.redirect("/v42/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=email&secondaryNav=vcl")
            }
            
        } else {
            response.redirect("/v42/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=post&secondaryNav=vcl")
        }
    })

    router.post('/v42/vcl/call/phone-call-2-answer', function(request, response) {

        var vclVictimInformed2 = request.session.data['vclVictimInformed2']

        if (vclVictimInformed2 == "Yes"){
            response.redirect("/v42/vcl/call/follow-up-moc?vclCallAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/v42/victim?vclStatus=after-call-attempt-2&vclCallAttempt=2&success=yes&successReason=not-informed-after-call-2&secondaryNav=vcl")
        }
    })

    router.post('/v42/vcl/call/follow-up-moc-answer', function(request, response) {

        var vclFumoc = request.session.data['vclFumoc']
        var vclCallAttempt = request.session.data['vclCallAttempt']

        if (vclFumoc == "email"){
            if (vclCallAttempt == "1") {
                response.redirect("/v42/victim?vclStatus=informed-after-call-1&vclFumoc=email&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/v42/victim?vclStatus=informed-after-call-2&vclFumoc=email&secondaryNav=vcl")
            } else {
                response.redirect("/v42/victim?vclStatus=informed-after-call-3&vclFumoc=email&secondaryNav=vcl")
            }

        } else if (vclFumoc == "post") {
            if (vclCallAttempt == "1") {
                response.redirect("/v42/victim?vclStatus=informed-after-call-1&vclFumoc=post&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/v42/victim?vclStatus=informed-after-call-2&vclFumoc=post&secondaryNav=vcl")
            } else {
                response.redirect("/v42/victim?vclStatus=informed-after-call-3&vclFumoc=post&secondaryNav=vcl")
            }

        } else {
            if (vclCallAttempt == "1") {
                response.redirect("/v42/victim?vclStatus=informed-after-call-1&vclFumoc=none&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/v42/victim?vclStatus=informed-after-call-2&vclFumoc=none&secondaryNav=vcl")
            } else {
                response.redirect("/v42/victim?vclStatus=informed-after-call-3&vclFumoc=none&secondaryNav=vcl")
            }
        }
    })

    router.post('/v42/vcl/call/phone-call-3-answer', function(request, response) {

        var vclVictimInformed3 = request.session.data['vclVictimInformed3']

        if (vclVictimInformed3 == "Yes"){
            response.redirect("/v42/vcl/call/follow-up-moc?vclCallAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/v42/victim?vclStatus=after-call-attempt-3&vclCallAttempt=3&success=yes&successReason=not-informed-after-call-3&secondaryNav=vcl")
        }
    })

    router.post('/v42/vcl/send/check-email-details-answer', function(request, response) {

        var sendEmailNow = request.session.data['sendEmailNow']

        if (sendEmailNow == "Yes"){
            response.redirect("/v42/vcl/send/delivered")
        } else {
            response.redirect("/v42/victim?vclStatus=approved-to-send&pmoc=mobile&vclFumoc=email&secondaryNav=vcl")
        }
    })

    router.post('/v42/vcl/send/check-letter-details-answer', function(request, response) {

        response.redirect("/v42/vcl/send/letter-added-to-print-queue")
    })

    router.post('/v42/vcl/send/letter-details-answer', function(request, response) {

        response.redirect("/v42/vcl/send/letter-logged")
    })

    router.post('/v42/vcl/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/v42/victim?success=yes&successReason=pmoc-updated#victim-details")
    })

}