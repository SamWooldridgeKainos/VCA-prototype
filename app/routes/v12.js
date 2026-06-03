module.exports = router => {

    router.post('/v12/sign-in-answer', function(request, response) {

        response.redirect("/v12/search")
    })

    router.post('/v12/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/v12/victim-record")
    })

    router.post('/v12/check-answers-answer', function(request, response) {

        response.redirect("/v12/email-delivered")
    })
    
}