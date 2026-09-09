// All shared /v60/* routes are registered by v60.js (loaded first in routes.js)

module.exports = router => {

    router.post('/bfs/onb/service-lead-answer', function(request, response) {

        var serviceLead = request.session.data['serviceLead']

        if (serviceLead && serviceLead != "Bereaved Family Scheme") {
            response.redirect("/v51/onb/check-details?successNotification=yes&onboardedStatus=Yes")
        } else {
            request.session.data['onboardedStatus'] = 'Yes'
            request.session.data['successNotification'] = 'yes'
            response.redirect("/bfs/onb/check-details")
        }
    })

    router.post('/bfs/check-details/case-type-answer', function(request, response) {

        request.session.data['successNotification'] = 'yes'
        response.redirect("/bfs/onb/check-details")
    })

    router.post('/bfs/onb/new-task/next-task-due-date-answer', function(request, response) {

        response.redirect("/bfs/onb/new-task/check-task?manualTask=no")
    })

    router.post('/bfs/onb/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "dtc") {
            response.redirect("/v60/victim/new-task/task-due-date?pcdType=dtc")
        } else if (nextTask == "nfa") {
            response.redirect("/v60/victim/new-task/task-due-date?pcdType=nfa")
        } else if (nextTask == "stopped-charge") {
            response.redirect("/v60/victim/new-task/task-due-date?vclType=stopped-charge")
        } else if (nextTask == "altered-charge") {
            response.redirect("/v60/victim/new-task/task-due-date?vclType=altered-charge")
        } else if (nextTask == "other") {
            response.redirect("/v60/victim/new-task/manual-task")
        } else if (nextTask == "no-task") {
            response.redirect("/v60/victim/new-task/check-task")
        } else if (nextTask == "meeting-offer" || nextTask == "meeting-arranged" || nextTask == "meeting-outcome") {
            response.redirect("/bfs/onb/new-task/meeting-purpose")
        } else {
            response.redirect("/v60/victim/new-task/task-due-date")
        }
    })

    router.post('/bfs/onb/new-task/meeting-purpose-answer', function(request, response) {

        response.redirect("/bfs/onb/new-task/next-task-due-date")
    })

    router.post('/bfs/onb/new-task/task-due-date-answer', function(request, response) {

        response.redirect("/bfs/onb/new-task/check-task")
    })

    router.post('/bfs/onb/new-task/check-task-answer', function(request, response) {

        // Update existing task tracking when a task is confirmed
        request.session.data['existingTask'] = request.session.data['nextTask'] || ''
        request.session.data['existingMeetingPurpose'] = request.session.data['meetingPurpose'] || ''

        response.redirect("/bfs/onb/new-task/task-created")
    })

    router.post('/bfs/check-details/flo-answer', function(request, response) {

        request.session.data['floAdded'] = 'yes'
        request.session.data['detailChange'] = 'flo'
        request.session.data['successNotification'] = 'yes'
        response.redirect("/bfs/onb/check-details")
    })

    router.post('/bfs/check-details/check-task-vlo-answer', function(request, response) {

        request.session.data['vlo'] = request.body.vlo || ''
        request.session.data['detailChange'] = 'vlo'
        request.session.data['successNotification'] = 'yes'
        response.redirect("/bfs/onb/check-details")
    })

    // Render check-details, then clear the one-time success flag so the banner only shows while on this page
    router.get('/bfs/onb/check-details', function(request, response) {

        response.render('bfs/onb/check-details/index', function(error, html) {
            if (error) {
                throw error
            }
            delete request.session.data['successNotification']
            response.send(html)
        })
    })

    // Maps the in-progress fm* session fields to the stored family member object
    var fmMap = {
        fmFirstName: 'firstName', fmLastName: 'lastName', fmRelationship: 'relationship',
        fmPreferredName: 'preferredName', fmRepresentative: 'representative', fmEmail: 'email',
        fmMobile: 'mobile', fmHome: 'home', fmWork: 'work',
        fmAddressLine1: 'addressLine1', fmAddressLine2: 'addressLine2', fmAddressLine3: 'addressLine3',
        fmTownOrCity: 'townOrCity', fmPostCode: 'postCode',
        fmPmoc: 'pmoc', fmLanguage: 'language',
        fmTranslator: 'translator', fmTranslatorDetails: 'translatorDetails',
        fmDisability: 'disability', fmDisabilityDetails: 'disabilityDetails',
        fmReasonableAdjustments: 'reasonableAdjustments', fmContactTimes: 'contactTimes',
        fmPoaName: 'poaName', fmPoaPhone: 'poaPhone', fmPoaEmail: 'poaEmail'
    }

    function clearInProgressFamilyMember(data) {
        Object.keys(fmMap).forEach(function(key) { data[key] = '' })
        data['fmEditIndex'] = ''
        data['fmOnCheckAnswers'] = ''
    }

    // Start adding a new family member (clear any in-progress entry)
    router.get('/bfs/check-details/family-members/add', function(request, response) {

        clearInProgressFamilyMember(request.session.data)
        response.redirect("/bfs/onb/check-details/family-members/name")
    })

    // Capture the entered name. Once the check answers page has been reached, changes return there
    router.post('/bfs/check-details/family-members/name-answer', function(request, response) {

        request.session.data['fmFirstName'] = request.body.fmFirstName || ''
        request.session.data['fmLastName'] = request.body.fmLastName || ''
        if (request.session.data['fmOnCheckAnswers'] === 'yes') {
            response.redirect("/bfs/onb/check-details/family-members/check-answers")
        } else {
            response.redirect("/bfs/onb/check-details/family-members/relationship")
        }
    })

    router.post('/bfs/check-details/family-members/relationship-answer', function(request, response) {

        request.session.data['fmRelationship'] = request.body.fmRelationship || ''
        request.session.data['fmOnCheckAnswers'] = 'yes'
        response.redirect("/bfs/onb/check-details/family-members/check-answers")
    })

    // Capture any optional detail field, then return to the check answers page
    router.post('/bfs/check-details/family-members/detail-answer', function(request, response) {

        Object.keys(request.body).forEach(function(key) {
            if (key.indexOf('fm') === 0) {
                request.session.data[key] = request.body[key]
            }
        })
        response.redirect("/bfs/onb/check-details/family-members/check-answers")
    })

    // Load an existing family member into the in-progress entry so it can be viewed or changed
    router.get('/bfs/check-details/family-members/view', function(request, response) {

        var members = request.session.data['familyMembers'] || []
        var index = parseInt(request.query.index, 10)
        var member = members[index]
        if (member) {
            Object.keys(fmMap).forEach(function(key) {
                request.session.data[key] = member[fmMap[key]] || ''
            })
            request.session.data['fmEditIndex'] = String(index)
            request.session.data['fmOnCheckAnswers'] = 'yes'
        }
        response.redirect("/bfs/onb/check-details/family-members/check-answers")
    })

    // Save the in-progress family member (add a new one or update an existing one)
    router.get('/bfs/check-details/family-members/save', function(request, response) {

        var members = request.session.data['familyMembers'] || []
        var member = {}
        Object.keys(fmMap).forEach(function(key) {
            member[fmMap[key]] = request.session.data[key] || ''
        })
        var editIndex = request.session.data['fmEditIndex']
        if (editIndex !== undefined && editIndex !== '') {
            members[parseInt(editIndex, 10)] = member
        } else {
            members.push(member)
        }
        request.session.data['familyMembers'] = members
        clearInProgressFamilyMember(request.session.data)
        response.redirect("/bfs/onb/check-details")
    })

    // Remove a family member
    router.get('/bfs/check-details/family-members/remove', function(request, response) {

        var members = request.session.data['familyMembers'] || []
        var index = parseInt(request.query.index, 10)
        if (!isNaN(index) && index >= 0 && index < members.length) {
            members.splice(index, 1)
        }
        request.session.data['familyMembers'] = members
        response.redirect("/bfs/onb/check-details")
    })

    router.post('/bfs/check-details/flowithfamily-answer', function(request, response) {

        response.redirect("/bfs/onb/check-details/index-withfloandfamily")
    })

    router.post('/bfs/check-details/flowithfamily2-answer', function(request, response) {

        response.redirect("/bfs/onb/check-details/index-withfloandfamily-1-additional")
    })

   router.post('/bfs/check-details/flowithfamily3-answer', function(request, response) {

        response.redirect("/bfs/onb/check-details/index-withfloandfamily-2-additional")
    })

}
