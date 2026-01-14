module.exports = router => {

    router.post('/delivery/nfa/start-1/sign-in-answer', function(request, response) {

        response.redirect("/delivery/nfa/start-1/search")
    })

    router.post('/delivery/nfa/draft/nfa-template-answer', function(request, response) {

        response.redirect("/delivery/nfa/draft/compose-letter?nfaStatus=draft-in-progress")
    })

    router.post('/delivery/nfa/start-2/sign-in-answer', function(request, response) {

        response.redirect("/delivery/nfa/start-2/search")
    })

    router.post('/delivery/nfa/start-3/sign-in-answer', function(request, response) {

        response.redirect("/delivery/nfa/start-3/search")
    })

    router.post('/delivery/nfa/start-4/sign-in-answer', function(request, response) {

        response.redirect("/delivery/nfa/start-4/search")
    })

    router.post('/delivery/nfa/start-5/sign-in-answer', function(request, response) {

        response.redirect("/delivery/nfa/start-5/search")
    })

    router.post('/delivery/nfa/start-6/sign-in-answer', function(request, response) {

        response.redirect("/delivery/nfa/start-6/search")
    })

    router.post('/delivery/nfa/start-7/sign-in-answer', function(request, response) {

        response.redirect("/delivery/nfa/start-7/search")
    })

    router.post('/delivery/nfa/start-8/sign-in-answer', function(request, response) {

        response.redirect("/delivery/nfa/start-8/search")
    })

    router.post('/delivery/nfa/draft/charging-decision-answer', function(request, response) {

        var decisionType = request.session.data['decisionType']
        if (decisionType == "dtc"){
            response.redirect("/delivery/nfa/draft/first-hearing")
        } else if (decisionType == "mixed-charges") {
            response.redirect("#")
        } else {
            response.redirect("/delivery/nfa/draft/victim-withdrawn")
        }
    })

    router.post('/delivery/nfa/draft/first-hearing-answer', function(request, response) {

        response.redirect("/delivery/nfa/draft/compose-letter?nfaStatus=draft-in-progress")
    })

    router.post('/delivery/nfa/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/delivery/nfa/draft/under-review?nfaStatus=draft-under-review")
    })

    router.post('/delivery/nfa/call/telephone-call-1-details-answer', function(request, response) {

        var victimInformed1 = request.session.data['victimInformed1']
        if (victimInformed1 == "Yes"){
            response.redirect("/delivery/nfa/call/follow-up-moc?callAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/delivery/nfa/call/was-text-message-sent?callAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/delivery/nfa/call/was-text-message-sent-answer', function(request, response) {

        var wasTextMessageSent = request.session.data['wasTextMessageSent']
        if (wasTextMessageSent == "Yes"){
            response.redirect("/delivery/nfa/call/text-message-details")
        } else {
            response.redirect("/delivery/nfa/victim-record?pmoc=mobile&nfaStatus=after-call-attempt-1#communications")
        }
    })

    router.post('/delivery/nfa/call/text-message-details-answer', function(request, response) {

        response.redirect("/delivery/nfa/victim-record?nfaStatus=after-call-attempt-1#communications")
    })

    router.post('/delivery/nfa/call/next-attempt-moc-answer', function(request, response) {

        var attemptToContactAgain = request.session.data['attemptToContactAgain']
        var callAttempt = request.session.data['callAttempt']

        if (attemptToContactAgain == "Call") {
            if (callAttempt == "1") {
                response.redirect("/delivery/nfa/call/telephone-call-2-details")
            } else {
                response.redirect("/delivery/nfa/call/telephone-call-3-details")
            }
        } else if (attemptToContactAgain == "Email") {
            if (callAttempt == "1") {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=draft-ready-to-send#communications")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=draft-ready-to-send#communications")
            } else {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=draft-ready-to-send#communications")
            }


        } else {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=draft-ready-to-send#communications")
        }
    })

    router.post('/delivery/nfa/call/telephone-call-2-details-answer', function(request, response) {

        var victimInformed2 = request.session.data['victimInformed2']
        if (victimInformed2 == "Yes"){
            response.redirect("/delivery/nfa/call/follow-up-moc?callAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=after-call-attempt-2&callAttempt=2&success=yes&successReason=not-informed-after-call-2#communications")
        }
    })

    router.post('/delivery/nfa/call/follow-up-moc-answer', function(request, response) {

        var fumoc = request.session.data['fumoc']
        var callAttempt = request.session.data['callAttempt']

        if (fumoc == "Email"){
            if (callAttempt == "1") {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=email#communications")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=email#communications")
            } else {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=email#communications")
            }
        } else if (fumoc == "Post") {
            if (callAttempt == "1") {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=post#communications")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=post#communications")
            } else {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=post#communications")
            }
        } else {
            if (callAttempt == "1") {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=none#communications")
            } else if (callAttempt == "2") {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=none#communications")
            } else {
                response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=none#communications")
            }
        }
    })

    router.post('/delivery/nfa/call/telephone-call-3-details-answer', function(request, response) {

        var victimInformed3 = request.session.data['victimInformed3']
        if (victimInformed3 == "Yes"){
            response.redirect("/delivery/nfa/call/follow-up-moc?callAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=after-call-attempt-3&callAttempt=3&success=yes&successReason=not-informed-after-call-3#communications")
        }
    })

    router.post('/delivery/nfa/send/check-email-details-answer', function(request, response) {

        var sendEmailNow = request.session.data['sendEmailNow']
        if (sendEmailNow == "Yes"){
            response.redirect("/delivery/nfa/send/delivered")
        } else {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=approved-to-send&pmoc=mobile&fumoc=email#communications")
        }
    })

    router.post('/delivery/nfa/send/check-letter-details-answer', function(request, response) {

        response.redirect("/delivery/nfa/send/letter-added-to-print-queue")
    })

    router.post('/delivery/nfa/send/letter-details-answer', function(request, response) {

        response.redirect("/delivery/nfa/send/letter-logged")
    })

    router.post('/delivery/nfa/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/delivery/nfa/victim-record?success=yes&successReason=pmoc-updated#victim-details")
    })
    
}