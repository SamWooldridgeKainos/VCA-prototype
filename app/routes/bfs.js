// All shared /v60/* routes are registered by v60.js (loaded first in routes.js)

module.exports = router => {

    router.post('/ur/bfs/onb/service-lead-answer', function(request, response) {

        response.redirect("/ur/bfs/onb/check-details?successNotification=yes&onboardedStatus=Yes")
    })

    router.post('/ur/bfs/check-details/case-type-answer', function(request, response) {

        response.redirect("/ur/bfs/onb/check-details?successNotification=yes")
    })

    router.post('/ur/bfs/onb/new-task/next-task-due-date-answer', function(request, response) {

        response.redirect("/ur/bfs/onb/new-task/check-task?manualTask=no")
    })

    router.post('/ur/bfs/onb/next-task-answer', function(request, response) {

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
            response.redirect("/ur/bfs/onb/new-task/meeting-purpose")
        } else {
            response.redirect("/v60/victim/new-task/task-due-date")
        }
    })

    router.post('/ur/bfs/onb/new-task/meeting-purpose-answer', function(request, response) {

        response.redirect("/ur/bfs/onb/new-task/next-task-due-date")
    })

    router.post('/ur/bfs/onb/new-task/task-due-date-answer', function(request, response) {

        response.redirect("/ur/bfs/onb/new-task/check-task")
    })

    router.post('/ur/bfs/onb/new-task/check-task-answer', function(request, response) {

        // Update existing task tracking when a task is confirmed
        request.session.data['existingTask'] = request.session.data['nextTask'] || ''
        request.session.data['existingMeetingPurpose'] = request.session.data['meetingPurpose'] || ''

        response.redirect("/ur/bfs/onb/new-task/task-created")
    })

    router.post('/ur/bfs/check-details/flo-answer', function(request, response) {

        response.redirect("/ur/bfs/onb/check-details/index-withflo")
    })

    router.post('/ur/bfs/check-details/flowithfamily-answer', function(request, response) {

        response.redirect("/ur/bfs/onb/check-details/index-withfloandfamily")
    })

    router.post('/ur/bfs/check-details/flowithfamily2-answer', function(request, response) {

        response.redirect("/ur/bfs/onb/check-details/index-withfloandfamily-1-additional")
    })

   router.post('/ur/bfs/check-details/flowithfamily3-answer', function(request, response) {

        response.redirect("/ur/bfs/onb/check-details/index-withfloandfamily-2-additional")
    })

}
