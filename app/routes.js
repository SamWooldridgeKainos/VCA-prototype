//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// UR 1
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


// UR 2

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

// dtc (delivery)

router.post('/delivery/dtc/sign-in-answer', function(request, response) {

    response.redirect("/delivery/dtc/search")
})

router.post('/delivery/dtc/preferred-method-of-contact-answer', function(request, response) {

    response.redirect("/delivery/dtc/victim-record")
})

router.post('/delivery/dtc/check-answers-answer', function(request, response) {

    response.redirect("/delivery/dtc/email-delivered")
})


// no further action (ur)

router.post('/ur/nfa/start-1/sign-in-answer', function(request, response) {

    response.redirect("/ur/nfa/start-1/search")
})

router.post('/ur/nfa/draft/nfa-template-answer', function(request, response) {

    response.redirect("/ur/nfa/draft/compose-letter?nfaStatus=draft-in-progress")
})

router.post('/ur/nfa/start-2/sign-in-answer', function(request, response) {

    response.redirect("/ur/nfa/start-2/search")
})

router.post('/ur/nfa/start-3/sign-in-answer', function(request, response) {

    response.redirect("/ur/nfa/start-3/search")
})

router.post('/ur/nfa/record/telephone-call-1-details-answer', function(request, response) {

    var victimInformed = request.session.data['victimInformed']
    if (victimInformed == "Yes"){
        response.redirect("/ur/nfa/record/follow-up-moc?callAttempt=1")
    } else {
        response.redirect("/ur/nfa/record/text-message-details?callAttempt=1")
    }
})

router.post('/ur/nfa/record/text-message-details-answer', function(request, response) {

    response.redirect("/ur/nfa/victim-record?pmoc=mobile&nfaStatus=after-call-attempt-1#communications")
})

router.post('/ur/nfa/record/next-attempt-moc-answer', function(request, response) {

    var attemptToContactAgain = request.session.data['attemptToContactAgain']
    var callAttempt = request.session.data['callAttempt']

    if (attemptToContactAgain == "Call") {
        if (callAttempt == "1") {
            response.redirect("/ur/nfa/record/telephone-call-2-details")
        } else {
            response.redirect("/ur/nfa/record/telephone-call-3-details")
        }
    } else if (attemptToContactAgain == "Email") {
        response.redirect("/ur/nfa/victim-record?pmoc=email&nfaStatus=draft-ready-to-send#communications")

    } else {
        response.redirect("/ur/nfa/victim-record?pmoc=post&nfaStatus=draft-ready-to-send#communications")
    }
})

router.post('/ur/nfa/record/telephone-call-2-details-answer', function(request, response) {

    var victimInformed = request.session.data['victimInformed']
    if (victimInformed == "Yes"){
        response.redirect("/ur/nfa/record/follow-up-moc?callAttempt=2")
    } else {
        response.redirect("/ur/nfa/victim-record?nfaStatus=after-call-attempt-2&callAttempt=2#communications")
    }
})

router.post('/ur/nfa/record/follow-up-moc-answer', function(request, response) {

    var fumoc = request.session.data['fumoc']
    var callAttempt = request.session.data['callAttempt']

    if (fumoc == "Email"){
        if (callAttempt == "1") {
            response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=email#communications")
        } else if (callAttempt == "2") {
            response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=email#communications")
        } else {
            response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=email#communications")
        }
    } else if (fumoc == "Post") {
        if (callAttempt == "1") {
            response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=post#communications")
        } else if (callAttempt == "2") {
            response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=post#communications")
        } else {
            response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=post#communications")
        }
    } else {
        if (callAttempt == "1") {
            response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=none#communications")
        } else if (callAttempt == "2") {
            response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=none#communications")
        } else {
            response.redirect("/ur/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=none#communications")
        }
    }
})

router.post('/ur/nfa/record/telephone-call-3-details-answer', function(request, response) {

    var victimInformed = request.session.data['victimInformed']
    if (victimInformed == "Yes"){
        response.redirect("/ur/nfa/record/follow-up-moc?callAttempt=3")
    } else {
        response.redirect("/ur/nfa/victim-record?nfaStatus=after-call-attempt-3&callAttempt=3#communications")
    }
})

