// Routes for Application v5

var v = 'v5';

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
		}

		if (req.session.data['signin-email'] == "skip@organisation") {
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
		}

		// 'Your organisation' complete
		// Organisation has a parent company
		// ITT and Postgrad, no Ofsted inspections
		if (req.session.data['signin-email'] == "main-parentcompany@organisation.complete") {
			req.session.data['exempt_aw'] = "yes"
			req.session.data['exempt_fha'] = "no"
			req.session.data['exempt_lm'] = "yes"
			req.session.data['org-parentcompany'] = "yes"
			req.session.data['org-parentcompany-companynumber'] = "12232323"
			req.session.data['org-classification'] = "public-service-mutual"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = ">23"
			req.session.data['org-type'] = "employer"
			req.session.data['org-ukprn'] = "12340102"
			req.session.data['org-website'] = "no"
			req.session.data['org-website-address'] = ""
			req.session.data['pro-itt'] = "yes"
			req.session.data['pro-postgrad'] = "yes"
			req.session.data['tl_selectroute'] = "completed"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_org_profile'] = "completed"
			res.redirect('/application/' + v + '/task-list')
		}

		// Jump to: Financial evidence
		// As a: Main provider, not funded by OFS, no Ofsted
		if (req.session.data['signin-email'] == "main@financial.upload") {
			req.session.data['exempt_aw'] = "yes"
			req.session.data['exempt_fha'] = "no"
			req.session.data['exempt_lm'] = "yes"
			req.session.data['org-classification'] = "public-service-mutual"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = ">23"
			req.session.data['org-type'] = "employer"
			req.session.data['org-ukprn'] = "12340102"
			req.session.data['org-website'] = "no"
			req.session.data['org-website-address'] = ""
			req.session.data['pro-itt'] = "yes"
			req.session.data['pro-postgrad'] = "yes"
			req.session.data['tl_selectroute'] = "completed"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_org_profile'] = "completed"
			res.redirect('/application/' + v + '/task-list')
		}

		// Jump to: Your organisation > Organisation profile
		// As a: Main provider, not funded by OFS
		if (req.session.data['signin-email'] == "main@company.profile") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "public-service-mutual"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = ">23"
			req.session.data['org-type'] = "employer"
			req.session.data['org-ukprn'] = "12340102"
			req.session.data['org-website'] = "no"
			req.session.data['org-website-address'] = ""
			req.session.data['tl_selectroute'] = "completed"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_org_profile'] = "next"
			res.redirect('/application/' + v + '/task-list')
		}

		if (req.session.data['signin-email'] == "main@hei.profile") {
			req.session.data['exempt_fha'] = "yes"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = "12-18"
			req.session.data['org-type'] = "education"
			req.session.data['org-type-education'] = "hei"
			req.session.data['org-fundedby'] = "yes"
			req.session.data['org-fundedbytext'] = "monitored and supported by the Office for Students"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['tl_selectroute'] = "completed"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_org_profile'] = "next"
			res.redirect('/application/' + v + '/task-list')
		}

		res.redirect('/application/' + v + '/coa')

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
			res.redirect('/application/' + v + '/error/ukprn')
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

		let org_ukprn = req.session.data['org-ukprn']
		if (org_ukprn === '12340101' || org_ukprn === '12340102' || org_ukprn === '12340103' || org_ukprn === '12340201') { // Is company
			res.redirect('/application/' + v + '/organisation/org-parentcompany')
		} else {
			res.redirect('/application/' + v + '/organisation/org-ico')
		}
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
			res.redirect('/application/' + v + '/organisation/org-type')
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
				res.redirect('/application/' + v + '/organisation/org-type')
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
			res.redirect('/application/' + v + '/organisation/org-type')
		})
		
		// Confirm trustees - Manual entry
		router.post('/application/' + v + '/organisation/org-trustees-confirm-fromdeclare', function (req, res) {
			req.session.data['tl_org_people'] = 'completed'
			req.session.data['tl_org_type'] = 'next'
			res.redirect('/application/' + v + '/organisation/org-type')
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
			
			if (req.session.data['org-classification']) {
				req.session.data['tl_org_profile'] = 'next'
				req.session.data['tl_org_type'] = 'completed'
				if (req.session.data['org-selectedroute'] == 'supporting') {
					res.redirect('/application/' + v + '/organisation/pro-subcontractor')
				} else {
					req.session.data['tl_org_profile'] = 'next'
					res.redirect('/application/' + v + '/organisation/pro-itt')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/org-classification')
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
					res.redirect('/application/' + v + '/task-list')
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

					//res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships')
					res.redirect('/application/' + v + '/organisation/pro-ofsted-feskills-published')

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
		router.post('/application/' + v + '/organisation/pro-ofsted-feskills-published', function (req, res) {

			req.session.data['ofsted-inspection-date-more'] = checkInspectionDate(req.session.data['pro-ofsted-feskills-date-day'],req.session.data['pro-ofsted-feskills-date-month'],req.session.data['pro-ofsted-feskills-date-year'])

			res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships')

		})

		// Profile - Monitoring visit
		router.post('/application/' + v + '/organisation/pro-monitoring-visit', function (req, res) {
			req.session.data['tl_org_profile'] = 'completed'
			res.redirect('/application/' + v + '/task-list')
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
						res.redirect('/application/' + v + '/task-list')
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
			if (req.session.data['pro-ofsted-apprenticeships-grade']) {
				if (req.session.data['pro-ofsted-apprenticeships-grade'] == "requires-improvement") {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grade')
				} else {
					if (req.session.data['ofsted-inspection-date-more'] == true){ // NOT WITHIN LAST 3 YEARS
					
						if (req.session.data['pro-ofsted-apprenticeships-grade'] == "inadequate") {
							req.session.data['tl_org_profile'] = 'completed'
							res.redirect('/application/' + v + '/task-list')
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

					}
					//res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-date')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships-grade')
			}
		})

		// Profile - Grade of Ofsted inspection for apprentices <3 years
		/*router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-date', function (req, res) {
			
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

		})*/

		// Profile - Apprentices short inspection <3 years
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection', function (req, res) {

			if (req.session.data['pro-ofsted-apprenticeships-shortinspection']) {
				if (req.session.data['pro-ofsted-apprenticeships-shortinspection'] == "yes") {
					
					res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection-published')
					/*
					req.session.data['pro-ofsted-apprenticeships-shortinspection-date-more'] = checkInspectionDate(req.session.data['pro-ofsted-apprenticeships-shortinspection-date-day'],req.session.data['pro-ofsted-apprenticeships-shortinspection-date-month'],req.session.data['pro-ofsted-apprenticeships-shortinspection-date-year'])

					if (req.session.data['pro-ofsted-apprenticeships-shortinspection-date-more'] == true){ // NOT WITHIN LAST 3 YEARS
						// COMPLETE ALL SECTIONS
						req.session.data['tl_org_profile'] = 'completed'
						res.redirect('/application/' + v + '/task-list')
					} else { // WITHIN LAST 3 YEARS
						// GO TO GRADE MAINTAINED
						res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grademaintained')
					}
					*/

				} else {
					// COMPLETE ALL SECTIONS
					req.session.data['tl_org_profile'] = 'completed'
					res.redirect('/application/' + v + '/task-list')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships-shortinspection')
			}

		})

		// Profile - Apprentices short inspection <3 years - published date
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection-published', function (req, res) {

			req.session.data['pro-ofsted-apprenticeships-shortinspection-date-more'] = checkInspectionDate(req.session.data['pro-ofsted-apprenticeships-shortinspection-date-day'],req.session.data['pro-ofsted-apprenticeships-shortinspection-date-month'],req.session.data['pro-ofsted-apprenticeships-shortinspection-date-year'])

			if (req.session.data['pro-ofsted-apprenticeships-shortinspection-date-more'] == true){ // NOT WITHIN LAST 3 YEARS
				// COMPLETE ALL SECTIONS
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			} else { // WITHIN LAST 3 YEARS
				// GO TO GRADE MAINTAINED
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grademaintained')
			}

		})

		// Profile - Grade maindained from short inspection for apprentices
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grademaintained', function (req, res) {
			if (req.session.data['pro-ofsted-apprenticeships-grademaintained'] == "yes") {
				// GO TO FUNDING MAINTAINED
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-fundingmaintained')
			} else {
				// COMPLETE ALL SECTIONS
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
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
				res.redirect('/application/' + v + '/task-list')
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships-fundingmaintained')
			}
		})


	/*** PR4 ***/

		// Profile - Overall Effectiveness Grade of Ofsted inspection
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-grade', function (req, res) {
			if (req.session.data['pro-ofsted-overall-grade']) {
				if (req.session.data['pro-ofsted-overall-grade'] == "outstanding" || req.session.data['pro-ofsted-overall-grade'] == "good" || req.session.data['pro-ofsted-overall-grade'] == "inadequate") {

					if (req.session.data['ofsted-inspection-date-more'] == true){ // NOT WITHIN LAST 3 YEARS
					
						if (req.session.data['pro-ofsted-overall-grade'] == "inadequate") {
							req.session.data['tl_org_profile'] = 'completed'
							res.redirect('/application/' + v + '/task-list')
						} else {
							res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection')
						}
				
					} else { // WITHIN LAST 3 YEARS

						if (req.session.data['pro-ofsted-overall-grade'] == "inadequate") {
							res.redirect('/application/' + v + '/shutter/organisation/pro-ofsted-overall-inadequate')
						} else { // OUTSTANDING OR GOOD
							res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-fundingmaintained')
						}

					}

				} else {
					req.session.data['tl_org_profile'] = 'completed'
					res.redirect('/application/' + v + '/task-list')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-grade')
			}
		})

		// Profile - Overall Effectiveness Grade less than 3 years ago
		/*router.post('/application/' + v + '/organisation/pro-ofsted-overall-date', function (req, res) {
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
		})*/

		// Profile - Overall short inspection
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection', function (req, res) {
			if (req.session.data['pro-ofsted-overall-shortinspection']) {
				if (req.session.data['pro-ofsted-overall-shortinspection'] == "yes") {

					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection-published')

				} else {
					req.session.data['tl_org_profile'] = 'completed'
					res.redirect('/application/' + v + '/task-list')
				}

			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-shortinspection')
			}
		})

		// Profile - Overall short inspection
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection-published', function (req, res) {

			req.session.data['pro-ofsted-overall-shortinspection-date-more'] = checkInspectionDate(req.session.data['pro-ofsted-overall-shortinspection-date-day'],req.session.data['pro-ofsted-overall-shortinspection-date-month'],req.session.data['pro-ofsted-overall-shortinspection-date-year'])

			if (req.session.data['pro-ofsted-overall-shortinspection-date-more'] == true){ // NOT WITHIN LAST 3 YEARS
				// COMPLETE ALL SECTIONS
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			} else { // WITHIN LAST 3 YEARS
				// GO TO GRADE MAINTAINED
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grademaintained')
			}

		})

		// Profile - Overall grade maintained
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-grademaintained', function (req, res) {
			if (req.session.data['pro-ofsted-overall-grademaintained']) {
				if (req.session.data['pro-ofsted-overall-grademaintained'] == "yes") {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-fundingmaintained')
				}
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
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
				res.redirect('/application/' + v + '/task-list')
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
			res.redirect('/application/' + v + '/task-list')
		})


