module.exports = router => {

    router.post('/delivery/wat/onb/sign-in-answer', function(request, response) {

        response.redirect("/delivery/wat/onb/overview")
    })

    router.post('/delivery/wat/onb/service-lead-answer', function(request, response) {

        response.redirect("/delivery/wat/onb/next-task")
    })

    router.post('/delivery/wat/onb/next-task-answer', function(request, response) {

        response.redirect("/delivery/wat/onb/check-details")
    })

    router.post('/delivery/wat/onb/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/delivery/wat/onb/check-details")
    })

    router.post('/delivery/wat/onb/check-details-answer', function(request, response) {

        response.redirect("/delivery/wat/onb/onboarded?onboarded=Yes")
    })

}