router.post('/ur/nfa/send/check-email-details-answer', function(request, response) {

    var sendEmailNow = request.session.data['sendEmailNow']
    if (sendEmailNow == "Yes"){
        response.redirect("/ur/nfa/send/delivered")
    } else {
        response.redirect("/ur/nfa/victim-record?nfaStatus=approved-to-send&pmoc=mobile&fumoc=email#communications")
    }
})

router.post('/ur/nfa/send/check-letter-details-answer', function(request, response) {

    response.redirect("/ur/nfa/send/letter-added-to-print-queue")
})

router.post('/ur/nfa/preferred-method-of-contact-answer', function(request, response) {

    response.redirect("/ur/nfa/victim-record?success=yes&successReason=pmoc-updated#victim-details")
})

// nfa (delivery)

router.post('/delivery/nfa/start-1/sign-in-answer', function(request, response) {

    response.redirect("/delivery/nfa/start-1/search")
})

router.post('/delivery/nfa/draft/nfa-template-answer', function(request, response) {

    response.redirect("/delivery/nfa/draft/compose-letter?nfaStatus=draft-in-progress")
})

router.post('/delivery/nfa/start-2/sign-in-answer', function(request, response) {

    response.redirect("/delivery/nfa/start-2/search")
})

router.post('/delivery/nfa/start-3/sign-in-answer', function(request, response) {

    response.redirect("/delivery/nfa/start-3/search")
})

router.post('/delivery/nfa/start-4/sign-in-answer', function(request, response) {

    response.redirect("/delivery/nfa/start-4/search")
})

router.post('/delivery/nfa/start-5/sign-in-answer', function(request, response) {

    response.redirect("/delivery/nfa/start-5/search")
})

router.post('/delivery/nfa/start-6/sign-in-answer', function(request, response) {

    response.redirect("/delivery/nfa/start-6/search")
})

router.post('/delivery/nfa/start-7/sign-in-answer', function(request, response) {

    response.redirect("/delivery/nfa/start-7/search")
})

router.post('/delivery/nfa/start-8/sign-in-answer', function(request, response) {

    response.redirect("/delivery/nfa/start-8/search")
})

router.post('/delivery/nfa/draft/charging-decision-answer', function(request, response) {

    var decisionType = request.session.data['decisionType']
    if (decisionType == "dtc"){
        response.redirect("/delivery/nfa/draft/first-hearing")
    } else if (decisionType == "mixed-charges") {
        response.redirect("#")
    } else {
        response.redirect("/delivery/nfa/draft/victim-withdrawn")
    }
})

router.post('/delivery/nfa/draft/first-hearing-answer', function(request, response) {

    response.redirect("/delivery/nfa/draft/compose-letter?nfaStatus=draft-in-progress")
})

router.post('/delivery/nfa/draft/cd-modal/request-review-answer', function(request, response) {

    response.redirect("/delivery/nfa/draft/under-review?nfaStatus=draft-under-review")
})

router.post('/delivery/nfa/record/telephone-call-1-details-answer', function(request, response) {

    var victimInformed1 = request.session.data['victimInformed1']
    if (victimInformed1 == "Yes"){
        response.redirect("/delivery/nfa/record/follow-up-moc?callAttempt=1&success=yes&successReason=informed-after-call-1")
    } else {
        response.redirect("/delivery/nfa/record/was-text-message-sent?callAttempt=1&success=yes&successReason=not-informed-after-call-1")
    }
})

router.post('/delivery/nfa/record/was-text-message-sent-answer', function(request, response) {

    var wasTextMessageSent = request.session.data['wasTextMessageSent']
    if (wasTextMessageSent == "Yes"){
        response.redirect("/delivery/nfa/record/text-message-details")
    } else {
        response.redirect("/delivery/nfa/victim-record?pmoc=mobile&nfaStatus=after-call-attempt-1#communications")
    }
})

router.post('/delivery/nfa/record/text-message-details-answer', function(request, response) {

    response.redirect("/delivery/nfa/victim-record?nfaStatus=after-call-attempt-1#communications")
})

