// The Bereaved Family Scheme has been merged into v60. Onboarding, family members,
// FLO/VLO and the list pages now live in v60.js; only the victim-record task routes
// (migrated separately) and redirects for links in older versions remain here.

module.exports = router => {

    // Redirects for /bfs/* URLs still hardcoded in v42/v50/v51
    var movedToV60 = {
        '/bfs/tasks': '/v60/tasks?victimProfile=deceased',
        '/bfs/victims': '/v60/victims?victimProfile=deceased',
        '/bfs/onb/deceased-victim-needs-onboarding': '/v60/onb/deceased-victim-needs-onboarding?victimProfile=deceased',
        '/bfs/onb/next-task': '/v60/onb/next-task',
        '/bfs/onb/check-details': '/v60/onb/check-details',
        '/bfs/victim/index': '/v60/victim?victimProfile=deceased'
    }

    Object.keys(movedToV60).forEach(function(from) {
        router.get(from, function(request, response) {
            response.redirect(movedToV60[from])
        })
    })

    router.post('/bfs/onb/new-task/manual-task-answer', function(request, response) {
        response.redirect("/v60/onb/check-task?manualTask=yes")
    })
}
