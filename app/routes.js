//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const victimRecords = require('./data/victim-records')
const taskRecords = require('./data/task-records')
const taskAssignees = require('./data/task-assignees')
const vloOfficers = require('./data/vlo-officers')
const cpsAreas = require('./data/cps-areas')

router.use(function (req, res, next) {
  res.locals.victimRecords = victimRecords
  res.locals.taskRecords = taskRecords
  res.locals.taskAssignees = taskAssignees
  res.locals.vloOfficers = vloOfficers
  res.locals.cpsAreas = cpsAreas
  next()
})

// require('./routes/v10')(router)
// require('./routes/v11')(router)
// require('./routes/v12')(router)

// require('./routes/v20')(router)
// require('./routes/v21')(router)

// require('./routes/v30')(router)
// require('./routes/v31')(router)

// require('./routes/v40')(router)
// require('./routes/v41')(router)
require('./routes/v42')(router)

require('./routes/v50')(router)

require('./routes/v51')(router)

require('./routes/v60')(router)

require('./routes/bfs')(router)
require('./routes/meetings')(router)
require('./routes/wft-meetings')(router)