router.post('/delivery/nfa/record/next-attempt-moc-answer', function(request, response) {

    var attemptToContactAgain = request.session.data['attemptToContactAgain']
    var callAttempt = request.session.data['callAttempt']

    if (attemptToContactAgain == "Call") {
        if (callAttempt == "1") {
            response.redirect("/delivery/nfa/record/telephone-call-2-details")
        } else {
            response.redirect("/delivery/nfa/record/telephone-call-3-details")
        }
    } else if (attemptToContactAgain == "Email") {
        if (callAttempt == "1") {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=draft-ready-to-send#communications")
        } else if (callAttempt == "2") {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=draft-ready-to-send#communications")
        } else {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=draft-ready-to-send#communications")
        }


    } else {
        response.redirect("/delivery/nfa/victim-record?nfaStatus=draft-ready-to-send#communications")
    }
})

router.post('/delivery/nfa/record/telephone-call-2-details-answer', function(request, response) {

    var victimInformed2 = request.session.data['victimInformed2']
    if (victimInformed2 == "Yes"){
        response.redirect("/delivery/nfa/record/follow-up-moc?callAttempt=2&success=yes&successReason=informed-after-call-2")
    } else {
        response.redirect("/delivery/nfa/victim-record?nfaStatus=after-call-attempt-2&callAttempt=2&success=yes&successReason=not-informed-after-call-2#communications")
    }
})

router.post('/delivery/nfa/record/follow-up-moc-answer', function(request, response) {

    var fumoc = request.session.data['fumoc']
    var callAttempt = request.session.data['callAttempt']

    if (fumoc == "Email"){
        if (callAttempt == "1") {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=email#communications")
        } else if (callAttempt == "2") {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=email#communications")
        } else {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=email#communications")
        }
    } else if (fumoc == "Post") {
        if (callAttempt == "1") {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=post#communications")
        } else if (callAttempt == "2") {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=post#communications")
        } else {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=post#communications")
        }
    } else {
        if (callAttempt == "1") {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-1&fumoc=none#communications")
        } else if (callAttempt == "2") {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-2&fumoc=none#communications")
        } else {
            response.redirect("/delivery/nfa/victim-record?nfaStatus=informed-after-call-3&fumoc=none#communications")
        }
    }
})

router.post('/delivery/nfa/record/telephone-call-3-details-answer', function(request, response) {

    var victimInformed3 = request.session.data['victimInformed3']
    if (victimInformed3 == "Yes"){
        response.redirect("/delivery/nfa/record/follow-up-moc?callAttempt=3&success=yes&successReason=informed-after-call-3")
    } else {
        response.redirect("/delivery/nfa/victim-record?nfaStatus=after-call-attempt-3&callAttempt=3&success=yes&successReason=not-informed-after-call-3#communications")
    }
})

router.post('/delivery/nfa/send/check-email-details-answer', function(request, response) {

    var sendEmailNow = request.session.data['sendEmailNow']
    if (sendEmailNow == "Yes"){
        response.redirect("/delivery/nfa/send/delivered")
    } else {
        response.redirect("/delivery/nfa/victim-record?nfaStatus=approved-to-send&pmoc=mobile&fumoc=email#communications")
    }
})

router.post('/delivery/nfa/send/check-letter-details-answer', function(request, response) {

    response.redirect("/delivery/nfa/send/letter-added-to-print-queue")
})

router.post('/delivery/nfa/send/letter-details-answer', function(request, response) {

    response.redirect("/delivery/nfa/send/letter-logged")
})

router.post('/delivery/nfa/preferred-method-of-contact-answer', function(request, response) {

    response.redirect("/delivery/nfa/victim-record?success=yes&successReason=pmoc-updated#victim-details")
})

// vcl scheme (ur)

router.post('/ur/vcl/start/sign-in-answer', function(request, response) {

    response.redirect("/ur/vcl/start/search")
})

router.post('/ur/vcl/draft/vcl-type-1-answer', function(request, response) {

    var vclType = request.session.data['vclType']
    var vclOption = request.session.data['vclOption']
    if (vclType == "stopped-charge") {
        if (vclOption == "a") {
            response.redirect("/ur/vcl/draft/stopped-charge-1")
        } else {
            response.redirect("/ur/vcl/draft/stopped-charge-2")
        }
    } else {
        response.redirect("/ur/vcl/draft/substantially-altered-charge")
    }
})

