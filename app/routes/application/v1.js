// Routes for Application v1

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
	router.post('/application/v1/signin-a', function (req, res) {
		req.session.data['signedin'] = 'yes'
		res.redirect('/application/v1/task-list')
	})

	// Section complete - Select route
	router.post('/application/v1/organisation/select-route', function (req, res) {

		let selected_route = req.session.data['org-selectedroute']

		if (selected_route === 'main') {

			req.session.data['tl_selectroute'] = 'completed'
			req.session.data['tl_org_details'] = 'next'
			res.redirect('/application/v1/organisation/org-ico')

		} else if (selected_route === 'employer') {

			req.session.data['tl_selectroute'] = 'completed'
			req.session.data['tl_org_details'] = 'next'
			res.redirect('/application/v1/organisation/org-ico')

		} else if (selected_route === 'supporting') {

			req.session.data['tl_selectroute'] = 'completed'
			req.session.data['tl_org_details'] = 'next'
			res.redirect('/application/v1/organisation/org-ico')

		} else {

			res.redirect('/application/v1/organisation/error/select-route')
			
		}
		
	})
  
	// ICO number?
	router.post('/application/v1/organisation/org-ico', function (req, res) {
		req.session.data['tl_org_details'] = 'inprogress'

		let org_ico = req.session.data['org-ico']

		if (org_ico === '12345678') {
			res.redirect('/application/v1/organisation/org-ukprn')
		} else {
			res.redirect('/application/v1/organisation/error/org-ico')
		}
	})

	// UKPRN?
	router.post('/application/v1/organisation/org-ukprn', function (req, res) {

		let org_ukprn = req.session.data['org-ukprn']

		if (org_ukprn === '11110000') { // Company - Happy Path
			res.redirect('/application/v1/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '11110001') { // Company - Active with no website
			res.redirect('/application/v1/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '11110002') { // Company - Inactive
			res.redirect('/application/v1/organisation/shutter/org-inactivecompany')
		} else if (org_ukprn === '11110003') { // Company - Also a charity
			res.redirect('/application/v1/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '11110004') { // Charity only, not a company
			res.redirect('/application/v1/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '11110005') { // Not a company
			res.redirect('/application/v1/organisation/org-legalstatus')
		} else if (org_ukprn === '11110006') { // Organisation with a parent company
			res.redirect('/application/v1/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '11110007') { // Incorporation date less than 12 months ago (3 months for supporting)
			res.redirect('/application/v1/organisation/shutter/incorporation')
		} else {
			res.redirect('/application/v1/organisation/error/org-ukprn')
		}
	})

	

	// Legal status
	router.post('/application/v1/organisation/org-legalstatus', function (req, res) {

		let org_legalstatus = req.session.data['org-legalstatus']
		if (org_legalstatus === 'sole') { 
			res.redirect('/application/v1/organisation/org-legalstatus-sole')
		} else {
			res.redirect('/application/v1/organisation/org-legalstatus-partnership')
		}

	})

	// Sole trader details
	router.post('/application/v1/organisation/org-legalstatus-sole', function (req, res) {

		req.session.data['org-legalstatus-sole-dob-monthname'] = monthNumToName(req.session.data['org-legalstatus-sole-dob-month'])
		
		res.redirect('/application/v1/organisation/org-legalstatus-sole-confirm')

	})

	// Sole trader details confirmation
	router.post('/application/v1/organisation/org-legalstatus-sole-confirm', function (req, res) {
		res.redirect('/application/v1/organisation/org-website')
	})


	// Partnership details 
	router.post('/application/v1/organisation/org-legalstatus-partnership', function (req, res) {

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
			res.redirect('/application/v1/organisation/org-legalstatus-partnership-choice')
		} else {
			res.redirect('/application/v1/organisation/org-legalstatus-partnership-confirm')
		}
		
	})
	

	// Add partner choice
	router.post('/application/v1/organisation/org-legalstatus-partnership-choice', function (req, res) {

		res.redirect('/application/v1/organisation/org-legalstatus-partnership')

	})

	// Confirm partner details
	router.post('/application/v1/organisation/org-legalstatus-partnership-confirm', function (req, res) {

		res.redirect('/application/v1/organisation/org-website')

	})
	

	// Confirm company details
	router.post('/application/v1/organisation/org-confirmorgdetails', function (req, res) {

		//res.redirect('/application/v1/organisation/org-parentcompany')
		if (req.session.data['org-ukprn'] == "11110001"){
			// Org has no website in UKRLP
			res.redirect('/application/v1/organisation/org-website')
		} else {
			res.redirect('/application/v1/organisation/org-trading')
		}

	})

	/* Parent company
	router.post('/application/v1/organisation/org-parentcompany', function (req, res) {

		let org_parentcompany = req.session.data['org-parentcompany']

		if (org_parentcompany == "no") {

			if (req.session.data['org-ukprn'] == "11110001"){
				// Org has no website in UKRLP
				res.redirect('/application/v1/organisation/org-website')
			} else {
				res.redirect('/application/v1/organisation/org-trading')
			}

		} else {
			res.redirect('/application/v1/organisation/org-parentcompany-confirm')
		}

	})

	// Parent company confirmation
	router.post('/application/v1/organisation/org-parentcompany-confirm', function (req, res) {

		if (req.session.data['org-ukprn'] == "11110001"){
			// Org has no website in UKRLP
			res.redirect('/application/v1/organisation/org-website')
		} else {
			res.redirect('/application/v1/organisation/org-trading')
		}

	}) */

	// Website
	router.post('/application/v1/organisation/org-website', function (req, res) {

		res.redirect('/application/v1/organisation/org-trading')

	})

	/*
	// Started trading date
	router.post('/application/v1/organisation/org-trading', function (req, res) {

		let org_trading = req.session.data['org-trading']

		if (req.session.data['org-trading-day'] == "" || req.session.data['org-trading-month'] == "" || req.session.data['org-trading-year'] == "") {
			res.redirect('/application/v1/organisation/error/org-trading')
		} else {

			req.session.data['tl_org_details'] = 'completed'
			req.session.data['tl_org_people'] = 'next'

			if (req.session.data['org-ukprn'] === "11110004") { 
				res.redirect('/application/v1/organisation/org-trustees-declare')
			} else {
				res.redirect('/application/v1/organisation/org-peopleincontrol')
			}
			
		}
	}) */

	router.post('/application/v1/organisation/org-trading', function (req, res) {

		if ( req.session.data['org-trading'] == "<3" || req.session.data['org-trading'] == "<12") {
			res.redirect('/application/v1/organisation/shutter/org-trading')
		} else {

			req.session.data['tl_org_details'] = 'completed'
			req.session.data['tl_org_people'] = 'next'

			if (req.session.data['org-ukprn'] === "11110004") { 
				res.redirect('/application/v1/organisation/org-trustees')
			} else if (req.session.data['org-ukprn'] === "11110005") { 
				res.redirect('/application/v1/organisation/org-type')
			} else {
				res.redirect('/application/v1/organisation/org-peopleincontrol')
			}

		}

	})


	
	// Confirm people in control
	router.post('/application/v1/organisation/org-peopleincontrol', function (req, res) {

		if (req.session.data['org-ukprn'] === "11110003") {
			res.redirect('/application/v1/organisation/org-trustees')
		} else {
			req.session.data['tl_org_people'] = 'completed'
			req.session.data['tl_org_type'] = 'next'
			res.redirect('/application/v1/organisation/org-type')
		}
	})

	// Trustees from API
	router.post('/application/v1/organisation/org-trustees', function (req, res) {
		res.redirect('/application/v1/organisation/org-trustees-dob1')
	})
	router.post('/application/v1/organisation/org-trustees-dob1', function (req, res) {
		req.session.data['org-trustee-dob1-monthname'] = monthNumToName(req.session.data['org-trustee-dob1-month'])
		res.redirect('/application/v1/organisation/org-trustees-dob2')
	})
	router.post('/application/v1/organisation/org-trustees-dob2', function (req, res) {
		req.session.data['org-trustee-dob2-monthname'] = monthNumToName(req.session.data['org-trustee-dob2-month'])
		res.redirect('/application/v1/organisation/org-trustees-dob3')
	})
	router.post('/application/v1/organisation/org-trustees-dob3', function (req, res) {
		req.session.data['org-trustee-dob3-monthname'] = monthNumToName(req.session.data['org-trustee-dob3-month'])
		res.redirect('/application/v1/organisation/org-trustees-confirm')
	})

	
	// Declare trustees - Manual Entry
	router.post('/application/v1/organisation/org-trustees-declare', function (req, res) {

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

		res.redirect('/application/v1/organisation/org-trustees-confirm')
		
	})

	
	// Confirm trustees - Manual entry
	router.post('/application/v1/organisation/org-trustees-confirm', function (req, res) {
		req.session.data['tl_org_people'] = 'completed'
		req.session.data['tl_org_type'] = 'next'
		res.redirect('/application/v1/organisation/org-type')
	})


	// Organisation type
	router.post('/application/v1/organisation/org-type', function (req, res) {

		let org_orgtype = req.session.data['org-type']
		let org_route = req.session.data['org-selectedroute']

		if (org_route === 'employer') {

			if (org_orgtype === 'education'){
				req.session.data['tl_org_type'] = 'inprogress'
				res.redirect('/application/v1/organisation/org-type-education')
			} else if (org_orgtype === 'psb') {
				req.session.data['tl_org_type'] = 'inprogress'
				res.redirect('/application/v1/organisation/org-type-psb')
			} else if (org_orgtype === 'none') {
				req.session.data['tl_org_type'] = 'inprogress'
				res.redirect('/application/v1/organisation/org-type-subtype')
			} else {
				res.redirect('/application/v1/organisation/error/org-type')
			}

		} else {

			if (org_orgtype === 'education') {
				req.session.data['tl_org_type'] = 'inprogress'
				res.redirect('/application/v1/organisation/org-type-education')
			} else if (org_orgtype === 'employer') {
				req.session.data['tl_org_type'] = 'inprogress'
				req.session.data['tl_profile_ofsted'] = 'next'
				req.session.data['fha-exempt'] = 'no'
				res.redirect('/application/v1/organisation/org-classification')
			} else if (org_orgtype === 'psb') {
				req.session.data['tl_org_type'] = 'inprogress'
				req.session.data['fha-exempt'] = 'yes'
				res.redirect('/application/v1/organisation/org-type-psb')
			} else if (org_orgtype === 'training') {
				req.session.data['tl_org_type'] = 'inprogress'
				req.session.data['fha-exempt'] = 'no'
				res.redirect('/application/v1/organisation/org-type-training')
			} else {
				res.redirect('/application/v1/organisation/error/org-type')
			}

		}

	})


	// Organisation type = Education
	router.post('/application/v1/organisation/org-type-education', function (req, res) {

		let org_orgtype_edu = req.session.data['org-type-education']
		let org_route = req.session.data['org-selectedroute']
		//req.session.data['fha-exempt'] = 'yes'

		if (org_orgtype_edu === 'national-college') {
			req.session.data['org-fundedbytext'] = 'receiving funding from ESFA'
		} else if (org_orgtype_edu === 'academy') {
			req.session.data['org-fundedbytext'] = 'already registered with ESFA'
		} else if (org_orgtype_edu === 'multi-academy') {
			req.session.data['org-fundedbytext'] = 'already registered with ESFA'
		} else if (org_orgtype_edu === 'school') {
			req.session.data['org-fundedbytext'] = 'a Local Education Authority school'
		} else if (org_orgtype_edu === 'sixth-form') {
			req.session.data['org-fundedbytext'] = 'receiving funding from ESFA'
		} else if (org_orgtype_edu === 'hei') {
			req.session.data['org-fundedbytext'] = 'registered and funded by the Office for Students'
		} else if (org_orgtype_edu === 'gfe') {
			req.session.data['org-fundedbytext'] = 'receiving funding from ESFA'
		} else if (org_orgtype_edu === 'fei') {
			req.session.data['org-fundedbytext'] = 'already registered with ESFA'
		} else {
			res.redirect('/application/v1/organisation/error/org-type-education')
		}

		if (org_route === 'employer') {
			res.redirect('/application/v1/organisation/org-type-subtype')
		} else {
			res.redirect('/application/v1/organisation/org-fundedby')
		}

	})

	// Organisation type = Public Sector Body
	router.post('/application/v1/organisation/org-type-psb', function (req, res) {

		let org_orgtype_psb = req.session.data['org-type-psb']
		let org_route = req.session.data['org-selectedroute']
		req.session.data['fha-exempt'] = 'yes'

		if (org_orgtype_psb) {
			if (org_route === 'employer') {
				res.redirect('/application/v1/organisation/org-type-subtype')
			} else {
				res.redirect('/application/v1/organisation/org-classification')
			}
		} else {
			res.redirect('/application/v1/organisation/error/org-type-psb')
		}

	})

	// Organisation type = Training Org/Agency
	router.post('/application/v1/organisation/org-type-training', function (req, res) {

		let org_orgtype_training = req.session.data['org-type-training']
		let org_route = req.session.data['org-selectedroute']
		req.session.data['fha-exempt'] = 'no'

		if (org_orgtype_training) {
			if (org_route === 'employer') {
				res.redirect('/application/v1/organisation/org-type-subtype')
			} else {
				res.redirect('/application/v1/organisation/org-classification')
			}
		} else {
			res.redirect('/application/v1/organisation/error/org-type-training')
		}

	})

	// Organisation type - Funded by
	router.post('/application/v1/organisation/org-fundedby', function (req, res) {

		let org_fundedby = req.session.data['org-fundedby']
		req.session.data['tl_org_type'] = 'completed'

		if (org_fundedby === 'yes') {
			req.session.data['fha-exempt'] = 'yes'
		} else if (org_fundedby === 'no') {
			req.session.data['fha-exempt'] = 'no'
		} else {
			res.redirect('/application/v1/organisation/error/org-fundedby')
		}

		res.redirect('/application/v1/organisation/org-classification')

	})

	// Employer route organisation - Sub-type
	router.post('/application/v1/organisation/org-type-subtype', function (req, res) {

		res.redirect('/application/v1/organisation/org-classification')

	})

	// Organisation classification
	router.post('/application/v1/organisation/org-classification', function (req, res) {

		req.session.data['tl_org_type'] = 'completed'
		if ( req.session.data['fha-exempt'] === 'yes'){
			req.session.data['tl_fin_upload'] = 'exempt'
			req.session.data['tl_pol_upload'] = 'next'
		} else {
			req.session.data['tl_fin_upload'] = 'next'
		}
		res.redirect('/application/v1/task-list')

	})


	// Sign out
	router.get('/application/v1/signout', function (req, res) {

		req.session.data['signedin'] = 'no'
		res.redirect('/application/v1/signout')

	})

}