/**************************
 *** Financial Evidence ***
 **************************/

	// Intro and what you'll need
	router.post('/application/' + v + '/financial/intro', function (req, res) {
		req.session.data['tl_fin_intro'] = 'completed'
		res.redirect('/application/' + v + '/financial/full-accounts')
	})

	// Full financial statements for the last year?
	router.post('/application/' + v + '/financial/full-accounts', function (req, res) {
		req.session.data['tl_fin_upload'] = 'inprogress'
		res.redirect('/application/' + v + '/financial/upload-financial')
	})

	// Upload financial statements
	router.post('/application/' + v + '/financial/upload-financial', function (req, res) {
		if (req.session.data['fin-fullaccounts'] == "yes"){
			req.session.data['tl_fin_upload'] = 'completed'
			res.redirect('/application/' + v + '/task-list')
		} else {
			/*if (req.session.data['org-selectedroute'] == "supporting") {
				res.redirect('/application/' + v + '/financial/upload-supporting-management')
			} else {*/
				res.redirect('/application/' + v + '/financial/upload-management')
			//}
		}
	})

	// Upload management accounts
	router.post('/application/' + v + '/financial/upload-management', function (req, res) {
		req.session.data['tl_fin_upload'] = 'completed'
		res.redirect('/application/' + v + '/task-list')
	})


