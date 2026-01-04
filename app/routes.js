//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

require('./routes/ur/pcd/dtc1')(router)
require('./routes/ur/pcd/dtc2')(router)
require('./routes/delivery/pcd/dtc')(router)

require('./routes/ur/pcd/nfa')(router)
require('./routes/delivery/pcd/nfa')(router)

require('./routes/ur/vcl')(router)
require('./routes/delivery/vcl')(router)

require('./routes/ur/wat/pcd')(router)
require('./routes/ur/wat/vcl')(router)


// meetings
// @Michael can your routes for meetings be moved to a separate file as per the above? I can show you how to do this if needed, or I can make the changes myself.



router.post('/what-do-you-want-to-log', function(request, response) {

	var logging = request.session.data['logging']
	if (logging == "yes"){
		response.redirect("/ur/meetings-2/purpose2")
	} else {
		response.redirect("/ur/meetings-2/purpose")
	}
})

router.post('/what-do-you-want-to-log-offer', function(request, response) {

	var logging2 = request.session.data['logging2']
	if (logging2 == "yes"){
		response.redirect("/ur/meetings-2/cps-offer/purpose-notaccepted")
	} else {
		response.redirect("/ur/meetings-2/purpose")
	}
})

router.post('/purpose-answer', function(request, response) {

	var purpose = request.session.data['purpose']
	if (purpose == "pre-trial"){
		response.redirect("/ur/meetings/did-victim-request")
	} else {
		response.redirect("/ur/meetings//purpose")
	}
})

router.post('/purpose2-answer', function(request, response) {

	var purpose = request.session.data['purpose2']
	if (purpose == "pre-trial"){
		response.redirect("/ur/meetings/has-meeting-been-offered")
	} else {
		response.redirect("/ur/meetings//purpose")
	}
})




router.post('/purpose3-answer', function(request, response) {

	var purpose3 = request.session.data['purpose3']
	if (purpose3 == "pre-trial"){
		response.redirect("/ur/meetings-2/did-victim-request")
	} else {
		response.redirect("/ur/meetings-2//purpose")
	}
})

router.post('/purpose4-answer', function(request, response) {

	var purpose4 = request.session.data['purpose4']
	if (purpose4 == "pre-trial"){
		response.redirect("/ur/meetings-2/has-meeting-been-offered")
	} else {
		response.redirect("/ur/meetings-2//purpose")
	}
  })
