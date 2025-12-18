module.exports = router => {
    
    router.post('/ur/dtc/ur2/sign-in-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/search")
    })

    router.post('/ur/dtc/ur2/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/main-details")
    })

    router.post('/ur/dtc/ur2/vlu-role-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/check-answers")
    })

    router.post('/ur/dtc/ur2/recipients-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/check-answers")
    })

    router.post('/ur/dtc/ur2/acknowledgement-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/check-answers")
    })

    router.post('/ur/dtc/ur2/reported-by-victim-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/check-answers")
    })

    router.post('/ur/dtc/ur2/prosecutor-name-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/check-answers")
    })

    router.post('/ur/dtc/ur2/charges-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/check-answers?charges=true")
    })

    router.post('/ur/dtc/ur2/first-hearing-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/check-answers?firstHearingLocation=Sheffield%20Magistrates%27%20Court")
    })

    router.post('/ur/dtc/ur2/oic-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/check-answers?oicRank=Constable")
    })

    router.post('/ur/dtc/ur2/check-answers-answer', function(request, response) {

        response.redirect("/ur/dtc/ur2/preview")
    })

    router.post('/ur/dtc/ur2/preview-answer', function(request, response) {

        var emailStatus = request.session.data['emailStatus']
        emailStatus == "Sent"

        response.redirect("/ur/dtc/ur2/email-sent")
    })

}