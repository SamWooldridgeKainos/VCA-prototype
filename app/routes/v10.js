module.exports = router => {

    router.post('/v10/sign-in-answer', function(request, response) {

        response.redirect("/v10/search")
    })

    router.post('/v10/intended-recipient-answer', function(request, response) {

        var intendedRecipient = request.session.data['intendedRecipient']
        if (intendedRecipient == "Yes"){
            response.redirect("/v10/contact-method?recipientForename=Sarah&recipientSurname=Phillips")
        } else {
            response.redirect("/v10/recipient-name")
        }
    })

    router.post('/v10/recipient-name-answer', function(request, response) {

        response.redirect("/v10/contact-method")
    })

    router.post('/v10/contact-method-answer', function(request, response) {

        var contactMethod = request.session.data['contactMethod']
        if (contactMethod == "Email"){
            response.redirect("/v10/recipient-email-address")
        } else if (contactMethod == "Phone call"){
            response.redirect("/v10/recipient-phone-number")
        } else {
            response.redirect("/v10/recipient-address")
        }
    })

    router.post('/v10/recipient-email-address-answer', function(request, response) {

        response.redirect("/v10/service-advisor")
    })

    router.post('/v10/recipient-phone-number-answer', function(request, response) {

        response.redirect("/v10/service-advisor")
    })

    router.post('/v10/recipient-address-answer', function(request, response) {

        response.redirect("/v10/service-advisor")
    })

    router.post('/v10/service-advisor-answer', function(request, response) {

        var serviceAdvisor = request.session.data['serviceAdvisor']
        if (serviceAdvisor == "Yes"){
            response.redirect("/v10/reported-by?serviceAdvisorForename=Daisy&serviceAdvisorSurname=Dooley")
        } else {
            response.redirect("/v10/service-advisor-name")
        }
    })

    router.post('/v10/service-advisor-name-answer', function(request, response) {

        response.redirect("/v10/reported-by")
    })

    router.post('/v10/reported-by-answer', function(request, response) {

        response.redirect("/v10/prosecutor-name")
    })

    router.post('/v10/prosecutor-name-answer', function(request, response) {

        response.redirect("/v10/charges")
    })

    router.post('/v10/charges-answer', function(request, response) {

        response.redirect("/v10/first-hearing")
    })

    router.post('/v10/first-hearing-answer', function(request, response) {

        response.redirect("/v10/oic")
    })

    router.post('/v10/oic-name-answer', function(request, response) {

        response.redirect("/v10/check-answers")
    })

    router.post('/v10/check-answers-answer', function(request, response) {

        var contactMethod = request.session.data['contactMethod']
        if (contactMethod == "Email"){
            response.redirect("/v10/confirmation-email")
        } else if (contactMethod == "Phone call"){
            response.redirect("/v10/confirmation-phone-call")
        } else {
            response.redirect("/v10/confirmation-letter")
        }
    })

    router.post('/v10/confirmation-answer', function(request, response) {

        response.redirect("/victim-or-witness-details")
    })
    
}