router.post('/ur/vcl/draft/stopped-charge-1-answer', function(request, response) {

    response.redirect("/ur/vcl/draft/victim-withdrawal")
})

router.post('/ur/vcl/draft/victim-withdrawal-answer', function(request, response) {

    response.redirect("/ur/vcl/draft/compose-letter?vclStatus=draft-in-progress")
})

router.post('/ur/vcl/draft/altered-charge-type-answer', function(request, response) {

    response.redirect("/ur/vcl/draft/compose-letter?vclStatus=draft-in-progress")
})

router.post('/ur/vcl/draft/stopped-charge-2-answer', function(request, response) {

    response.redirect("/ur/vcl/draft/compose-letter?vclStatus=draft-in-progress")
})

router.post('/ur/vcl/draft/vcl-type-2-answer', function(request, response) {

    var vclType = request.session.data['vclType']
    if (vclType == "no-prosecutution-or-discontinuance-vrr" || vclType == "no-prosecutution-or-discontinuance-withdrawal" || vclType == "no-evidence-vrr" || vclType == "no-evidence-withdrawal"){
        response.redirect("/ur/vcl/draft/compose-letter?vclStatus=draft-in-progress&vclType=stopped-charge")
    } else {
        response.redirect("/ur/vcl/draft/compose-letter?vclStatus=draft-in-progress&vclType=altered-charge")
    }
})

router.post('/ur/vcl/draft/cd-modal/request-review-answer', function(request, response) {

    response.redirect("/ur/vcl/draft/under-review?vclStatus=draft-under-review")
})

router.post('/ur/vcl/record/phone-call-1-answer', function(request, response) {

    var victimInformed1 = request.session.data['victimInformed1']
    if (victimInformed1 == "Yes"){
        response.redirect("/ur/vcl/record/follow-up-moc?callAttempt=1&success=yes&successReason=informed-after-call-1")
    } else {
        response.redirect("/ur/vcl/record/was-text-message-sent?callAttempt=1&success=yes&successReason=not-informed-after-call-1")
    }
})

router.post('/ur/vcl/record/was-text-message-sent-answer', function(request, response) {

    var wasTextMessageSent = request.session.data['wasTextMessageSent']
    if (wasTextMessageSent == "Yes"){
        response.redirect("/ur/vcl/record/text-message-details")
    } else {
        response.redirect("/ur/vcl/victim-record?pmoc=mobile&vclStatus=after-call-attempt-1&subTab=vcl#communications")
    }
})

router.post('/ur/vcl/record/text-message-details-answer', function(request, response) {

    response.redirect("/ur/vcl/victim-record?vclStatus=after-call-attempt-1&subTab=vcl#communications")
})

router.post('/ur/vcl/record/next-attempt-moc-answer', function(request, response) {

    var attemptToContactAgain = request.session.data['attemptToContactAgain']
    var callAttempt = request.session.data['callAttempt']

    if (attemptToContactAgain == "Call") {
        if (callAttempt == "1") {
            response.redirect("/ur/vcl/record/phone-call-2")
        } else {
            response.redirect("/ur/vcl/record/phone-call-3")
        }
    } else if (attemptToContactAgain == "Email") {
        if (callAttempt == "1") {
            response.redirect("/ur/vcl/victim-record?vclStatus=draft-ready-to-send&subTab=vcl#communications")
        } else if (callAttempt == "2") {
            response.redirect("/ur/vcl/victim-record?vclStatus=draft-ready-to-send&subTab=vcl#communications")
        } else {
            response.redirect("/ur/vcl/victim-record?vclStatus=draft-ready-to-send&subTab=vcl#communications")
        }


    } else {
        response.redirect("/ur/vcl/victim-record?vclStatus=draft-ready-to-send&subTab=vcl#communications")
    }
})

router.post('/ur/vcl/record/phone-call-2-answer', function(request, response) {

    var victimInformed2 = request.session.data['victimInformed2']
    if (victimInformed2 == "Yes"){
        response.redirect("/ur/vcl/record/follow-up-moc?callAttempt=2&success=yes&successReason=informed-after-call-2")
    } else {
        response.redirect("/ur/vcl/victim-record?vclStatus=after-call-attempt-2&callAttempt=2&success=yes&successReason=not-informed-after-call-2&subTab=vcl#communications")
    }
})

