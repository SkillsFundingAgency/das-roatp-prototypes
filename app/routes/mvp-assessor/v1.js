// Routes for MVP - Assessor v1

var v = 'v1';

var months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May',
	'Jun', 'Jul', 'Aug', 'Sep',
	'Oct', 'Nov', 'Dec'
	];

function monthNumToName(monthnum) {
	return months[monthnum - 1] || '';
}

module.exports = function (router) {

	/******************
	 * ???            *
	 ******************/

	


	/************************
	 * Sign in and register *
	 ************************/

		// Sign in
		router.post('/mvp-assessor/' + v + '/sign-in', function (req, res) {
			res.redirect('/mvp-assessor/' + v + '/applications/applications-assessor')
		})


	/*************
	 * Staff app *
	 *************/

		// Register search
		router.post('/mvp-assessor/' + v + '/register/search/register-a', function (req, res) {

			let searchterm = req.session.data['staff-search']
			
			if (searchterm == '1234567') {
				res.redirect('/mvp-assessor/' + v + '/register/search/detail')
			} else {
				res.redirect('/mvp-assessor/' + v + '/register/search/search-results')
			}

		})

		// UKPRN Routing
		router.post('/mvp-assessor/' + v + '/register/add/add-ukprn-search', function (req, res){

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
				res.redirect('/mvp-assessor/' + v + '/register/add/add-fromukrlp-playback')

			} else if (staff_ukprn === '11110002') {
				// UKPRN is deactivated/unknown
				res.redirect('/mvp-assessor/' + v + '/register/add/add-ukprn-deactivated')
			} else {
				res.redirect('/mvp-assessor/' + v + '/register/add/add-ukprn')
			}
			
		})

		// UKRLP unavailable
		router.post('/mvp-assessor/' + v + '/add-ukprn-outage-a', function (req, res) {

			let staff_ukprn = req.session.data['staff-add-ukprn']
			let staff_outage = req.session.data['staff-outagechoice']

			if (staff_outage === 'register') {
				res.redirect('/mvp-assessor/' + v + '/register')
			} else {
				if (staff_ukprn === '11110004') {
					res.redirect('/mvp-assessor/' + v + '/add-route')
				} else if (staff_ukprn === '11110003') {
					res.redirect('/mvp-assessor/' + v + '/add-stopgap-route')
				}
			}
		})

		// UKRLP unavailable
		router.post('/mvp-assessor/' + v + '/add-manually-a', function (req, res) {

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

			res.redirect('/mvp-assessor/' + v + '/add-confirm')
		})

		router.post('/mvp-assessor/' + v + '/register/add/add-fromukrlp-determined-a', function (req, res) {

			req.session.data['staff-add-determined-monthname'] = monthNumToName(req.session.data['staff-add-determined-month']);
			res.redirect('/mvp-assessor/' + v + '/register/add/add-confirm')

		})

}