// Routes for Application v3

var v = 'v3';

var months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May',
	'Jun', 'Jul', 'Aug', 'Sep',
	'Oct', 'Nov', 'Dec'
	];

function monthNumToName(monthnum) {
	return months[monthnum - 1] || '';
}

module.exports = function (router) {

	// Sign in
	router.post('/application/' + v + '/signin', function (req, res) {

		req.session.data['signedin'] = 'yes'

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

	
	// Acceptance of CoA
	router.post('/application/' + v + '/coa', function (req, res) {
		res.redirect('/application/' + v + '/organisation/org-ukprn')
	})

	// UKPRN?
	router.post('/application/' + v + '/organisation/org-ukprn', function (req, res) {

		let org_ukprn = req.session.data['org-ukprn']

		if (org_ukprn === '12340101') { // Company - Happy Path
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340102') { // Company - Active with no website
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340103') { // Company - Inactive
			res.redirect('/application/' + v + '/organisation/shutter/org-inactivecompany')
		} else if (org_ukprn === '12340106') { // Company - Active with no directors
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340201') { // Company - Also a charity
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340202') { // Charity only, not a company
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340301') { // Not a company (sole trader or partnership)
			//res.redirect('/application/' + v + '/organisation/org-legalstatus')
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
			//res.redirect('/application/' + v + '/task-list')
		} else if (org_ukprn === '12340104') { // Organisation with a parent company
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340105') { // Incorporation date less than 12 months ago (3 months for supporting)
			res.redirect('/application/' + v + '/organisation/shutter/incorporation')
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-ukprn')
		}
	})


	// Confirm company details
	router.post('/application/' + v + '/organisation/org-confirmorgdetails', function (req, res) {
		
		res.redirect('/application/' + v + '/organisation/org-parentcompany')

		//res.redirect('/application/' + v + '/organisation/org-parentcompany')
		/*if (req.session.data['org-ukprn'] == "12340102"){
			// Org has no website in UKRLP
			res.redirect('/application/' + v + '/organisation/org-website')
		} else {
			res.redirect('/application/' + v + '/organisation/org-trading')
		}*/

	})


	// Section complete - Select route
	router.post('/application/' + v + '/organisation/select-route', function (req, res) {

		let selected_route = req.session.data['org-selectedroute']

		if (selected_route != '') {
			req.session.data['tl_selectroute'] = 'completed'
			req.session.data['tl_org_details'] = 'next'
			res.redirect('/application/' + v + '/organisation/org-ico')
		} else {
			res.redirect('/application/' + v + '/organisation/error/select-route')
		}
		
	})
  
	// ICO number?
	router.post('/application/' + v + '/organisation/org-ico', function (req, res) {
		req.session.data['tl_org_details'] = 'inprogress'

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

	// Sole trader details
	router.post('/application/' + v + '/organisation/org-legalstatus-sole', function (req, res) {

		if (req.session.data['org-soletrader-name'] && req.session.data['org-soletrader-dob-month'] && req.session.data['org-soletrader-dob-year'] ) {
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

	/*
	// Started trading date
	router.post('/application/' + v + '/organisation/org-trading', function (req, res) {

		let org_trading = req.session.data['org-trading']

		if (req.session.data['org-trading-day'] == "" || req.session.data['org-trading-month'] == "" || req.session.data['org-trading-year'] == "") {
			res.redirect('/application/' + v + '/organisation/error/org-trading')
		} else {

			req.session.data['tl_org_details'] = 'completed'
			req.session.data['tl_org_people'] = 'next'

			if (req.session.data['org-ukprn'] === "12340202") { 
				res.redirect('/application/' + v + '/organisation/org-trustees-declare')
			} else {
				res.redirect('/application/' + v + '/organisation/org-peopleincontrol')
			}
			
		}
	}) */

	router.post('/application/' + v + '/organisation/org-trading', function (req, res) {
		
		if (req.session.data['org-trading']) {

			if ( req.session.data['org-trading'] == "<3" || req.session.data['org-trading'] == "<12") {
				res.redirect('/application/' + v + '/organisation/shutter/org-trading')
			} else {

				req.session.data['tl_org_details'] = 'completed'
				req.session.data['tl_org_people'] = 'next'

				if (req.session.data['org-ukprn'] === "12340202") { 
					res.redirect('/application/' + v + '/organisation/org-trustees')
				} else if (req.session.data['org-ukprn'] === "12340301") {
					res.redirect('/application/' + v + '/organisation/org-legalstatus')
				} else if (req.session.data['org-ukprn'] === "12340106") {
					res.redirect('/application/' + v + '/organisation/org-peopleincontrol-missing')
				} else {
					res.redirect('/application/' + v + '/organisation/org-peopleincontrol')
				}

			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-trading')
		}

	})
	
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
		} else {
			req.session.data['tl_org_people'] = 'completed'
			req.session.data['tl_org_type'] = 'next'
			res.redirect('/application/' + v + '/organisation/org-type')
		}
	})

	// Trustees from API
	router.post('/application/' + v + '/organisation/org-trustees', function (req, res) {
		res.redirect('/application/' + v + '/organisation/org-trustees-dob1')
	})

	router.post('/application/' + v + '/organisation/org-trustees-dob1', function (req, res) {
		
		if (req.session.data['org-trustee-dob1-month'] == '' || req.session.data['org-trustee-dob1-year'] == '') {
			res.redirect('/application/' + v + '/organisation/error/org-trustees-dob1')
		} else {
			req.session.data['org-trustee-dob1-monthname'] = monthNumToName(req.session.data['org-trustee-dob1-month'])
			res.redirect('/application/' + v + '/organisation/org-trustees-dob2')
		}
	})

	router.post('/application/' + v + '/organisation/org-trustees-dob2', function (req, res) {
		
		if (req.session.data['org-trustee-dob2-month'] == '' || req.session.data['org-trustee-dob2-year'] == '') {
			res.redirect('/application/' + v + '/organisation/error/org-trustees-dob2')
		} else {
			req.session.data['org-trustee-dob2-monthname'] = monthNumToName(req.session.data['org-trustee-dob2-month'])
			res.redirect('/application/' + v + '/organisation/org-trustees-dob3')
		}

	})
	router.post('/application/' + v + '/organisation/org-trustees-dob3', function (req, res) {
		
		if (req.session.data['org-trustee-dob3-month'] == '' || req.session.data['org-trustee-dob3-year'] == '') {
			res.redirect('/application/' + v + '/organisation/error/org-trustees-dob3')
		} else {
			req.session.data['org-trustee-dob3-monthname'] = monthNumToName(req.session.data['org-trustee-dob3-month'])
			res.redirect('/application/' + v + '/organisation/org-trustees-confirm')
		}

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

		res.redirect('/application/' + v + '/organisation/org-trustees-confirm')
		
	})

	
	// Confirm trustees - Manual entry
	router.post('/application/' + v + '/organisation/org-trustees-confirm', function (req, res) {
		req.session.data['tl_org_people'] = 'completed'
		req.session.data['tl_org_type'] = 'next'
		res.redirect('/application/' + v + '/organisation/org-type')
	})


	// Have a parent company?
	router.post('/application/' + v + '/organisation/org-parentcompany', function (req, res) {

		if (req.session.data['org-parentcompany'] === 'yes'){
			res.redirect('/application/' + v + '/organisation/org-parentcompany-confirm')
		} else {
			res.redirect('/application/' + v + '/task-list')
		}

	})


	// Parent company confirmation
	router.post('/application/' + v + '/organisation/org-parentcompany-confirm', function (req, res) {
		res.redirect('/application/' + v + '/task-list')
	})


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
			} else if (org_orgtype === 'training') {
				req.session.data['tl_org_type'] = 'inprogress'
				req.session.data['exempt_fha'] = 'no'
				res.redirect('/application/' + v + '/organisation/org-type-training')
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
			req.session.data['org-fundedbytext'] = 'monitored and supported by the Office for Students'
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

	// Organisation type = Training Org/Agency
	router.post('/application/' + v + '/organisation/org-type-training', function (req, res) {

		let org_orgtype_training = req.session.data['org-type-training']
		let org_route = req.session.data['org-selectedroute']
		req.session.data['exempt_fha'] = 'no'

		if (org_orgtype_training) {
			if (org_route === 'employer') {
				res.redirect('/application/' + v + '/organisation/org-type-subtype')
			} else {
				res.redirect('/application/' + v + '/organisation/org-classification')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-type-training')
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
			req.session.data['tl_org_profile'] = 'inprogress'
			req.session.data['tl_org_type'] = 'completed'
			if (req.session.data['org-selectedroute'] == 'supporting') {
				res.redirect('/application/' + v + '/organisation/pro-subcontractor')
			} else {
				req.session.data['tl_org_profile'] = 'inprogress'
				res.redirect('/application/' + v + '/organisation/pro-itt')
			}

/*******
 * Change routing for org profile here...
 */
/*
			req.session.data['tl_org_type'] = 'completed'
			if ( req.session.data['exempt_fha'] === 'yes'){
				req.session.data['tl_fin_upload'] = 'exempt'
				req.session.data['tl_pol_upload'] = 'next'
			} else {
				req.session.data['tl_fin_upload'] = 'next'
			}
			res.redirect('/application/' + v + '/task-list')
*/
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-classification')
		}

	})


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


	// Profile - Ofsted inspection for further education and skills
	router.post('/application/' + v + '/organisation/pro-ofsted-feskills', function (req, res) {
		if (req.session.data['pro-ofsted-feskills']) {
			if (req.session.data['pro-ofsted-feskills'] == "yes") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships')
			} else {
				if (req.session.data['org-type-education'] == "hei" && req.session.data['org-fundedby'] == "yes"){
					// EXEMPT FROM AW and CCLM1-6
					req.session.data['exempt_lm'] = 'partial'
					req.session.data['exempt_aw'] = 'yes'
				}
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			}
		}
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
				//res.redirect('/application/' + v + '/organisation/pro-funded')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships')
		}
	})

	// Profile - Funded by OFS?
	/*
	router.post('/application/' + v + '/organisation/pro-funded', function (req, res) {

		if (req.session.data['pro-funded']) {
			if (req.session.data['pro-funded'] == "yes") {
				// EXEMPT FROM AW and CCLM1-6
				req.session.data['exempt_lm'] = 'partial'
				req.session.data['exempt_aw'] = 'yes'
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			} else {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall')
			}
			req.session.data['tl_org_profile'] = 'completed'
			res.redirect('/application/' + v + '/task-list')
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-funded')
		}
		
	})
	*/


	// Profile - Grade of Ofsted inspection for apprentices
	router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grade', function (req, res) {
		if (req.session.data['pro-ofsted-apprenticeships-grade']) {
			if (req.session.data['pro-ofsted-apprenticeships-grade'] == "requires-improvement") {
				//req.session.data['tl_org_profile'] = 'completed'
				//res.redirect('/application/' + v + '/task-list')
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grade')
				
			} else {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-date')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships-grade')
		}
	})


	// Profile - Grade of Ofsted inspection for apprentices <3 years
	router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-date', function (req, res) {
		
		if (req.session.data['pro-ofsted-apprenticeships-date']) {
			if (req.session.data['pro-ofsted-apprenticeships-date'] == "yes") {
				if (req.session.data['pro-ofsted-apprenticeships-grade'] == "inadequate") {
					// INELIGIBLE TO APPLY > SHUTTER PAGE
					res.redirect('/application/' + v + '/organisation/shutter/pro-ofsted-apprenticeships-date')
				} else { 
					// Grade is outstanding or good
					// Short inspeciton question
					res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-fundingmaintained')
				}
			} else {
				//res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection')
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships-date')
		}

	})


	// Profile - Short inspection <3 years
	router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection', function (req, res) {

		if (req.session.data['pro-ofsted-apprenticeships-shortinspection']) {
			if (req.session.data['pro-ofsted-apprenticeships-shortinspection'] == "yes") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-fundingmaintained')
			} else {
				// Complete all sections
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships-shortinspection')
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

	// Profile - Overall Effectiveness Grade of Ofsted inspection
	router.post('/application/' + v + '/organisation/pro-ofsted-overall-grade', function (req, res) {
		if (req.session.data['pro-ofsted-overall-grade']) {
			if (req.session.data['pro-ofsted-overall-grade'] == "outstanding" || req.session.data['pro-ofsted-overall-grade'] == "good") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-date')
			} else if (req.session.data['pro-ofsted-overall-grade'] == "inadequate") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-date')
			} else {
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-grade')
		}
	})


	// Profile - Overall Effectiveness Grade less than 3 years ago
	router.post('/application/' + v + '/organisation/pro-ofsted-overall-date', function (req, res) {
		if (req.session.data['pro-ofsted-overall-date']) {
			if (req.session.data['pro-ofsted-overall-date'] == "yes") {
				if (req.session.data['pro-ofsted-overall-grade'] == "inadequate") {
					res.redirect('/application/' + v + '/organisation/shutter/pro-ofsted-overall-inadequate')
				} else {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-fundingmaintained')
				}
			} else {
				if (req.session.data['pro-ofsted-overall-grade'] == "good") {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection')
				} else {
					req.session.data['tl_org_profile'] = 'completed'
					res.redirect('/application/' + v + '/task-list')
				}
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-date')
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
				// DESTINATION REQD
			} else {
				req.session.data['tl_org_profile'] = 'completed'
			}
			res.redirect('/application/' + v + '/task-list')
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-fundingmaintained')
		}
	})


	// Profile - Overall short insapection
	router.post('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection', function (req, res) {
		if (req.session.data['pro-ofsted-overall-shortinspection']) {
			if (req.session.data['pro-ofsted-overall-shortinspection'] == "yes") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grademaintained')
			} else {
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			}

		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-shortinspection')
		}
	})


	// Profile - Overall grade maintained
	router.post('/application/' + v + '/organisation/pro-ofsted-overall-grademaintained', function (req, res) {
		if (req.session.data['pro-ofsted-overall-grademaintained']) {
			if (req.session.data['pro-ofsted-overall-grademaintained'] == "yes") {
				/***** EXEMPT FROM AW and CCLM1-6 *****/
				req.session.data['exempt_lm'] = 'partial'
				req.session.data['exempt_aw'] = 'yes'
			}
			req.session.data['tl_org_profile'] = 'completed'
			res.redirect('/application/' + v + '/task-list')
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-grademaintained')
		}
	})

	// -----------------------
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
		res.redirect('/application/' + v + '/declarations/org-education-register')
	})

	// Organisation - Removed from education register
	router.post('/application/' + v + '/declarations/org-education-register', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-professional-register')
	})

	// Organisation - Removed from professional register
	router.post('/application/' + v + '/declarations/org-professional-register', function (req, res) {
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

	// Who’s in control - fraud or irregularities
	router.post('/application/' + v + '/declarations/people-fraud', function (req, res) {
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
		//req.session.data['tl_dec_people'] = 'completed'
		//res.redirect('/application/' + v + '/task-list')
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
		res.redirect('/application/' + v + '/welfare/upload-continuity')
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
		req.session.data['tl_wel_preventduty'] = 'inprogress'
		res.redirect('/application/' + v + '/welfare/upload-preventduty')
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
		if (req.session.data['org-selectedroute'] == "supporting") {
			res.redirect('/application/' + v + '/welfare/otherpolicies')
		} else {
			req.session.data['tl_wel_healthandsafety'] = 'completed'
			res.redirect('/application/' + v + '/task-list')
		}
	})

	

	

/****************
 *** Sign out ***
 ****************/
	router.get('/application/' + v + '/signout', function (req, res) {

		req.session.data['signedin'] = 'no'
		res.redirect('/application/' + v + '/signout')

	})

}