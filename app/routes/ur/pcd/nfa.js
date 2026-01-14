module.exports = router => {

    router.post('/ur/nfa/start-1/sign-in-answer', function(request, response) {

        response.redirect("/ur/nfa/start-1/search")
    })

    router.post('/ur/nfa/draft/nfa-template-answer', function(request, response) {

        response.redirect("/ur/nfa/draft/compose-letter?nfaStatus=draft-in-progress")
    })

    router.post('/ur/nfa/start-2/sign-in-answer', function(request, response) {

        response.redirect("/ur/nfa/start-2/search")
    })

    router.post('/ur/nfa/start-3/sign-in-answer', function(request, response) {

        response.redirect("/ur/nfa/start-3/search")
    })

    router.post('/ur/nfa/call/telephone-call-1-details-answer', function(request, response) {

        var victimInformed = request.session.data['victimInformed']
        if (victimInformed == "Yes"){
            response.redirect("/ur/nfa/call/follow-up-moc?callAttempt=1")
        } else {
            response.redirect("/ur/nfa/call/text-message-details?callAttempt=1")
        }
    })

    router.post('/ur/nfa/call/text-message-details-answer', function(request, response) {

        response.redirect("/ur/nfa/victim-record?pmoc=mobile&nfaStatus=after-call-attempt-1#communications")
    })

    router.post('/ur/nfa/call/next-attempt-moc-answer', function(request, response) {

        var attemptToContactAgain = request.session.data['attemptToContactAgain']
        var callAttempt = request.session.data['callAttempt']

        if (attemptToContactAgain == "Call") {
            if (callAttempt == "1") {
                response.redirect("/ur/nfa/call/telephone-call-2-details")
            } else {
                response.redirect("/ur/nfa/call/telephone-call-3-details")
            }
        } else if (attemptToContactAgain == "Email") {
            response.redirect("/ur/nfa/victim-record?pmoc=email&nfaStatus=draft-ready-to-send#communications")

        } else {
            response.redirect("/ur/nfa/victim-record?pmoc=post&nfaStatus=draft-ready-to-send#communications")
        }
    })

    router.post('/ur/nfa/call/telephone-call-2-details-answer', function(request, response) {

        var victimInformed = request.session.data['victimInformed']
        if (victimInformed == "Yes"){
            response.redirect("/ur/nfa/call/follow-up-moc?callAttempt=2")
        } else {
            response.redirect("/ur/nfa/victim-record?nfaStatus=after-call-attempt-2&callAttempt=2#communications")
        }
    })

    router.post('/ur/nfa/call/follow-up-moc-answer', function(request, response) {

        var fumoc = request.session.data['fumoc']
        var callAttempt = request.session.data['callAttempt']

        if (fumoc == "Email"){
            if (callAttempt == "1") {
                response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=email#communications")
            } else if (callAttempt == "2") {
                response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=email#communications")
            } else {
                response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=email#communications")
            }
        } else if (fumoc == "Post") {
            if (callAttempt == "1") {
                response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=post#communications")
            } else if (callAttempt == "2") {
                response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=post#communications")
            } else {
                response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=post#communications")
            }
        } else {
            if (callAttempt == "1") {
                response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=none#communications")
            } else if (callAttempt == "2") {
                response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=none#communications")
            } else {
                response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=none#communications")
            }
        }
    })

    router.post('/ur/nfa/call/telephone-call-3-details-answer', function(request, response) {

        var victimInformed = request.session.data['victimInformed']
        if (victimInformed == "Yes"){
            response.redirect("/ur/nfa/call/follow-up-moc?callAttempt=3")
        } else {
            response.redirect("/ur/nfa/victim-record?nfaStatus=after-call-attempt-3&callAttempt=3#communications")
        }
    })

    router.post('/ur/nfa/send/check-email-details-answer', function(request, response) {

        var sendEmailNow = request.session.data['sendEmailNow']
        if (sendEmailNow == "Yes"){
            response.redirect("/ur/nfa/send/delivered")
        } else {
            response.redirect("/ur/nfa/victim-record?nfaStatus=approved-to-send&pmoc=mobile&fumoc=email#communications")
        }
    })

    router.post('/ur/nfa/send/check-letter-details-answer', function(request, response) {

        response.redirect("/ur/nfa/send/letter-added-to-print-queue")
    })

    router.post('/ur/nfa/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/ur/nfa/victim-record?success=yes&successReason=pmoc-updated#victim-details")
    })
    
}