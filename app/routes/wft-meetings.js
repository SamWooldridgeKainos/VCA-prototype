module.exports = router => {

    router.post('/v60/wft-meetings/new-task/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "ptm") {
            response.redirect("/v50/onb/manual-task")
        } else if (nextTask == "No task at this time") {
            response.redirect("/v50/onb/check-task?manualTask=no")
        } else {
            response.redirect("/v60/wft-meetings/new-task/purposet")
        }
    })

    router.post('/v60/wft-meetings/new-task/purposet-answer', function(request, response) {

        var purposet = request.session.data['purposet']
        if (purposet == "yes"){
            response.redirect("/v60/wft-meetings/new-task/task-due-date")
        } else {
            response.redirect("/v60/wft-meetings/new-task/task-due-date")
        }
    })

    router.post('/v60/wft-meetings/new-task/task-due-date-answer', function(request, response) {

        response.redirect("/v60/wft-meetings/new-task/check-task")
    })


    router.post('/v50/wft-meetings/new-task/next-task-answer', function(request, response) {

        var nextTask = request.session.data['nextTask']

        if (nextTask == "ptm") {
            response.redirect("/v50/onb/manual-task")
        } else if (nextTask == "No task at this time") {
            response.redirect("/v50/onb/check-task?manualTask=no")
        } else {
            response.redirect("/v50/wft-meetings/new-task/purposet")
        }
    })

    router.post('/v50/wft-meetings/new-task/purposet-answer', function(request, response) {

        var purposet = request.session.data['purposet']
        if (purposet == "yes"){
            response.redirect("/v50/wft-meetings/new-task/task-due-date")
        } else {
            response.redirect("/v50/wft-meetings/new-task/task-due-date")
        }
    })

    router.post('/v50/wft-meetings/new-task/task-due-date-answer', function(request, response) {

        response.redirect("/v50/wft-meetings/new-task/check-task")
    })

}