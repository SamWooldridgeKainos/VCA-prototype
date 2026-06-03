module.exports = router => {

    router.post('/v40/onb/sign-in-answer', function(request, response) {

        response.redirect("/v40/onb/overview")
    })

    router.post('/v40/onb/service-lead-answer', function(request, response) {

        response.redirect("/v40/onb/next-task")
    })

    router.post('/v40/onb/next-task-answer', function(request, response) {

        response.redirect("/v40/onb/check-details")
    })

    router.post('/v40/onb/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/v40/onb/check-details")
    })

    router.post('/v40/onb/check-details-answer', function(request, response) {

        response.redirect("/v40/onb/onboarded?onboardedStatus=Yes")
    })

}