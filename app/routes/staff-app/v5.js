// Routes for Staff App v5

var v = 'v5';

var months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May',
	'Jun', 'Jul', 'Aug', 'Sep',
	'Oct', 'Nov', 'Dec'
	];

function monthNumToName(monthnum) {
	return months[monthnum - 1] || '';
}

module.exports = function (router) {

	// Training Provider Added
	router.post('/staff-app/' + v + '/register', function (req, res) {
		if (req.session.data['action'] == "add") {
			res.render("staff-app/' + v + '/register", {showAdded: true});
		} else if (req.session.data['action'] == "upload") {
			res.render("staff-app/' + v + '/register", {showUploaded: true});
		}
	})

	// Register search
	router.post('/staff-app/' + v + '/register/search/register-a', function (req, res) {

		let searchterm = req.session.data['staff-search']
		
		if (searchterm == '1234567') {
			res.redirect('/staff-app/' + v + '/register/search/detail')
		} else {
			res.redirect('/staff-app/' + v + '/register/search/search-results')
		}

	})

	// UKPRN Routing
	router.post('/staff-app/' + v + '/register/add/add-ukprn-search', function (req, res){

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
			res.redirect('/staff-app/' + v + '/register/add/add-fromukrlp-playback')

		} else if (staff_ukprn === '11110002') {
			
			// UKPRN is deactivated/unknown
			res.redirect('/staff-app/' + v + '/register/add/add-ukprn-deactivated')

		} else {

			res.redirect('/staff-app/' + v + '/register/add/add-ukprn')

		}
		
	})

	// UKRLP unavailable
	router.post('/staff-app/' + v + '/add-ukprn-outage-a', function (req, res) {

		let staff_ukprn = req.session.data['staff-add-ukprn']
		let staff_outage = req.session.data['staff-outagechoice']

		if (staff_outage === 'register') {
			res.redirect('/staff-app/' + v + '/register')
		} else {
			if (staff_ukprn === '11110004') {
				res.redirect('/staff-app/' + v + '/add-route')
			} else if (staff_ukprn === '11110003') {
				res.redirect('/staff-app/' + v + '/add-stopgap-route')
			}
		}
	})

	// UKRLP unavailable
	router.post('/staff-app/' + v + '/add-manually-a', function (req, res) {

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

		res.redirect('/staff-app/' + v + '/add-confirm')
	})

	router.post('/staff-app/' + v + '/register/add/add-fromukrlp-determined-a', function (req, res) {

		req.session.data['staff-add-determined-monthname'] = monthNumToName(req.session.data['staff-add-determined-month']);
		res.redirect('/staff-app/' + v + '/register/add/add-confirm')

	})
}