/************************************
 *** Criminal & compliance checks ***
 ************************************/

	// Intro and what you'll need
	router.post('/application/' + v + '/declarations/intro', function (req, res) {
		req.session.data['tl_dec_intro'] = 'completed'
		res.redirect('/application/' + v + '/declarations/org-debt')
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
		req.session.data['tl_dec_organisation'] = 'completed'
		//res.redirect('/application/' + v + '/declarations/org-education-register')
		res.redirect('/application/' + v + '/declarations/org-roto')
	})
/*
	// Organisation - Removed from education register
	router.post('/application/' + v + '/declarations/org-education-register', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-professional-register')
	})

	// Organisation - Removed from professional register
	router.post('/application/' + v + '/declarations/org-professional-register', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-safeguarding')
	})
*/

	// Organisation - Removed from Register of Training Organisations
	router.post('/application/' + v + '/declarations/org-roto', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-safeguarding')
	})

	// Organisation - Safeguarding
	router.post('/application/' + v + '/declarations/org-safeguarding', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-whistleblowing')
	})

	// Organisation - Whistleblowing
	router.post('/application/' + v + '/declarations/org-whistleblowing', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-repay-funding')
	})

	// Who’s in control - failed to repay funding
	router.post('/application/' + v + '/declarations/people-repay-funding', function (req, res) {
		req.session.data['tl_dec_people'] = 'inprogress'
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
		res.redirect('/application/' + v + '/declarations/people-convictions')
	})

	// Who’s in control - Criminal convictions
	router.post('/application/' + v + '/declarations/people-convictions', function (req, res) {
		// Will need to go in to a loop if answered yes
		req.session.data['tl_dec_people'] = 'completed'
		res.redirect('/application/' + v + '/task-list')
	})


