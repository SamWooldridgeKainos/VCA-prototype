module.exports = router => {

    router.post('/ur/wat/onb/sign-in-answer', function(request, response) {

        response.redirect("/ur/wat/onb/overview")
    })

    router.post('/ur/wat/onb/service-lead-answer', function(request, response) {

        response.redirect("/ur/wat/onb/next-task")
    })

    router.post('/ur/wat/onb/next-task-answer', function(request, response) {

        response.redirect("/ur/wat/onb/check-details")
    })

    router.post('/ur/wat/onb/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/ur/wat/onb/check-details")
    })

    router.post('/ur/wat/onb/check-details-answer', function(request, response) {

        response.redirect("/ur/wat/onb/onboarded?onboardedStatus=Yes")
    })

}