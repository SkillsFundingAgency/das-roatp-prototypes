// Routes for Application v2

var v = 'v2';

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

		// Jump to: Your organisation > Organisation profile
		// As a: Main provider, not funded by OFS
		if (req.session.data['signin-email'] == "main@company.profile") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "public-service-mutual"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = ">23"
			req.session.data['org-type'] = "employer"
			req.session.data['org-ukprn'] = "12340001"
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
			req.session.data['org-ukprn'] = "12340000"
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

	// Confirm company details
	router.post('/application/' + v + '/organisation/org-confirmorgdetails', function (req, res) {
		
		res.redirect('/application/' + v + '/task-list')

		//res.redirect('/application/' + v + '/organisation/org-parentcompany')
		/*if (req.session.data['org-ukprn'] == "12340001"){
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

		if (org_ico === '12345678') {
			if (req.session.data['org-ukprn'] == "12340001"){
				// Org has no website in UKRLP
				res.redirect('/application/' + v + '/organisation/org-website')
			} else {
				res.redirect('/application/' + v + '/organisation/org-trading')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-ico')
		}
	})

	// UKPRN?
	router.post('/application/' + v + '/organisation/org-ukprn', function (req, res) {

		let org_ukprn = req.session.data['org-ukprn']

		if (org_ukprn === '12340000') { // Company - Happy Path
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340001') { // Company - Active with no website
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340002') { // Company - Inactive
			res.redirect('/application/' + v + '/organisation/shutter/org-inactivecompany')
		} else if (org_ukprn === '12340003') { // Company - Also a charity
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340004') { // Charity only, not a company
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340005') { // Not a company (sole trader or partnership)
			//res.redirect('/application/' + v + '/organisation/org-legalstatus')
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
			//res.redirect('/application/' + v + '/task-list')
		} else if (org_ukprn === '12340006') { // Organisation with a parent company
			res.redirect('/application/' + v + '/organisation/org-confirmorgdetails')
		} else if (org_ukprn === '12340007') { // Incorporation date less than 12 months ago (3 months for supporting)
			res.redirect('/application/' + v + '/organisation/shutter/incorporation')
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-ukprn')
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

			if (req.session.data['org-ukprn'] === "12340004") { 
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

				if (req.session.data['org-ukprn'] === "12340004") { 
					res.redirect('/application/' + v + '/organisation/org-trustees')
				} else if (req.session.data['org-ukprn'] === "12340005") {
					res.redirect('/application/' + v + '/organisation/org-legalstatus')
					//res.redirect('/application/' + v + '/organisation/org-type')
				} else {
					res.redirect('/application/' + v + '/organisation/org-peopleincontrol')
				}

			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-trading')
		}

	})


	
	// Confirm people in control
	router.post('/application/' + v + '/organisation/org-peopleincontrol', function (req, res) {

		if (req.session.data['org-ukprn'] === "12340003") {
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
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprentice')
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
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprentice')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-postgrad')
		}
	})


	// Profile - Ofsted inspection for apprentices
	router.post('/application/' + v + '/organisation/pro-ofsted-apprentice', function (req, res) {
		if (req.session.data['pro-ofsted-apprentice']) {
			if (req.session.data['pro-ofsted-apprentice'] == "yes") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprentice-grade')
			} else {
				if (req.session.data['org-type-education'] == "hei" && req.session.data['org-fundedby'] == "yes"){
					// EXEMPT FROM AW and CCLM1-6
					req.session.data['exempt_lm'] = 'partial'
					req.session.data['exempt_aw'] = 'yes'
					req.session.data['tl_org_profile'] = 'completed'
					res.redirect('/application/' + v + '/task-list')
				} else {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall')
				}
				//res.redirect('/application/' + v + '/organisation/pro-funded')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprentice')
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
	router.post('/application/' + v + '/organisation/pro-ofsted-apprentice-grade', function (req, res) {
		if (req.session.data['pro-ofsted-apprentice-grade']) {
			if (req.session.data['pro-ofsted-apprentice-grade'] == "requires-improvement") {
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			} else {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprentice-date')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprentice-grade')
		}
	})


	// Profile - Grade of Ofsted inspection for apprentices <3 years
	router.post('/application/' + v + '/organisation/pro-ofsted-apprentice-date', function (req, res) {
		
		if (req.session.data['pro-ofsted-apprentice-date']) {
			if (req.session.data['pro-ofsted-apprentice-date'] == "yes") {
				if (req.session.data['pro-ofsted-apprentice-grade'] == "inadequate") {
					// INELIGIBLE TO APPLY > SHUTTER PAGE
					res.redirect('/application/' + v + '/organisation/shutter/pro-ofsted-apprentice-date')
				} else { 
					// Grade is outstanding or good
					// Short inspeciton question
					res.redirect('/application/' + v + '/organisation/pro-ofsted-apprentice-fundingmaintained')
				}
			} else {
				//res.redirect('/application/' + v + '/organisation/pro-ofsted-apprentice-shortinspection')
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprentice-date')
		}

	})


	// Profile - Short inspection <3 years
	router.post('/application/' + v + '/organisation/pro-ofsted-apprentice-shortinspection', function (req, res) {

		if (req.session.data['pro-ofsted-apprentice-shortinspection']) {
			if (req.session.data['pro-ofsted-apprentice-shortinspection'] == "yes") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprentice-fundingmaintained')
			} else {
				// Complete all sections
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprentice-shortinspection')
		}

	})


	// Profile - Ofsted inspection for apprentices outstanding/good - maintained funding
	router.post('/application/' + v + '/organisation/pro-ofsted-apprentice-fundingmaintained', function (req, res) {

		if (req.session.data['pro-ofsted-apprentice-fundingmaintained']) {
			if (req.session.data['pro-ofsted-apprentice-fundingmaintained'] == "yes") {
				/***** EXEMPT FROM L&M and AW *****/
				req.session.data['exempt_lm'] = 'yes'
				req.session.data['exempt_aw'] = 'yes'
			}
			req.session.data['tl_org_profile'] = 'completed'
			res.redirect('/application/' + v + '/task-list')
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprentice-fundingmaintained')
		}
	})


	// Profile - Overall Ofsted inspection
	router.post('/application/' + v + '/organisation/pro-ofsted-overall', function (req, res) {
		if (req.session.data['pro-ofsted-overall']) {
			if (req.session.data['pro-ofsted-overall'] == "yes") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grade')
			} else {
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall')
		}
	})


	// Profile - Overall Effectiveness Grade of Ofsted inspection
	router.post('/application/' + v + '/organisation/pro-ofsted-overall-grade', function (req, res) {
		if (req.session.data['pro-ofsted-overall-grade']) {
			if (req.session.data['pro-ofsted-overall-grade'] == "outstanding" || req.session.data['pro-ofsted-overall-grade'] == "good") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-date')
			} else if (req.session.data['pro-ofsted-overall-grade'] == "inadequate") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-date')
				//res.redirect('/application/' + v + '/organisation/shutter/xxx')
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
			} else {
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list')
			}
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

	// --------
	// Sign out
	router.get('/application/' + v + '/signout', function (req, res) {

		req.session.data['signedin'] = 'no'
		res.redirect('/application/' + v + '/signout')

	})

}