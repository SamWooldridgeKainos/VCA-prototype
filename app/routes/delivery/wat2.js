module.exports = router => {

    //onb

    router.post('/delivery/wat2/sign-in-answer', function(request, response) {

        response.redirect("/delivery/wat2/overview")
    })

    router.post('/delivery/wat2/onb/service-lead-answer', function(request, response) {

        response.redirect("/delivery/wat2/onb/next-task")
    })

    router.post('/delivery/wat2/onb/next-task-answer', function(request, response) {

        response.redirect("/delivery/wat2/onb/check-details")
    })

    router.post('/delivery/wat2/onb/pmoc-answer', function(request, response) {

        response.redirect("/delivery/wat2/onb/check-details")
    })

    router.post('/delivery/wat2/onb/check-details-answer', function(request, response) {

        response.redirect("/delivery/wat2/onb/onboarded?onboardedStatus=Yes")
    })

    //pcd

    router.post('/delivery/wat2/pcd/sign-in-answer', function(request, response) {

        response.redirect("/delivery/wat2/pcd/overview")
    })

    router.get('/delivery/wat2/pcd/pre-draft/check-details-answer', function(request, response) {

        response.redirect("/delivery/wat2/pcd/draft/compose-letter?pcdStatus=draft-in-progress")
    })

    router.post('/delivery/wat2/pcd/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/delivery/wat2/pcd/draft/under-review?pcdStatus=draft-under-review")
    })

    router.post('/delivery/wat2/pcd/call/phone-call-1-answer', function(request, response) {

        var victimInformed1 = request.session.data['victimInformed1']

        if (victimInformed1 == "Yes"){
            response.redirect("/delivery/wat2/pcd/call/follow-up-moc?callAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/delivery/wat2/pcd/call/was-text-message-sent?callAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/delivery/wat2/pcd/call/was-text-message-sent-answer', function(request, response) {

        var wasTextMessageSent = request.session.data['wasTextMessageSent']

        if (wasTextMessageSent == "Yes"){
            response.redirect("/delivery/wat2/pcd/call/text-message-details")
        } else {
            response.redirect("/delivery/wat2/victim?pmoc=mobile&pcdStatus=after-call-attempt-1&secondaryNav=pcd")
        }
    })

    router.post('/delivery/wat2/pcd/call/text-message-details-answer', function(request, response) {

        response.redirect("/delivery/wat2/victim?pcdStatus=after-call-attempt-1&secondaryNav=pcd")
    })

    router.post('/delivery/wat2/pcd/call/next-attempt-moc-answer', function(request, response) {

        var attemptToContactAgain = request.session.data['attemptToContactAgain']
        var callAttempt = request.session.data['callAttempt']

        if (attemptToContactAgain == "call") {
            if (callAttempt == "1") {
                response.redirect("/delivery/wat2/pcd/call/phone-call-2")
            } else {
                response.redirect("/delivery/wat2/pcd/call/phone-call-3")
            }

        } else if (attemptToContactAgain == "email") {
            if (callAttempt == "1") {
                response.redirect("/delivery/wat2/victim?pcdStatus=draft-ready-to-send&attemptToContactAgain=email&secondaryNav=pcd")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/wat2/victim?pcdStatus=draft-ready-to-send&attemptToContactAgain=email&secondaryNav=pcd")
            } else {
                response.redirect("/delivery/wat2/victim?pcdStatus=draft-ready-to-send&attemptToContactAgain=email&secondaryNav=pcd")
            }
            
        } else {
            response.redirect("/delivery/wat2/victim?pcdStatus=draft-ready-to-send&attemptToContactAgain=post&secondaryNav=pcd")
        }
    })

    router.post('/delivery/wat2/pcd/call/phone-call-2-answer', function(request, response) {

        var victimInformed2 = request.session.data['victimInformed2']
        if (victimInformed2 == "Yes"){
            response.redirect("/delivery/wat2/pcd/call/follow-up-moc?callAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/delivery/wat2/victim?pcdStatus=after-call-attempt-2&callAttempt=2&success=yes&successReason=not-informed-after-call-2&secondaryNav=pcd")
        }
    })

    router.post('/delivery/wat2/pcd/call/follow-up-moc-answer', function(request, response) {

        var fumoc = request.session.data['fumoc']
        var callAttempt = request.session.data['callAttempt']

        if (fumoc == "Email"){
            if (callAttempt == "1") {
                response.redirect("/delivery/wat2/victim?pcdStatus=informed-after-call-1&fumoc=email&secondaryNav=pcd")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/wat2/victim?pcdStatus=informed-after-call-2&fumoc=email&secondaryNav=pcd")
            } else {
                response.redirect("/delivery/wat2/victim?pcdStatus=informed-after-call-3&fumoc=email&secondaryNav=pcd")
            }

        } else if (fumoc == "Post") {
            if (callAttempt == "1") {
                response.redirect("/delivery/wat2/victim?pcdStatus=informed-after-call-1&fumoc=post&secondaryNav=pcd")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/wat2/victim?pcdStatus=informed-after-call-2&fumoc=post&secondaryNav=pcd")
            } else {
                response.redirect("/delivery/wat2/victim?pcdStatus=informed-after-call-3&fumoc=post&secondaryNav=pcd")
            }

        } else {
            if (callAttempt == "1") {
                response.redirect("/delivery/wat2/victim?pcdStatus=informed-after-call-1&fumoc=none&secondaryNav=pcd")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/wat2/victim?pcdStatus=informed-after-call-2&fumoc=none&secondaryNav=pcd")
            } else {
                response.redirect("/delivery/wat2/victim?pcdStatus=informed-after-call-3&fumoc=none&secondaryNav=pcd")
            }
        }
    })

    router.post('/delivery/wat2/pcd/call/phone-call-3-answer', function(request, response) {

        var victimInformed3 = request.session.data['victimInformed3']

        if (victimInformed3 == "Yes"){
            response.redirect("/delivery/wat2/pcd/call/follow-up-moc?callAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/delivery/wat2/victim?pcdStatus=after-call-attempt-3&callAttempt=3&success=yes&successReason=not-informed-after-call-3&secondaryNav=pcd")
        }
    })

    router.post('/delivery/wat2/pcd/send/check-email-details-answer', function(request, response) {

        var sendEmailNow = request.session.data['sendEmailNow']

        if (sendEmailNow == "Yes"){
            response.redirect("/delivery/wat2/pcd/send/delivered")
        } else {
            response.redirect("/delivery/wat2/victim?pcdStatus=approved-to-send&pmoc=mobile&fumoc=email&secondaryNav=pcd")
        }
    })

    router.post('/delivery/wat2/pcd/send/check-letter-details-answer', function(request, response) {

        response.redirect("/delivery/wat2/pcd/send/letter-added-to-print-queue")
    })

    router.post('/delivery/wat2/pcd/send/letter-details-answer', function(request, response) {

        response.redirect("/delivery/wat2/pcd/send/letter-logged")
    })

    router.post('/delivery/wat2/pcd/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/delivery/wat2/victim?success=yes&successReason=pmoc-updated#victim-details")
    })

    //vcl

    router.get('/delivery/wat2/vcl/pre-draft/check-details-answer', function(request, response) {

        var vclType = request.session.data['vclType']

        if (vclType == "stopped-charge") {
            response.redirect("/delivery/wat2/vcl/draft/stopped-charge")
        } else {
            response.redirect("/delivery/wat2/vcl/draft/substantially-altered-charge")
        }
    })

    router.post('/delivery/wat2/vcl/draft/stopped-charge-answer', function(request, response) {

        response.redirect("/delivery/wat2/vcl/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/delivery/wat2/vcl/draft/altered-charge-answer', function(request, response) {

        response.redirect("/delivery/wat2/vcl/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/delivery/wat2/vcl/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/delivery/wat2/vcl/draft/under-review?vclStatus=draft-under-review")
    })

    router.post('/delivery/wat2/vcl/call/phone-call-1-answer', function(request, response) {

        var victimInformed1 = request.session.data['victimInformed1']

        if (victimInformed1 == "Yes"){
            response.redirect("/delivery/wat2/vcl/call/follow-up-moc?callAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/delivery/wat2/vcl/call/was-text-message-sent?callAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/delivery/wat2/vcl/call/was-text-message-sent-answer', function(request, response) {

        var wasTextMessageSent = request.session.data['wasTextMessageSent']

        if (wasTextMessageSent == "Yes"){
            response.redirect("/delivery/wat2/vcl/call/text-message-details")
        } else {
            response.redirect("/delivery/wat2/victim?pmoc=mobile&vclStatus=after-call-attempt-1&secondaryNav=vcl")
        }
    })

    router.post('/delivery/wat2/vcl/call/text-message-details-answer', function(request, response) {

        response.redirect("/delivery/wat2/victim?vclStatus=after-call-attempt-1&secondaryNav=vcl")
    })

    router.post('/delivery/wat2/vcl/call/next-attempt-moc-answer', function(request, response) {

        var attemptToContactAgain = request.session.data['attemptToContactAgain']
        var callAttempt = request.session.data['callAttempt']

        if (attemptToContactAgain == "call") {
            if (callAttempt == "1") {
                response.redirect("/delivery/wat2/vcl/call/phone-call-2")
            } else {
                response.redirect("/delivery/wat2/vcl/call/phone-call-3")
            }

        } else if (attemptToContactAgain == "email") {
            if (callAttempt == "1") {
                response.redirect("/delivery/wat2/victim?vclStatus=draft-ready-to-send&attemptToContactAgain=email&secondaryNav=vcl")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/wat2/victim?vclStatus=draft-ready-to-send&attemptToContactAgain=email&secondaryNav=vcl")
            } else {
                response.redirect("/delivery/wat2/victim?vclStatus=draft-ready-to-send&attemptToContactAgain=email&secondaryNav=vcl")
            }
            
        } else {
            response.redirect("/delivery/wat2/victim?vclStatus=draft-ready-to-send&attemptToContactAgain=post&secondaryNav=vcl")
        }
    })

    router.post('/delivery/wat2/vcl/call/phone-call-2-answer', function(request, response) {

        var victimInformed2 = request.session.data['victimInformed2']

        if (victimInformed2 == "Yes"){
            response.redirect("/delivery/wat2/vcl/call/follow-up-moc?callAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/delivery/wat2/victim?vclStatus=after-call-attempt-2&callAttempt=2&success=yes&successReason=not-informed-after-call-2&secondaryNav=vcl")
        }
    })

    router.post('/delivery/wat2/vcl/call/follow-up-moc-answer', function(request, response) {

        var fumoc = request.session.data['fumoc']
        var callAttempt = request.session.data['callAttempt']

        if (fumoc == "Email"){
            if (callAttempt == "1") {
                response.redirect("/delivery/wat2/victim?vclStatus=informed-after-call-1&fumoc=email&secondaryNav=vcl")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/wat2/victim?vclStatus=informed-after-call-2&fumoc=email&secondaryNav=vcl")
            } else {
                response.redirect("/delivery/wat2/victim?vclStatus=informed-after-call-3&fumoc=email&secondaryNav=vcl")
            }

        } else if (fumoc == "Post") {
            if (callAttempt == "1") {
                response.redirect("/delivery/wat2/victim?vclStatus=informed-after-call-1&fumoc=post&secondaryNav=vcl")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/wat2/victim?vclStatus=informed-after-call-2&fumoc=post&secondaryNav=vcl")
            } else {
                response.redirect("/delivery/wat2/victim?vclStatus=informed-after-call-3&fumoc=post&secondaryNav=vcl")
            }

        } else {
            if (callAttempt == "1") {
                response.redirect("/delivery/wat2/victim?vclStatus=informed-after-call-1&fumoc=none&secondaryNav=vcl")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/wat2/victim?vclStatus=informed-after-call-2&fumoc=none&secondaryNav=vcl")
            } else {
                response.redirect("/delivery/wat2/victim?vclStatus=informed-after-call-3&fumoc=none&secondaryNav=vcl")
            }
        }
    })

    router.post('/delivery/wat2/vcl/call/phone-call-3-answer', function(request, response) {

        var victimInformed3 = request.session.data['victimInformed3']

        if (victimInformed3 == "Yes"){
            response.redirect("/delivery/wat2/vcl/call/follow-up-moc?callAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/delivery/wat2/victim?vclStatus=after-call-attempt-3&callAttempt=3&success=yes&successReason=not-informed-after-call-3&secondaryNav=vcl")
        }
    })

    router.post('/delivery/wat2/vcl/send/check-email-details-answer', function(request, response) {

        var sendEmailNow = request.session.data['sendEmailNow']

        if (sendEmailNow == "Yes"){
            response.redirect("/delivery/wat2/vcl/send/delivered")
        } else {
            response.redirect("/delivery/wat2/victim?vclStatus=approved-to-send&pmoc=mobile&fumoc=email&secondaryNav=vcl")
        }
    })

    router.post('/delivery/wat2/vcl/send/check-letter-details-answer', function(request, response) {

        response.redirect("/delivery/wat2/vcl/send/letter-added-to-print-queue")
    })

    router.post('/delivery/wat2/vcl/send/letter-details-answer', function(request, response) {

        response.redirect("/delivery/wat2/vcl/send/letter-logged")
    })

    router.post('/delivery/wat2/vcl/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/delivery/wat2/victim?success=yes&successReason=pmoc-updated#victim-details")
    })

}