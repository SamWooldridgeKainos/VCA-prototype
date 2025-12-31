module.exports = router => {

    router.post('/ur/wat/pcd/sign-in-answer', function(request, response) {

        response.redirect("/ur/wat/pcd/overview")
    })

    router.get('/ur/wat/pcd/pre-draft/check-eligibility-answer', function(request, response) {

        var pcdWithdrawn = request.session.data['pcdWithdrawn']
        var pcdOptOut = request.session.data['pcdOptOut']

        if ((pcdWithdrawn == "No") && (pcdOptOut == "No")) {
            response.redirect("/ur/wat/pcd/pre-draft/check-details?pcdStatus=check-details")
        } else {
            response.redirect("/ur/wat/pcd/victim-record?pcdStatus=ineligible")
        }
    })

    router.get('/ur/wat/pcd/pre-draft/check-details-answer', function(request, response) {

        response.redirect("/ur/wat/pcd/draft/pcd-type?pcdStatus=draft-not-started")
    })

    router.post('/ur/wat/pcd/draft/pcd-type-answer', function(request, response) {

        var pcdType = request.session.data['pcdType']
        if (pcdType == "dtc"){
            response.redirect("/ur/wat/pcd/draft/first-hearing")
        } else if (pcdType == "nfa") {
            response.redirect("/ur/wat/pcd/draft/compose-letter?pcdStatus=draft-in-progress")
        } else {
            response.redirect("#")
        }
    })

    router.post('/ur/wat/pcd/draft/first-hearing-answer', function(request, response) {

        response.redirect("/ur/wat/pcd/draft/compose-letter?pcdStatus=draft-in-progress")
    })

    router.post('/ur/wat/pcd/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/ur/wat/pcd/draft/under-review?pcdStatus=draft-under-review")
    })

    router.post('/ur/wat/pcd/call/phone-call-1-answer', function(request, response) {

        var victimInformed1 = request.session.data['victimInformed1']
        if (victimInformed1 == "Yes"){
            response.redirect("/ur/wat/pcd/call/follow-up-moc?callAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/ur/wat/pcd/call/was-text-message-sent?callAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/ur/wat/pcd/call/was-text-message-sent-answer', function(request, response) {

        var wasTextMessageSent = request.session.data['wasTextMessageSent']
        if (wasTextMessageSent == "Yes"){
            response.redirect("/ur/wat/pcd/call/text-message-details")
        } else {
            response.redirect("/ur/wat/pcd/victim-record?pmoc=mobile&pcdStatus=after-call-attempt-1&subTab=pcd&secondaryNav=communications")
        }
    })

    router.post('/ur/wat/pcd/call/text-message-details-answer', function(request, response) {

        response.redirect("/ur/wat/pcd/victim-record?pcdStatus=after-call-attempt-1&subTab=pcd&secondaryNav=communications")
    })

    router.post('/ur/wat/pcd/call/next-attempt-moc-answer', function(request, response) {

        var attemptToContactAgain = request.session.data['attemptToContactAgain']
        var callAttempt = request.session.data['callAttempt']

        if (attemptToContactAgain == "call") {
            if (callAttempt == "1") {
                response.redirect("/ur/wat/pcd/call/phone-call-2")
            } else {
                response.redirect("/ur/wat/pcd/call/phone-call-3")
            }
        } else if (attemptToContactAgain == "email") {
            if (callAttempt == "1") {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=draft-ready-to-send&attemptToContactAgain=email&subTab=pcd&secondaryNav=communications")
            } else if (callAttempt == "2") {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=draft-ready-to-send&attemptToContactAgain=email&subTab=pcd&secondaryNav=communications")
            } else {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=draft-ready-to-send&attemptToContactAgain=email&subTab=pcd&secondaryNav=communications")
            }
            
            
        } else {
            response.redirect("/ur/wat/pcd/victim-record?pcdStatus=draft-ready-to-send&attemptToContactAgain=post&subTab=pcd&secondaryNav=communications")
        }
    })

    router.post('/ur/wat/pcd/call/phone-call-2-answer', function(request, response) {

        var victimInformed2 = request.session.data['victimInformed2']
        if (victimInformed2 == "Yes"){
            response.redirect("/ur/wat/pcd/call/follow-up-moc?callAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/ur/wat/pcd/victim-record?pcdStatus=after-call-attempt-2&callAttempt=2&success=yes&successReason=not-informed-after-call-2&subTab=pcd&secondaryNav=communications")
        }
    })

    router.post('/ur/wat/pcd/call/follow-up-moc-answer', function(request, response) {

        var fumoc = request.session.data['fumoc']
        var callAttempt = request.session.data['callAttempt']

        if (fumoc == "Email"){
            if (callAttempt == "1") {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=informed-after-call-1&fumoc=email&subTab=pcd&secondaryNav=communications")
            } else if (callAttempt == "2") {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=informed-after-call-2&fumoc=email&subTab=pcd&secondaryNav=communications")
            } else {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=informed-after-call-3&fumoc=email&subTab=pcd&secondaryNav=communications")
            }
        } else if (fumoc == "Post") {
            if (callAttempt == "1") {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=informed-after-call-1&fumoc=post&subTab=pcd&secondaryNav=communications")
            } else if (callAttempt == "2") {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=informed-after-call-2&fumoc=post&subTab=pcd&secondaryNav=communications")
            } else {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=informed-after-call-3&fumoc=post&subTab=pcd&secondaryNav=communications")
            }
        } else {
            if (callAttempt == "1") {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=informed-after-call-1&fumoc=none&subTab=pcd&secondaryNav=communications")
            } else if (callAttempt == "2") {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=informed-after-call-2&fumoc=none&subTab=pcd&secondaryNav=communications")
            } else {
                response.redirect("/ur/wat/pcd/victim-record?pcdStatus=informed-after-call-3&fumoc=none&subTab=pcd&secondaryNav=communications")
            }
        }
    })

    router.post('/ur/wat/pcd/call/phone-call-3-answer', function(request, response) {

        var victimInformed3 = request.session.data['victimInformed3']
        if (victimInformed3 == "Yes"){
            response.redirect("/ur/wat/pcd/call/follow-up-moc?callAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/ur/wat/pcd/victim-record?pcdStatus=after-call-attempt-3&callAttempt=3&success=yes&successReason=not-informed-after-call-3&subTab=pcd&secondaryNav=communications")
        }
    })

    router.post('/ur/wat/pcd/send/check-email-details-answer', function(request, response) {

        var sendEmailNow = request.session.data['sendEmailNow']
        if (sendEmailNow == "Yes"){
            response.redirect("/ur/wat/pcd/send/delivered")
        } else {
            response.redirect("/ur/wat/pcd/victim-record?pcdStatus=approved-to-send&pmoc=mobile&fumoc=email&subTab=pcd&secondaryNav=communications")
        }
    })

    router.post('/ur/wat/pcd/send/check-letter-details-answer', function(request, response) {

        response.redirect("/ur/wat/pcd/send/letter-added-to-print-queue")
    })

    router.post('/ur/wat/pcd/send/letter-details-answer', function(request, response) {

        response.redirect("/ur/wat/pcd/send/letter-logged")
    })

    router.post('/ur/wat/pcd/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/ur/wat/pcd/victim-record?success=yes&successReason=pmoc-updated#victim-details")
    })

}