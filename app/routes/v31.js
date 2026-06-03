module.exports = router => {

    router.post('/v31/start/sign-in-answer', function(request, response) {

        response.redirect("/v31/start/search")
    })

    router.post('/v31/draft/vcl-type-answer', function(request, response) {

        var vclType = request.session.data['vclType']
        if (vclType == "stopped-charge") {
            response.redirect("/v31/draft/stopped-charge")
        } else {
            response.redirect("/v31/draft/substantially-altered-charge")
        }
    })

    router.post('/v31/draft/stopped-charge-1-answer', function(request, response) {

        response.redirect("/v31/draft/victim-withdrawal")
    })

    router.post('/v31/draft/victim-withdrawal-answer', function(request, response) {

        response.redirect("/v31/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/v31/draft/altered-charge-type-answer', function(request, response) {

        response.redirect("/v31/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/v31/draft/stopped-charge-2-answer', function(request, response) {

        response.redirect("/v31/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/v31/draft/vcl-type-2-answer', function(request, response) {

        var vclType = request.session.data['vclType']
        if (vclType == "no-prosecutution-or-discontinuance-vrr" || vclType == "no-prosecutution-or-discontinuance-withdrawal" || vclType == "no-evidence-vrr" || vclType == "no-evidence-withdrawal"){
            response.redirect("/v31/draft/compose-letter?vclStatus=draft-in-progress&vclType=stopped-charge")
        } else {
            response.redirect("/v31/draft/compose-letter?vclStatus=draft-in-progress&vclType=altered-charge")
        }
    })

    router.post('/v31/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/v31/draft/under-review?vclStatus=draft-under-review")
    })

    router.post('/v31/call/phone-call-1-answer', function(request, response) {

        var victimInformed1 = request.session.data['victimInformed1']
        if (victimInformed1 == "Yes"){
            response.redirect("/v31/call/follow-up-moc?callAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/v31/call/was-text-message-sent?callAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/v31/call/was-text-message-sent-answer', function(request, response) {

        var wasTextMessageSent = request.session.data['wasTextMessageSent']
        if (wasTextMessageSent == "Yes"){
            response.redirect("/v31/call/text-message-details")
        } else {
            response.redirect("/v31/victim-record?pmoc=mobile&vclStatus=after-call-attempt-1&subTab=vcl#communications")
        }
    })

    router.post('/v31/call/text-message-details-answer', function(request, response) {

        response.redirect("/v31/victim-record?vclStatus=after-call-attempt-1&subTab=vcl#communications")
    })

    router.post('/v31/call/next-attempt-moc-answer', function(request, response) {

        var attemptToContactAgain = request.session.data['attemptToContactAgain']
        var callAttempt = request.session.data['callAttempt']

        if (attemptToContactAgain == "call") {
            if (callAttempt == "1") {
                response.redirect("/v31/call/phone-call-2")
            } else {
                response.redirect("/v31/call/phone-call-3")
            }
        } else if (attemptToContactAgain == "email") {
            if (callAttempt == "1") {
                response.redirect("/v31/victim-record?vclStatus=draft-ready-to-send&attemptToContactAgain=email&subTab=vcl#communications")
            } else if (callAttempt == "2") {
                response.redirect("/v31/victim-record?vclStatus=draft-ready-to-send&attemptToContactAgain=email&subTab=vcl#communications")
            } else {
                response.redirect("/v31/victim-record?vclStatus=draft-ready-to-send&attemptToContactAgain=email&subTab=vcl#communications")
            }


        } else {
            response.redirect("/v31/victim-record?vclStatus=draft-ready-to-send&attemptToContactAgain=post&subTab=vcl#communications")
        }
    })

    router.post('/v31/call/phone-call-2-answer', function(request, response) {

        var victimInformed2 = request.session.data['victimInformed2']
        if (victimInformed2 == "Yes"){
            response.redirect("/v31/call/follow-up-moc?callAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/v31/victim-record?vclStatus=after-call-attempt-2&callAttempt=2&success=yes&successReason=not-informed-after-call-2&subTab=vcl#communications")
        }
    })

    router.post('/v31/call/follow-up-moc-answer', function(request, response) {

        var fumoc = request.session.data['fumoc']
        var callAttempt = request.session.data['callAttempt']

        if (fumoc == "Email"){
            if (callAttempt == "1") {
                response.redirect("/v31/victim-record?vclStatus=informed-after-call-1&fumoc=email&subTab=vcl#communications")
            } else if (callAttempt == "2") {
                response.redirect("/v31/victim-record?vclStatus=informed-after-call-2&fumoc=email&subTab=vcl#communications")
            } else {
                response.redirect("/v31/victim-record?vclStatus=informed-after-call-3&fumoc=email&subTab=vcl#communications")
            }
        } else if (fumoc == "Post") {
            if (callAttempt == "1") {
                response.redirect("/v31/victim-record?vclStatus=informed-after-call-1&fumoc=post&subTab=vcl#communications")
            } else if (callAttempt == "2") {
                response.redirect("/v31/victim-record?vclStatus=informed-after-call-2&fumoc=post&subTab=vcl#communications")
            } else {
                response.redirect("/v31/victim-record?vclStatus=informed-after-call-3&fumoc=post&subTab=vcl#communications")
            }
        } else {
            if (callAttempt == "1") {
                response.redirect("/v31/victim-record?vclStatus=informed-after-call-1&fumoc=none&subTab=vcl#communications")
            } else if (callAttempt == "2") {
                response.redirect("/v31/victim-record?vclStatus=informed-after-call-2&fumoc=none&subTab=vcl#communications")
            } else {
                response.redirect("/v31/victim-record?vclStatus=informed-after-call-3&fumoc=none&subTab=vcl#communications")
            }
        }
    })

    router.post('/v31/call/phone-call-3-answer', function(request, response) {

        var victimInformed3 = request.session.data['victimInformed3']
        if (victimInformed3 == "Yes"){
            response.redirect("/v31/call/follow-up-moc?callAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/v31/victim-record?vclStatus=after-call-attempt-3&callAttempt=3&success=yes&successReason=not-informed-after-call-3&subTab=vcl#communications")
        }
    })

    router.post('/v31/send/check-email-details-answer', function(request, response) {

        var sendEmailNow = request.session.data['sendEmailNow']
        if (sendEmailNow == "Yes"){
            response.redirect("/v31/send/delivered")
        } else {
            response.redirect("/v31/victim-record?vclStatus=approved-to-send&pmoc=mobile&fumoc=email&subTab=vcl#communications")
        }
    })

    router.post('/v31/send/check-letter-details-answer', function(request, response) {

        response.redirect("/v31/send/letter-added-to-print-queue")
    })

    router.post('/v31/send/letter-details-answer', function(request, response) {

        response.redirect("/v31/send/letter-logged")
    })

    router.post('/v31/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/v31/victim-record?success=yes&successReason=pmoc-updated#victim-details")
    })
    
}