module.exports = router => {

    router.post('/ur/dtc/ur1/sign-in-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/search")
    })

    router.post('/ur/dtc/ur1/intended-recipient-answer', function(request, response) {

        var intendedRecipient = request.session.data['intendedRecipient']
        if (intendedRecipient == "Yes"){
            response.redirect("/ur/dtc/ur1/contact-method?recipientForename=Sarah&recipientSurname=Phillips")
        } else {
            response.redirect("/ur/dtc/ur1/recipient-name")
        }
    })

    router.post('/ur/dtc/ur1/recipient-name-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/contact-method")
    })

    router.post('/ur/dtc/ur1/contact-method-answer', function(request, response) {

        var contactMethod = request.session.data['contactMethod']
        if (contactMethod == "Email"){
            response.redirect("/ur/dtc/ur1/recipient-email-address")
        } else if (contactMethod == "Phone call"){
            response.redirect("/ur/dtc/ur1/recipient-phone-number")
        } else {
            response.redirect("/ur/dtc/ur1/recipient-address")
        }
    })

    router.post('/ur/dtc/ur1/recipient-email-address-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/service-advisor")
    })

    router.post('/ur/dtc/ur1/recipient-phone-number-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/service-advisor")
    })

    router.post('/ur/dtc/ur1/recipient-address-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/service-advisor")
    })

    router.post('/ur/dtc/ur1/service-advisor-answer', function(request, response) {

        var serviceAdvisor = request.session.data['serviceAdvisor']
        if (serviceAdvisor == "Yes"){
            response.redirect("/ur/dtc/ur1/reported-by?serviceAdvisorForename=Daisy&serviceAdvisorSurname=Dooley")
        } else {
            response.redirect("/ur/dtc/ur1/service-advisor-name")
        }
    })

    router.post('/ur/dtc/ur1/service-advisor-name-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/reported-by")
    })

    router.post('/ur/dtc/ur1/reported-by-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/prosecutor-name")
    })

    router.post('/ur/dtc/ur1/prosecutor-name-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/charges")
    })

    router.post('/ur/dtc/ur1/charges-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/first-hearing")
    })

    router.post('/ur/dtc/ur1/first-hearing-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/oic")
    })

    router.post('/ur/dtc/ur1/oic-name-answer', function(request, response) {

        response.redirect("/ur/dtc/ur1/check-answers")
    })

    router.post('/ur/dtc/ur1/check-answers-answer', function(request, response) {

        var contactMethod = request.session.data['contactMethod']
        if (contactMethod == "Email"){
            response.redirect("/ur/dtc/ur1/confirmation-email")
        } else if (contactMethod == "Phone call"){
            response.redirect("/ur/dtc/ur1/confirmation-phone-call")
        } else {
            response.redirect("/ur/dtc/ur1/confirmation-letter")
        }
    })

    router.post('/ur/dtc/ur1/confirmation-answer', function(request, response) {

        response.redirect("/victim-or-witness-details")
    })
    
}