/******************************
 *** Apprenticeship welfare ***
 ******************************/

	// What you'll need
	router.post('/application/' + v + '/welfare/intro', function (req, res) {
		req.session.data['tl_wel_intro'] = 'completed'
		if (req.session.data['org-selectedroute'] == "supporting") {
			res.redirect('/application/' + v + '/welfare/upload-diversity')
		} else {
			res.redirect('/application/' + v + '/welfare/upload-continuity')
		}
	})

	// Continuity plan upload
	router.post('/application/' + v + '/welfare/upload-continuity', function (req, res) {
		req.session.data['tl_wel_continuity'] = 'completed'
		res.redirect('/application/' + v + '/welfare/upload-diversity')
	})

	// Equality and diversity policy upload
	router.post('/application/' + v + '/welfare/upload-diversity', function (req, res) {
		req.session.data['tl_wel_diversity'] = 'completed'
		res.redirect('/application/' + v + '/welfare/upload-safeguarding')
	})

	// Safeguarding policy upload
	router.post('/application/' + v + '/welfare/upload-safeguarding', function (req, res) {
		req.session.data['tl_wel_safeguarding'] = 'inprogress'
		res.redirect('/application/' + v + '/welfare/safeguarding')
	})

	// Who's responsible for safeguarding
	router.post('/application/' + v + '/welfare/safeguarding', function (req, res) {
		req.session.data['tl_wel_safeguarding'] = 'completed'
		res.redirect('/application/' + v + '/welfare/preventduty')
	})

	// Include responsibilities to Prevent duty
	router.post('/application/' + v + '/welfare/preventduty', function (req, res) {
		if (req.session.data['wel-preventduty'] == "no") {
			req.session.data['tl_wel_preventduty'] = 'inprogress'
			res.redirect('/application/' + v + '/welfare/upload-preventduty')
		} else {
			req.session.data['tl_wel_preventduty'] = 'completed'
			res.redirect('/application/' + v + '/welfare/upload-healthandsafety')
		}
	})

	// Prevent duty policy upload
	router.post('/application/' + v + '/welfare/upload-preventduty', function (req, res) {
		req.session.data['tl_wel_preventduty'] = 'completed'
		res.redirect('/application/' + v + '/welfare/upload-healthandsafety')
	})

	// Health and safety policy upload
	router.post('/application/' + v + '/welfare/upload-healthandsafety', function (req, res) {
		req.session.data['tl_wel_healthandsafety'] = 'inprogress'
		res.redirect('/application/' + v + '/welfare/healthandsafety')
	})

	// Who's responsible for health and safety
	router.post('/application/' + v + '/welfare/healthandsafety', function (req, res) {
		if (req.session.data['wel-healthandsafetyresponsible'] == "yes") {
			res.redirect('/application/' + v + '/welfare/healthandsafety-details')
		} else {
			res.redirect('/application/' + v + '/welfare/otherpolicies')
		}
	})

	// Who's responsible for health and safety - details
	router.post('/application/' + v + '/welfare/healthandsafety-details', function (req, res) {
		res.redirect('/application/' + v + '/welfare/otherpolicies')
	})

	// Who's responsible for health and safety - details
	router.post('/application/' + v + '/welfare/otherpolicies', function (req, res) {
		req.session.data['tl_wel_healthandsafety'] = 'completed'
		res.redirect('/application/' + v + '/task-list')
	})


