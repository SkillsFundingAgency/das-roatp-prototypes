// Routes for Staff App v6

var v = 'v7';

var months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May',
	'Jun', 'Jul', 'Aug', 'Sep',
	'Oct', 'Nov', 'Dec'
	];

function monthNumToName(monthnum) {
	return months[monthnum - 1] || '';
}

function govDateTime() {
	var d = new Date(),
			minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
			hours = d.getHours().toString().length == 1 ? d.getHours() : d.getHours(),
			ampm = d.getHours() >= 12 ? 'pm' : 'am',
			months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
			days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	return d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear()+' at '+hours+':'+minutes+ampm;
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


	/********************************
	 *** Company - Initial checks ***
	********************************/

		// Legal and address
		router.post('/staff-app/' + v + '/applications/gateway/company/initial/legal', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	/*********************************
	 *** Company - Register checks ***
	 *********************************/

		// RoATP
		router.post('/staff-app/' + v + '/applications/gateway/company/register/roatp', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})

		// RoTO
		/*router.post('/staff-app/' + v + '/applications/gateway/company/register/roto', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})*/

		// EPAO
		router.post('/staff-app/' + v + '/applications/gateway/company/register/epao', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	/*************************************
	 *** Company - Organisation checks ***
	 *************************************/

		// Organisation info - Parent company
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/parent', function (req, res) {
			req.session.data['rejects-orginfo'] = 0
			if (req.session.data['gw-company-parent'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/ico')
		})

		// Organisation info - ICO
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/ico', function (req, res) {
			if (req.session.data['gw-company-ico'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/trading')
		})

		// Organisation info - Trading for
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/trading', function (req, res) {
			if (req.session.data['gw-company-trading'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/website')
		})

		// Organisation info - Website
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/website', function (req, res) {
			if (req.session.data['gw-company-website'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})

		// Organisation type
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/type', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})

		// Experience and accreditation - ITT
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/itt', function (req, res) {
			req.session.data['rejects-experience'] = 0
			if (req.session.data['gw-company-itt'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/ofsted')
		})

		// Experience and accreditation - Ofsted
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/ofsted', function (req, res) {
			if (req.session.data['gw-company-ofsted'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


/******************* ROATP DOWN  */

	/********************************
	 *** Company - Initial checks ***
	********************************/

		// Legal and address
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/initial/legal', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})


	/*********************************
	 *** roatpdown - Register checks ***
	 *********************************/

		// RoATP
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/register/roatp', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})

		// RoTO
		/*router.post('/staff-app/' + v + '/applications/gateway/roatpdown/register/roto', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})*/

		// EPAO
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/register/epao', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})


	/*************************************
	 *** roatpdown - Organisation checks ***
	 *************************************/

		// Organisation info - Parent roatpdown
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/parent', function (req, res) {
			req.session.data['rejects-orginfo'] = 0
			if (req.session.data['gw-roatpdown-parent'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/ico')
		})

		// Organisation info - ICO
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/ico', function (req, res) {
			if (req.session.data['gw-roatpdown-ico'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/trading')
		})

		// Organisation info - Trading for
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/trading', function (req, res) {
			if (req.session.data['gw-roatpdown-trading'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/website')
		})

		// Organisation info - Website
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/website', function (req, res) {
			if (req.session.data['gw-roatpdown-website'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})

		// Organisation type
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/type', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})

		// Experience and accreditation - ITT
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/itt', function (req, res) {
			req.session.data['rejects-experience'] = 0
			if (req.session.data['gw-roatpdown-itt'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/ofsted')
		})

		// Experience and accreditation - Ofsted
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/ofsted', function (req, res) {
			if (req.session.data['gw-roatpdown-ofsted'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})


}