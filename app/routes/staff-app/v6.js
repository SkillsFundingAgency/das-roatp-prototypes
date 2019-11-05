// Routes for Staff App v6

var v = 'v6';

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
 *** Gateway Assessor Journey ***
 ********************************/

	// UKPRN
	/*router.post('/staff-app/' + v + '/applications/gateway/checks/ukprn', function (req, res) {
		if (req.session.data['gw-ukprn']){
			res.redirect('/staff-app/' + v + '/applications/gateway/application-tasklist')
		}
	})*/

	// ICO
	/*router.post('/staff-app/' + v + '/applications/gateway/checks/orginfo', function (req, res) {
		if (req.session.data['gw-org-parentcompany'] && 
			req.session.data['gw-org-ico'] && 
			req.session.data['gw-org-website'] && 
			req.session.data['gw-org-activelytrading'])
		{
			req.session.data['count-gw-org-rejects'] = 0
			if (req.session.data['gw-org-parentcompany'] == "Reject") {
				req.session.data['count-gw-org-rejects'] = req.session.data['count-gw-org-rejects'] + 1
			}
			if (req.session.data['gw-org-ico'] == "Reject"){
				req.session.data['count-gw-org-rejects'] = req.session.data['count-gw-org-rejects'] + 1
			}
			if (req.session.data['gw-org-website'] == "Reject") {
				req.session.data['count-gw-org-rejects'] = req.session.data['count-gw-org-rejects'] + 1
			}
			if (req.session.data['gw-org-activelytrading'] == "Reject") {
				req.session.data['count-gw-org-rejects'] = req.session.data['count-gw-org-rejects'] + 1
			}
			req.session.data['gw-orginfo'] = "Complete"
		} else if (req.session.data['gw-org-parentcompany'] || 
			req.session.data['gw-org-ico'] || 
			req.session.data['gw-org-website'] || 
			req.session.data['gw-org-activelytrading'])
		{
			req.session.data['gw-orginfo'] = "In progress"
		}
		res.redirect('/staff-app/' + v + '/applications/gateway/application-tasklist')
	})*/

	// RoATP
	/*router.post('/staff-app/' + v + '/applications/gateway/checks/roatp', function (req, res) {
		if (req.session.data['gw-roatp']){
			res.redirect('/staff-app/' + v + '/applications/gateway/application-tasklist')
		}
	})*/

/********************************
 *** Company - Initial checks ***
 ********************************/

	// Legal

		// Legal API call
		router.post('/staff-app/' + v + '/applications/gateway/company/initial/legal', function (req, res) {
			req.session.data['company-legal-apidate'] = govDateTime();
			res.redirect('/staff-app/' + v + '/applications/gateway/company/initial/legal-data#applicant')
		})

		// Legal API re-check
		router.post('/staff-app/' + v + '/applications/gateway/company/initial/legal-recheck', function (req, res) {
			req.session.data['company-legal-apidate'] = govDateTime();
			res.redirect('/staff-app/' + v + '/applications/gateway/company/initial/legal-data')
		})

		// Legal checks
		router.post('/staff-app/' + v + '/applications/gateway/company/initial/legal-data', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})

	// Address

		// Address API call
		router.post('/staff-app/' + v + '/applications/gateway/company/initial/address', function (req, res) {
			req.session.data['company-address-apidate'] = govDateTime();
			res.redirect('/staff-app/' + v + '/applications/gateway/company/initial/address-data#applicant')
		})

		// Address API re-check
		router.post('/staff-app/' + v + '/applications/gateway/company/initial/address-recheck', function (req, res) {
			req.session.data['company-address-apidate'] = govDateTime();
			res.redirect('/staff-app/' + v + '/applications/gateway/company/initial/address-data')
		})

		// Address checks
		router.post('/staff-app/' + v + '/applications/gateway/company/initial/address-data', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	// Company Register
/*
		// Register checks
		router.post('/staff-app/' + v + '/applications/gateway/checks/company-register', function (req, res) {
			//if (req.session.data['gw-company-register']){
				res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
			//}
		})
*/

// Company & Charity Legal

	// Legal API call
	router.post('/staff-app/' + v + '/applications/gateway/checks/both-legal', function (req, res) {
		req.session.data['both-legal-apidate'] = govDateTime();
		res.redirect('/staff-app/' + v + '/applications/gateway/checks/both-legal-data')
	})

	// Legal API re-check
	router.post('/staff-app/' + v + '/applications/gateway/checks/both-legal-recheck', function (req, res) {
		req.session.data['both-legal-apidate'] = govDateTime();
		res.redirect('/staff-app/' + v + '/applications/gateway/checks/both-legal-data')
	})

	// Legal checks
	router.post('/staff-app/' + v + '/applications/gateway/checks/both-legal-data', function (req, res) {
		//if (req.session.data['gw-both-legal']){
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-both')
		//}
	})

// Company & Charity Address

	// Address API call
	router.post('/staff-app/' + v + '/applications/gateway/checks/both-address', function (req, res) {
		req.session.data['both-address-apidate'] = govDateTime();
		res.redirect('/staff-app/' + v + '/applications/gateway/checks/both-address-data#applicant')
	})

	// Address API re-check
	router.post('/staff-app/' + v + '/applications/gateway/checks/both-address-recheck', function (req, res) {
		req.session.data['both-address-apidate'] = govDateTime();
		res.redirect('/staff-app/' + v + '/applications/gateway/checks/both-address-data')
	})

	// Address checks
	router.post('/staff-app/' + v + '/applications/gateway/checks/both-address-data', function (req, res) {
		//if (req.session.data['gw-both-address']){
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-both')
		//}
	})


/********************************
 *** Charity - Initial checks ***
 ********************************/

	// Legal

		// Legal API call
		router.post('/staff-app/' + v + '/applications/gateway/charity/initial/legal', function (req, res) {
			req.session.data['charity-legal-apidate'] = govDateTime();
			res.redirect('/staff-app/' + v + '/applications/gateway/checks/charity-legal-data')
		})

		// Legal API re-check
		router.post('/staff-app/' + v + '/applications/gateway/charity/initial/legal-recheck', function (req, res) {
			req.session.data['charity-legal-apidate'] = govDateTime();
			res.redirect('/staff-app/' + v + '/applications/gateway/charity/initial/legal-data')
		})

		// Legal checks
		router.post('/staff-app/' + v + '/applications/gateway/charity/initial/legal-data', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-charity')
		})

	// Address

		// Address API call
		router.post('/staff-app/' + v + '/applications/gateway/charity/initial/address', function (req, res) {
			req.session.data['charity-address-apidate'] = govDateTime();
			res.redirect('/staff-app/' + v + '/applications/gateway/charity/initial/address-data#applicant')
		})

		// Address API re-check
		router.post('/staff-app/' + v + '/applications/gateway/charity/initial/address-recheck', function (req, res) {
			req.session.data['charity-address-apidate'] = govDateTime();
			res.redirect('/staff-app/' + v + '/applications/gateway/charity/initial/address-data')
		})

		// Address checks
		router.post('/staff-app/' + v + '/applications/gateway/charity/initial/address-data', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-charity')
		})


/*************************************
 *** Company - Organisation checks ***
 *************************************/

		// ICO
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/info', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})

	

}