/***************************
 *** Readiness to engage ***
 ***************************/

	// What you'll need
	router.post('/application/' + v + '/readiness/intro', function (req, res) {
		req.session.data['tl_rte_intro'] = 'completed'
		res.redirect('/application/' + v + '/readiness/engaged')
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
			res.redirect('/application/' + v + '/readiness/promote')
		}
	})	

	// Managing relationships?
	router.post('/application/' + v + '/readiness/managing-relationships-detail', function (req, res) {
		//res.redirect('/application/' + v + '/readiness/fat')
		res.redirect('/application/' + v + '/readiness/promote')
	})

	// Promote apprenticeships
	router.post('/application/' + v + '/readiness/promote', function (req, res) {
		req.session.data['tl_rte_engagement'] = 'completed'
		res.redirect('/application/' + v + '/readiness/upload-complaints')
	})

	// Upload complaints policy
	router.post('/application/' + v + '/readiness/upload-complaints', function (req, res) {
		req.session.data['tl_rte_complaints'] = 'completed'
		res.redirect('/application/' + v + '/readiness/upload-contractforservices')
	})

	// Upload contract for services
	router.post('/application/' + v + '/readiness/upload-contractforservices', function (req, res) {
		req.session.data['tl_rte_contractforservices'] = 'completed'
		res.redirect('/application/' + v + '/readiness/upload-commitmentstatement')
	})

	// Upload commitment statement
	router.post('/application/' + v + '/readiness/upload-commitmentstatement', function (req, res) {
		req.session.data['tl_rte_commitment'] = 'completed'
		res.redirect('/application/' + v + '/readiness/prior-learning-assessments')
		//res.redirect('/application/' + v + '/readiness/use-subcontractors')
	})

	// Prior learning assessments
	router.post('/application/' + v + '/readiness/prior-learning-assessments', function (req, res) {
		req.session.data['tl_rte_priorlearning'] = 'inprogress'
		res.redirect('/application/' + v + '/readiness/asses-english-maths')
	})

	// Assess English and Maths
	router.post('/application/' + v + '/readiness/asses-english-maths', function (req, res) {
		req.session.data['tl_rte_priorlearning'] = 'completed'
		res.redirect('/application/' + v + '/readiness/use-subcontractors')
		//res.redirect('/application/' + v + '/readiness/asses-english-maths.html')
	})

	// Use subcontractors?
	router.post('/application/' + v + '/readiness/use-subcontractors', function (req, res) {
		req.session.data['tl_rte_subcontractors'] = 'inprogress'
		if (req.session.data['rte-usesubcontractors'] == "yes") {
			res.redirect('/application/' + v + '/readiness/manage-subcontractors')
		} else {
			req.session.data['tl_rte_subcontractors'] = 'completed'
			res.redirect('/application/' + v + '/task-list')
		}
	})

	// Manage subcontractors?
	router.post('/application/' + v + '/readiness/manage-subcontractors', function (req, res) {
		req.session.data['tl_rte_subcontractors'] = 'completed'
		res.redirect('/application/' + v + '/task-list')
	})

	

/****************
 *** Sign out ***
 ****************/

	router.get('/application/' + v + '/signout', function (req, res) {
		req.session.data['signedin'] = 'no'
		res.redirect('/application/' + v + '/signout')
	})

}