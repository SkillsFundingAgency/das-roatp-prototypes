// Routes for Organisation v0

module.exports = function (router) {

	// Sign in
	router.post('/organisation/v0/signin-a', function (req, res) {
		req.session.data['signedin'] = 'yes'
		res.redirect('/organisation/v0/task-list')
	})

	// Section complete - Select route
	router.post('/organisation/v0/select-route-a', function (req, res) {

		let selected_route = req.session.data['org-selectedroute']

		if (selected_route === 'main') {
			req.session.data['tl_selectroute'] = 'completed'
			req.session.data['tl_org_details'] = 'next'
			res.redirect('/organisation/v0/org-ico')
		} else if (selected_route === 'employer') {
			req.session.data['tl_selectroute'] = 'completed'
			req.session.data['tl_org_details'] = 'next'
			res.redirect('/organisation/v0/org-ico')
		} else if (selected_route === 'supporting') {
			req.session.data['tl_selectroute'] = 'completed'
			req.session.data['tl_org_details'] = 'next'
			res.redirect('/organisation/v0/org-ico')
		} else {
			res.redirect('/organisation/v0/select-route-error')
		}
		
	})
  
	// ICO number?
	router.post('/organisation/v0/org-ico-a', function (req, res) {
		req.session.data['tl_org_details'] = 'inprogress'

		let org_ico = req.session.data['org-ico']

		if (org_ico === '12345678') {
			res.redirect('/organisation/v0/org-ukprn')
		} else {
			res.redirect('/organisation/v0/org-error-ico')
		}
	})

	// UKPRN?
	router.post('/organisation/v0/org-ukprn-a', function (req, res) {

		let org_ukprn = req.session.data['org-ukprn']

		if (org_ukprn === '11110000') { // Company - Happy Path
			res.redirect('/organisation/v0/org-confirm-companydetails')
		} else if (org_ukprn === '11110001') { // Company - Active with no website
			res.redirect('/organisation/v0/org-confirm-companydetails')
		} else if (org_ukprn === '11110002') { // Company - Inactive
			res.redirect('/organisation/v0/org-shutter-inactivecompany')
		} else if (org_ukprn === '11110003') { // Company - Also a charity
			res.redirect('/organisation/v0/org-confirm-companydetails')
		} else if (org_ukprn === '11110004') { // Not a company
			res.redirect('/organisation/v0/org-legalstatus')
		} else {
			res.redirect('/organisation/v0/org-error-ukprn')
		}
	})

	// Confirm company details
	router.post('/organisation/v0/org-confirm-companydetails-a', function (req, res) {

		res.redirect('/organisation/v0/org-trading')

	})

	// Started trading date
	router.post('/organisation/v0/org-trading-a', function (req, res) {

		let org_trading = req.session.data['org-trading']

		if (req.session.data['org-trading-day'] == "" || req.session.data['org-trading-month'] == "" || req.session.data['org-trading-year'] == "") {
			res.redirect('/organisation/v0/org-error-trading')
		} else {
			req.session.data['tl_org_details'] = 'completed'
			req.session.data['tl_org_people'] = 'next'
			res.redirect('/organisation/v0/org-confirm-pscs-company')
		}
	})
	
	// Section complete - Organisation Details
	router.post('/organisation/v0/org-confirm-pscs-a', function (req, res) {
		req.session.data['tl_org_people'] = 'completed'
		req.session.data['tl_org_convictions'] = 'next'
		res.redirect('/organisation/v0/org-convictions-company')
	})


	// Criminal Convictions - Company
	router.post('/organisation/v0/org-convictions-company-a', function (req, res) {

		let org_convict_company = req.session.data['org-convictions-company']

		if (org_convict_company === 'no') {
			req.session.data['tl_org_convictions'] = 'completed'
			req.session.data['tl_org_compliance'] = 'next'
			res.redirect('/organisation/v0/org-duediligence-creditordebt')
		} else if (org_convict_company === 'yes') {
			req.session.data['tl_org_convictions'] = 'inprogress'
			res.redirect('/organisation/v0/org-duediligence-creditordebt')
		} else {
			res.redirect('/organisation/v0/org-error-convictions-company')
		}
	})


	// Org in debt with creditors?
	router.post('/organisation/v0/org-duediligence-creditordebt-a', function (req, res) {

		let org_duediligence_creditordebt = req.session.data['org-duediligence-creditordebt']
		req.session.data['tl_org_compliance'] = 'inprogress'

		res.redirect('/organisation/v0/org-duediligence-last3years')

	})

	// Apply to organisation 2 (safegurding and whistleblowing)
	router.post('/organisation/v0/org-duediligence-organisation-2-a', function (req, res) {

		req.session.data['tl_org_compliance'] = 'completed'
		req.session.data['tl_org_classification'] = 'next'

		res.redirect('/organisation/v0/org-classification')

	})

	// Organisation type
	router.post('/organisation/v0/org-classification-a', function (req, res) {

		let org_orgtype = req.session.data['org-classification']

		if (org_orgtype === 'education') {
			req.session.data['tl_org_classification'] = 'inprogress'
			res.redirect('/organisation/v0/org-classification-education')
		} else if (org_orgtype === 'employer') {
			req.session.data['tl_org_classification'] = 'completed'
			req.session.data['fha-exempt'] = 'no'
			res.redirect('/organisation/v0/task-list')
		} else if (org_orgtype === 'psb') {
			req.session.data['tl_org_classification'] = 'inprogress'
			req.session.data['fha-exempt'] = 'yes'
			res.redirect('/organisation/v0/org-classification-psb')
		} else if (org_orgtype === 'training') {
			req.session.data['tl_org_classification'] = 'inprogress'
			req.session.data['fha-exempt'] = 'no'
			res.redirect('/organisation/v0/org-classification-training')
		} else {
			res.redirect('/organisation/v0/org-error-classification')
		}
	})


	// Organisation type = Education
	router.post('/organisation/v0/org-classification-education-a', function (req, res) {

		let org_orgtype_edu = req.session.data['org-classification-education']
		req.session.data['fha-exempt'] = 'yes'

		if (org_orgtype_edu === 'national-college') {
			req.session.data['org-fundedby'] = 'receiving funding from ESFA'
		} else if (org_orgtype_edu === 'academy') {
			req.session.data['org-fundedby'] = 'already registered with ESFA'
		} else if (org_orgtype_edu === 'multi-academy') {
			req.session.data['org-fundedby'] = 'already registered with ESFA'
		} else if (org_orgtype_edu === 'school') {
			req.session.data['org-fundedby'] = 'a Local Education Authority school'
		} else if (org_orgtype_edu === 'sixth-form') {
			req.session.data['org-fundedby'] = 'receiving funding from ESFA'
		} else if (org_orgtype_edu === 'hei') {
			req.session.data['org-fundedby'] = 'registered and funded by the Office for Students'
		} else if (org_orgtype_edu === 'gfe') {
			req.session.data['org-fundedby'] = 'receiving funding from ESFA'
		} else if (org_orgtype_edu === 'fei') {
			req.session.data['org-fundedby'] = 'already registered with ESFA'
		} else {
			req.session.data['fha-exempt'] = 'no'
		}
		res.redirect('/organisation/v0/org-fundedby')

	})

	// Organisation type = Public Sector Body
	router.post('/organisation/v0/org-classification-psb-a', function (req, res) {

		let org_orgtype_psb = req.session.data['org-classification-psb']
		req.session.data['fha-exempt'] = 'yes'
		res.redirect('/organisation/v0/task-list')

	})

	// Organisation type = Training Org/Agency
	router.post('/organisation/v0/org-classification-training-a', function (req, res) {

		let org_orgtype_training = req.session.data['org-classification-training']
		req.session.data['fha-exempt'] = 'no'
		res.redirect('/organisation/v0/task-list')

	})

	// Funded by
	router.post('/organisation/v0/org-fundedby-a', function (req, res) {

		let org_fundedby = req.session.data['org-fundedby']
		req.session.data['tl_org_classification'] = 'completed'

		if (org_fundedby === 'yes') {
			req.session.data['fha-exempt'] = 'yes'
		} else if (org_fundedby === 'no') {
			req.session.data['fha-exempt'] = 'no'
		} else {
			res.redirect('/organisation/v0/org-error-fundedby')
		}

		res.redirect('/organisation/v0/task-list')

	})

	// Sign out
	router.get('/organisation/v0/signout-a', function (req, res) {

		req.session.data['signedin'] = 'no'
		res.redirect('/organisation/v0/signout')

	})

}