router.post('/has-meeting-been-offered', function(request, response) {

	var offered = request.session.data['offered']
	if (offered == "yes"){
		response.redirect("/ur/meetings-2/cps-offer/howoffered")
	} else {
		response.redirect("/ur/meetings-2/cps-offer/reason-why")
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

router.post('/format2-answer', function(request, response) {

	var format2 = request.session.data['format2']
	if (format2 == "face-to-face"){
		response.redirect("/ur/meetings-2/location")
	} else {
		response.redirect("/ur/meetings-2/who-is-attending")
	}
})

router.post('/howoffered-answer', function(request, response) {

	var howoffered = request.session.data['howoffered']
	if (howoffered == "letter-post"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-offered-post#communications")
  }
  else if (howoffered == "letter-email"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-offered-email#communications")
	}

  else if (howoffered == "letter-isva"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-offered-isva#communications")
	}

else if (howoffered == "letter-police"){
  response.redirect("/ur/meetings-2/cps-offer/meeting-offered-police#communications")


	} else {
		response.redirect("/ur/meetings-2/cps-offer/meeting-offered-telephone#communications")
	}
})

router.post('/howoffered2-answer', function(request, response) {

	var howoffered2 = request.session.data['howoffered2']
	if (howoffered2 == "letter-post"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-offered-post2#communications")
  }
  else if (howoffered2 == "letter-email"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-offered-email#communications")
	}

  else if (howoffered2 == "letter-isva"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-offered-isva#communications")
	}

else if (howoffered2 == "letter-police"){
  response.redirect("/ur/meetings-2/cps-offer/meeting-offered-police#communications")


	} else {
		response.redirect("/ur/meetings-2/cps-offer/meeting-offered-telephone#communications")
	}
})


router.post('/recordaccepted-answer', function(request, response) {

	var recordaccepted = request.session.data['recordaccepted']
	if (recordaccepted == "letter-post"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-accepted-post#communications")
  }
  else if (recordaccepted == "letter-email"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-accepted-email#communications")
	}

  else if (recordaccepted == "letter-isva"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-accepted-isva#communications")
	}

else if (recordaccepted == "letter-police"){
  response.redirect("/ur/meetings-2/cps-offer/meeting-accepted-police#communications")


	} else {
		response.redirect("/ur/meetings-2/cps-offer/meeting-accepted-telephone#communications")
	}
})

router.post('/recorddeclined-answer', function(request, response) {

	var recorddeclined = request.session.data['recorddeclined']
	if (recorddeclined == "letter-post"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-declined-post#communications")
  }
  else if (recorddeclined == "letter-email"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-declined-email#communications")
	}

  else if (recorddeclined == "letter-isva"){
		response.redirect("/ur/meetings-2/cps-offer/meeting-declined-isva#communications")
	}

else if (recorddeclined == "letter-police"){
  response.redirect("/ur/meetings-2/cps-offer/meeting-declined-police#communications")


	} else {
		response.redirect("/ur/meetings-2/cps-offer/meeting-declined-telephone#communications")
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


router.post('/location2-answer', function(request, response) {

	var location2 = request.session.data['location2']
	if (location2 == "cps"){
		response.redirect("/ur/meetings-2/who-is-attending")
  }
  else if (location2 == "magistrate"){
		response.redirect("/ur/meetings-2/who-is-attending")
	}

else if (location2 == "crown"){
  response.redirect("/ur/meetings-2/who-is-attending")

	} else {
		response.redirect("/ur/meetings-2/who-is-attending")
	}
})


router.post('/log-outcome/did-meeting-happen-answer', function(request, response) {

	var meeting = request.session.data['meeting']
	if (meeting == "yes"){
		response.redirect("/ur/meetings/log-outcome/duration")
	} else {
		response.redirect("/ur/meetings/log-outcome/reason-why")
	}
})


router.post('/log-outcome/did-meeting-happen2-answer', function(request, response) {

	var meeting3 = request.session.data['meeting3']
	if (meeting3 == "yes"){
		response.redirect("/ur/meetings-2/log-outcome/duration")
	} else {
		response.redirect("/ur/meetings-2/log-outcome/reason-why")
	}
})

router.post('/did-victim-request', function(request, response) {

	var meeting = request.session.data['meeting']
	if (meeting == "yes"){
		response.redirect("/ur/meetings/meeting-date")
	} else {
		response.redirect("/ur/meetings/meeting-date")
	}
})

router.post('/did-victim-request2', function(request, response) {

	var meeting2 = request.session.data['meeting2']
	if (meeting2 == "yes"){
		response.redirect("/ur/meetings-2/meeting-date")
	} else {
		response.redirect("/ur/meetings-2/meeting-date")
	}
})

router.post('/did-victim-request3', function(request, response) {

	var meeting4 = request.session.data['meeting4']
	if (meeting4 == "yes"){
		response.redirect("/ur/meetings-2/cps-offer/recordaccepted")
	} else {
		response.redirect("/ur/meetings-2/cps-offer/howoffered2")
	}
})

router.post('/log-outcome/any-actions-agreed-answer', function(request, response) {

	var actionsAgreed = request.session.data['actionsAgreed']
	if (actionsAgreed == "yes"){
		response.redirect("/ur/meetings/log-outcome/actions")
	} else {
		response.redirect("/ur/meetings/log-outcome/check-answers")
	}
})


router.post('/log-outcome/any-actions-agreed2-answer', function(request, response) {

	var actionsAgreed2 = request.session.data['actionsAgreed2']
	if (actionsAgreed2 == "yes"){
		response.redirect("/ur/meetings-2/log-outcome/check-answers")
	} else {
		response.redirect("/ur/meetings-2/log-outcome/check-answers-no")
	}
})