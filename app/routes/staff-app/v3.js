// Routes for Staff App v3

module.exports = function (router) {

	// Training Provider Added
	router.post('/staff-app/v3/register', function (req, res) {
		if (req.session.data['action'] == "add") {
			res.render("staff-app/v3/register", {showAdded: true});
		} else if (req.session.data['action'] == "upload") {
			res.render("staff-app/v3/register", {showUploaded: true});
		}
	})

	// Register search
	router.post('/staff-app/v3/register-a', function (req, res) {

		let searchterm = req.session.data['staff-search']
		
		if (searchterm == '1234567') {
			res.redirect('/staff-app/v3/detail')
		} else {
			res.redirect('/staff-app/v3/search-results')
		}

	})

	// UKPRN Routing
	router.post('/staff-app/v3/add-ukprn-search', function (req, res){

		let staff_ukprn = req.session.data['staff-add-ukprn']

		if (staff_ukprn === '11110001') {

			req.session.data['staff-add-companynumber'] = "1893839"
			req.session.data['staff-add-orgname'] = "ACME Solutions"
			req.session.data['staff-add-ukprn'] = "11110001"
			req.session.data['staff-add-tradingname'] = ""
			req.session.data['staff-add-charitynumber'] = ""
			req.session.data['staff-add-hascharitynumber'] = "no"
			req.session.data['staff-add-hascompanynumber'] = "yes"
			req.session.data['staff-add-hastradingname'] = "no"
			
			// UKRLP returns data
			res.redirect('/staff-app/v3/add-fromukrlp-playback')

		} else if (staff_ukprn === '11110002') {
			
			// UKPRN is deactivated/unknown
			res.redirect('/staff-app/v3/add-ukprn-deactivated')

		} else if (staff_ukprn === '11110003') {
		
			// UKRLP provides non-200 response
			// Existing manual entry form
			res.redirect('/staff-app/v3/add-ukprn-outage')

		} else if (staff_ukprn === '11110004') {
		
			// UKRLP provides non-200 response
			// New multi-page journey
			res.redirect('/staff-app/v3/add-ukprn-outage')

		}
	})

	// UKRLP unavailable
	router.post('/staff-app/v3/add-ukprn-outage-a', function (req, res) {

		let staff_ukprn = req.session.data['staff-add-ukprn']
		let staff_outage = req.session.data['staff-outagechoice']

		if (staff_outage === 'register') {
			res.redirect('/staff-app/v3/register')
		} else {
			if (staff_ukprn === '11110004') {
				res.redirect('/staff-app/v3/add-route')
			} else if (staff_ukprn === '11110003') {
				res.redirect('/staff-app/v3/add-stopgap-route')
			}
		}
	})

	// UKRLP unavailable
	router.post('/staff-app/v3/add-manually-a', function (req, res) {

		if (req.session.data['staff-add-charitynumber'] != "" ){
			req.session.data['staff-add-hascharitynumber'] = "yes"
		} else {
			req.session.data['staff-add-hascharitynumber'] = "no"
		}
		if (req.session.data['staff-add-companynumber'] != "" ){
			req.session.data['staff-add-hascompanynumber'] = "yes"
		} else {
			req.session.data['staff-add-hascompanynumber'] = "no"
		}
		if (req.session.data['staff-add-tradingname'] != "" ){
			req.session.data['staff-add-hastradingname'] = "yes"
		} else {
			req.session.data['staff-add-hastradingname'] = "no"
		}

		res.redirect('/staff-app/v3/add-confirm')
	})
}