router.post('/ur/vcl/record/follow-up-moc-answer', function(request, response) {

    var fumoc = request.session.data['fumoc']
    var callAttempt = request.session.data['callAttempt']

    if (fumoc == "Email"){
        if (callAttempt == "1") {
            response.redirect("/ur/vcl/victim-record?vclStatus=informed-after-call-1&fumoc=email&subTab=vcl#communications")
        } else if (callAttempt == "2") {
            response.redirect("/ur/vcl/victim-record?vclStatus=informed-after-call-2&fumoc=email&subTab=vcl#communications")
        } else {
            response.redirect("/ur/vcl/victim-record?vclStatus=informed-after-call-3&fumoc=email&subTab=vcl#communications")
        }
    } else if (fumoc == "Post") {
        if (callAttempt == "1") {
            response.redirect("/ur/vcl/victim-record?vclStatus=informed-after-call-1&fumoc=post&subTab=vcl#communications")
        } else if (callAttempt == "2") {
            response.redirect("/ur/vcl/victim-record?vclStatus=informed-after-call-2&fumoc=post&subTab=vcl#communications")
        } else {
            response.redirect("/ur/vcl/victim-record?vclStatus=informed-after-call-3&fumoc=post&subTab=vcl#communications")
        }
    } else {
        if (callAttempt == "1") {
            response.redirect("/ur/vcl/victim-record?vclStatus=informed-after-call-1&fumoc=none&subTab=vcl#communications")
        } else if (callAttempt == "2") {
            response.redirect("/ur/vcl/victim-record?vclStatus=informed-after-call-2&fumoc=none&subTab=vcl#communications")
        } else {
            response.redirect("/ur/vcl/victim-record?vclStatus=informed-after-call-3&fumoc=none&subTab=vcl#communications")
        }
    }
})

router.post('/ur/vcl/record/phone-call-3-answer', function(request, response) {

    var victimInformed3 = request.session.data['victimInformed3']
    if (victimInformed3 == "Yes"){
        response.redirect("/ur/vcl/record/follow-up-moc?callAttempt=3&success=yes&successReason=informed-after-call-3")
    } else {
        response.redirect("/ur/vcl/victim-record?vclStatus=after-call-attempt-3&callAttempt=3&success=yes&successReason=not-informed-after-call-3&subTab=vcl#communications")
    }
})

router.post('/ur/vcl/send/check-email-details-answer', function(request, response) {

    var sendEmailNow = request.session.data['sendEmailNow']
    if (sendEmailNow == "Yes"){
        response.redirect("/ur/vcl/send/delivered")
    } else {
        response.redirect("/ur/vcl/victim-record?vclStatus=approved-to-send&pmoc=mobile&fumoc=email&subTab=vcl#communications")
    }
})

router.post('/ur/vcl/send/check-letter-details-answer', function(request, response) {

    response.redirect("/ur/vcl/send/letter-added-to-print-queue")
})

router.post('/ur/vcl/send/letter-details-answer', function(request, response) {

    response.redirect("/ur/vcl/send/letter-logged")
})

router.post('/ur/vcl/preferred-method-of-contact-answer', function(request, response) {

    response.redirect("/ur/vcl/victim-record?success=yes&successReason=pmoc-updated#victim-details")
})


// vcl scheme (delivery)

router.post('/delivery/vcl/start/sign-in-answer', function(request, response) {

    response.redirect("/delivery/vcl/start/search")
})

router.post('/delivery/vcl/draft/vcl-type-answer', function(request, response) {

    var vclType = request.session.data['vclType']
    if (vclType == "stopped-charge") {
        response.redirect("/delivery/vcl/draft/stopped-charge")
    } else {
        response.redirect("/delivery/vcl/draft/substantially-altered-charge")
    }
})

router.post('/delivery/vcl/draft/stopped-charge-1-answer', function(request, response) {

    response.redirect("/delivery/vcl/draft/victim-withdrawal")
})

router.post('/delivery/vcl/draft/victim-withdrawal-answer', function(request, response) {

    response.redirect("/delivery/vcl/draft/compose-letter?vclStatus=draft-in-progress")
})

