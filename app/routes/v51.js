// Convert DD/MM/YYYY + optional HH:MM to YYYY-MM-DDTHH:MM for sorting
function toSortDate(dateString, hour, minutes) {
    if (!dateString || !dateString.includes('/')) return ''
    var parts = dateString.split('/')
    if (parts.length !== 3) return ''
    var now = new Date()
    var h = (hour || now.getHours().toString()).toString().padStart(2, '0')
    var m = (minutes || now.getMinutes().toString()).toString().padStart(2, '0')
    return parts[2] + '-' + parts[1] + '-' + parts[0] + 'T' + h + ':' + m
}

module.exports = router => {

    // Clear success flags when navigating between pages (GET requests).
    // Success banners are triggered via redirects with ?success=yes (or
    // ?successNotification=yes). The prototype kit copies session.data into
    // res.locals.data BEFORE this handler runs, so we must update both for
    // the template to see the cleared values.
    router.get('/v51/*', function(request, response, next) {
        if (request.query.success === undefined) {
            request.session.data.success = 'no'
            request.session.data.successReason = ''
            response.locals.data.success = 'no'
            response.locals.data.successReason = ''
        }
        if (request.query.successNotification === undefined) {
            request.session.data.successNotification = 'no'
            response.locals.data.successNotification = 'no'
        }
        next()
    })

    //onb

    router.post('/v51/sign-in-answer', function(request, response) {

        response.redirect("/v51/tasks")
    })

    router.post('/v51/onb/service-lead-answer', function(request, response) {

        response.redirect("/v51/onb/check-details?successNotification=yes&onboardedStatus=Yes")
    })

    router.post('/v51/check-details/case-type-answer', function(request, response) {

        response.redirect("/v51/onb/check-details?successNotification=yes")
    })

    router.post('/v51/check-details/risk-level-answer', function(request, response) {

        response.redirect("/v51/onb/check-details?successNotification=yes")
    })

    router.post('/v51/check-details/pmoc-answer', function(request, response) {

        response.redirect("/v51/onb/check-details?successNotification=yes")
    })

    router.post('/v51/check-details/preferred-name-answer', function(request, response) {

        response.redirect("/v51/onb/check-details?successNotification=yes")
    })

    router.post('/v51/check-details/preferred-contact-times-answer', function(request, response) {

        response.redirect("/v51/onb/check-details?successNotification=yes")
    })

    router.post('/v51/check-details/preferred-correspondence-language-answer', function(request, response) {

        response.redirect("/v51/onb/check-details?successNotification=yes")
    })

    router.post('/v51/check-details/translator-needed-answer', function(request, response) {

        response.redirect("/v51/onb/check-details?successNotification=yes")
    })

    router.post('/v51/check-details/vps-status-answer', function(request, response) {

        response.redirect("/v51/onb/check-details?successNotification=yes")
    })

    router.post('/v51/onb/check-details-answer', function(request, response) {

        response.redirect("/v51/onb/next-task?successNotification=false")
    })

    router.post('/v51/onb/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "other") {
            response.redirect("/v51/onb/manual-task")
        } else if (nextTask == "no-task") {
            response.redirect("/v51/onb/check-task?manualTask=no")
        } else if (nextTask == "meeting-offer" || nextTask == "meeting-arranged" || nextTask == "meeting-outcome") {
            response.redirect("/v51/onb/meeting-purpose")
        } else {
            response.redirect("/v51/onb/next-task-due-date")
        }
    })

    router.post('/v51/onb/meeting-purpose-answer', function(request, response) {

        response.redirect("/v51/onb/next-task-due-date")
    })

    router.post('/v51/onb/next-task-due-date-answer', function(request, response) {

        response.redirect("/v51/onb/check-task?manualTask=no")
    })

    router.post('/v51/onb/manual-task-answer', function(request, response) {

        response.redirect("/v51/onb/check-task?manualTask=yes")
    })

    router.get('/v51/onb/check-task-vlo', function(request, response, next) {
        request.session.data.vloReturnTo = request.query.returnTo || ''
        next()
    })

    router.post('/v51/onb/check-task-vlo-answer', function(request, response) {

        request.session.data['vlo'] = request.body.vlo || ''

        if (request.session.data.vloReturnTo === 'check-task') {
            delete request.session.data.vloReturnTo
            response.redirect("/v51/onb/check-task")
        } else if (request.session.data.vloReturnTo === 'check-details') {
            delete request.session.data.vloReturnTo
            response.redirect("/v51/onb/check-details?successNotification=yes&detailChange=vlo")
        } else {
            response.redirect("/v51/onb/check-details?successNotification=yes&detailChange=vlo")
        }
    })

    router.post('/v51/onb/check-task-answer', function(request, response) {

        response.redirect("/v51/onb/onboarded")
    })

    router.post('/v51/onb/vlo-answer', function(request, response) {

        // Store vlo in session
        request.session.data['vlo'] = request.body.vlo || ''

        response.redirect("/v51/victims?success=yes&successReason=vlo-updated")
    })

    router.post('/v51/onb/task-assignee-answer', function(request, response) {

        // Store task assignee in session
        request.session.data['task-assignee'] = request.body['task-assignee'] || ''

        response.redirect("/v51/onb/tasks?success=yes&successReason=assignee-updated")
    })

    router.get('/v51/victim/new-task/task-selection', function(request, response) {
        var fromCheck = request.query.fromCheck === 'yes'
        delete request.session.data['fromCheck']

        // Clear previous task data when starting a new task (not returning from check page)
        if (!fromCheck) {
            delete request.session.data['nextTask']
            delete request.session.data['meetingPurpose']
            delete request.session.data['meetingPurposeDetails']
            delete request.session.data['taskDueDate']
            delete request.session.data['manualTaskName']
            delete request.session.data['taskNote']
        }

        response.render('v51/victim/new-task/task-selection', {
            fromCheck: fromCheck
        })
    })

    router.post('/v51/victim/new-task/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "dtc") {
            response.redirect("/v51/victim/new-task/task-due-date?pcdType=dtc")
        } else if (nextTask == "nfa") {
            response.redirect("/v51/victim/new-task/task-due-date?pcdType=nfa")
        } else if (nextTask == "stopped-charge") {
            response.redirect("/v51/victim/new-task/task-due-date?vclType=stopped-charge")
        } else if (nextTask == "altered-charge") {
            response.redirect("/v51/victim/new-task/task-due-date?vclType=altered-charge")
        } else if (nextTask == "other") {
            response.redirect("/v51/victim/new-task/manual-task")
        } else if (nextTask == "no-task") {
            response.redirect("/v51/victim/new-task/check-task")
        } else if (nextTask == "meeting-offer" || nextTask == "meeting-arranged" || nextTask == "meeting-outcome") {
            response.redirect("/v51/victim/new-task/meeting-purpose")
        } else {
            response.redirect("/v51/victim/new-task/task-due-date")
        }
    })

    router.post('/v51/victim/new-task/meeting-purpose-answer', function(request, response) {

        response.redirect("/v51/victim/new-task/task-due-date")
    })

    router.get('/v51/victim/new-task/task-due-date', function(request, response) {
        var fromCheck = request.query.fromCheck === 'yes'
        var fromTaskAlreadyExists = request.query.fromTaskAlreadyExists === 'yes'
        var fromPcd = request.query.fromPcd === 'yes'
        delete request.session.data['fromCheck']
        response.render('v51/victim/new-task/task-due-date', {
            fromCheck: fromCheck,
            fromTaskAlreadyExists: fromTaskAlreadyExists,
            fromPcd: fromPcd
        })
    })

    router.post('/v51/victim/new-task/task-already-exists-answer', function(request, response) {

        // Restore the pre-existing task due date so the Tasks page shows the original value
        request.session.data['taskDueDate'] = request.session.data['existingTaskDueDate'] || ''

        response.redirect("/v51/tasks")
    })

    router.post('/v51/victim/new-task/task-due-date-answer', function(request, response) {

        if (request.body.fromTaskAlreadyExists === 'yes') {
            request.session.data['existingTaskDueDate'] = request.session.data['taskDueDate'] || ''
            if (request.body.fromPcd === 'yes') {
                return response.redirect("/v51/victim?success=yes&successReason=due-date-updated&secondaryNav=pcd#communications")
            }
            return response.redirect("/v51/tasks?success=yes&successReason=due-date-updated")
        }

        response.redirect("/v51/victim/new-task/check-task")
    })

    router.post('/v51/victim/new-task/manual-task-answer', function(request, response) {

        response.redirect("/v51/victim/new-task/check-task?manualTask=yes")
    })

    router.post('/v51/victim/new-task/check-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask'] || ''
        var meetingPurpose = request.session.data['meetingPurpose'] || ''
        var existingTask = request.session.data['existingTask'] || ''
        var existingMeetingPurpose = request.session.data['existingMeetingPurpose'] || ''

        var meetingTasks = ['meeting-offer', 'meeting-arranged', 'meeting-outcome']
        var isMeetingTask = meetingTasks.indexOf(nextTask) !== -1
        var existingIsMeetingTask = meetingTasks.indexOf(existingTask) !== -1

        // Block duplicate non-meeting tasks, or meeting tasks with the same purpose (regardless of meeting type)
        var duplicateNonMeeting = existingTask && nextTask === existingTask && !isMeetingTask && nextTask !== 'other' && nextTask !== 'no-task'
        var duplicateMeeting = existingIsMeetingTask && isMeetingTask && meetingPurpose && meetingPurpose === existingMeetingPurpose

        if (duplicateNonMeeting || duplicateMeeting) {
            return response.redirect("/v51/victim/new-task/task-already-exists")
        }

        // Update existing task tracking when a task is confirmed
        request.session.data['existingTask'] = nextTask
        request.session.data['existingMeetingPurpose'] = meetingPurpose
        request.session.data['existingTaskDueDate'] = request.session.data['taskDueDate'] || ''
        request.session.data['existingManualTaskName'] = request.session.data['manualTaskName'] || ''
        request.session.data['existingTaskNote'] = request.session.data['taskNote'] || ''

        response.redirect("/v51/victim/new-task/task-created")
    })

    router.post('/v51/victim/new-task/task-created-answer', function(request, response) {
        response.redirect("/v51/victim")
    })

    router.post('/v51/task-assignee-answer', function(request, response) {

        // Store task assignee in session
        request.session.data['task-assignee'] = request.body['task-assignee'] || ''

        response.redirect("/v51/tasks?success=yes&successReason=assignee-updated")
    })

    router.post('/v51/change-task-due-date-answer', function(request, response) {
        var previousDueDate = request.body['previousTaskDueDate'] || ''
        var newDueDate = request.body['taskDueDate'] || ''


        if (newDueDate === previousDueDate) {
            response.redirect("/v51/tasks")
        } else {
            response.redirect("/v51/tasks?success=yes&successReason=due-date-updated")
        }
    })

    router.post('/v51/change-service-answer', function(request, response) {

        request.session.data['serviceLead'] = request.body['serviceLead'] || ''

        response.redirect("/v51/victims?success=yes&successReason=service-updated")
    })

    router.post('/v51/update-manual-task-answer', function(request, response) {

        // Store task action in session
        request.session.data['taskAction'] = request.body['taskAction'] || ''

        if (request.body['taskAction'] === 'complete') {
            response.redirect("/v51/tasks?success=yes&successReason=manual-task-completed")
        } else {
            response.redirect("/v51/tasks")
        }
    })

    //pcd

    router.post('/v51/pcd/sign-in-answer', function(request, response) {

        response.redirect("/v51/pcd/overview")
    })

    router.get('/v51/pcd/pre-draft/check-details-answer', function(request, response) {

        response.redirect("/v51/pcd/pre-draft/contacted-by?pcdStatus=log-not-started")
    })

    router.post('/v51/pcd/draft/pcd-type-answer', function(request, response) {

        var pcdType = request.session.data['pcdType']
        var existingTask = request.session.data['existingTask'] || ''

        if (pcdType == "dtc"){
            if (existingTask == "dtc") {
                return response.redirect("/v51/pcd/draft/task-already-exists")
            }
            response.redirect("/v51/pcd/pre-draft/contacted-by?pcdStatus=log-not-started&pcdType=dtc&nextTask=dtc&existingTask=dtc&success=yes&successReason=task-created")
        } else if (pcdType == "nfa") {
            if (existingTask == "nfa") {
                return response.redirect("/v51/pcd/draft/task-already-exists")
            }
            response.redirect("/v51/pcd/pre-draft/contacted-by?pcdStatus=log-not-started&pcdType=nfa&nextTask=nfa&existingTask=nfa&success=yes&successReason=task-created")
        } else {
            response.redirect("#")
        }
    })

    router.post('/v51/pcd/draft/task-already-exists-answer', function(request, response) {

        var pcdType = request.session.data['pcdType']
        response.redirect("/v51/pcd/pre-draft/contacted-by?pcdStatus=log-not-started&pcdType=" + pcdType + "&nextTask=" + pcdType + "&existingTask=" + pcdType + "&success=yes&successReason=task-created")
    })

    router.get('/v51/pcd/pre-draft/start-communication', function(request, response) {
        var fieldsToReset = [
            'contactedBy',
            'pcdVictimInformed1', 'pcdVictimInformed2', 'pcdVictimInformed3',
            'pcdCallDate1', 'pcdCallDate2', 'pcdCallDate3',
            'pcdCallType1', 'pcdCallType2', 'pcdCallType3',
            'pcdFumoc', 'pcdNoFumocDetails',
            'pcdAttemptToContactAgain',
            'pcdWasTextMessageSent',
            'emailDispatchDate', 'letterDispatchDate'
        ]
        fieldsToReset.forEach(function(field) {
            delete request.session.data[field]
        })
        response.redirect('/v51/pcd/pre-draft/contacted-by?pcdStatus=log-not-started')
    })

    router.post('/v51/pcd/pre-draft/contacted-by-answer', function(request, response) {

        var contactedBy = request.session.data['contactedBy']

        if (contactedBy == "call") {
            response.redirect("/v51/pcd/call/phone-call-1")
        } else if (contactedBy == "email") {
            response.redirect("/v51/pcd/send/email-details")
        } else if (contactedBy == "post") {
            response.redirect("/v51/pcd/send/letter-details")
        } else if (contactedBy == "not-contacted") {
            response.redirect("/v51/pcd/pre-draft/not-contacted-reason")
        } else {
            response.redirect("/v51/pcd/pre-draft/contact-details?contactMethod=other")
        }
    })

    router.post('/v51/pcd/pre-draft/not-contacted-reason-answer', function(request, response) {

        response.redirect("/v51/victim?secondaryNav=pcd&pcdStatus=not-contacted-logged&success=yes&successReason=not-contacted-logged#communications")
    })

    router.post('/v51/pcd/draft/cd-modal/request-review-answer', function(request, response) {

        response.redirect("/v51/pcd/draft/under-review?pcdStatus=draft-under-review")
    })

    router.post('/v51/pcd/call/phone-call-1-answer', function(request, response) {

        var pcdVictimInformed1 = request.session.data['pcdVictimInformed1']

        if (pcdVictimInformed1 == "Yes"){
            response.redirect("/v51/pcd/call/follow-up-moc?pcdStatus=select-fumoc&pcdCallAttempt=1&success=yes&successReason=informed-after-call-1")
        } else {
            response.redirect("/v51/pcd/call/was-text-message-sent?pcdStatus=before-text-logged&pcdCallAttempt=1&success=yes&successReason=not-informed-after-call-1")
        }
    })

    router.post('/v51/pcd/call/was-text-message-sent-answer', function(request, response) {

        var pcdWasTextMessageSent = request.session.data['pcdWasTextMessageSent']

        if (pcdWasTextMessageSent == "Yes"){
            response.redirect("/v51/pcd/call/text-message-details")
        } else {
            response.redirect("/v51/victim?pmoc=mobile&pcdStatus=after-call-attempt-1&secondaryNav=pcd#communications")
        }
    })

    router.post('/v51/pcd/call/text-message-details-answer', function(request, response) {

        response.redirect("/v51/victim?pcdStatus=after-call-attempt-1&secondaryNav=pcd#communications")
    })

    router.post('/v51/pcd/call/next-attempt-moc-answer', function(request, response) {

        var pcdAttemptToContactAgain = request.session.data['pcdAttemptToContactAgain']
        var pcdCallAttempt = request.session.data['pcdCallAttempt']

        if (pcdAttemptToContactAgain == "call") {
            if (pcdCallAttempt == "1") {
                response.redirect("/v51/pcd/call/phone-call-2")
            } else {
                response.redirect("/v51/pcd/call/phone-call-3")
            }

        } else if (pcdAttemptToContactAgain == "email") {
            if (pcdCallAttempt == "1") {
                response.redirect("/v51/pcd/send/email-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v51/pcd/send/email-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            } else {
                response.redirect("/v51/pcd/send/email-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=email&secondaryNav=pcd")
            }
            
        } else {
            response.redirect("/v51/pcd/send/letter-details?pcdStatus=draft-ready-to-send&pcdAttemptToContactAgain=post&secondaryNav=pcd")
        }
    })

    router.post('/v51/pcd/call/phone-call-2-answer', function(request, response) {

        var pcdVictimInformed2 = request.session.data['pcdVictimInformed2']
        if (pcdVictimInformed2 == "Yes"){
            response.redirect("/v51/pcd/call/follow-up-moc?pcdStatus=select-fumoc&pcdCallAttempt=2&success=yes&successReason=informed-after-call-2")
        } else {
            response.redirect("/v51/victim?pcdStatus=after-call-attempt-2&pcdCallAttempt=2&success=yes&successReason=not-informed-after-call-2&secondaryNav=pcd")
        }
    })

    router.post('/v51/pcd/call/follow-up-moc-answer', function(request, response) {

        var pcdFumoc = request.session.data['pcdFumoc']
        var pcdCallAttempt = request.session.data['pcdCallAttempt']

        if (pcdFumoc == "Email"){
            if (pcdCallAttempt == "1") {
                response.redirect("/v51/pcd/send/email-details?pcdStatus=informed-after-call-1&pcdFumoc=Email&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v51/pcd/send/email-details?pcdStatus=informed-after-call-2&pcdFumoc=Email&secondaryNav=pcd")
            } else {
                response.redirect("/v51/pcd/send/email-details?pcdStatus=informed-after-call-3&pcdFumoc=Email&secondaryNav=pcd")
            }

        } else if (pcdFumoc == "Post") {
            if (pcdCallAttempt == "1") {
                response.redirect("/v51/pcd/send/letter-details?pcdStatus=informed-after-call-1&pcdFumoc=Post&secondaryNav=pcd")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v51/pcd/send/letter-details?pcdStatus=informed-after-call-2&pcdFumoc=Post&secondaryNav=pcd")
            } else {
                response.redirect("/v51/pcd/send/letter-details?pcdStatus=informed-after-call-3&pcdFumoc=Post&secondaryNav=pcd")
            }

        } else {
            if (pcdCallAttempt == "1") {
                response.redirect("/v51/victim?pcdStatus=informed-after-call-1&pcdFumoc=None&pcdSent=yes&success=no&secondaryNav=pcd&nextTask#communications")
            } else if (pcdCallAttempt == "2") {
                response.redirect("/v51/victim?pcdStatus=informed-after-call-2&pcdFumoc=None&pcdSent=yes&success=no&secondaryNav=pcd&nextTask#communications")
            } else {
                response.redirect("/v51/victim?pcdStatus=informed-after-call-3&pcdFumoc=None&pcdSent=yes&success=no&secondaryNav=pcd&nextTask#communications")
            }
        }
    })

    router.post('/v51/pcd/call/phone-call-3-answer', function(request, response) {

        var pcdVictimInformed3 = request.session.data['pcdVictimInformed3']

        if (pcdVictimInformed3 == "Yes"){
            response.redirect("/v51/pcd/call/follow-up-moc?pcdStatus=select-fumoc&pcdCallAttempt=3&success=yes&successReason=informed-after-call-3")
        } else {
            response.redirect("/v51/victim?pcdStatus=after-call-attempt-3&pcdCallAttempt=3&success=yes&successReason=not-informed-after-call-3&secondaryNav=pcd")
        }
    })

    router.post('/v51/pcd/send/email-details-answer', function(request, response) {

        response.redirect("/v51/pcd/send/email-logged")
    })

    router.post('/v51/pcd/send/letter-details-answer', function(request, response) {

        response.redirect("/v51/pcd/send/letter-logged")
    })

    router.post('/v51/pcd/follow-up/log-follow-up-answer', function(request, response) {

        var pcdFollowUpType = request.session.data['pcdFollowUpType']

        if (pcdFollowUpType == "call") {
            response.redirect("/v51/pcd/follow-up/telephone-call")
        } else if (pcdFollowUpType == "email") {
            response.redirect("/v51/pcd/follow-up/email-details")
        } else if (pcdFollowUpType == "not-contacted") {
            response.redirect("/v51/pcd/follow-up/not-contacted-reason")
        } else {
            response.redirect("/v51/pcd/follow-up/letter-details")
        }
    })

    // Follow-ups can be logged against the live charging decision or, once a
    // decision has its own card, against a specific archived decision identified
    // by the decision's loggedAt id carried in the pcdId param. This keeps the
    // pre-existing follow-up behaviour for the current decision while letting
    // each subsequent decision keep its own follow-up list.
    function addPcdFollowUp(data, followUp) {
        var pcdId = data['pcdId']
        if (pcdId) {
            var decisions = data['pcdDecisions'] || []
            var decision = decisions.find(function(d) {
                return String(d.loggedAt) === String(pcdId)
            })
            if (decision) {
                if (!Array.isArray(decision.followUps)) {
                    decision.followUps = []
                }
                decision.followUps.push(followUp)
                return
            }
        }
        var followUps = data['pcdFollowUps'] || []
        followUps.push(followUp)
        data['pcdFollowUps'] = followUps
    }

    router.post('/v51/pcd/follow-up/email-details-answer', function(request, response) {

        var data = request.session.data

        addPcdFollowUp(data, {
            type: 'email',
            date: data['followUpEmailDispatchDate'] || '',
            notes: data['followUpEmailDispatchNotes'] || '',
            individual: resolvePersonContacted(data, data['followUpEmailIndividual'], data['followUpEmailIndividualName'], data['followUpEmailIndividualRole'])
        })

        data['followUpEmailDispatchDate'] = ''
        data['followUpEmailDispatchNotes'] = ''
        data['followUpEmailIndividual'] = ''
        data['followUpEmailIndividualName'] = ''
        data['followUpEmailIndividualRole'] = ''

        response.redirect("/v51/pcd/follow-up/email-logged")
    })

    router.post('/v51/pcd/follow-up/telephone-call-answer', function(request, response) {

        var data = request.session.data

        addPcdFollowUp(data, {
            type: 'call',
            date: data['followUpCallDate'] || '',
            time: (data['followUpCallHour'] || '') + ':' + (data['followUpCallMinutes'] || ''),
            direction: data['followUpCallType'] || '',
            victimInformed: data['followUpVictimInformed'] || '',
            notes: data['followUpCallNotes'] || '',
            individual: resolvePersonContacted(data, data['followUpCallIndividual'], data['followUpCallIndividualName'], data['followUpCallIndividualRole'])
        })

        data['followUpCallDate'] = ''
        data['followUpCallHour'] = ''
        data['followUpCallMinutes'] = ''
        data['followUpCallType'] = ''
        data['followUpVictimInformed'] = ''
        data['followUpCallNotes'] = ''
        data['followUpCallIndividual'] = ''
        data['followUpCallIndividualName'] = ''
        data['followUpCallIndividualRole'] = ''

        response.redirect("/v51/pcd/follow-up/call-logged")
    })

    router.post('/v51/pcd/follow-up/letter-details-answer', function(request, response) {

        var data = request.session.data

        addPcdFollowUp(data, {
            type: 'post',
            date: data['followUpLetterDispatchDate'] || '',
            notes: data['followUpLetterDispatchNotes'] || '',
            individual: resolvePersonContacted(data, data['followUpLetterIndividual'], data['followUpLetterIndividualName'], data['followUpLetterIndividualRole'])
        })

        data['followUpLetterDispatchDate'] = ''
        data['followUpLetterDispatchNotes'] = ''
        data['followUpLetterIndividual'] = ''
        data['followUpLetterIndividualName'] = ''
        data['followUpLetterIndividualRole'] = ''

        response.redirect("/v51/pcd/follow-up/letter-logged")
    })

    router.post('/v51/pcd/follow-up/not-contacted-reason-answer', function(request, response) {

        var data = request.session.data

        addPcdFollowUp(data, {
            type: 'not-contacted',
            reason: data['followUpNotContactedReason'] || ''
        })

        data['followUpNotContactedReason'] = ''

        response.redirect("/v51/pcd/follow-up/not-contacted-logged")
    })

    router.post('/v51/pcd/preferred-method-of-contact-answer', function(request, response) {

        response.redirect("/v51/victim?success=yes&successReason=pmoc-updated#victim-details")
    })

    // Flat fields holding the single in-progress charging decision (pcd). These
    // are archived into data['pcdDecisions'] and cleared when the user chooses to
    // "Log another communication" so each decision keeps its own card and the
    // next task starts from a clean slate.
    var pcdTransientFields = [
        'pcdType', 'pcdStatus', 'pcdSent', 'contactedBy', 'notContactedReason',
        'pcdCallDate1', 'pcdCallHour1', 'pcdCallMinutes1', 'pcdCallType1', 'pcdVictimInformed1', 'pcdCallNotes1',
        'pcdCallDate2', 'pcdCallHour2', 'pcdCallMinutes2', 'pcdCallType2', 'pcdVictimInformed2', 'pcdCallNotes2',
        'pcdCallDate3', 'pcdCallHour3', 'pcdCallMinutes3', 'pcdCallType3', 'pcdVictimInformed3', 'pcdCallNotes3',
        'pcdCallIndividual1', 'pcdCallIndividualName1', 'pcdCallIndividualRole1',
        'pcdCallIndividual2', 'pcdCallIndividualName2', 'pcdCallIndividualRole2',
        'pcdCallIndividual3', 'pcdCallIndividualName3', 'pcdCallIndividualRole3',
        'pcdWasTextMessageSent', 'pcdTextMessageDate', 'pcdTextMessageHour', 'pcdTextMessageMinutes',
        'pcdSecondCallHour', 'pcdSecondCallMinutes', 'pcdThirdCallHour', 'pcdThirdCallMinutes',
        'pcdCallAttempt', 'pcdFumoc', 'pcdNoFumocDetails', 'pcdAttemptToContactAgain',
        'emailDispatchDate', 'emailDispatchNotes', 'emailDispatchIndividual', 'emailDispatchIndividualName', 'emailDispatchIndividualRole',
        'letterDispatchDate', 'letterDispatchNotes', 'letterDispatchIndividual', 'letterDispatchIndividualName', 'letterDispatchIndividualRole',
        'pcdFollowUps', 'existingTask'
    ]

    // Resolve a "Person contacted" radio value into a display string, pulling the
    // relevant contact name through from the Case contacts tab when present.
    function resolvePersonContacted(data, value, name, role) {
        if (!value) return ''
        if (value === 'Victim') {
            var surname = (data['victimSurname'] || '').toUpperCase()
            var forename = data['victimForename'] || ''
            var victimName = [surname, forename].filter(Boolean).join(', ')
            return victimName ? 'Victim (' + victimName + ')' : 'Victim'
        }
        if (value === 'Via police') {
            return 'Via police'
        }
        if (value === 'Via ISVA') {
            var hasIsva = data['isvaName'] && data['isvaDeleted'] !== 'yes'
            return hasIsva ? 'Via ISVA (' + data['isvaName'] + ')' : 'Via ISVA'
        }
        if (value === 'Via IDVA') {
            var hasIdva = data['idvaName'] && data['idvaDeleted'] !== 'yes'
            return hasIdva ? 'Via IDVA (' + data['idvaName'] + ')' : 'Via IDVA'
        }
        if (value === 'Other') {
            var detail = [name, role].filter(Boolean).join(', ')
            return detail ? 'Other (' + detail + ')' : 'Other'
        }
        return value
    }

    function finalizePcdDecision(data) {
        if (!data['pcdType']) return

        var today = new Date().toLocaleDateString('en-GB')

        var attempts = []
        for (var i = 1; i <= 3; i++) {
            var informed = data['pcdVictimInformed' + i]
            var hour = data['pcdCallHour' + i]
            var type = data['pcdCallType' + i]
            if (informed || hour || type) {
                attempts.push({
                    date: data['pcdCallDate' + i] || today,
                    hour: hour || '',
                    minutes: data['pcdCallMinutes' + i] || '',
                    direction: type || '',
                    informed: informed || '',
                    notes: data['pcdCallNotes' + i] || '',
                    individual: resolvePersonContacted(data, data['pcdCallIndividual' + i], data['pcdCallIndividualName' + i], data['pcdCallIndividualRole' + i])
                })
            }
        }

        // A text message can only follow the first call attempt.
        if (attempts.length > 0) {
            if (data['pcdWasTextMessageSent'] === 'Yes') {
                attempts[0].textSent = 'Yes'
                attempts[0].textDate = data['pcdTextMessageDate'] || today
                attempts[0].textHour = data['pcdTextMessageHour'] || ''
                attempts[0].textMinutes = data['pcdTextMessageMinutes'] || ''
            } else if (data['pcdWasTextMessageSent'] === 'No') {
                attempts[0].textSent = 'No'
            }
        }

        var emailSent = !!data['emailDispatchDate']
        var letterSent = !!data['letterDispatchDate']

        var activityDates = []
        attempts.forEach(function(a) {
            if (a.date) activityDates.push(toSortDate(a.date, a.hour, a.minutes))
        })
        if (emailSent) activityDates.push(toSortDate(data['emailDispatchDate']))
        if (letterSent) activityDates.push(toSortDate(data['letterDispatchDate']))
        activityDates = activityDates.filter(Boolean).sort()
        var sortDate = activityDates.length ? activityDates[activityDates.length - 1] : toSortDate(today)

        var decision = {
            type: data['pcdType'] || '',
            contactedBy: data['contactedBy'] || '',
            notContactedReason: data['notContactedReason'] || '',
            callAttempts: attempts,
            emailDate: emailSent ? (data['emailDispatchDate'] || today) : '',
            emailNotes: data['emailDispatchNotes'] || '',
            emailIndividual: emailSent ? resolvePersonContacted(data, data['emailDispatchIndividual'], data['emailDispatchIndividualName'], data['emailDispatchIndividualRole']) : '',
            letterDate: letterSent ? (data['letterDispatchDate'] || today) : '',
            letterNotes: data['letterDispatchNotes'] || '',
            letterIndividual: letterSent ? resolvePersonContacted(data, data['letterDispatchIndividual'], data['letterDispatchIndividualName'], data['letterDispatchIndividualRole']) : '',
            fumoc: data['pcdFumoc'] || '',
            noFumocDetails: data['pcdNoFumocDetails'] || '',
            followUps: (data['pcdFollowUps'] || []).slice(),
            sortDate: sortDate,
            loggedAt: Date.now()
        }

        if (!Array.isArray(data['pcdDecisions'])) {
            data['pcdDecisions'] = []
        }
        data['pcdDecisions'].push(decision)

        pcdTransientFields.forEach(function(field) {
            delete data[field]
        })
    }

    //vcl decision

    // Transient fields for a single in-progress VCL decision. Kept separate from
    // the charging decision (pcd*) data and cleared once a decision is logged so
    // each subsequent VCL decision is captured independently.
    var vclTransientFields = [
        'vdType', 'vdStoppedReason', 'vdAlteredType', 'vdContactedBy',
        'vdCallAttempts', 'vdCallDate', 'vdCallHour', 'vdCallMinutes',
        'vdCallType', 'vdVictimInformed', 'vdCallNotes',
        'vdCallIndividual', 'vdCallIndividualName', 'vdCallIndividualRole',
        'vdFumoc', 'vdNoFumocDetails', 'vdNextMoc',
        'vdWasTextMessageSent', 'vdTextMessageDate', 'vdTextMessageHour', 'vdTextMessageMinutes',
        'vdSecondCallHour', 'vdSecondCallMinutes', 'vdThirdCallHour', 'vdThirdCallMinutes',
        'vdEmailDate', 'vdEmailNotes', 'vdLetterDate', 'vdLetterNotes',
        'vdEmailIndividual', 'vdEmailIndividualName', 'vdEmailIndividualRole',
        'vdLetterIndividual', 'vdLetterIndividualName', 'vdLetterIndividualRole',
        'vdNotContactedReason'
    ]

    function finalizeVclDecision(data) {
        var attempts = (data['vdCallAttempts'] || []).slice()

        // Determine the most recent activity date for ordering the cards.
        var activityDates = []
        attempts.forEach(function(a) {
            if (a.date) activityDates.push(toSortDate(a.date, a.hour, a.minutes))
        })
        if (data['vdEmailDate']) activityDates.push(toSortDate(data['vdEmailDate']))
        if (data['vdLetterDate']) activityDates.push(toSortDate(data['vdLetterDate']))
        activityDates = activityDates.filter(Boolean).sort()
        var sortDate = activityDates.length ? activityDates[activityDates.length - 1] : toSortDate(new Date().toLocaleDateString('en-GB'))

        var decision = {
            type: data['vdType'] || '',
            stoppedReason: data['vdStoppedReason'] || '',
            alteredType: data['vdAlteredType'] || '',
            contactedBy: data['vdContactedBy'] || '',
            callAttempts: attempts,
            fumoc: data['vdFumoc'] || '',
            noFumocDetails: data['vdNoFumocDetails'] || '',
            emailDate: data['vdEmailDate'] || '',
            emailNotes: data['vdEmailNotes'] || '',
            emailIndividual: data['vdEmailDate'] ? resolvePersonContacted(data, data['vdEmailIndividual'], data['vdEmailIndividualName'], data['vdEmailIndividualRole']) : '',
            letterDate: data['vdLetterDate'] || '',
            letterNotes: data['vdLetterNotes'] || '',
            letterIndividual: data['vdLetterDate'] ? resolvePersonContacted(data, data['vdLetterIndividual'], data['vdLetterIndividualName'], data['vdLetterIndividualRole']) : '',
            notContactedReason: data['vdNotContactedReason'] || '',
            sortDate: sortDate,
            loggedAt: Date.now()
        }

        if (!Array.isArray(data['vclDecisions'])) {
            data['vclDecisions'] = []
        }
        data['vclDecisions'].push(decision)

        vclTransientFields.forEach(function(field) {
            delete data[field]
        })
    }

    // Entry point from a pending VCL task on the Charging decision tab. The
    // charge type is already known from the task (vclType), so seed vdType and
    // jump straight to the reason page, skipping the vcl-type question.
    router.get('/v51/vcl/start-task', function(request, response) {
        var data = request.session.data

        vclTransientFields.forEach(function(field) {
            delete data[field]
        })

        if (data['vclType'] == "stopped-charge") {
            data['vdType'] = "stopped-charge"
            response.redirect("/v51/vcl/draft/stopped-charge")
        } else {
            data['vdType'] = "altered-charge"
            response.redirect("/v51/vcl/draft/substantially-altered-charge")
        }
    })

    // Merged "Log another communication" chooser. The following page now offers
    // 4 options - 2 charging decision (dtc/nfa) and 2 VCL (stopped/altered) -
    // captured in a single `commType` field. Dispatch to the relevant flow so
    // each runs with exactly the same routing and logic as its original task.
    router.post('/v51/vcl/draft/vcl-type-answer', function(request, response) {
        var data = request.session.data
        var commType = data['commType']
        delete data['commType']

        if (commType == "dtc" || commType == "nfa") {
            // Charging decision selected - archive any live charging decision into
            // its own card, then start the pcd flow exactly like the initial task.
            finalizePcdDecision(data)
            return response.redirect("/v51/pcd/pre-draft/contacted-by?pcdStatus=log-not-started&pcdType=" + commType + "&nextTask=" + commType + "&existingTask=" + commType + "&success=yes&successReason=task-created")
        }

        // VCL selected - start a fresh VCL decision (clear leftover transient fields)
        data['vdType'] = commType
        vclTransientFields.forEach(function(field) {
            if (field !== 'vdType') {
                delete data[field]
            }
        })

        if (commType == "stopped-charge") {
            response.redirect("/v51/vcl/draft/stopped-charge")
        } else {
            response.redirect("/v51/vcl/draft/substantially-altered-charge")
        }
    })

    router.post('/v51/vcl/draft/stopped-charge-answer', function(request, response) {
        response.redirect("/v51/vcl/pre-draft/contacted-by")
    })

    router.post('/v51/vcl/draft/substantially-altered-charge-answer', function(request, response) {
        response.redirect("/v51/vcl/pre-draft/contacted-by")
    })

    router.post('/v51/vcl/pre-draft/contacted-by-answer', function(request, response) {
        var contactedBy = request.session.data['vdContactedBy']

        if (contactedBy == "call") {
            response.redirect("/v51/vcl/call/phone-call")
        } else if (contactedBy == "email") {
            response.redirect("/v51/vcl/send/email-details")
        } else if (contactedBy == "post") {
            response.redirect("/v51/vcl/send/letter-details")
        } else {
            response.redirect("/v51/vcl/pre-draft/not-contacted-reason")
        }
    })

    router.post('/v51/vcl/call/phone-call-answer', function(request, response) {
        var data = request.session.data

        if (!Array.isArray(data['vdCallAttempts'])) {
            data['vdCallAttempts'] = []
        }
        data['vdCallAttempts'].push({
            date: data['vdCallDate'] || '',
            hour: data['vdCallHour'] || '',
            minutes: data['vdCallMinutes'] || '',
            direction: data['vdCallType'] || '',
            informed: data['vdVictimInformed'] || '',
            notes: data['vdCallNotes'] || '',
            individual: resolvePersonContacted(data, data['vdCallIndividual'], data['vdCallIndividualName'], data['vdCallIndividualRole'])
        })

        var informed = data['vdVictimInformed']
        var attemptCount = data['vdCallAttempts'].length

        var attemptFields = ['vdCallDate', 'vdCallHour', 'vdCallMinutes', 'vdCallType', 'vdVictimInformed', 'vdCallNotes', 'vdCallIndividual', 'vdCallIndividualName', 'vdCallIndividualRole']
        attemptFields.forEach(function(field) {
            delete data[field]
        })

        if (informed == "Yes") {
            response.redirect("/v51/vcl/call/follow-up-moc")
        } else if (attemptCount == 1) {
            // The text message questions are only asked after the first call attempt.
            response.redirect("/v51/vcl/call/was-text-message-sent")
        } else {
            response.redirect("/v51/victim?secondaryNav=pcd#communications")
        }
    })

    router.post('/v51/vcl/call/was-text-message-sent-answer', function(request, response) {
        var data = request.session.data
        var attempts = data['vdCallAttempts'] || []
        var last = attempts.length ? attempts[attempts.length - 1] : null
        if (last) {
            last.textSent = data['vdWasTextMessageSent'] || ''
        }

        if (data['vdWasTextMessageSent'] == "Yes") {
            response.redirect("/v51/vcl/call/text-message-details")
        } else {
            data['vdWasTextMessageSent'] = ''
            response.redirect("/v51/victim?secondaryNav=pcd#communications")
        }
    })

    router.post('/v51/vcl/call/text-message-details-answer', function(request, response) {
        var data = request.session.data
        var attempts = data['vdCallAttempts'] || []
        var last = attempts.length ? attempts[attempts.length - 1] : null
        if (last) {
            last.textDate = data['vdTextMessageDate'] || ''
            last.textHour = data['vdTextMessageHour'] || ''
            last.textMinutes = data['vdTextMessageMinutes'] || ''
            last.secondCallHour = data['vdSecondCallHour'] || ''
            last.secondCallMinutes = data['vdSecondCallMinutes'] || ''
            last.thirdCallHour = data['vdThirdCallHour'] || ''
            last.thirdCallMinutes = data['vdThirdCallMinutes'] || ''
        }

        data['vdWasTextMessageSent'] = ''
        data['vdTextMessageDate'] = ''
        data['vdTextMessageHour'] = ''
        data['vdTextMessageMinutes'] = ''
        data['vdSecondCallHour'] = ''
        data['vdSecondCallMinutes'] = ''
        data['vdThirdCallHour'] = ''
        data['vdThirdCallMinutes'] = ''

        response.redirect("/v51/victim?secondaryNav=pcd#communications")
    })

    router.post('/v51/vcl/call/next-attempt-moc-answer', function(request, response) {
        var nextMoc = request.session.data['vdNextMoc']

        if (nextMoc == "call") {
            response.redirect("/v51/vcl/call/phone-call")
        } else if (nextMoc == "email") {
            response.redirect("/v51/vcl/send/email-details")
        } else {
            response.redirect("/v51/vcl/send/letter-details")
        }
    })

    router.post('/v51/vcl/call/follow-up-moc-answer', function(request, response) {
        var fumoc = request.session.data['vdFumoc']

        if (fumoc == "Email") {
            response.redirect("/v51/vcl/send/email-details")
        } else if (fumoc == "Post") {
            response.redirect("/v51/vcl/send/letter-details")
        } else {
            finalizeVclDecision(request.session.data)
            response.redirect("/v51/victim?secondaryNav=pcd&success=yes&successReason=vcl-logged#communications")
        }
    })

    router.post('/v51/vcl/send/email-details-answer', function(request, response) {
        finalizeVclDecision(request.session.data)
        response.redirect("/v51/victim?secondaryNav=pcd&success=yes&successReason=vcl-logged#communications")
    })

    router.post('/v51/vcl/send/letter-details-answer', function(request, response) {
        finalizeVclDecision(request.session.data)
        response.redirect("/v51/victim?secondaryNav=pcd&success=yes&successReason=vcl-logged#communications")
    })

    router.post('/v51/vcl/pre-draft/not-contacted-reason-answer', function(request, response) {
        finalizeVclDecision(request.session.data)
        response.redirect("/v51/victim?secondaryNav=pcd&success=yes&successReason=vcl-logged#communications")
    })

    // VCL decision follow-ups - each decision keeps its own follow-up list,
    // identified by the decision's loggedAt id carried in the vclId param.
    function addVclFollowUp(data, followUp) {
        var vclId = data['vclId']
        var decisions = data['vclDecisions'] || []
        var decision = decisions.find(function(d) {
            return String(d.loggedAt) === String(vclId)
        })
        if (decision) {
            if (!Array.isArray(decision.followUps)) {
                decision.followUps = []
            }
            decision.followUps.push(followUp)
        }
    }

    router.post('/v51/vcl/follow-up/log-follow-up-answer', function(request, response) {
        var followUpType = request.session.data['vclFollowUpType']
        if (followUpType == "email") {
            response.redirect("/v51/vcl/follow-up/email-details")
        } else {
            response.redirect("/v51/vcl/follow-up/letter-details")
        }
    })

    router.post('/v51/vcl/follow-up/email-details-answer', function(request, response) {
        var data = request.session.data
        addVclFollowUp(data, {
            type: 'email',
            date: data['vclFollowUpEmailDate'] || '',
            notes: data['vclFollowUpEmailNotes'] || '',
            individual: resolvePersonContacted(data, data['vclFollowUpEmailIndividual'], data['vclFollowUpEmailIndividualName'], data['vclFollowUpEmailIndividualRole'])
        })
        data['vclFollowUpEmailDate'] = ''
        data['vclFollowUpEmailNotes'] = ''
        data['vclFollowUpEmailIndividual'] = ''
        data['vclFollowUpEmailIndividualName'] = ''
        data['vclFollowUpEmailIndividualRole'] = ''
        response.redirect("/v51/vcl/follow-up/email-logged")
    })

    router.post('/v51/vcl/follow-up/letter-details-answer', function(request, response) {
        var data = request.session.data
        addVclFollowUp(data, {
            type: 'post',
            date: data['vclFollowUpLetterDate'] || '',
            notes: data['vclFollowUpLetterNotes'] || '',
            individual: resolvePersonContacted(data, data['vclFollowUpLetterIndividual'], data['vclFollowUpLetterIndividualName'], data['vclFollowUpLetterIndividualRole'])
        })
        data['vclFollowUpLetterDate'] = ''
        data['vclFollowUpLetterNotes'] = ''
        data['vclFollowUpLetterIndividual'] = ''
        data['vclFollowUpLetterIndividualName'] = ''
        data['vclFollowUpLetterIndividualRole'] = ''
        response.redirect("/v51/vcl/follow-up/letter-logged")
    })

    //case information

    router.post('/v51/victim/case-information/charging-type-answer', function(request, response) {

        response.redirect("/v51/victim?success=yes&successReason=charging-type-updated#overview")
    })

    router.post('/v51/victim/case-information/area-answer', function(request, response) {

        response.redirect("/v51/victim?success=yes&successReason=area-updated#overview")
    })

    // Other

    router.post('/v51/other/contacted-by-answer', function(request, response) {

        var contactedBy = request.session.data['contactedBy']

        if (contactedBy == "call") {
            response.redirect("/v51/other/telephone-call")
        } else if (contactedBy == "email") {
            response.redirect("/v51/other/email-details")
        } else if (contactedBy == "post") {
            response.redirect("/v51/other/letter-details")
        } else if (contactedBy == "text") {
            response.redirect("/v51/other/text-message")
        } else if (contactedBy == "in-person") {
            response.redirect("/v51/other/in-person")
        } else if (contactedBy == "other") {
            response.redirect("/v51/other/other")
        } else {
            response.redirect("/v51/other/contact-details?contactMethod=other")
        }
    })

    router.post('/v51/other/telephone-call-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'call',
            sortDate: toSortDate(request.session.data['otherCallDate'], request.session.data['otherCallHour'], request.session.data['otherCallMinutes']),
            otherCallDate: request.session.data['otherCallDate'],
            otherCallHour: request.session.data['otherCallHour'],
            otherCallMinutes: request.session.data['otherCallMinutes'],
            otherCallType: request.session.data['otherCallType'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v51/other/call-logged")
    })

    router.post('/v51/other/email-details-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'email',
            sortDate: toSortDate(request.session.data['otherEmailDate'], request.session.data['otherEmailHour'], request.session.data['otherEmailMinutes']),
            otherEmailDate: request.session.data['otherEmailDate'],
            otherEmailHour: request.session.data['otherEmailHour'],
            otherEmailMinutes: request.session.data['otherEmailMinutes'],
            otherEmailType: request.session.data['otherEmailType'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v51/other/email-logged")
    })

    router.post('/v51/other/letter-details-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'post',
            sortDate: toSortDate(request.session.data['otherLetterDate'], request.session.data['otherLetterHour'], request.session.data['otherLetterMinutes']),
            otherLetterDate: request.session.data['otherLetterDate'],
            otherLetterHour: request.session.data['otherLetterHour'],
            otherLetterMinutes: request.session.data['otherLetterMinutes'],
            otherLetterType: request.session.data['otherLetterType'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v51/other/letter-logged")
    })
    
    router.post('/v51/other/text-message-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'text',
            sortDate: toSortDate(request.session.data['otherTextMessageDate'], request.session.data['otherTextMessageHour'], request.session.data['otherTextMessageMinutes']),
            otherTextMessageDate: request.session.data['otherTextMessageDate'],
            otherTextMessageHour: request.session.data['otherTextMessageHour'],
            otherTextMessageMinutes: request.session.data['otherTextMessageMinutes'],
            otherTextMessageType: request.session.data['otherTextMessageType'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v51/other/text-message-logged")
    })

    router.post('/v51/other/in-person-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'in-person',
            sortDate: toSortDate(request.session.data['otherInPersonDate'], request.session.data['otherInPersonHour'], request.session.data['otherInPersonMinutes']),
            otherInPersonDate: request.session.data['otherInPersonDate'],
            otherInPersonHour: request.session.data['otherInPersonHour'],
            otherInPersonMinutes: request.session.data['otherInPersonMinutes'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v51/other/in-person-logged")
    })

    router.post('/v51/other/other-details-answer', function(request, response) {

        if (!Array.isArray(request.session.data['otherCommunications'])) {
            request.session.data['otherCommunications'] = []
        }
        request.session.data['otherCommunications'].push({
            contactedBy: 'other',
            otherContactMethod: request.session.data['otherContactMethod'],
            sortDate: toSortDate(request.session.data['otherCommsDate'], request.session.data['otherCommsHour'], request.session.data['otherCommsMinutes']),
            otherCommsDate: request.session.data['otherCommsDate'],
            otherCommsHour: request.session.data['otherCommsHour'],
            otherCommsMinutes: request.session.data['otherCommsMinutes'],
            otherCommsType: request.session.data['otherCommsType'],
            otherIndividual: request.session.data['otherIndividual'],
            otherIndividualName: request.session.data['otherIndividualName'],
            otherIndividualRole: request.session.data['otherIndividualRole'],
            purposeOfCommunication: request.session.data['purposeOfCommunication'],
            victimForename: request.session.data['victimForename'],
            victimSurname: request.session.data['victimSurname']
        })

        response.redirect("/v51/other/other-logged")
    })

    // Victim details — change handlers
    var victimDetailsAnswers = [
        'full-name',
        'preferred-name',
        'date-of-birth',
        'category',
        'gender',
        'ethnicity',
        'disability',
        'religion',
        'previous-convictions',
        'address',
        'telephone-number',
        'email-address',
        'correspondence-language',
        'wants-contact',
        'pmoc',
        'pmoc-police',
        'contact-times',
        'victim-representative',
        'power-of-attorney',
        'risk-level',
        'service',
        'translator-needed',
        'vps-status',
        'reasonable-adjustments'
    ]

    victimDetailsAnswers.forEach(function(slug) {
        router.post('/v51/victim/victim-details/' + slug + '-answer', function(request, response) {
            if (slug === 'date-of-birth') {
                var d = (request.body.victimDobDay || '').toString().padStart(2, '0')
                var m = (request.body.victimDobMonth || '').toString().padStart(2, '0')
                var y = (request.body.victimDobYear || '').toString()
                if (d && m && y) {
                    request.session.data['victimDateOfBirth'] = d + '/' + m + '/' + y
                    var dob = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10))
                    if (!isNaN(dob.getTime())) {
                        var today = new Date()
                        var age = today.getFullYear() - dob.getFullYear()
                        var beforeBirthday = (today.getMonth() < dob.getMonth()) ||
                            (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
                        if (beforeBirthday) age--
                        request.session.data['victimAge'] = age
                    }
                }
            }
            response.redirect('/v51/victim?secondaryNav=victim-details&success=yes&successReason=' + slug + '-updated#victim-details')
        })
    })

    // -----------------------------------------------------------------------
    // Case contacts — Family Liaison Officer
    // -----------------------------------------------------------------------

    router.post('/v51/victim/case-contacts/family-liaison-officer-answer', function (req, res) {
        req.session.data['familyLiaisonOfficerDeleted'] = 'no'
        req.session.data['familyLiaisonOfficerName'] = req.body['familyLiaisonOfficerName'] || ''
        req.session.data['familyLiaisonOfficerEmailAddress'] = req.body['familyLiaisonOfficerEmailAddress'] || ''
        req.session.data['familyLiaisonOfficerPhoneNumber'] = req.body['familyLiaisonOfficerPhoneNumber'] || ''
        res.redirect('/v51/victim?secondaryNav=case-contacts#case-contacts')
    })

    router.post('/v51/victim/case-contacts/family-liaison-officer-delete', function (req, res) {
        req.session.data['familyLiaisonOfficerDeleted'] = 'yes'
        req.session.data['familyLiaisonOfficerName'] = ''
        req.session.data['familyLiaisonOfficerForename'] = ''
        req.session.data['familyLiaisonOfficerSurname'] = ''
        req.session.data['familyLiaisonOfficerEmailAddress'] = ''
        req.session.data['familyLiaisonOfficerPhoneNumber'] = ''
        res.redirect('/v51/victim?secondaryNav=case-contacts#case-contacts')
    })

    // -----------------------------------------------------------------------
    // Case contacts — IDVA
    // -----------------------------------------------------------------------

    router.post('/v51/victim/case-contacts/idva-answer', function (req, res) {
        req.session.data['idvaName'] = req.body['idvaName'] || ''
        req.session.data['idvaDeleted'] = 'no'
        req.session.data['idvaAddressLine1'] = req.body['idvaAddressLine1'] || ''
        req.session.data['idvaAddressLine2'] = req.body['idvaAddressLine2'] || ''
        req.session.data['idvaAddressLine3'] = req.body['idvaAddressLine3'] || ''
        req.session.data['idvaAddressLine4'] = req.body['idvaAddressLine4'] || ''
        req.session.data['idvaAddressLine5'] = req.body['idvaAddressLine5'] || ''
        req.session.data['idvaPostCode'] = req.body['idvaPostCode'] || ''
        req.session.data['idvaCity'] = req.body['idvaCity'] || ''
        req.session.data['idvaCounty'] = req.body['idvaCounty'] || ''
        req.session.data['idvaEmailAddress'] = req.body['idvaEmailAddress'] || ''
        req.session.data['idvaPhoneNumber'] = req.body['idvaPhoneNumber'] || ''
        res.redirect('/v51/victim?secondaryNav=case-contacts#case-contacts')
    })

    router.post('/v51/victim/case-contacts/idva-delete', function (req, res) {
        req.session.data['idvaDeleted'] = 'yes'
        req.session.data['idvaName'] = ''
        req.session.data['idvaAddressLine1'] = ''
        req.session.data['idvaAddressLine2'] = ''
        req.session.data['idvaAddressLine3'] = ''
        req.session.data['idvaAddressLine4'] = ''
        req.session.data['idvaAddressLine5'] = ''
        req.session.data['idvaPostCode'] = ''
        req.session.data['idvaCity'] = ''
        req.session.data['idvaCounty'] = ''
        req.session.data['idvaEmailAddress'] = ''
        req.session.data['idvaPhoneNumber'] = ''
        res.redirect('/v51/victim?secondaryNav=case-contacts#case-contacts')
    })

    // -----------------------------------------------------------------------
    // Case contacts — ISVA
    // -----------------------------------------------------------------------

    router.post('/v51/victim/case-contacts/isva-answer', function (req, res) {
        req.session.data['isvaName'] = req.body['isvaName'] || ''
        req.session.data['isvaDeleted'] = 'no'
        req.session.data['isvaAddressLine1'] = req.body['isvaAddressLine1'] || ''
        req.session.data['isvaAddressLine2'] = req.body['isvaAddressLine2'] || ''
        req.session.data['isvaAddressLine3'] = req.body['isvaAddressLine3'] || ''
        req.session.data['isvaAddressLine4'] = req.body['isvaAddressLine4'] || ''
        req.session.data['isvaAddressLine5'] = req.body['isvaAddressLine5'] || ''
        req.session.data['isvaPostCode'] = req.body['isvaPostCode'] || ''
        req.session.data['isvaCity'] = req.body['isvaCity'] || ''
        req.session.data['isvaCounty'] = req.body['isvaCounty'] || ''
        req.session.data['isvaEmailAddress'] = req.body['isvaEmailAddress'] || ''
        req.session.data['isvaPhoneNumber'] = req.body['isvaPhoneNumber'] || ''
        res.redirect('/v51/victim?secondaryNav=case-contacts#case-contacts')
    })

    router.post('/v51/victim/case-contacts/isva-delete', function (req, res) {
        req.session.data['isvaDeleted'] = 'yes'
        req.session.data['isvaName'] = ''
        req.session.data['isvaAddressLine1'] = ''
        req.session.data['isvaAddressLine2'] = ''
        req.session.data['isvaAddressLine3'] = ''
        req.session.data['isvaAddressLine4'] = ''
        req.session.data['isvaAddressLine5'] = ''
        req.session.data['isvaPostCode'] = ''
        req.session.data['isvaCity'] = ''
        req.session.data['isvaCounty'] = ''
        req.session.data['isvaEmailAddress'] = ''
        req.session.data['isvaPhoneNumber'] = ''
        res.redirect('/v51/victim?secondaryNav=case-contacts#case-contacts')
    })

}