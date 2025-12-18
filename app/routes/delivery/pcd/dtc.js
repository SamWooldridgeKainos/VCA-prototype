module.exports = router => {

    router.post('/delivery/dtc/sign-in-answer', function(request, response) {

        response.redirect("/delivery/dtc/search")
    })

    router.post('/delivery/dtc/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/delivery/dtc/victim-record")
    })

    router.post('/delivery/dtc/check-answers-answer', function(request, response) {

        response.redirect("/delivery/dtc/email-delivered")
    })
    
}