router.post('/delivery/vcl/draft/altered-charge-type-answer', function(request, response) {

    response.redirect("/delivery/vcl/draft/compose-letter?vclStatus=draft-in-progress")
})

router.post('/delivery/vcl/draft/stopped-charge-2-answer', function(request, response) {

    response.redirect("/delivery/vcl/draft/compose-letter?vclStatus=draft-in-progress")
})

router.post('/delivery/vcl/draft/vcl-type-2-answer', function(request, response) {

    var vclType = request.session.data['vclType']
    if (vclType == "no-prosecutution-or-discontinuance-vrr" || vclType == "no-prosecutution-or-discontinuance-withdrawal" || vclType == "no-evidence-vrr" || vclType == "no-evidence-withdrawal"){
        response.redirect("/delivery/vcl/draft/compose-letter?vclStatus=draft-in-progress&vclType=stopped-charge")
    } else {
        response.redirect("/delivery/vcl/draft/compose-letter?vclStatus=draft-in-progress&vclType=altered-charge")
    }
})

router.post('/delivery/vcl/draft/cd-modal/request-review-answer', function(request, response) {

    response.redirect("/delivery/vcl/draft/under-review?vclStatus=draft-under-review")
})

router.post('/delivery/vcl/record/phone-call-1-answer', function(request, response) {

    var victimInformed1 = request.session.data['victimInformed1']
    if (victimInformed1 == "Yes"){
        response.redirect("/delivery/vcl/record/follow-up-moc?callAttempt=1&success=yes&successReason=informed-after-call-1")
    } else {
        response.redirect("/delivery/vcl/record/was-text-message-sent?callAttempt=1&success=yes&successReason=not-informed-after-call-1")
    }
})

router.post('/delivery/vcl/record/was-text-message-sent-answer', function(request, response) {

    var wasTextMessageSent = request.session.data['wasTextMessageSent']
    if (wasTextMessageSent == "Yes"){
        response.redirect("/delivery/vcl/record/text-message-details")
    } else {
        response.redirect("/delivery/vcl/victim-record?pmoc=mobile&vclStatus=after-call-attempt-1&subTab=vcl#communications")
    }
})

router.post('/delivery/vcl/record/text-message-details-answer', function(request, response) {

    response.redirect("/delivery/vcl/victim-record?vclStatus=after-call-attempt-1&subTab=vcl#communications")
})

router.post('/delivery/vcl/record/next-attempt-moc-answer', function(request, response) {

    var attemptToContactAgain = request.session.data['attemptToContactAgain']
    var callAttempt = request.session.data['callAttempt']

    if (attemptToContactAgain == "Call") {
        if (callAttempt == "1") {
            response.redirect("/delivery/vcl/record/phone-call-2")
        } else {
            response.redirect("/delivery/vcl/record/phone-call-3")
        }
    } else if (attemptToContactAgain == "Email") {
        if (callAttempt == "1") {
            response.redirect("/delivery/vcl/victim-record?vclStatus=draft-ready-to-send&attemptToContactAgain=email&subTab=vcl#communications")
        } else if (callAttempt == "2") {
            response.redirect("/delivery/vcl/victim-record?vclStatus=draft-ready-to-send&attemptToContactAgain=email&subTab=vcl#communications")
        } else {
            response.redirect("/delivery/vcl/victim-record?vclStatus=draft-ready-to-send&attemptToContactAgain=email&subTab=vcl#communications")
        }


    } else {
        response.redirect("/delivery/vcl/victim-record?vclStatus=draft-ready-to-send&attemptToContactAgain=post&subTab=vcl#communications")
    }
})

router.post('/delivery/vcl/record/phone-call-2-answer', function(request, response) {

    var victimInformed2 = request.session.data['victimInformed2']
    if (victimInformed2 == "Yes"){
        response.redirect("/delivery/vcl/record/follow-up-moc?callAttempt=2&success=yes&successReason=informed-after-call-2")
    } else {
        response.redirect("/delivery/vcl/victim-record?vclStatus=after-call-attempt-2&callAttempt=2&success=yes&successReason=not-informed-after-call-2&subTab=vcl#communications")
    }
})

