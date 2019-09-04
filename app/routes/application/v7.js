// Routes for Application v3

var v = 'v7';
/*
var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY);
*/
var months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May',
	'Jun', 'Jul', 'Aug', 'Sep',
	'Oct', 'Nov', 'Dec'
	];

function monthNumToName(monthnum) {
	return months[monthnum - 1] || '';
}

function checkInspectionDate(d,m,y) {

	var today = new Date();
	var todayd = String(today.getDate()).padStart(2, '0');
	var todaym = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var todayy = today.getFullYear();
	
	var d1 = new Date( m + "/" + d + "/" + y);
	var d2 = new Date( todaym + "/" + todayd + "/" + todayy);

	var timeDiff = d2.getTime() - d1.getTime();
	var DaysDiff = timeDiff / (1000 * 3600 * 24);
	
	if (DaysDiff < (365*3)){
		return false;
	} else {
		return true;
	}
}

module.exports = function (router) {


/************************
 *** Have an account? ***
 ************************/

	router.post('/application/' + v + '/haveanaccount', function (req, res) {
		if (req.session.data['haveanaccount'] == "yes" ){
			res.redirect('/application/' + v + '/signin')
		} else {
			res.redirect('/application/' + v + '/createaccount')
		}
	})

/**********************
 *** Create account ***
 **********************/

	router.post('/application/' + v + '/createaccount', function (req, res) {
/*
		notify.sendEmail(
			// this long string is the template ID, copy it from the template
			// page in GOV.UK Notify. It’s not a secret so it’s fine to put it
			// in your code.
			'43fcf9ee-6f62-47f4-ad88-4514a3ee23e7',
			// `emailAddress` here needs to match the name of the form field in
			// your HTML page
			req.body.createEmail
		);
		*/
		res.redirect('/application/' + v + '/createaccount-invitesent')
	})

/**************************
 *** Forgotten password ***
 **************************/

	router.post('/application/' + v + '/forgottenpassword', function (req, res) {
/*
		notify.sendEmail(
			// this long string is the template ID, copy it from the template
			// page in GOV.UK Notify. It’s not a secret so it’s fine to put it
			// in your code.
			'7d0752a2-fe97-4fde-a2ba-596dbb49d93c',
			// `emailAddress` here needs to match the name of the form field in
			// your HTML page
			req.body.forgottenEmail
		);
		*/
		res.redirect('/application/' + v + '/forgottenpassword-sent')
	})


/***************
 *** Sign in ***
 ***************/

	router.post('/application/' + v + '/signin', function (req, res) {

		req.session.data['signedin'] = 'yes'

		if (req.session.data['signin-email'] == "skip@ofsted") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "no"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = "12-18"
			req.session.data['org-type'] = "employer"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "next"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_profile_ofsted'] = "next"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')
		} else if (req.session.data['signin-email'] == "skip@organisation") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "no"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = "12-18"
			req.session.data['org-type'] = "employer"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['pro-itt'] = "no"
			req.session.data['pro-monitoring-visit'] = "no"
			req.session.data['pro-ofsted-feskills'] = "no"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')
		} else if (req.session.data['signin-email'] == "main@organisation.parent") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "yes"
			req.session.data['org-parentcompany-name'] = "Parent Company Limited"
			req.session.data['org-parentcompany-number'] = "89987987"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = "12-18"
			req.session.data['org-type'] = "employer"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['pro-itt'] = "no"
			req.session.data['pro-monitoring-visit'] = "no"
			req.session.data['pro-ofsted-feskills'] = "no"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')
		} else if (req.session.data['signin-email'] == "employer@organisation.parent") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "yes"
			req.session.data['org-parentcompany-name'] = "Parent Company Limited"
			req.session.data['org-parentcompany-number'] = "89987987"
			req.session.data['org-selectedroute'] = "employer"
			req.session.data['org-trading'] = "12-18"
			req.session.data['org-type'] = "employer"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['pro-itt'] = "no"
			req.session.data['pro-monitoring-visit'] = "no"
			req.session.data['pro-ofsted-feskills'] = "no"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')
		} else if (req.session.data['signin-email'] == "supporting@organisation.parent") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "yes"
			req.session.data['org-parentcompany-name'] = "Parent Company Limited"
			req.session.data['org-parentcompany-number'] = "89987987"
			req.session.data['org-selectedroute'] = "supporting"
			req.session.data['org-trading'] = "3-6"
			req.session.data['org-type'] = "employer"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['pro-itt'] = "no"
			req.session.data['pro-monitoring-visit'] = "no"
			req.session.data['pro-ofsted-feskills'] = "no"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')

		} else {

			//default skip ofsted for v6 testing
			/*req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "yes"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = "12-18"
			req.session.data['org-type'] = "employer"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "next"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_profile_ofsted'] = "next"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')*/
			res.redirect('/application/' + v + '/coa')
		}

	})

	router.get('/application/' + v + '/signout', function (req, res) {
		req.session.data['signedin'] = "no"
		res.redirect('/application/' + v + '/saveandsignout')
	})


/****************
 *** Preamble ***
 ****************/

	router.post('/application/' + v + '/coa', function (req, res) {
		res.redirect('/application/' + v + '/ukprn')
	})

	// UKPRN?
	router.post('/application/' + v + '/ukprn', function (req, res) {

		let org_ukprn = req.session.data['org-ukprn']

	// companies
		if (org_ukprn === '12340101') { // Company - Happy Path
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
		} else if (org_ukprn === '12340102') { // Company - Active with no website
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
		} else if (org_ukprn === '12340103') { // Company - Active with no directors
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
	// charities
		} else if (org_ukprn === '12340201') { // Company - Also a charity
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
		} else if (org_ukprn === '12340202') { // Charity only, not a company
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
		} else if (org_ukprn === '12340203') { // Charity with no trustees listed
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
	// sole traders and partnerships
		} else if (org_ukprn === '12340301') { // Not a company (sole trader or partnership)
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
	// ineligible
		} else if (org_ukprn === '12340401') { // Company - Inactive
			res.redirect('/application/' + v + '/shutter/ukprn-inactivecompany')
		} else if (org_ukprn === '12340402') { // Company - Already on register
			res.redirect('/application/' + v + '/shutter/ukprn-onregister')
		} else if (org_ukprn === '12340403') { // Incorporation date less than 12 months ago (3 months for supporting)
			res.redirect('/application/' + v + '/shutter/incorporation')
		} else if (org_ukprn === '12340404') { // Removed from register
			res.redirect('/application/' + v + '/shutter/removed')
	// error page
		} else {
			res.redirect('/application/' + v + '/ukprn-error')
		}
	})

	// Confirm company details
	router.post('/application/' + v + '/ukprn-confirmdetails', function (req, res) {
		res.redirect('/application/' + v + '/select-route')
	})

	// Select route
	router.post('/application/' + v + '/select-route', function (req, res) {

		let selected_route = req.session.data['org-selectedroute']

		if (selected_route != '') {
			req.session.data['tl_selectroute'] = 'completed'
			req.session.data['tl_org_intro'] = 'next'
			res.redirect('/application/' + v + '/task-list')
		} else {
			res.redirect('/application/' + v + '/organisation/error/select-route')
		}
		
	})


