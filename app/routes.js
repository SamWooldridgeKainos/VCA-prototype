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
const cpsLocations = require('./data/cps-locations.json')
const magistratesCourts = require('./data/magistrates-courts.json')
const crownCourts = require('./data/crown-courts.json')
const policeForces = require('./data/police-forces.json')

// The Bereaved Family Scheme only exists in v60; every other version hides those records.
const notBfs = (record) => record.service !== 'Bereaved Family Scheme'

router.use(function (req, res, next) {
  const isBfsVersion = req.path.startsWith('/v60')
  const versionMatch = req.path.match(/^\/(v\d+)(\/|$)/)
  res.locals.serviceVersion = versionMatch ? versionMatch[1] : ''
  res.locals.victimRecords = isBfsVersion ? victimRecords : victimRecords.filter(notBfs)
  res.locals.taskRecords = isBfsVersion ? taskRecords : taskRecords.filter(notBfs)
  res.locals.taskAssignees = taskAssignees
  res.locals.vloOfficers = vloOfficers
  res.locals.cpsAreas = cpsAreas
  res.locals.cpsLocations = cpsLocations
  res.locals.magistratesCourts = magistratesCourts
  res.locals.crownCourts = crownCourts
  res.locals.policeForces = policeForces
  next()
})

require('./routes/v42')(router)

require('./routes/v50')(router)

require('./routes/v51')(router)

require('./routes/v60')(router)

require('./routes/bfs')(router)
require('./routes/meetings')(router)
require('./routes/wft-meetings')(router)