router.post('/delivery/vcl/record/follow-up-moc-answer', function(request, response) {

    var fumoc = request.session.data['fumoc']
    var callAttempt = request.session.data['callAttempt']

    if (fumoc == "Email"){
        if (callAttempt == "1") {
            response.redirect("/delivery/vcl/victim-record?vclStatus=informed-after-call-1&fumoc=email&subTab=vcl#communications")
        } else if (callAttempt == "2") {
            response.redirect("/delivery/vcl/victim-record?vclStatus=informed-after-call-2&fumoc=email&subTab=vcl#communications")
        } else {
            response.redirect("/delivery/vcl/victim-record?vclStatus=informed-after-call-3&fumoc=email&subTab=vcl#communications")
        }
    } else if (fumoc == "Post") {
        if (callAttempt == "1") {
            response.redirect("/delivery/vcl/victim-record?vclStatus=informed-after-call-1&fumoc=post&subTab=vcl#communications")
        } else if (callAttempt == "2") {
            response.redirect("/delivery/vcl/victim-record?vclStatus=informed-after-call-2&fumoc=post&subTab=vcl#communications")
        } else {
            response.redirect("/delivery/vcl/victim-record?vclStatus=informed-after-call-3&fumoc=post&subTab=vcl#communications")
        }
    } else {
        if (callAttempt == "1") {
            response.redirect("/delivery/vcl/victim-record?vclStatus=informed-after-call-1&fumoc=none&subTab=vcl#communications")
        } else if (callAttempt == "2") {
            response.redirect("/delivery/vcl/victim-record?vclStatus=informed-after-call-2&fumoc=none&subTab=vcl#communications")
        } else {
            response.redirect("/delivery/vcl/victim-record?vclStatus=informed-after-call-3&fumoc=none&subTab=vcl#communications")
        }
    }
})

router.post('/delivery/vcl/record/phone-call-3-answer', function(request, response) {

    var victimInformed3 = request.session.data['victimInformed3']
    if (victimInformed3 == "Yes"){
        response.redirect("/delivery/vcl/record/follow-up-moc?callAttempt=3&success=yes&successReason=informed-after-call-3")
    } else {
        response.redirect("/delivery/vcl/victim-record?vclStatus=after-call-attempt-3&callAttempt=3&success=yes&successReason=not-informed-after-call-3&subTab=vcl#communications")
    }
})

router.post('/delivery/vcl/send/check-email-details-answer', function(request, response) {

    var sendEmailNow = request.session.data['sendEmailNow']
    if (sendEmailNow == "Yes"){
        response.redirect("/delivery/vcl/send/delivered")
    } else {
        response.redirect("/delivery/vcl/victim-record?vclStatus=approved-to-send&pmoc=mobile&fumoc=email&subTab=vcl#communications")
    }
})

router.post('/delivery/vcl/send/check-letter-details-answer', function(request, response) {

    response.redirect("/delivery/vcl/send/letter-added-to-print-queue")
})

router.post('/delivery/vcl/send/letter-details-answer', function(request, response) {

    response.redirect("/delivery/vcl/send/letter-logged")
})

router.post('/delivery/vcl/preferred-method-of-contact-answer', function(request, response) {

    response.redirect("/delivery/vcl/victim-record?success=yes&successReason=pmoc-updated#victim-details")
})


router.post('/purpose-answer', function(request, response) {

	var purpose = request.session.data['purpose']
	if (purpose == "pre-trial"){
		response.redirect("/ur/meetings/meeting-date")
	} else {
		response.redirect("/ineligible-country")
	}
})

router.post('/format-answer', function(request, response) {

	var format = request.session.data['format']
	if (format == "face-to-face"){
		response.redirect("/ur/meetings/location")
	} else {
		response.redirect("/ur/meetings/who-is-attending")
	}
})

router.post('/location-answer', function(request, response) {

	var location = request.session.data['location']
	if (location == "cps"){
		response.redirect("/ur/meetings/cps-location")
  }
  else if (location == "magistrate"){
		response.redirect("/ur/meetings/magistrate-location")
	}

else if (location == "crown"){
  response.redirect("/ur/meetings/crown-location")

	} else {
		response.redirect("/ur/meetings/police-station")
	}
})
