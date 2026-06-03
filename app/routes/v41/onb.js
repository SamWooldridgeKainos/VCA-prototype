module.exports = router => {

    router.post('/v41/onb/sign-in-answer', function(request, response) {

        response.redirect("/v41/onb/overview")
    })

    router.post('/v41/onb/service-lead-answer', function(request, response) {

        response.redirect("/v41/onb/next-task")
    })

    router.post('/v41/onb/next-task-answer', function(request, response) {

        response.redirect("/v41/onb/check-details")
    })

    router.post('/v41/onb/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/v41/onb/check-details")
    })

    router.post('/v41/onb/check-details-answer', function(request, response) {

        response.redirect("/v41/onb/onboarded?onboarded=Yes")
    })

}