// Routes for MVP - Gateway v4

var v = 'v4';

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
			req.session.data['gw-xyztraining-legal-legalname'] = "Yes"
			req.session.data['gw-xyztraining-legal-legalstatus'] = "No"
			req.session.data['gw-xyztraining-legal-legaladdress'] = "Yes"
			req.session.data['gw-xyztraining-legal-legaloutcome'] = "In progress"
			req.session.data['gw-xyztraining-legal-legaloutcome-inprogress'] = "Checking on discrepancy in difference of address"
			req.session.data['gw-xyztraining-legal-legaloutcome-reject'] = "Discrepancy in legal addresses"
			req.session.data['gw-xyztraining-legal-highriskorg-outcome'] = "Pass"
			req.session.data['gw-xyztraining-legal-people-highrisk'] = "Yes"
			req.session.data['gw-xyztraining-legal-people'] = "Yes"
			req.session.data['gw-xyztraining-legal-highriskpeople-outcome'] = "Pass"
			req.session.data['gw-xyztraining-register-roatp'] = "Pass"
			req.session.data['gw-xyztraining-register-epao'] = "Pass"
			req.session.data['gw-xyztraining-organisation-info-ico'] = "Yes"
			req.session.data['gw-xyztraining-organisation-info-website'] = "Yes"
			req.session.data['gw-xyztraining-organisation-info'] = "Pass"
			req.session.data['gw-xyztraining-organisation-experience-ofs'] = "Yes"
			req.session.data['gw-xyztraining-organisation-experience-itt'] = "Yes"
			req.session.data['gw-xyztraining-organisation-experience-ofsted'] = "Yes"
			req.session.data['gw-xyztraining-organisation-experience-subcontractor'] = "Yes"
			req.session.data['gw-xyztraining-organisation-experience'] = "Pass"
			req.session.data['gw-xyztraining-criminal-organisation-outcome'] = "Pass"
			req.session.data['gw-xyztraining-criminal-people-outcome'] = "Pass"
			res.redirect('/mvp-gateway/' + v + '/')
		})

	/**********************************
	 * Move applications through tabs *
	 **********************************/
	
		router.get('/mvp-gateway/' + v + '/applications/gateway/assign-abctraining', function (req,res) {
			req.session.data['gw-abctraining'] = "assigned"
			req.session.data['mvp-gw-new-count'] = req.session.data['mvp-gw-new-count'] - 1
			req.session.data['mvp-gw-inprogress-count'] = req.session.data['mvp-gw-inprogress-count'] + 1
			res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
		})


	/******************
	 * Legal Checks *
	 ******************/

		// ABC Training Limited

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/legal-name', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/legal-status')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/legal-status', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/legal-address')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/legal-address', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/legal-outcome')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/legal-outcome', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

		// XYZ Training Limited

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/legal-name', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/legal-status')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/legal-status', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/legal-address')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/legal-address', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/legal-outcome')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/legal-outcome', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
			})

	/********************
	 * High Risk Checks *
	 ********************/

		// ABC Training Limited

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/highrisk-organisation', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/highrisk-people-match', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/highrisk-people')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/highrisk-people', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/highrisk-people-outcome')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/legal/highrisk-people-outcome', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

		// XYZ Training Limited

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/highrisk-organisation', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/highrisk-people-match', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/highrisk-people')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/highrisk-people', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/highrisk-people-outcome')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/legal/highrisk-people-outcome', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
			})

	/*******************
	 * Register Checks *
	 *******************/

		// ABC Training Limited

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/register/roatp', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/register/roto', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/register/epao', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/register/rort', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

		// XYZ Training Limited

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/register/roatp', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/register/roto', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/register/epao', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
			})

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/register/rort', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
			})

	/***********************
	 * Organisation Checks *
	 ***********************/

		// ABC Training Limited

			// Organisation information

				router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/info-ico', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/info-website')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/info-website', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/info-outcome')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/info-outcome', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
				})

			// Experience and accreditation

				router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/experience-ofs', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/experience-itt')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/experience-itt', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/experience-ofsted')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/experience-ofsted', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/experience-subcontractor')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/experience-subcontractor', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/experience-outcome')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/organisation/experience-outcome', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
				})

		// XYZ Training Limited

			// Organisation information

				router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/info-ico', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/info-website')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/info-website', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/info-outcome')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/info-outcome', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
				})

			// Experience and accreditation

				router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/experience-ofs', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/experience-itt')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/experience-itt', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/experience-ofsted')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/experience-ofsted', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/experience-subcontractor')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/experience-subcontractor', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/experience-outcome')
				})

				router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/organisation/experience-outcome', function (req, res) {
					res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
				})


	/**********************************
	 * Criminal and compliance Checks *
	 **********************************/

		// ABC Training Limited

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal/organisation', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})
			
			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/criminal/peopleincontrol', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-abctraining')
			})

		// XYZ Training Limited

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/criminal/organisation', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
			})
			
			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/criminal/peopleincontrol', function (req, res) {
				res.redirect('/mvp-gateway/' + v + '/applications/gateway/tasklist-xyztraining')
			})

	/*******************
	 * Gateway outcome *
	 *******************/

		// ABC Training Limited

			router.post('/mvp-gateway/' + v + '/applications/gateway/abctraining/outcome', function (req, res) {
				req.session.data['gw-abctraining'] = "outcome"
				req.session.data['mvp-gw-inprogress-count'] = req.session.data['mvp-gw-inprogress-count'] - 1
				if (req.session.data['gw-abctraining-gatewayoutcome'] == "passed") {
					req.session.data['mvp-gw-outcome-count'] = req.session.data['mvp-gw-outcome-count'] + 1
					res.redirect('/mvp-gateway/' + v + '/applications/applications-gateway#outcome')
				} else if (req.session.data['gw-abctraining-gatewayoutcome'] == "clarify") {
					req.session.data['mvp-gw-clarify-count'] = req.session.data['mvp-gw-clarify-count'] + 1
					res.redirect('/mvp-gateway/' + v + '/applications/applications-gateway#clarifications')
				}
			})

		// XYZ Training Limited

			router.post('/mvp-gateway/' + v + '/applications/gateway/xyztraining/outcome', function (req, res) {
				req.session.data['gw-xyztraining'] = "outcome"
				req.session.data['mvp-gw-inprogress-count'] = req.session.data['mvp-gw-inprogress-count'] - 1
				if (req.session.data['gw-xyztraining-gatewayoutcome'] == "passed") {
					req.session.data['mvp-gw-outcome-count'] = req.session.data['mvp-gw-outcome-count'] + 1
					res.redirect('/mvp-gateway/' + v + '/applications/applications-gateway#outcome')
				} else if (req.session.data['gw-xyztraining-gatewayoutcome'] == "clarify") {
					req.session.data['mvp-gw-clarify-count'] = req.session.data['mvp-gw-clarify-count'] + 1
					res.redirect('/mvp-gateway/' + v + '/applications/applications-gateway#clarifications')
				}
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