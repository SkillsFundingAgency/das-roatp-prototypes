// Routes for MVP - Gateway v2

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

	/******************
	 * Initial Checks *
	 ******************/

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/initial/legalname', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/company/initial/status')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/initial/status', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/company/initial/address')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/initial/address', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/company/initial/outcome')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/initial/outcome', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-company')
		})

	/********************
	 * High Risk Checks *
	 ********************/

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/highrisk/organisation', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-company')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/highrisk/people', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/company/highrisk/people-highrisk')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/highrisk/people-highrisk', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/company/highrisk/people-outcome')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/highrisk/people-outcome', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-company')
		})

	/*******************
	 * Register Checks *
	 *******************/

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/register/roatp', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-company')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/register/roto', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-company')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/register/epao', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-company')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/register/rort', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-company')
		})

	/***********************
	 * Organisation Checks *
	 ***********************/

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/organisation/info/parent-name', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/company/organisation/info/parent-status')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/organisation/info/parent-status', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/company/organisation/info/ico')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/organisation/info/ico', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/company/organisation/info/website')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/organisation/info/website', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/company/organisation/info/outcome')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/organisation/info/outcome', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-company')
		})

	/**********************************
	 * Criminal and compliance Checks *
	 **********************************/

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/criminal/organisation', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-company')
		})
		
		router.post('/mvp-gateway/' + v + '/applications/gateway/company/criminal/peopleincontrol', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-company')
		})

	/*******************
	 * Gateway outcome *
	 *******************/

		router.post('/mvp-gateway/' + v + '/applications/gateway/company/outcome', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/applications-gateway#outcome')
		})
		

	/************************
	 * Sign in and register *
	 ************************/

		// Sign in
		router.post('/mvp-gateway/' + v + '/sign-in', function (req, res) {
			if (req.session.data['staff-email'] == "assessor@esfa.gov.uk"){
				res.redirect('/mvp-gateway/' + v + '/applications/applications-assessor')
			} else {
				res.redirect('/mvp-gateway/' + v + '/dashboard')
			}
		})

		// Training Provider Added
		router.post('/mvp-gateway/' + v + '/register', function (req, res) {
			if (req.session.data['action'] == "add") {
				res.render("staff-app/' + v + '/register", {showAdded: true});
			} else if (req.session.data['action'] == "upload") {
				res.render("staff-app/' + v + '/register", {showUploaded: true});
			}
		})


	/*************
	 * Staff app *
	 *************/

		// Register search
		router.post('/mvp-gateway/' + v + '/register/search/register-a', function (req, res) {

			let searchterm = req.session.data['staff-search']
			
			if (searchterm == '1234567') {
				res.redirect('/mvp-gateway/' + v + '/register/search/detail')
			} else {
				res.redirect('/mvp-gateway/' + v + '/register/search/search-results')
			}

		})

		// UKPRN Routing
		router.post('/mvp-gateway/' + v + '/register/add/add-ukprn-search', function (req, res){

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
				res.redirect('/mvp-gateway/' + v + '/register/add/add-fromukrlp-playback')

			} else if (staff_ukprn === '11110002') {
				// UKPRN is deactivated/unknown
				res.redirect('/mvp-gateway/' + v + '/register/add/add-ukprn-deactivated')
			} else {
				res.redirect('/mvp-gateway/' + v + '/register/add/add-ukprn')
			}
			
		})

		// UKRLP unavailable
		router.post('/mvp-gateway/' + v + '/add-ukprn-outage-a', function (req, res) {

			let staff_ukprn = req.session.data['staff-add-ukprn']
			let staff_outage = req.session.data['staff-outagechoice']

			if (staff_outage === 'register') {
				res.redirect('/mvp-gateway/' + v + '/register')
			} else {
				if (staff_ukprn === '11110004') {
					res.redirect('/mvp-gateway/' + v + '/add-route')
				} else if (staff_ukprn === '11110003') {
					res.redirect('/mvp-gateway/' + v + '/add-stopgap-route')
				}
			}
		})

		// UKRLP unavailable
		router.post('/mvp-gateway/' + v + '/add-manually-a', function (req, res) {

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

			res.redirect('/mvp-gateway/' + v + '/add-confirm')
		})

		router.post('/mvp-gateway/' + v + '/register/add/add-fromukrlp-determined-a', function (req, res) {

			req.session.data['staff-add-determined-monthname'] = monthNumToName(req.session.data['staff-add-determined-month']);
			res.redirect('/mvp-gateway/' + v + '/register/add/add-confirm')

		})

}