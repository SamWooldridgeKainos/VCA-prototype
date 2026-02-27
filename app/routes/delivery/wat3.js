module.exports = router => {

    //onb

    router.post('/delivery/wat3/sign-in-answer', function(request, response) {

        response.redirect("/delivery/wat3/tasks")
    })

    router.post('/delivery/wat3/onb/service-lead-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-details?successNotification=yes&onboardedStatus=Yes")
    })

    router.post('/delivery/wat3/check-details/case-type-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-details?successNotification=yes")
    })

    router.post('/delivery/wat3/check-details/risk-level-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-details?successNotification=yes")
    })

    router.post('/delivery/wat3/check-details/pmoc-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-details?successNotification=yes")
    })

    router.post('/delivery/wat3/check-details/preferred-name-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-details?successNotification=yes")
    })

    router.post('/delivery/wat3/check-details/preferred-contact-times-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-details?successNotification=yes")
    })

    router.post('/delivery/wat3/check-details/preferred-correspondence-language-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-details?successNotification=yes")
    })

    router.post('/delivery/wat3/check-details/translator-needed-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-details?successNotification=yes")
    })

    router.post('/delivery/wat3/check-details/vps-status-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-details?successNotification=yes")
    })

    router.post('/delivery/wat3/onb/check-details-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/next-task?successNotification=false")
    })

    router.post('/delivery/wat3/onb/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "Other") {
            response.redirect("/delivery/wat3/onb/manual-task")
        } else if (nextTask == "No task at this time") {
            response.redirect("/delivery/wat3/onb/check-task?manualTask=no")
        } else {
            response.redirect("/delivery/wat3/onb/next-task-due-date")
        }
    })

    router.post('/delivery/wat3/onb/next-task-due-date-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-task?manualTask=no")
    })

    router.post('/delivery/wat3/onb/manual-task-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/check-task?manualTask=yes")
    })

    router.post('/delivery/wat3/onb/check-task-answer', function(request, response) {

        response.redirect("/delivery/wat3/onb/onboarded")
    })

    router.post('/delivery/wat3/onb/vlo-answer', function(request, response) {

        // Store vlo in session
        request.session.data['vlo'] = request.body.vlo || ''

        response.redirect("/delivery/wat3/victims?success=yes&successReason=vlo-updated")
    })

    router.post('/delivery/wat3/onb/task-assignee-answer', function(request, response) {

        // Store task assignee in session
        request.session.data['task-assignee'] = request.body['task-assignee'] || ''

        response.redirect("/delivery/wat3/onb/tasks?success=yes&successReason=assignee-updated")
    })

    router.post('/delivery/wat3/victim/new-task/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "Inform of a decision to charge") {
            response.redirect("/delivery/wat3/victim/new-task/task-due-date?pcdType=dtc")
        } else if (nextTask == "Inform of a no further action decision") {
            response.redirect("/delivery/wat3/victim/new-task/task-due-date?pcdType=nfa")
        } else if (nextTask == "Inform of a stopped charge") {
            response.redirect("/delivery/wat3/victim/new-task/task-due-date?vclType=stopped-charge")
        } else if (nextTask == "Inform of a substantially altered charge") {
            response.redirect("/delivery/wat3/victim/new-task/task-due-date?vclType=altered-charge")
        } else if (nextTask == "Other") {
            response.redirect("/delivery/wat3/victim/new-task/manual-task")
        } else if (nextTask == "No task at this time") {
            response.redirect("/delivery/wat3/victim/new-task/check-task")
        } else {
            response.redirect("/delivery/wat3/victim/new-task/task-due-date")
        }
    })

    router.post('/delivery/wat3/victim/new-task/task-due-date-answer', function(request, response) {

        response.redirect("/delivery/wat3/victim/new-task/check-task")
    })

    router.post('/delivery/wat3/victim/new-task/manual-task-answer', function(request, response) {

        response.redirect("/delivery/wat3/victim/new-task/check-task?manualTask=yes")
    })

    router.post('/delivery/wat3/victim/new-task/check-task-answer', function(request, response) {

        response.redirect("/delivery/wat3/victim/new-task/task-created")
    })

    router.post('/delivery/wat3/victim/new-task/task-created-answer', function(request, response) {

        response.redirect("/delivery/wat3/victim/tasks")
    })

    router.post('/delivery/wat3/task-assignee-answer', function(request, response) {

        // Store task assignee in session
        request.session.data['task-assignee'] = request.body['task-assignee'] || ''

        response.redirect("/delivery/wat3/tasks?success=yes&successReason=assignee-updated")
    })

    router.post('/delivery/wat3/change-task-due-date-answer', function(request, response) {
        
        response.redirect("/delivery/wat3/tasks?success=yes&successReason=due-date-updated")
    })

    //pcd

    router.post('/delivery/wat3/pcd/sign-in-answer', function(request, response) {

        response.redirect("/delivery/wat3/pcd/overview")
    })

    router.get('/delivery/wat3/pcd/pre-draft/check-details-answer', function(request, response) {

        response.redirect("/delivery/wat3/pcd/pre-draft/contacted-by?pcdStatus=log-not-started")
    })

    router.post('/delivery/wat3/pcd/pre-draft/contacted-by-answer', function(request, response) {

        var contactedBy = request.session.data['contactedBy']

        if (contactedBy == "call") {
            response.redirect("/delivery/wat3/pcd/call/phone-call-1")
        } else if (contactedBy == "email") {
            response.redirect("/delivery/wat3/pcd/send/email-details")
        } else if (contactedBy == "post") {
            response.redirect("/delivery/wat3/pcd/send/letter-details")
        } else {
            response.redirect("/delivery/wat3/pcd/pre-draft/contact-details?contactMethod=other")
        }
    })

    router.post('/delivery/wat3/pcd/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/delivery/wat3/pcd/draft/under-review?pcdStatus=draft-under-review")
    })

    router.post('/delivery/wat3/pcd/call/phone-call-1-answer', function(request, response) {

        var pcdVictimInformed1 = request.session.data['pcdVictimInformed1']

        if (pcdVictimInformed1 == "Yes"){
            response.redirect("/delivery/wat3/pcd/call/follow-up-moc?pcdStatus=select-fumoc&pcdCallAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/delivery/wat3/pcd/call/was-text-message-sent?pcdStatus=before-text-logged&pcdCallAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/delivery/wat3/pcd/call/was-text-message-sent-answer', function(request, response) {

        var pcdWasTextMessageSent = request.session.data['pcdWasTextMessageSent']

        if (pcdWasTextMessageSent == "Yes"){
            response.redirect("/delivery/wat3/pcd/call/text-message-details")
        } else {
            response.redirect("/delivery/wat3/victim?pmoc=mobile&pcdStatus=after-call-attempt-1&secondaryNav=pcd")
        }
    })

    router.post('/delivery/wat3/pcd/call/text-message-details-answer', function(request, response) {

        response.redirect("/delivery/wat3/victim?pcdStatus=after-call-attempt-1&secondaryNav=pcd")
    })

    router.post('/delivery/wat3/pcd/call/next-attempt-moc-answer', function(request, response) {

        var pcdAttemptToContactAgain = request.session.data['pcdAttemptToContactAgain']
        var pcdCallAttempt = request.session.data['pcdCallAttempt']

        if (pcdAttemptToContactAgain == "call") {
            if (pcdCallAttempt == "1") {
                response.redirect("/delivery/wat3/pcd/call/phone-call-2")
            } else {
                response.redirect("/delivery/wat3/pcd/call/phone-call-3")
            }

        } else if (pcdAttemptToContactAgain == "email") {
            if (pcdCallAttempt == "1") {
                response.redirect("/delivery/wat3/pcd/send/email-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/delivery/wat3/pcd/send/email-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            } else {
                response.redirect("/delivery/wat3/pcd/send/email-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            }
            
        } else {
            response.redirect("/delivery/wat3/pcd/send/letter-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=post&secondaryNav=pcd")
        }
    })

    router.post('/delivery/wat3/pcd/call/phone-call-2-answer', function(request, response) {

        var pcdVictimInformed2 = request.session.data['pcdVictimInformed2']
        if (pcdVictimInformed2 == "Yes"){
            response.redirect("/delivery/wat3/pcd/call/follow-up-moc?pcdStatus=select-fumoc&pcdCallAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/delivery/wat3/victim?pcdStatus=after-call-attempt-2&pcdCallAttempt=2&success=yes&successReason=not-informed-after-call-2&secondaryNav=pcd")
        }
    })

    router.post('/delivery/wat3/pcd/call/follow-up-moc-answer', function(request, response) {

        var pcdFumoc = request.session.data['pcdFumoc']
        var pcdCallAttempt = request.session.data['pcdCallAttempt']

        if (pcdFumoc == "Email"){
            if (pcdCallAttempt == "1") {
                response.redirect("/delivery/wat3/pcd/send/email-details?pcdStatus=informed-after-call-1&pcdFumoc=email&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/delivery/wat3/pcd/send/email-details?pcdStatus=informed-after-call-2&pcdFumoc=email&secondaryNav=pcd")
            } else {
                response.redirect("/delivery/wat3/pcd/send/email-details?pcdStatus=informed-after-call-3&pcdFumoc=email&secondaryNav=pcd")
            }

        } else if (pcdFumoc == "Post") {
            if (pcdCallAttempt == "1") {
                response.redirect("/delivery/wat3/pcd/send/letter-details?pcdStatus=informed-after-call-1&pcdFumoc=post&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/delivery/wat3/pcd/send/letter-details?pcdStatus=informed-after-call-2&pcdFumoc=post&secondaryNav=pcd")
            } else {
                response.redirect("/delivery/wat3/pcd/send/letter-details?pcdStatus=informed-after-call-3&pcdFumoc=post&secondaryNav=pcd")
            }

        } else {
            if (pcdCallAttempt == "1") {
                response.redirect("/delivery/wat3/victim?pcdStatus=informed-after-call-1&pcdFumoc=none&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/delivery/wat3/victim?pcdStatus=informed-after-call-2&pcdFumoc=none&secondaryNav=pcd")
            } else {
                response.redirect("/delivery/wat3/victim?pcdStatus=informed-after-call-3&pcdFumoc=none&secondaryNav=pcd")
            }
        }
    })

    router.post('/delivery/wat3/pcd/call/phone-call-3-answer', function(request, response) {

        var pcdVictimInformed3 = request.session.data['pcdVictimInformed3']

        if (pcdVictimInformed3 == "Yes"){
            response.redirect("/delivery/wat3/pcd/call/follow-up-moc?pcdStatus=select-fumoc&pcdCallAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/delivery/wat3/victim?pcdStatus=after-call-attempt-3&pcdCallAttempt=3&success=yes&successReason=not-informed-after-call-3&secondaryNav=pcd")
        }
    })

    router.post('/delivery/wat3/pcd/send/email-details-answer', function(request, response) {

        response.redirect("/delivery/wat3/pcd/send/email-logged")
    })

    router.post('/delivery/wat3/pcd/send/letter-details-answer', function(request, response) {

        response.redirect("/delivery/wat3/pcd/send/letter-logged")
    })

    router.post('/delivery/wat3/pcd/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/delivery/wat3/victim?success=yes&successReason=pmoc-updated#victim-details")
    })

    //vcl

    router.get('/delivery/wat3/vcl/pre-draft/check-details-answer', function(request, response) {

        var vclType = request.session.data['vclType']

        if (vclType == "stopped-charge") {
            response.redirect("/delivery/wat3/vcl/draft/stopped-charge")
        } else {
            response.redirect("/delivery/wat3/vcl/draft/substantially-altered-charge")
        }
    })

    router.post('/delivery/wat3/vcl/draft/stopped-charge-answer', function(request, response) {

        response.redirect("/delivery/wat3/vcl/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/delivery/wat3/vcl/draft/altered-charge-answer', function(request, response) {

        response.redirect("/delivery/wat3/vcl/draft/compose-letter?vclStatus=draft-in-progress")
    })

    router.post('/delivery/wat3/vcl/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/delivery/wat3/vcl/draft/under-review?vclStatus=draft-under-review")
    })

    router.post('/delivery/wat3/vcl/call/phone-call-1-answer', function(request, response) {

        var vclVictimInformed1 = request.session.data['vclVictimInformed1']

        if (vclVictimInformed1 == "Yes"){
            response.redirect("/delivery/wat3/vcl/call/follow-up-moc?vclCallAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/delivery/wat3/vcl/call/was-text-message-sent?vclCallAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/delivery/wat3/vcl/call/was-text-message-sent-answer', function(request, response) {

        var vclWasTextMessageSent = request.session.data['vclWasTextMessageSent']

        if (vclWasTextMessageSent == "Yes"){
            response.redirect("/delivery/wat3/vcl/call/text-message-details")
        } else {
            response.redirect("/delivery/wat3/victim?pmoc=mobile&vclStatus=after-call-attempt-1&secondaryNav=vcl")
        }
    })

    router.post('/delivery/wat3/vcl/call/text-message-details-answer', function(request, response) {

        response.redirect("/delivery/wat3/victim?vclStatus=after-call-attempt-1&secondaryNav=vcl")
    })

    router.post('/delivery/wat3/vcl/call/next-attempt-moc-answer', function(request, response) {

        var vclAttemptToContactAgain = request.session.data['vclAttemptToContactAgain']
        var vclCallAttempt = request.session.data['vclCallAttempt']

        if (vclAttemptToContactAgain == "call") {
            if (vclCallAttempt == "1") {
                response.redirect("/delivery/wat3/vcl/call/phone-call-2")
            } else {
                response.redirect("/delivery/wat3/vcl/call/phone-call-3")
            }

        } else if (vclAttemptToContactAgain == "email") {
            if (vclCallAttempt == "1") {
                response.redirect("/delivery/wat3/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=email&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/delivery/wat3/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=email&secondaryNav=vcl")
            } else {
                response.redirect("/delivery/wat3/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=email&secondaryNav=vcl")
            }
            
        } else {
            response.redirect("/delivery/wat3/victim?vclStatus=draft-ready-to-send&vclAttemptToContactAgain=post&secondaryNav=vcl")
        }
    })

    router.post('/delivery/wat3/vcl/call/phone-call-2-answer', function(request, response) {

        var vclVictimInformed2 = request.session.data['vclVictimInformed2']

        if (vclVictimInformed2 == "Yes"){
            response.redirect("/delivery/wat3/vcl/call/follow-up-moc?vclCallAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/delivery/wat3/victim?vclStatus=after-call-attempt-2&vclCallAttempt=2&success=yes&successReason=not-informed-after-call-2&secondaryNav=vcl")
        }
    })

    router.post('/delivery/wat3/vcl/call/follow-up-moc-answer', function(request, response) {

        var vclFumoc = request.session.data['vclFumoc']
        var vclCallAttempt = request.session.data['vclCallAttempt']

        if (vclFumoc == "email"){
            if (vclCallAttempt == "1") {
                response.redirect("/delivery/wat3/victim?vclStatus=informed-after-call-1&vclFumoc=email&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/delivery/wat3/victim?vclStatus=informed-after-call-2&vclFumoc=email&secondaryNav=vcl")
            } else {
                response.redirect("/delivery/wat3/victim?vclStatus=informed-after-call-3&vclFumoc=email&secondaryNav=vcl")
            }

        } else if (vclFumoc == "post") {
            if (vclCallAttempt == "1") {
                response.redirect("/delivery/wat3/victim?vclStatus=informed-after-call-1&vclFumoc=post&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/delivery/wat3/victim?vclStatus=informed-after-call-2&vclFumoc=post&secondaryNav=vcl")
            } else {
                response.redirect("/delivery/wat3/victim?vclStatus=informed-after-call-3&vclFumoc=post&secondaryNav=vcl")
            }

        } else {
            if (vclCallAttempt == "1") {
                response.redirect("/delivery/wat3/victim?vclStatus=informed-after-call-1&vclFumoc=none&secondaryNav=vcl")
            } else if (vclCallAttempt == "2") {
                response.redirect("/delivery/wat3/victim?vclStatus=informed-after-call-2&vclFumoc=none&secondaryNav=vcl")
            } else {
                response.redirect("/delivery/wat3/victim?vclStatus=informed-after-call-3&vclFumoc=none&secondaryNav=vcl")
            }
        }
    })

    router.post('/delivery/wat3/vcl/call/phone-call-3-answer', function(request, response) {

        var vclVictimInformed3 = request.session.data['vclVictimInformed3']

        if (vclVictimInformed3 == "Yes"){
            response.redirect("/delivery/wat3/vcl/call/follow-up-moc?vclCallAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/delivery/wat3/victim?vclStatus=after-call-attempt-3&vclCallAttempt=3&success=yes&successReason=not-informed-after-call-3&secondaryNav=vcl")
        }
    })

    router.post('/delivery/wat3/vcl/send/check-email-details-answer', function(request, response) {

        var sendEmailNow = request.session.data['sendEmailNow']

        if (sendEmailNow == "Yes"){
            response.redirect("/delivery/wat3/vcl/send/delivered")
        } else {
            response.redirect("/delivery/wat3/victim?vclStatus=approved-to-send&pmoc=mobile&vclFumoc=email&secondaryNav=vcl")
        }
    })

    router.post('/delivery/wat3/vcl/send/check-letter-details-answer', function(request, response) {

        response.redirect("/delivery/wat3/vcl/send/letter-added-to-print-queue")
    })

    router.post('/delivery/wat3/vcl/send/letter-details-answer', function(request, response) {

        response.redirect("/delivery/wat3/vcl/send/letter-logged")
    })

    router.post('/delivery/wat3/vcl/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/delivery/wat3/victim?success=yes&successReason=pmoc-updated#victim-details")
    })


     router.post('/delivery/wat3/wft-meetings/new-task/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "ptm") {
            response.redirect("/delivery/wat3/onb/manual-task")
        } else if (nextTask == "No task at this time") {
            response.redirect("/delivery/wat3/onb/check-task?manualTask=no")
        } else {
            response.redirect("/delivery/wat3/wft-meetings/new-task/purposet")
        }
    })

   
router.post('/delivery/wat3/wft-meetings/new-task/purposet-answer', function(request, response) {

	var purposet = request.session.data['purposet']
	if (purposet == "yes"){
		response.redirect("/delivery/wat3/wft-meetings/new-task/task-due-date")
	} else {
		response.redirect("/delivery/wat3/wft-meetings/new-task/task-due-date")
	}
})

  router.post('/delivery/wat3/wft-meetings/new-task/task-due-date-answer', function(request, response) {

        response.redirect("/delivery/wat3/wft-meetings/new-task/check-task")
    })


}