/*************************
 *** Your organisation ***
 *************************/

	// Intro and what you'll need
	router.post('/application/' + v + '/organisation/intro', function (req, res) {

		req.session.data['tl_org_intro'] = 'completed'
		req.session.data['tl_org_details'] = 'next'
		/*
		let org_ukprn = req.session.data['org-ukprn']
		if (org_ukprn === '12340101' || org_ukprn === '12340102' || org_ukprn === '12340103' || org_ukprn === '12340201') { // Is company
			res.redirect('/application/' + v + '/organisation/org-parentcompany')
		} else {
			res.redirect('/application/' + v + '/organisation/org-ico')
		}*/
		res.redirect('/application/' + v + '/task-list#section-organisation')
	})

	/*** Parent company ***/

	// Have a parent company?
	router.post('/application/' + v + '/organisation/org-parentcompany', function (req, res) {
		req.session.data['tl_org_details'] = 'inprogress'

		if (req.session.data['org-parentcompany'] === 'yes'){
			res.redirect('/application/' + v + '/organisation/org-parentcompany-details')
		} else {
			res.redirect('/application/' + v + '/organisation/org-ico')
		}

	})

	// Parent company details
	router.post('/application/' + v + '/organisation/org-parentcompany-details', function (req, res) {
		res.redirect('/application/' + v + '/organisation/org-ico')
	})
  
	// ICO number?
	router.post('/application/' + v + '/organisation/org-ico', function (req, res) {

		let org_ico = req.session.data['org-ico']
		
		if (req.session.data['org-ukprn'] == "12340102"){
			// Org has no website in UKRLP
			res.redirect('/application/' + v + '/organisation/org-website')
		} else {
			res.redirect('/application/' + v + '/organisation/org-trading')
		}
	})
	
	// Legal status
	router.post('/application/' + v + '/organisation/org-legalstatus', function (req, res) {

		if (req.session.data['org-legalstatus']) {
			if (req.session.data['org-legalstatus'] === 'sole') { 
				res.redirect('/application/' + v + '/organisation/org-legalstatus-sole')
			} 
			if (req.session.data['org-legalstatus'] === 'partnership') {
				res.redirect('/application/' + v + '/organisation/org-legalstatus-partnership')
			}
			if (req.session.data['org-legalstatus'] === 'publicbody') {
				/******* ASK FOR DIRECTORS!!! ********/
				res.redirect('/application/' + v + '/organisation/org-type')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-legalstatus')
		}

	})


	/*** Sole trader ***/

		// Sole trader details
		router.post('/application/' + v + '/organisation/org-legalstatus-sole', function (req, res) {

			if (req.session.data['org-soletrader-dob-month'] && req.session.data['org-soletrader-dob-year'] ) {
				req.session.data['org-soletrader-dob-monthname'] = monthNumToName(req.session.data['org-soletrader-dob-month'])
				res.redirect('/application/' + v + '/organisation/org-legalstatus-sole-confirm')
			} else {
				res.redirect('/application/' + v + '/organisation/error/org-legalstatus-sole')
			}

		})

		// Sole trader details confirmation
		router.post('/application/' + v + '/organisation/org-legalstatus-sole-confirm', function (req, res) {
			res.redirect('/application/' + v + '/organisation/org-type')
		})

	
	/*** Partnership ***/

		// Partnership details 
		router.post('/application/' + v + '/organisation/org-legalstatus-partnership', function (req, res) {

			var newPartner = {
				'name': req.session.data['org-partnership-name'],
				'dob_month': monthNumToName(req.session.data['org-partnership-dob-month']),
				'dob_year': req.session.data['org-partnership-dob-year']
			}

			req.session.data['org-partnership-name'] = null
			req.session.data['org-partnership-dob-month'] = null
			req.session.data['org-partnership-dob-year'] = null

			if (!req.session.data['org-partners']) {
				req.session.data['org-partners'] = []
				var firstPartner = true;
			} else {
				var firstPartner = false;
			}
			req.session.data['org-partners'].push(newPartner)
			
			if (firstPartner) {
				res.redirect('/application/' + v + '/organisation/org-legalstatus-partnership-choice')
			} else {
				res.redirect('/application/' + v + '/organisation/org-legalstatus-partnership-confirm')
			}
			
		})

		// Add partner choice
		router.post('/application/' + v + '/organisation/org-legalstatus-partnership-choice', function (req, res) {

			res.redirect('/application/' + v + '/organisation/org-legalstatus-partnership')

		})

		// Confirm partner details
		router.post('/application/' + v + '/organisation/org-legalstatus-partnership-confirm', function (req, res) {

			//res.redirect('/application/' + v + '/organisation/org-website')
			res.redirect('/application/' + v + '/organisation/org-type')

		})
	

	// Website
	router.post('/application/' + v + '/organisation/org-website', function (req, res) {
		
		if (req.session.data['org-website']) {
			res.redirect('/application/' + v + '/organisation/org-trading')
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-website')
		}

	})

	// Started trading date
	router.post('/application/' + v + '/organisation/org-trading', function (req, res) {
		
		if (req.session.data['org-trading']) {
			/*
			if ( req.session.data['org-trading'] == "<3" || req.session.data['org-trading'] == "<12") {
				res.redirect('/application/' + v + '/shutter/org-trading')
			} else {

				req.session.data['tl_org_details'] = 'completed'
				req.session.data['tl_org_people'] = 'next'

				if (req.session.data['org-ukprn'] === "12340202") { 
					res.redirect('/application/' + v + '/organisation/org-trustees')
				} else if (req.session.data['org-ukprn'] === "12340203") {
					res.redirect('/application/' + v + '/organisation/org-trustees-declare')
				} else if (req.session.data['org-ukprn'] === "12340301") {
					res.redirect('/application/' + v + '/organisation/org-legalstatus')
				} else if (req.session.data['org-ukprn'] === "12340103") {
					res.redirect('/application/' + v + '/organisation/org-peopleincontrol-missing')
				} else {
					res.redirect('/application/' + v + '/organisation/org-peopleincontrol')
				}

			}
			*/
			req.session.data['tl_org_details'] = 'completed'
			req.session.data['tl_org_people'] = 'next'
			res.redirect('/application/' + v + '/task-list#section-organisation')
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-trading')
		}

	})


	/*** People in control ***/
	
		// Missing people in control
		router.post('/application/' + v + '/organisation/org-peopleincontrol-missing', function (req, res) {

			var newMissing = {
				'name': req.session.data['org-personincontrol-name'],
				'dob_month': monthNumToName(req.session.data['org-personincontrol-dob-month']),
				'dob_year': req.session.data['org-personincontrol-dob-year']
			}

			req.session.data['org-personincontrol-name'] = null
			req.session.data['org-personincontrol-dob-month'] = null
			req.session.data['org-personincontrol-dob-year'] = null

			if (!req.session.data['org-personincontrol-missing']) {
				req.session.data['org-personincontrol-missing'] = []
			}
			req.session.data['org-personincontrol-missing'].push(newMissing)
			
			res.redirect('/application/' + v + '/organisation/org-peopleincontrol-missing-confirm')
			
		})

		// Confirm missing people in control
		router.post('/application/' + v + '/organisation/org-peopleincontrol-missing-confirm', function (req, res) {
			req.session.data['tl_org_people'] = 'completed'
			req.session.data['tl_org_type'] = 'next'
			//res.redirect('/application/' + v + '/organisation/org-type')
			res.redirect('/application/' + v + '/task-list#section-organisation')
		})
		
		// Confirm people in control
		router.post('/application/' + v + '/organisation/org-peopleincontrol', function (req, res) {

			if (req.session.data['org-ukprn'] === "12340201") {
				res.redirect('/application/' + v + '/organisation/org-trustees')
			} else if (req.session.data['org-ukprn'] === "12340203") {
				res.redirect('/application/' + v + '/organisation/org-trustees-declare')
			} else {
				req.session.data['tl_org_people'] = 'completed'
				req.session.data['tl_org_type'] = 'next'
				//res.redirect('/application/' + v + '/organisation/org-type')
				res.redirect('/application/' + v + '/task-list#section-organisation')
			}
		})


	/*** Trustees ***/

		// Trustees from API
		router.post('/application/' + v + '/organisation/org-trustees', function (req, res) {
			res.redirect('/application/' + v + '/organisation/org-trustees-dob')
		})

		// Trustees from API - Enter dates of birth
		router.post('/application/' + v + '/organisation/org-trustees-dob', function (req, res) {
			req.session.data['org-trustee-dob1-monthname'] = monthNumToName(req.session.data['org-trustee-dob1-month'])
			req.session.data['org-trustee-dob2-monthname'] = monthNumToName(req.session.data['org-trustee-dob2-month'])
			req.session.data['org-trustee-dob3-monthname'] = monthNumToName(req.session.data['org-trustee-dob3-month'])
			res.redirect('/application/' + v + '/organisation/org-trustees-confirm')
		})

		// Declare trustees - Manual Entry
		router.post('/application/' + v + '/organisation/org-trustees-declare', function (req, res) {

			var newTrustee = {
				'name': req.session.data['org-trustee-name'],
				'dob_month': monthNumToName(req.session.data['org-trustee-dob-month']),
				'dob_year': req.session.data['org-trustee-dob-year']
			}

			req.session.data['org-trustee-name'] = null
			req.session.data['org-trustee-dob-month'] = null
			req.session.data['org-trustee-dob-year'] = null

			if (!req.session.data['org-trustees']) {
				req.session.data['org-trustees'] = []
			}
			req.session.data['org-trustees'].push(newTrustee)

			res.redirect('/application/' + v + '/organisation/org-trustees-confirm-fromdeclare')
			
		})
		
		// Confirm trustees - Info from API plus manual DoB entry
		router.post('/application/' + v + '/organisation/org-trustees-confirm', function (req, res) {
			req.session.data['tl_org_people'] = 'completed'
			req.session.data['tl_org_type'] = 'next'
			//res.redirect('/application/' + v + '/organisation/org-type')
			res.redirect('/application/' + v + '/task-list#section-organisation')
		})
		
		// Confirm trustees - Manual entry
		router.post('/application/' + v + '/organisation/org-trustees-confirm-fromdeclare', function (req, res) {
			req.session.data['tl_org_people'] = 'completed'
			req.session.data['tl_org_type'] = 'next'
			//res.redirect('/application/' + v + '/organisation/org-type')
			res.redirect('/application/' + v + '/task-list#section-organisation')
		})


	/*** Organisation type ***/

		// Organisation type
		router.post('/application/' + v + '/organisation/org-type', function (req, res) {

			let org_orgtype = req.session.data['org-type']
			let org_route = req.session.data['org-selectedroute']

			if (org_route === 'employer') {

				if (org_orgtype === 'education'){
					req.session.data['tl_org_type'] = 'inprogress'
					res.redirect('/application/' + v + '/organisation/org-type-education')
				} else if (org_orgtype === 'psb') {
					req.session.data['tl_org_type'] = 'inprogress'
					res.redirect('/application/' + v + '/organisation/org-type-psb')
				} else if (org_orgtype === 'none') {
					req.session.data['tl_org_type'] = 'inprogress'
					res.redirect('/application/' + v + '/organisation/org-type-subtype')
				} else {
					res.redirect('/application/' + v + '/organisation/error/org-type')
				}

			} else {

				if (org_orgtype === 'education') {
					req.session.data['tl_org_type'] = 'inprogress'
					res.redirect('/application/' + v + '/organisation/org-type-education')
				} else if (org_orgtype === 'employer') {
					req.session.data['tl_org_type'] = 'inprogress'
					req.session.data['tl_profile_ofsted'] = 'next'
					req.session.data['exempt_fha'] = 'no'
					res.redirect('/application/' + v + '/organisation/org-classification')
				} else if (org_orgtype === 'psb') {
					req.session.data['tl_org_type'] = 'inprogress'
					req.session.data['exempt_fha'] = 'yes'
					res.redirect('/application/' + v + '/organisation/org-type-psb')
				} else if (org_orgtype === 'ata' || org_orgtype === 'itp' || org_orgtype === 'gta') {
					req.session.data['tl_org_type'] = 'inprogress'
					req.session.data['exempt_fha'] = 'no'

					//if (req.session.data['org-type-training']) {
					if (req.session.data['org-selectedroute'] === 'employer') {
						res.redirect('/application/' + v + '/organisation/org-type-subtype')
					} else {
						res.redirect('/application/' + v + '/organisation/org-classification')
					}
					//} else {
					//	res.redirect('/application/' + v + '/organisation/error/org-type-training')
					//}

				} else {
					res.redirect('/application/' + v + '/organisation/error/org-type')
				}

			}

		})

		// Organisation type = Education
		router.post('/application/' + v + '/organisation/org-type-education', function (req, res) {

			let org_orgtype_edu = req.session.data['org-type-education']
			let org_route = req.session.data['org-selectedroute']

			if (
				org_orgtype_edu === 'national-college' || 
				org_orgtype_edu === 'sixth-form' || 
				org_orgtype_edu === 'gfe')
			{
				req.session.data['org-fundedbytext'] = 'receiving funding from ESFA'
			} else if (
				org_orgtype_edu === 'academy' ||
				org_orgtype_edu === 'multi-academy' ||
				org_orgtype_edu === 'fei')
			{
				req.session.data['org-fundedbytext'] = 'already registered with ESFA'
			} else if (org_orgtype_edu === 'hei') {
				req.session.data['org-fundedbytext'] = 'funded by the Office for Students'
			} else if (org_orgtype_edu === 'school') {
				res.redirect('/application/' + v + '/organisation/org-type-education-school')
			} else {
				res.redirect('/application/' + v + '/organisation/error/org-type-education')
			}
			
			res.redirect('/application/' + v + '/organisation/org-fundedby')

		})

		// Organisation type = Education - School type
		router.post('/application/' + v + '/organisation/org-type-education-school', function (req, res) {

			let org_orgtype_edu_school = req.session.data['org-type-education-school']

			if (req.session.data['org-type-education']) {
				if (org_orgtype_edu_school === 'free-school') {
					req.session.data['org-fundedbytext'] = 'already registered with ESFA'
					res.redirect('/application/' + v + '/organisation/org-fundedby')
				} else {
					res.redirect('/application/' + v + '/organisation/org-classification')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/org-type-education-school')
			}
		})

		// Organisation type = Public Sector Body
		router.post('/application/' + v + '/organisation/org-type-psb', function (req, res) {

			let org_orgtype_psb = req.session.data['org-type-psb']
			let org_route = req.session.data['org-selectedroute']
			req.session.data['exempt_fha'] = 'yes'

			if (org_orgtype_psb) {
				if (org_route === 'employer') {
					res.redirect('/application/' + v + '/organisation/org-type-subtype')
				} else {
					res.redirect('/application/' + v + '/organisation/org-classification')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/org-type-psb')
			}

		})

		// Organisation type - Funded by
		router.post('/application/' + v + '/organisation/org-fundedby', function (req, res) {

			let org_fundedby = req.session.data['org-fundedby']
			let org_route = req.session.data['org-selectedroute']
			req.session.data['tl_org_type'] = 'completed'

			if (org_fundedby === 'yes') {
				req.session.data['exempt_fha'] = 'yes'
			} else if (org_fundedby === 'no') {
				req.session.data['exempt_fha'] = 'no'
			} else {
				res.redirect('/application/' + v + '/organisation/error/org-fundedby')
			}

			if (org_route === 'employer') {
				res.redirect('/application/' + v + '/organisation/org-type-subtype')
			} else {
				res.redirect('/application/' + v + '/organisation/org-classification')
			}

		})

		// Employer route organisation - Sub-type
		router.post('/application/' + v + '/organisation/org-type-subtype', function (req, res) {
			res.redirect('/application/' + v + '/organisation/org-classification')
		})

		// Organisation classification
		router.post('/application/' + v + '/organisation/org-classification', function (req, res) {
			
			req.session.data['tl_org_profile'] = 'next'
			req.session.data['tl_org_type'] = 'completed'
			if (req.session.data['org-selectedroute'] == 'supporting') {
				res.redirect('/application/' + v + '/organisation/pro-subcontractor')
			} else {
				req.session.data['tl_org_profile'] = 'next'
				//res.redirect('/application/' + v + '/organisation/pro-itt')
				res.redirect('/application/' + v + '/task-list#section-organisation')
			}

		})


	/*** PR3 ***/

		// Profile - ITT accreditation
		router.post('/application/' + v + '/organisation/pro-itt', function (req, res) {
			if (req.session.data['pro-itt']) {
				req.session.data['tl_org_profile'] = 'inprogress'
				if (req.session.data['pro-itt'] == "yes") {
					res.redirect('/application/' + v + '/organisation/pro-postgrad')
				} else {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-feskills')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-itt')
			}
		})

		// Profile - Post-grad teaching apprenticeship only
		router.post('/application/' + v + '/organisation/pro-postgrad', function (req, res) {
			if (req.session.data['pro-postgrad']) {
				if (req.session.data['pro-postgrad'] == "yes") {
					req.session.data['tl_org_profile'] = 'completed'
					/***** EXEMPT FROM L&M and AW *****/
					req.session.data['exempt_lm'] = 'yes'
					req.session.data['exempt_aw'] = 'yes'
					res.redirect('/application/' + v + '/task-list#section-organisation')
				} else {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-feskills')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-postgrad')
			}
		})


	/*** PR1 ***/

		// Profile - Ofsted inspection for further education and skills
		router.post('/application/' + v + '/organisation/pro-ofsted-feskills', function (req, res) {
			if (req.session.data['pro-ofsted-feskills']) {
				if (req.session.data['pro-ofsted-feskills'] == "yes") {
					
					//req.session.data['ofsted-inspection-date-more'] = checkInspectionDate(req.session.data['pro-ofsted-feskills-date-day'],req.session.data['pro-ofsted-feskills-date-month'],req.session.data['pro-ofsted-feskills-date-year'])

					res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships')
					//res.redirect('/application/' + v + '/organisation/pro-ofsted-feskills-published')

				} else {
					/*** PR2 ***/
					if (req.session.data['org-type-education'] == "hei" && req.session.data['org-fundedby'] == "yes"){
						// EXEMPT FROM AW and CCLM1-6
						req.session.data['exempt_lm'] = 'partial'
						req.session.data['exempt_aw'] = 'yes'
					}
					res.redirect('/application/' + v + '/organisation/pro-monitoring-visit')
					//req.session.data['tl_org_profile'] = 'completed'
					//res.redirect('/application/' + v + '/task-list')
				}
			}
		})

		// Profile - Ofsted inspection for further education and skills publish date
		/*router.post('/application/' + v + '/organisation/pro-ofsted-feskills-published', function (req, res) {

			req.session.data['ofsted-inspection-date-more'] = checkInspectionDate(req.session.data['pro-ofsted-feskills-date-day'],req.session.data['pro-ofsted-feskills-date-month'],req.session.data['pro-ofsted-feskills-date-year'])

			res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships')

		})*/

		// Profile - Monitoring visit
		router.post('/application/' + v + '/organisation/pro-monitoring-visit', function (req, res) {
			req.session.data['tl_org_profile'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-organisation')
		})

		// Profile - Ofsted inspection for apprentices
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships', function (req, res) {
			if (req.session.data['pro-ofsted-apprenticeships']) {
				if (req.session.data['pro-ofsted-apprenticeships'] == "yes") {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grade')
				} else {
					if (req.session.data['org-type-education'] == "hei" && req.session.data['org-fundedby'] == "yes"){
						// EXEMPT FROM AW and CCLM1-6
						req.session.data['exempt_lm'] = 'partial'
						req.session.data['exempt_aw'] = 'yes'
						req.session.data['tl_org_profile'] = 'completed'
						res.redirect('/application/' + v + '/task-list#section-organisation')
					} else {
						res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grade')
					}
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships')
			}
		})

		// Profile - Grade of Ofsted inspection for apprentices
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grade', function (req, res) {
				if (req.session.data['pro-ofsted-apprenticeships-grade'] == "requires-improvement") {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grade')
				} else {
					/*if (req.session.data['ofsted-inspection-date-more'] == true){ // NOT WITHIN LAST 3 YEARS
					
						if (req.session.data['pro-ofsted-apprenticeships-grade'] == "inadequate") {
							req.session.data['tl_org_profile'] = 'completed'
							res.redirect('/application/' + v + '/task-list#section-organisation')
						} else { 
							// Grade is outstanding or good
							res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection')
						}
				
					} else { // WITHIN LAST 3 YEARS
						
						if (req.session.data['pro-ofsted-apprenticeships-grade'] == "inadequate") {
							// INELIGIBLE TO APPLY > SHUTTER PAGE
							res.redirect('/application/' + v + '/shutter/organisation/pro-ofsted-apprenticeships-date')
						} else { 
							// Grade is outstanding or good
							res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-fundingmaintained')
						}

					}*/
					res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-date')
				}
		})

		// Profile - Grade of Ofsted inspection for apprentices within 3 years
		
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-date', function (req, res) {
			
			if (req.session.data['pro-ofsted-apprenticeships-date']) {
				if (req.session.data['pro-ofsted-apprenticeships-date'] == "yes") {
					if (req.session.data['pro-ofsted-apprenticeships-grade'] == "inadequate") {
						// INELIGIBLE TO APPLY > SHUTTER PAGE
						res.redirect('/application/' + v + '/shutter/organisation/pro-ofsted-apprenticeships-date')
					} else { 
						// Grade is outstanding or good
						res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-fundingmaintained')
					}
				} else { // NOT WITHIN LAST 3 YEARS
					//
					if (req.session.data['pro-ofsted-apprenticeships-grade'] == "inadequate") {
						req.session.data['tl_org_profile'] = 'completed'
						res.redirect('/application/' + v + '/task-list')
					} else { 
						// Grade is outstanding or good
						res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection')
					}
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships-date')
			}

		})
		

		// Profile - Apprentices short inspection <3 years
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection', function (req, res) {

			if (req.session.data['pro-ofsted-apprenticeships-shortinspection'] == "yes") {
				
				//res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection-published')
				
				//req.session.data['pro-ofsted-apprenticeships-shortinspection-date-more'] = checkInspectionDate(req.session.data['pro-ofsted-apprenticeships-shortinspection-date-day'],req.session.data['pro-ofsted-apprenticeships-shortinspection-date-month'],req.session.data['pro-ofsted-apprenticeships-shortinspection-date-year'])

				if (req.session.data['pro-ofsted-apprenticeships-shortinspection-date'] == "no"){ // NOT WITHIN LAST 3 YEARS
					// COMPLETE ALL SECTIONS
					req.session.data['tl_org_profile'] = 'completed'
					res.redirect('/application/' + v + '/task-list')
				} else { // WITHIN LAST 3 YEARS
					// GO TO GRADE MAINTAINED
					res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grademaintained')
				}
				

			} else {
				// COMPLETE ALL SECTIONS
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			}

		})

		// Profile - Apprentices short inspection <3 years - published date
		/*router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection-published', function (req, res) {

			req.session.data['pro-ofsted-apprenticeships-shortinspection-date-more'] = checkInspectionDate(req.session.data['pro-ofsted-apprenticeships-shortinspection-date-day'],req.session.data['pro-ofsted-apprenticeships-shortinspection-date-month'],req.session.data['pro-ofsted-apprenticeships-shortinspection-date-year'])

			if (req.session.data['pro-ofsted-apprenticeships-shortinspection-date-more'] == true){ // NOT WITHIN LAST 3 YEARS
				// COMPLETE ALL SECTIONS
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			} else { // WITHIN LAST 3 YEARS
				// GO TO GRADE MAINTAINED
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grademaintained')
			}

		})*/

		// Profile - Grade maindained from short inspection for apprentices
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grademaintained', function (req, res) {
			if (req.session.data['pro-ofsted-apprenticeships-grademaintained'] == "yes") {
				// GO TO FUNDING MAINTAINED
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-fundingmaintained')
			} else {
				// COMPLETE ALL SECTIONS
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			}
		})

		// Profile - Ofsted inspection for apprentices outstanding/good - maintained funding
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-fundingmaintained', function (req, res) {

			if (req.session.data['pro-ofsted-apprenticeships-fundingmaintained']) {
				if (req.session.data['pro-ofsted-apprenticeships-fundingmaintained'] == "yes") {
					/***** EXEMPT FROM L&M and AW *****/
					req.session.data['exempt_lm'] = 'yes'
					req.session.data['exempt_aw'] = 'yes'
				}
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships-fundingmaintained')
			}
		})


	/*** PR4 ***/

		// Profile - Overall Effectiveness Grade of Ofsted inspection
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-grade', function (req, res) {
			
			if (req.session.data['pro-ofsted-overall-grade'] == "outstanding" || req.session.data['pro-ofsted-overall-grade'] == "good" || req.session.data['pro-ofsted-overall-grade'] == "inadequate") {

				/*if (req.session.data['ofsted-inspection-date-more'] == true){ // NOT WITHIN LAST 3 YEARS
				
					if (req.session.data['pro-ofsted-overall-grade'] == "inadequate") {
						req.session.data['tl_org_profile'] = 'completed'
						res.redirect('/application/' + v + '/task-list#section-organisation')
					} else {
						res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection')
					}
			
				} else { // WITHIN LAST 3 YEARS

					if (req.session.data['pro-ofsted-overall-grade'] == "inadequate") {
						res.redirect('/application/' + v + '/shutter/organisation/pro-ofsted-overall-inadequate')
					} else { // OUTSTANDING OR GOOD
						//res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-fundingmaintained')
					}

				}*/
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-date')

			} else {
				// Ofsted grade of 'Requires improvement'
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			}

		})

		// Profile - Overall Effectiveness Grade less than 3 years ago
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-date', function (req, res) {
			if (req.session.data['pro-ofsted-overall-date']) {
				if (req.session.data['pro-ofsted-overall-date'] == "yes") {
					if (req.session.data['pro-ofsted-overall-grade'] == "inadequate") {
						res.redirect('/application/' + v + '/shutter/organisation/pro-ofsted-overall-inadequate')
					} else { // OUTSTANDING OR GOOD
						res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-fundingmaintained')
					}
				} else {
					if (req.session.data['pro-ofsted-overall-grade'] == "inadequate") {
						req.session.data['tl_org_profile'] = 'completed'
						res.redirect('/application/' + v + '/task-list')
					} else {
						res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection')
					}
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-date')
			}
		})

		// Profile - Overall short inspection
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection', function (req, res) {
			if (req.session.data['pro-ofsted-overall-shortinspection']) {
				if (req.session.data['pro-ofsted-overall-shortinspection'] == "yes") {

					//res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection-published')
					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grademaintained')

				} else {
					req.session.data['tl_org_profile'] = 'completed'
					res.redirect('/application/' + v + '/task-list#section-organisation')
				}

			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-shortinspection')
			}
		})

		// Profile - Overall short inspection
		/*router.post('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection-published', function (req, res) {

			req.session.data['pro-ofsted-overall-shortinspection-date-more'] = checkInspectionDate(req.session.data['pro-ofsted-overall-shortinspection-date-day'],req.session.data['pro-ofsted-overall-shortinspection-date-month'],req.session.data['pro-ofsted-overall-shortinspection-date-year'])

			if (req.session.data['pro-ofsted-overall-shortinspection-date-more'] == true){ // NOT WITHIN LAST 3 YEARS
				// COMPLETE ALL SECTIONS
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			} else { // WITHIN LAST 3 YEARS
				// GO TO GRADE MAINTAINED
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grademaintained')
			}

		})*/

		// Profile - Overall grade maintained
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-grademaintained', function (req, res) {
			if (req.session.data['pro-ofsted-overall-grademaintained']) {
				if (req.session.data['pro-ofsted-overall-grademaintained'] == "yes") {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-fundingmaintained')
				}
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-grademaintained')
			}
		})

		// Profile - Overall Ofsted inspection - Maintained funding?
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-fundingmaintained', function (req, res) {
			if (req.session.data['pro-ofsted-overall-fundingmaintained']) {
				if (req.session.data['pro-ofsted-overall-fundingmaintained'] == "yes") {
					/***** EXEMPT FROM AW and CCLM1-6 *****/
					req.session.data['exempt_lm'] = 'partial'
					req.session.data['exempt_aw'] = 'yes'
					req.session.data['tl_org_profile'] = 'completed'
				} else {
					req.session.data['tl_org_profile'] = 'completed'
				}
				res.redirect('/application/' + v + '/task-list#section-organisation')
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-fundingmaintained')
			}
		})
		

	/*** PR5 ***/

		// Profile - Subcontractor
		router.post('/application/' + v + '/organisation/pro-subcontractor', function (req, res) {
			// if yes limit = £500k 
			// if no limit = £100k
			req.session.data['tl_org_profile'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-organisation')
		})


/**************************
 *** Financial Evidence ***
 **************************/

	// Intro and what you'll need
	router.post('/application/' + v + '/financial/intro', function (req, res) {
		req.session.data['tl_fin_intro'] = 'completed'
		//res.redirect('/application/' + v + '/financial/full-accounts')
		res.redirect('/application/' + v + '/task-list#section-financial')
	})

	// Full financial statements for the last year?
	router.post('/application/' + v + '/financial/full-statements', function (req, res) {
		req.session.data['tl_fin_upload'] = 'inprogress'
		if (req.session.data['fin-fullstatements'] == "yes"){
			res.redirect('/application/' + v + '/financial/full-statements-upload')
		} else {
			if (req.session.data['org-selectedroute'] == "supporting"){
				res.redirect('/application/' + v + '/financial/incomplete-statements-supporting')
			} else {
				res.redirect('/application/' + v + '/financial/incomplete-statements')
			}
		}
	})

	// Full statements upload
	router.post('/application/' + v + '/financial/full-statements-upload', function (req, res) {
		res.redirect('/application/' + v + '/financial/who-prepared')
	})

	// Main or employer

		// Incomplete statements
		router.post('/application/' + v + '/financial/incomplete-statements', function (req, res) {
			res.redirect('/application/' + v + '/financial/incomplete-statements-upload')
		})

		// Who prepared incomplete statements
		router.post('/application/' + v + '/financial/incomplete-statements-upload', function (req, res) {
			res.redirect('/application/' + v + '/financial/who-prepared')
		})

	// Supporting

		// Incomplete statements
		router.post('/application/' + v + '/financial/incomplete-statements-supporting', function (req, res) {
			res.redirect('/application/' + v + '/financial/incomplete-statements-supporting-upload')
		})

		// Who prepared incomplete statements
		router.post('/application/' + v + '/financial/incomplete-statements-supporting-upload', function (req, res) {
			res.redirect('/application/' + v + '/financial/who-prepared')
		})

	// Who prepared statements
	router.post('/application/' + v + '/financial/who-prepared', function (req, res) {
		req.session.data['tl_fin_upload'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-financial')
	})

	// Parent company

		// Parent company interstitial
		router.post('/application/' + v + '/financial/parentcompany', function (req, res) {
			req.session.data['tl_fin_parent'] = 'inprogress'
			if (req.session.data['fin-consolidatedstatements'] == "no") {
				res.redirect('/application/' + v + '/financial/parentcompany-subsidiary')
			} else {
				res.redirect('/application/' + v + '/financial/parentcompany-upload')
			}
		})

		// Parent company have a subsidiary
		router.post('/application/' + v + '/financial/parentcompany-subsidiary', function (req, res) {
			if (req.session.data['fin-parentsubsidiary'] == "yes"){
				res.redirect('/application/' + v + '/financial/parentcompany-subsidiary-upload')
			} else {
				res.redirect('/application/' + v + '/financial/parentcompany-consolidated')
			}
		})

		// Parent company upload
		router.post('/application/' + v + '/financial/parentcompany-upload', function (req, res) {
			res.redirect('/application/' + v + '/financial/parentcompany-subsidiary-upload')
		})

		// Parent company subsidiary upload
		router.post('/application/' + v + '/financial/parentcompany-subsidiary-upload', function (req, res) {
			res.redirect('/application/' + v + '/financial/parentcompany-who-prepared')
		})

		// Parent company consolidated
		router.post('/application/' + v + '/financial/parentcompany-consolidated', function (req, res) {
			res.redirect('/application/' + v + '/financial/parentcompany-who-prepared')
		})

		// Parent company subsidiary upload
		router.post('/application/' + v + '/financial/parentcompany-who-prepared', function (req, res) {
			req.session.data['tl_fin_parent'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-financial')
		})


	// Upload financial statements
	/*router.post('/application/' + v + '/financial/upload-financial', function (req, res) {
		if (req.session.data['fin-fullaccounts'] == "yes"){
			req.session.data['tl_fin_upload'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-financial')
		} else {
			/*if (req.session.data['org-selectedroute'] == "supporting") {
				res.redirect('/application/' + v + '/financial/upload-supporting-management')
			} else {*/
				/*res.redirect('/application/' + v + '/financial/upload-management')
			//}
		}
	})*/

	// Upload management accounts
	router.post('/application/' + v + '/financial/upload-management', function (req, res) {
		req.session.data['tl_fin_upload'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-financial')
	})


/************************************
 *** Criminal & compliance checks ***
 ************************************/

	// Intro and what you'll need
	router.post('/application/' + v + '/declarations/intro', function (req, res) {
		req.session.data['tl_dec_intro'] = 'completed'
		//res.redirect('/application/' + v + '/declarations/org-debt')
		res.redirect('/application/' + v + '/task-list#section-declarations')
	})

	// Organisation - Debt?
	router.post('/application/' + v + '/declarations/org-debt', function (req, res) {
		req.session.data['tl_dec_organisation'] = 'inprogress'
		res.redirect('/application/' + v + '/declarations/org-repay-funding')
	})

	// Organisation - Failed to repay funding?
	router.post('/application/' + v + '/declarations/org-repay-funding', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-contract-terminated')
	})

	// Organisation - Contract terminated by a public body?
	router.post('/application/' + v + '/declarations/org-contract-terminated', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-withdrawn-contract')
	})

	// Organisation - Withdrawn from a contract
	router.post('/application/' + v + '/declarations/org-withdrawn-contract', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-roto')
	})

	// Organisation - Removed from Register of Training Organisations
	router.post('/application/' + v + '/declarations/org-roto', function (req, res) {
		//res.redirect('/application/' + v + '/declarations/org-safeguarding')
		res.redirect('/application/' + v + '/declarations/org-funding-removed')
	})

	// Organisation - funding removed from any education bodies
	router.post('/application/' + v + '/declarations/org-funding-removed', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-trade-register')
	})

	// Organisation - removed from any professional or trade registers
	router.post('/application/' + v + '/declarations/org-trade-register', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-itt-withdrawal')
	})

	// Organisation - ITT withdrawal
	router.post('/application/' + v + '/declarations/org-itt-withdrawal', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-safeguarding')
	})

	// Organisation - Safeguarding
	router.post('/application/' + v + '/declarations/org-safeguarding', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-whistleblowing')
	})

	// Organisation - Whistleblowing
	router.post('/application/' + v + '/declarations/org-whistleblowing', function (req, res) {
		req.session.data['tl_dec_organisation'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-declarations')
	})


	// Who’s in control intro and what you'll need
	router.post('/application/' + v + '/declarations/people-intro', function (req, res) {
		req.session.data['tl_dec_peopleintro'] = 'completed'
		//res.redirect('/application/' + v + '/declarations/org-debt')
		res.redirect('/application/' + v + '/task-list#section-declarations')
	})


	// Who’s in control - Criminal convictions
	router.post('/application/' + v + '/declarations/people-convictions', function (req, res) {
		// Will need to go in to a loop if answered yes
		req.session.data['tl_dec_people'] = 'inprogress'
		res.redirect('/application/' + v + '/declarations/people-repay-funding')
		//res.redirect('/application/' + v + '/task-list#section-declarations')
	})


	// Who’s in control - failed to repay funding
	router.post('/application/' + v + '/declarations/people-repay-funding', function (req, res) {
		//req.session.data['tl_dec_people'] = 'inprogress'
		res.redirect('/application/' + v + '/declarations/people-fraud')
	})

	// Who’s in control - fraud or irregularities last 3 years
	router.post('/application/' + v + '/declarations/people-fraud', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-fraud-ongoing')
	})

	// Who’s in control - ongoing fraud or irregularities
	router.post('/application/' + v + '/declarations/people-fraud-ongoing', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-contract-terminated')
	})

	// Who’s in control - Contract terminated by a public body?
	router.post('/application/' + v + '/declarations/people-contract-terminated', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-withdrawn-contract')
	})

	// Who’s in control - Withdrawn from a contract
	router.post('/application/' + v + '/declarations/people-withdrawn-contract', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-tax-payments')
	})

	// Who’s in control - Breached tax payments or social security contributions
	router.post('/application/' + v + '/declarations/people-tax-payments', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-charity-register')
	})

	// Who’s in control - Charity register
	router.post('/application/' + v + '/declarations/people-charity-register', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-trustee-register')
	})

	// Who’s in control - Trustee register
	router.post('/application/' + v + '/declarations/people-trustee-register', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-bankrupt')
		//res.redirect('/application/' + v + '/task-list#section-declarations')
	})

	// Who’s in control - Bankrupt?
	router.post('/application/' + v + '/declarations/people-bankrupt', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-insolvency')
	})

	// Who’s in control - Insolvency?
	router.post('/application/' + v + '/declarations/people-insolvency', function (req, res) {
		req.session.data['tl_dec_people'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-declarations')
	})

	// Who’s in control - Criminal convictions
	/*router.post('/application/' + v + '/declarations/people-convictions', function (req, res) {
		// Will need to go in to a loop if answered yes
		req.session.data['tl_dec_people'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-declarations')
	})*/


/******************************
 *** Apprenticeship welfare ***
 ******************************/

	// What you'll need
	router.post('/application/' + v + '/welfare/intro', function (req, res) {
		req.session.data['tl_wel_intro'] = 'completed'
		/*
		if (req.session.data['org-selectedroute'] == "supporting") {
			res.redirect('/application/' + v + '/welfare/upload-diversity')
		} else {
			res.redirect('/application/' + v + '/welfare/upload-continuity')
		}
		*/
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Continuity plan upload
	router.post('/application/' + v + '/welfare/upload-continuity', function (req, res) {
		req.session.data['tl_wel_continuity'] = 'completed'
		//res.redirect('/application/' + v + '/welfare/upload-diversity')
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Equality and diversity policy upload
	router.post('/application/' + v + '/welfare/upload-diversity', function (req, res) {
		req.session.data['tl_wel_diversity'] = 'completed'
		//res.redirect('/application/' + v + '/welfare/upload-safeguarding')
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Safeguarding policy upload
	router.post('/application/' + v + '/welfare/upload-safeguarding', function (req, res) {
		req.session.data['tl_wel_safeguarding'] = 'inprogress'
		res.redirect('/application/' + v + '/welfare/safeguarding')
	})

	// Who's responsible for safeguarding
	router.post('/application/' + v + '/welfare/safeguarding', function (req, res) {
		req.session.data['tl_wel_safeguarding'] = 'completed'
		//res.redirect('/application/' + v + '/welfare/preventduty')
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Include responsibilities to Prevent duty
	router.post('/application/' + v + '/welfare/preventduty', function (req, res) {
		if (req.session.data['wel-preventduty'] == "no") {
			req.session.data['tl_wel_preventduty'] = 'inprogress'
			res.redirect('/application/' + v + '/welfare/upload-preventduty')
		} else {
			req.session.data['tl_wel_preventduty'] = 'completed'
			//res.redirect('/application/' + v + '/welfare/upload-healthandsafety')
			res.redirect('/application/' + v + '/task-list#section-welfare')
		}
	})

	// Prevent duty policy upload
	router.post('/application/' + v + '/welfare/upload-preventduty', function (req, res) {
		req.session.data['tl_wel_preventduty'] = 'completed'
		//res.redirect('/application/' + v + '/welfare/upload-healthandsafety')
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Health and safety policy upload
	router.post('/application/' + v + '/welfare/upload-healthandsafety', function (req, res) {
		req.session.data['tl_wel_healthandsafety'] = 'inprogress'
		res.redirect('/application/' + v + '/welfare/healthandsafety-details')
	})

	// Who's responsible for health and safety
	/*router.post('/application/' + v + '/welfare/healthandsafety', function (req, res) {
		if (req.session.data['wel-healthandsafetyresponsible'] == "yes") {
			res.redirect('/application/' + v + '/welfare/healthandsafety-details')
		} else {
			req.session.data['tl_wel_healthandsafety'] = 'completed'
			//res.redirect('/application/' + v + '/welfare/otherpolicies')
			res.redirect('/application/' + v + '/task-list#section-welfare')
		}
	})*/

	// Who's responsible for health and safety - details
	router.post('/application/' + v + '/welfare/healthandsafety-details', function (req, res) {
		req.session.data['tl_wel_healthandsafety'] = 'completed'
		//res.redirect('/application/' + v + '/welfare/otherpolicies')
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Who's responsible for health and safety - details
	router.post('/application/' + v + '/welfare/otherpolicies', function (req, res) {
		req.session.data['tl_wel_other'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})


/***************************
 *** Readiness to engage ***
 ***************************/

	// What you'll need
	router.post('/application/' + v + '/readiness/intro', function (req, res) {
		req.session.data['tl_rte_intro'] = 'completed'
		//res.redirect('/application/' + v + '/readiness/engaged')
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})	

	// Engaged with employers?
	router.post('/application/' + v + '/readiness/engaged', function (req, res) {
		req.session.data['tl_rte_engagement'] = 'inprogress'
		res.redirect('/application/' + v + '/readiness/relationships')
	})	

	// Manage relationships with employers?
	router.post('/application/' + v + '/readiness/relationships', function (req, res) {
		res.redirect('/application/' + v + '/readiness/managing-relationships')
	})		

	// Managing relationships?
	router.post('/application/' + v + '/readiness/managing-relationships', function (req, res) {
		if (req.session.data['rte-managingrelationships'] == "yes") {
			res.redirect('/application/' + v + '/readiness/managing-relationships-detail')
		} else {
			//res.redirect('/application/' + v + '/readiness/promote')
		req.session.data['tl_rte_engagement'] = 'completed'
		//res.redirect('/application/' + v + '/readiness/upload-complaints')
		res.redirect('/application/' + v + '/task-list#section-readiness')
		}
	})	

	// Managing relationships?
	router.post('/application/' + v + '/readiness/managing-relationships-detail', function (req, res) {
		//res.redirect('/application/' + v + '/readiness/fat')
		//res.redirect('/application/' + v + '/readiness/promote')
		req.session.data['tl_rte_engagement'] = 'completed'
		//res.redirect('/application/' + v + '/readiness/upload-complaints')
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})

	// Promote apprenticeships
	/*router.post('/application/' + v + '/readiness/promote', function (req, res) {
		req.session.data['tl_rte_engagement'] = 'completed'
		//res.redirect('/application/' + v + '/readiness/upload-complaints')
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})*/

	// Upload complaints policy
	router.post('/application/' + v + '/readiness/upload-complaints', function (req, res) {
		req.session.data['tl_rte_complaints'] = 'completed'
		//res.redirect('/application/' + v + '/readiness/upload-contractforservices')
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})

	// Upload contract for services
	router.post('/application/' + v + '/readiness/upload-contractforservices', function (req, res) {
		req.session.data['tl_rte_contractforservices'] = 'completed'
		//res.redirect('/application/' + v + '/readiness/upload-commitmentstatement')
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})

	// Upload commitment statement
	router.post('/application/' + v + '/readiness/upload-commitmentstatement', function (req, res) {
		req.session.data['tl_rte_commitment'] = 'completed'
		//res.redirect('/application/' + v + '/readiness/prior-learning-assessments')
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})

	// Prior learning assessments
	router.post('/application/' + v + '/readiness/prior-learning-assessments', function (req, res) {
		req.session.data['tl_rte_priorlearning'] = 'inprogress'
		res.redirect('/application/' + v + '/readiness/asses-english-maths')
	})

	// Assess English and Maths
	router.post('/application/' + v + '/readiness/asses-english-maths', function (req, res) {
		req.session.data['tl_rte_priorlearning'] = 'completed'
		//res.redirect('/application/' + v + '/readiness/use-subcontractors')
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})

	// Use subcontractors?
	router.post('/application/' + v + '/readiness/use-subcontractors', function (req, res) {
		req.session.data['tl_rte_subcontractors'] = 'inprogress'
		if (req.session.data['rte-usesubcontractors'] == "yes") {
			res.redirect('/application/' + v + '/readiness/manage-subcontractors')
		} else {
			req.session.data['tl_rte_subcontractors'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-readiness')
		}
	})

	// Manage subcontractors?
	router.post('/application/' + v + '/readiness/manage-subcontractors', function (req, res) {
		req.session.data['tl_rte_subcontractors'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})


/****************************************
 *** Planning apprenticeship delivery ***
 ****************************************/

	// What you'll need
	router.post('/application/' + v + '/planning/intro', function (req, res) {
		req.session.data['tl_plan_intro'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-planning')
	})	

	// Type of apprenticeship training
	router.post('/application/' + v + '/planning/01-type', function (req, res) {
		req.session.data['tl_plan_type'] = 'inprogress'
		if (
			req.session.data['plan-type']['0'] == "apprenticeship-standards" || 
			req.session.data['plan-type']['0'] == "full-apprenticeship-standards" || 
			req.session.data['plan-type']['0'] == "part-apprenticeship-standards" || 
			req.session.data['plan-type']['1'] == "part-apprenticeship-standards")
			{
				res.redirect('/application/' + v + '/planning/02-readytodeliver')
		} else {
			if (req.session.data["org-selectedroute"] == "supporting"){
				req.session.data['tl_plan_type'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-planning')
			} else {
				res.redirect('/application/' + v + '/planning/03-engaging')
			}
		}
	})	

	// Ready to deliver
	router.post('/application/' + v + '/planning/02-readytodeliver', function (req, res) {
		if (req.session.data["org-selectedroute"] == "supporting"){
			req.session.data['tl_plan_type'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-planning')
		} else {
			res.redirect('/application/' + v + '/planning/03-engaging')
		}
	})	

	// Plan to engage
	router.post('/application/' + v + '/planning/03-engaging', function (req, res) {
		req.session.data['tl_plan_type'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-planning')
		/*if (req.session.data["org-selectedroute"] == "employer"){
			res.redirect('/application/' + v + '/planning/04-supported')
		} else {
			res.redirect('/application/' + v + '/planning/05-contact')
		}*/
	})	

	// Apprentices supported
	router.post('/application/' + v + '/planning/04-supported', function (req, res) {
		req.session.data['tl_plan_supporting'] = 'completed'
		//res.redirect('/application/' + v + '/planning/06-forecast-starts')
		res.redirect('/application/' + v + '/task-list#section-planning')
	})

	// Course directory contact
	router.post('/application/' + v + '/planning/05-contact', function (req, res) {
		req.session.data['tl_plan_contact'] = 'completed'
		//res.redirect('/application/' + v + '/planning/06-forecast-starts')
		res.redirect('/application/' + v + '/task-list#section-planning')
	})

	// Forecast - Starts
	router.post('/application/' + v + '/planning/06-forecast-starts', function (req, res) {
		req.session.data['tl_plan_forecasting'] = 'inprogress'
		res.redirect('/application/' + v + '/planning/07-forecast-readytodeliver')
	})

	// Forecast - Ready to deliver
	router.post('/application/' + v + '/planning/07-forecast-readytodeliver', function (req, res) {
		res.redirect('/application/' + v + '/planning/08-forecast-newstaff')
	})

	// Forecast - New staff
	router.post('/application/' + v + '/planning/08-forecast-newstaff', function (req, res) {
		res.redirect('/application/' + v + '/planning/09-forecast-ratio')
	})

	// Forecast - Ratio
	router.post('/application/' + v + '/planning/09-forecast-ratio', function (req, res) {
		req.session.data['tl_plan_forecasting'] = 'completed'
		//res.redirect('/application/' + v + '/planning/10-otj-methods')
		res.redirect('/application/' + v + '/task-list#section-planning')
	})

	// Off the job - Teaching methods
	router.post('/application/' + v + '/planning/10-otj-methods', function (req, res) {
		req.session.data['tl_plan_offthejob'] = 'inprogress'
		res.redirect('/application/' + v + '/planning/11-otj-relevant')
	})


	// Off the job - Teaching methods
	router.post('/application/' + v + '/planning/11-otj-relevant', function (req, res) {
		req.session.data['tl_plan_offthejob'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-planning')
	})


/******************************************
 *** Delivering apprenticeship training ***
 ******************************************/

	// What you'll need
	router.post('/application/' + v + '/delivering/intro', function (req, res) {
		req.session.data['tl_del_intro'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
	})	

	// Who's accountable for apprenticeships?
	router.post('/application/' + v + '/delivering/whosaccountable', function (req, res) {
		req.session.data['tl_del_hierarchy'] = 'inprogress'
		if (!req.session.data['del-hierarchy-person']) {
			res.redirect('/application/' + v + '/delivering/hierarchy-add')
		} else {
			res.redirect('/application/' + v + '/delivering/hierarchy-confirm')
		}
	})	

	// Management hierarchy
	router.post('/application/' + v + '/delivering/hierarchy-add', function (req, res) {

		var newPerson = {
			'name': req.session.data['del-hierarchy-name'],
			'job_role': req.session.data['del-hierarchy-role'],
			'time_in_role': req.session.data['del-hierarchy-timeinrole'],
			'report_to': req.session.data['del-hierarchy-reportto'],
			'org_funding': req.session.data['del-hierarchy-orgfunding'],
			'org_funding_name': req.session.data['del-hierarchy-orgfunding-name'],
			'subcontractor_funding': req.session.data['del-hierarchy-subcontractorfunding']
		}

		req.session.data['del-hierarchy-name'] = null
		req.session.data['del-hierarchy-role'] = null
		req.session.data['del-hierarchy-timeinrole'] = null
		req.session.data['del-hierarchy-reportto'] = null
		req.session.data['del-hierarchy-orgfunding'] = null
		req.session.data['del-hierarchy-orgfunding-name'] = null
		req.session.data['del-hierarchy-subcontractorfunding'] = null

		if (!req.session.data['del-hierarchy-person']) {
			req.session.data['del-hierarchy-person'] = []
		}
		req.session.data['del-hierarchy-person'].push(newPerson)
			
		res.redirect('/application/' + v + '/delivering/hierarchy-confirm')

	})

	// Who's accountable for apprenticeships confirmation
	router.post('/application/' + v + '/delivering/hierarchy-confirm', function (req, res) {

		req.session.data['tl_del_hierarchy'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
		/*if (!req.session.data["org-selectedroute"] == "employer"){
			res.redirect('/application/' + v + '/delivering/develop-deliver')
		} else {
			res.redirect('/application/' + v + '/task-list#section-delivering')
			//res.redirect('/application/' + v + '/delivering/work-with')
		}*/
	})

	// Expectations (high standards)
	router.post('/application/' + v + '/delivering/expectations', function (req, res) {
		req.session.data['tl_del_expectations'] = 'inprogress'
		if (req.session.data['del-expectations'] == "Yes") {
			res.redirect('/application/' + v + '/delivering/expectations-upload')
		} else {
			res.redirect('/application/' + v + '/delivering/expectations-responsible')
		}
	})

	// Expectations - Upload document for high standards
	router.post('/application/' + v + '/delivering/expectations-upload', function (req, res) {
		res.redirect('/application/' + v + '/delivering/expectations-responsible')
	})

	// Expectations - Who's responsible?
	router.post('/application/' + v + '/delivering/expectations-responsible', function (req, res) {
		res.redirect('/application/' + v + '/delivering/expectations-communicated')
	})

	// Expectations - How communicated to employees?
	router.post('/application/' + v + '/delivering/expectations-communicated', function (req, res) {
		req.session.data['tl_del_expectations'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
	})

	// Expectations (high standards) - definition
	/*router.post('/application/' + v + '/delivering/expectations-definition', function (req, res) {
		res.redirect('/application/' + v + '/delivering/expectations-communicated')
	})*/


	// Developing and Delivering - Does your organisation have a team responsible?
	router.post('/application/' + v + '/delivering/developdeliver', function (req, res) {
		req.session.data['tl_del_developdeliver'] = 'inprogress'
		if (req.session.data["org-selectedroute"] == "employer"){
			res.redirect('/application/' + v + '/delivering/developdeliver-overallmanager')
		} else {
			res.redirect('/application/' + v + '/delivering/developdeliver-workedwith')
		}
	})

	// Developing and Delivering - Worked with to deliver
	router.post('/application/' + v + '/delivering/developdeliver-workedwith', function (req, res) {
		res.redirect('/application/' + v + '/delivering/developdeliver-howworkedwith')
	})

	// Developing and Delivering - Worked with to deliver
	router.post('/application/' + v + '/delivering/developdeliver-howworkedwith', function (req, res) {
		res.redirect('/application/' + v + '/delivering/developdeliver-overallmanager')
	})

	// Developing and Delivering - Overall manager
	router.post('/application/' + v + '/delivering/developdeliver-overallmanager', function (req, res) {
		res.redirect('/application/' + v + '/delivering/developdeliver-overallaccountability')
	})

	// Developing and Delivering - Overall accountability
	router.post('/application/' + v + '/delivering/developdeliver-overallaccountability', function (req, res) {
		req.session.data['tl_del_developdeliver'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
	})

	// Worked with employers/other orgs
	/*router.post('/application/' + v + '/delivering/work-with', function (req, res) {
		res.redirect('/application/' + v + '/delivering/expectations')
	})*/

	// Expectations - communicated
	/*router.post('/application/' + v + '/delivering/expectations-communicated', function (req, res) {
		res.redirect('/application/' + v + '/delivering/training-manager')
	})*/

	// Who is your apprenticeship training manager?
	/*router.post('/application/' + v + '/delivering/training-manager', function (req, res) {
		req.session.data['tl_del_hierarchy'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-hierarchy')
	})*/


	// Sectors training in
	router.post('/application/' + v + '/delivering/sectors', function (req, res) {
		req.session.data['tl_del_sectors'] = 'inprogress'
		res.redirect('/application/' + v + '/delivering/employee-list')
	})

	// Sectors training in
	router.post('/application/' + v + '/delivering/employee-add', function (req, res) {

		if (!req.session.data['del-employee-count']) {
			req.session.data['del-employee-count'] = 0
		} else {
			req.session.data['del-employee-count'] = req.session.data['del-employee-count'] + 1
		}

		var newEmployee = {
			'name': req.session.data['del-employee-name'],
			'job_role': req.session.data['del-employee-role'],
			'time_in_role': req.session.data['del-employee-timeinorg'],
			'sectors': [],
			'sectors_expdelivering': [],
			'sectors_expoverall': [],
			'sectors_wheregained': [],
			'sectors_quals': [],
			'sectors_teachingquals': '',
			'sectors_teachingquals_detail': '',
			'sectors_awarding': '',
			'sectors_awarding_detail': '',
			'sectors_trade': '',
			'sectors_trade_detail': '',
			'experience_training': '',
			'apprenticeship_types': ''
		}

		req.session.data['del-employee-name'] = null
		req.session.data['del-employee-role'] = null
		req.session.data['del-employee-timeinorg'] = null

		if (!req.session.data['del-employee']) {
			req.session.data['del-employee'] = []
		}
		req.session.data['del-employee'].push(newEmployee)

		res.redirect('/application/' + v + '/delivering/employee-sectors')
	})

	// Select the sectors which employee delivers
	router.post('/application/' + v + '/delivering/employee-sectors', function (req, res) {

		// Add selected sectors to current employee array item
		req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors'] = req.session.data['del-employee-sector']

		//for each item in selected sectors for employee
		/*var employeesectors_array = req.session.data['del-employee-sector']
		var employeesectors_length = employeesectors_array.length
		for (var i = 0; i < employeesectors_length; i++) {
			req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors'][i] = req.session.data['del-employee-sector'][i]
		}*/

		res.redirect('/application/' + v + '/delivering/employee-sectors-experience')

	})

	// Employee experience of delivering in those sectors
	router.post('/application/' + v + '/delivering/employee-sectors-experience', function (req, res) {

		//req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors'][0] = req.session.data['del-employee-sector']
		req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors_expdelivering'] = req.session.data['del-employee-sector-experience']

		res.redirect('/application/' + v + '/delivering/employee-sectors-overallexperience')
	})

	// Employee overall experience in those sectors
	router.post('/application/' + v + '/delivering/employee-sectors-overallexperience', function (req, res) {

		req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors_expoverall'] = req.session.data['del-employee-sector-overallexperience']

		res.redirect('/application/' + v + '/delivering/employee-sectors-wheregained')

	})

	// Where experience in those sectors was gained
	router.post('/application/' + v + '/delivering/employee-sectors-wheregained', function (req, res) {

		req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors_wheregained'] = req.session.data['del-employee-sector-wheregained']

		res.redirect('/application/' + v + '/delivering/employee-sectors-quals')

	})

	// Qualifications in relation to sectors
	router.post('/application/' + v + '/delivering/employee-sectors-quals', function (req, res) {

		req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors_quals'] = req.session.data['del-employee-sector-quals']

		res.redirect('/application/' + v + '/delivering/employee-sectors-teachingquals')

	})

	// Teaching and training qualifications in relation to sectors
	router.post('/application/' + v + '/delivering/employee-sectors-teachingquals', function (req, res) {

		req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors_teachingquals'] = req.session.data['del-employee-sector-teachingquals']

		res.redirect('/application/' + v + '/delivering/employee-sectors-awarding')

	})

	// Awarding bodies approval to deliver training
	router.post('/application/' + v + '/delivering/employee-sectors-awarding', function (req, res) {

		req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors_awarding'] = req.session.data['del-employee-sector-awarding']

		res.redirect('/application/' + v + '/delivering/employee-sectors-trade')

	})

	// Trade bodies approval to deliver training
	router.post('/application/' + v + '/delivering/employee-sectors-trade', function (req, res) {

		req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors_trade'] = req.session.data['del-employee-sector-trade']

		res.redirect('/application/' + v + '/delivering/employee-experience-training')

	})
	
	// Experience of training apprenctices 
	router.post('/application/' + v + '/delivering/employee-experience-training', function (req, res) {

		req.session.data['del-employee'][req.session.data['del-employee-count']]['experience_training'] = req.session.data['del-employee-experience-training']

		res.redirect('/application/' + v + '/delivering/employee-apprenticeship-types')

	})
	
	// What type of apprenticeships have they delivered?
	router.post('/application/' + v + '/delivering/employee-apprenticeship-types', function (req, res) {

		req.session.data['del-employee'][req.session.data['del-employee-count']]['apprenticeship_types'] = req.session.data['del-employee-apprenticeship-types']

		res.redirect('/application/' + v + '/delivering/employee-list')

	})
	

/****************
 *** Sign out ***
 ****************/

	router.get('/application/' + v + '/signout', function (req, res) {
		req.session.data['signedin'] = 'no'
		res.redirect('/application/' + v + '/signout')
	})

}