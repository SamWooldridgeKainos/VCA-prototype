module.exports = router => {
    
    router.post('/v11/sign-in-answer', function(request, response) {

        response.redirect("/v11/search")
    })

    router.post('/v11/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/v11/main-details")
    })

    router.post('/v11/vlu-role-answer', function(request, response) {

        response.redirect("/v11/check-answers")
    })

    router.post('/v11/recipients-answer', function(request, response) {

        response.redirect("/v11/check-answers")
    })

    router.post('/v11/acknowledgement-answer', function(request, response) {

        response.redirect("/v11/check-answers")
    })

    router.post('/v11/reported-by-victim-answer', function(request, response) {

        response.redirect("/v11/check-answers")
    })

    router.post('/v11/prosecutor-name-answer', function(request, response) {

        response.redirect("/v11/check-answers")
    })

    router.post('/v11/charges-answer', function(request, response) {

        response.redirect("/v11/check-answers?charges=true")
    })

    router.post('/v11/first-hearing-answer', function(request, response) {

        response.redirect("/v11/check-answers?firstHearingLocation=Sheffield%20Magistrates%27%20Court")
    })

    router.post('/v11/oic-answer', function(request, response) {

        response.redirect("/v11/check-answers?oicRank=Constable")
    })

    router.post('/v11/check-answers-answer', function(request, response) {

        response.redirect("/v11/preview")
    })

    router.post('/v11/preview-answer', function(request, response) {

        var emailStatus = request.session.data['emailStatus']
        emailStatus == "Sent"

        response.redirect("/v11/email-sent")
    })

}