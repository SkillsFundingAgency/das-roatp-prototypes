// Routes for MVP - Gateway v4

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

	/*********************************
	 * Setup in progress application *
	 *********************************/

		router.get('/mvp-gateway/' + v + '-setup', function (req, res) {
			req.session.data['gw-abctraining-organisation-legalname'] = "Pass"
			req.session.data['gw-abctraining-organisation-status'] = "Fail"
			req.session.data['gw-abctraining-organisation-status-fail'] = "Company has status of Dissolved on Companies House"
			req.session.data['gw-abctraining-organisation-address'] = "Pass"
			req.session.data['gw-abctraining-organisation-ico'] = "Pass"
			req.session.data['gw-abctraining-organisation-website'] = "Pass"
			req.session.data['gw-abctraining-organisation-highrisk'] = "Pass"
			req.session.data['gw-abctraining-people-people'] = "Pass"
			req.session.data['gw-abctraining-people-highrisk'] = "Pass"
			req.session.data['gw-abctraining-register-roatp'] = "Pass"
			req.session.data['gw-abctraining-register-epao'] = "Pass"
			req.session.data['gw-abctraining-experience-ofs'] = "Pass"
			req.session.data['gw-abctraining-experience-itt'] = "Pass"
			req.session.data['gw-abctraining-experience-ofsted'] = "Pass"
			req.session.data['gw-abctraining-criminalpeople-unspent'] = "Pass"
			req.session.data['gw-abctraining-criminalpeople-failed'] = "Pass"
			req.session.data['gw-abctraining-criminalpeople-fraud'] = "Pass"
			req.session.data['gw-abctraining-criminalpeople-ongoingfraud'] = "Pass"
			req.session.data['gw-abctraining-criminalpeople-contractterminated'] = "Pass"
			req.session.data['gw-abctraining-criminalpeople-withdrawncontract'] = "Pass"
			req.session.data['gw-abctraining-criminalpeople-breached'] = "Pass"
			req.session.data['gw-abctraining-criminalpeople-removedtrustees'] = "Pass"
			req.session.data['gw-abctraining-criminalpeople-bankrupt'] = "Fail"
			req.session.data['gw-abctraining-criminalorg-composition'] = "Pass"
			req.session.data['gw-abctraining-criminalorg-failed'] = "Fail"
			req.session.data['gw-abctraining-criminalorg-contractterminated'] = "Pass"
			req.session.data['gw-abctraining-criminalorg-withdrawncontract'] = "Fail"
			req.session.data['gw-abctraining-criminalorg-roto'] = "Pass"
			req.session.data['gw-abctraining-criminalorg-fundingremoved'] = "Pass"
			req.session.data['gw-abctraining-criminalorg-removedregisters'] = "Pass"
			req.session.data['gw-abctraining-criminalorg-itt'] = "Pass"
			req.session.data['gw-abctraining-criminalorg-removedcharity'] = "Pass"
			req.session.data['gw-abctraining-criminalorg-safeguarding'] = "Pass"
			req.session.data['gw-abctraining-criminalorg-whistleblowing'] = "Pass"
			req.session.data['gw-abctraining-criminalorg-insolvency'] = "Pass"
			req.session.data['gw-abctraining-experience-ofs'] = "Pass"
			req.session.data['gw-abctraining-experience-itt'] = "Pass"
			req.session.data['gw-abctraining-experience-ofsted'] = "Pass"
			req.session.data['gw-abctraining-organisation-legalname'] = "Pass"
			req.session.data['gw-abctraining-organisation-status'] = "Pass"
			req.session.data['gw-abctraining-organisation-address'] = "Pass"
			req.session.data['gw-abctraining-organisation-ico'] = "Pass"
			req.session.data['gw-abctraining-organisation-website'] = "Pass"
			req.session.data['gw-abctraining-organisation-highrisk'] = "Pass"
			req.session.data['gw-abctraining-people-people'] = "Pass"
			req.session.data['gw-abctraining-people-highrisk'] = "Pass"
			req.session.data['gw-abctraining-register-roatp'] = "Pass"
			req.session.data['gw-abctraining-register-epao'] = "Pass"
			req.session.data['gw-abctraining-criminalorg-failed-fail'] = "Evidence that organisation failed to repay funds."
			req.session.data['gw-abctraining-criminalorg-withdrawncontract-fail'] = "Evidence that organisation withdrew from a public body contract early."
			req.session.data['gw-abctraining-criminalpeople-bankrupt-fail'] = "Evidence of bankruptcy found."
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

	/**********************************
	 * Move applications through tabs *
	 **********************************/
	
		router.get('/mvp-gateway/' + v + '/applications/gateway/assign-abctraining', function (req,res) {
			req.session.data['gw-abctraining'] = "assigned"
			req.session.data['mvp-gwv5-new-count'] = req.session.data['mvp-gwv5-new-count'] - 1
			req.session.data['mvp-gwv5-inprogress-count'] = req.session.data['mvp-gwv5-inprogress-count'] + 1
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})


	/***********************
	 * Organisation checks *
	 ***********************/

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/legalname', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/status', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/address', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/ico', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/website', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/highrisk', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})


		/****************************
		 * People in control checks *
		 ****************************/

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/people/people', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/people/highrisk', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})


		/*******************
		 * Register checks *
		 *******************/

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/register/roatp', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/register/epao', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})


		/***************************************
		 * Experience and accreditation checks *
		 ***************************************/

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/experience/ofs', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/experience/itt', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/experience/ofsted', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/experience/subcontractor', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})


	/*************************************************
	 * Organisation's criminal and compliance checks *
	 *************************************************/

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/composition', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/failed', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/contractterminated', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/withdrawncontract', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/roto', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/fundingremoved', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/removedregisters', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/itt', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/removedcharity', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/safeguarding', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/whistleblowing', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-org/insolvency', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})


	/******************************************************
	 * People in control's criminal and compliance checks *
	 ******************************************************/

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-people/unspent', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-people/failed', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-people/fraud', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-people/ongoingfraud', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-people/contractterminated', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-people/withdrawncontract', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-people/breached', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-people/removedtrustees', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal-people/bankrupt', function (req, res) {
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})


	/*******************
	 * Gateway outcome *
	 *******************/

		router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/outcome', function (req, res) {
			req.session.data['gw-abctraining'] = "outcome"
			req.session.data['mvp-gwv5-inprogress-count'] = req.session.data['mvp-gwv5-inprogress-count'] - 1
			if (req.session.data['gw-abctraining-outcome'] == "Ask for clarification") {
				req.session.data['mvp-gwv5-clarify-count'] = req.session.data['mvp-gwv5-clarify-count'] + 1
				//res.redirect('/mvp-gateway/' + v + '/applications/applications-gateway#clarifications')
			} else {
				req.session.data['mvp-gwv5-outcome-count'] = req.session.data['mvp-gwv5-outcome-count'] + 1
				//res.redirect('/mvp-gateway/' + v + '/applications/applications-gateway#outcome')
			}
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/confirmation')
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