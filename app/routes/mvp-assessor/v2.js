// Routes for MVP - Assessor v2

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
	 * Assessor - PYA *
	 ******************/

		router.post('/mvp-assessor/' + v + '/applications/safran/questions-pya-continuity', function (req, res) {
			res.redirect('/mvp-assessor/' + v + '/applications/tasklist-safran-pya')
		})

		router.post('/mvp-assessor/' + v + '/applications/safran/questions-pya-equality', function (req, res) {
			res.redirect('/mvp-assessor/' + v + '/applications/tasklist-safran-pya')
		})

		router.post('/mvp-assessor/' + v + '/applications/safran/questions-pya-safeguarding', function (req, res) {
			res.redirect('/mvp-assessor/' + v + '/applications/tasklist-safran-pya')
		})

		router.post('/mvp-assessor/' + v + '/applications/safran/questions-pya-healthandsafety', function (req, res) {
			res.redirect('/mvp-assessor/' + v + '/applications/tasklist-safran-pya')
		})

		/*****************************
		 * Assessor - PYA - Feedback *
		 *****************************/

		 function saveFeedback(req,seq,sec,q){
			// add feedback to an array to store feedback, username, and timestamp
			var today = new Date();
			var d = today.getDate();
			var m = months[(today.getMonth()-1)]
			var y = today.getFullYear();
			var hh = today.getHours();
			var mm = today.getMinutes();
			if (mm < 10) mm = '0'+mm;
			var ampm = hh >= 12 ? 'pm' : 'am'
			var newFeedback = {
				'user': 'J Smith',
				'dateadded': d+' '+m+' '+y+' at '+hh+':'+mm+ampm,
				'feedback': req.session.data['aac-' + seq + '-' + sec + '-' + q + '-feedback']
			}
			if (!req.session.data['feedback-'+seq+'-'+sec+'-'+q]) {
				req.session.data['feedback-'+seq+'-'+sec+'-'+q] = []
			}
			req.session.data['feedback-'+seq+'-'+sec+'-'+q].push(newFeedback)
		 }

			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/pya-continuity', function (req, res) {
				saveFeedback(req,'pya','continuity','policy');
				res.redirect('/mvp-assessor/' + v + '/applications/safran/questions-pya-continuity')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/pya-equality', function (req, res) {
				saveFeedback(req,'pya','equality','policy');
				res.redirect('/mvp-assessor/' + v + '/applications/safran/questions-pya-equality')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/pya-safeguarding-policy', function (req, res) {
				saveFeedback(req,'pya','safeguarding','policy');
				res.redirect('/mvp-assessor/' + v + '/applications/safran/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/pya-safeguarding-responsible', function (req, res) {
				saveFeedback(req,'pya','safeguarding','responsible');
				res.redirect('/mvp-assessor/' + v + '/applications/safran/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/pya-safeguarding-preventduty', function (req, res) {
				saveFeedback(req,'pya','safeguarding','preventduty');
				res.redirect('/mvp-assessor/' + v + '/applications/safran/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/pya-healthandsafety-policy', function (req, res) {
				saveFeedback(req,'pya','healthandsafety','policy');
				res.redirect('/mvp-assessor/' + v + '/applications/safran/questions-pya-healthandsafety')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/pya-healthandsafety-responsible', function (req, res) {
				saveFeedback(req,'pya','healthandsafety','responsible');
				res.redirect('/mvp-assessor/' + v + '/applications/safran/questions-pya-healthandsafety')
			})
/*
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/pya-safeguarding', function (req, res) {
				saveFeedback(req,'pya','safeguarding');
				res.redirect('/mvp-assessor/' + v + '/applications/safran/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/pya-healthandsafety', function (req, res) {
				saveFeedback(req,'pya','healthandsafety');
				res.redirect('/mvp-assessor/' + v + '/applications/safran/questions-pya-healthandsafety')
			})
*/

		// DELETE FEEDBACK
		
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/delete-pya-continuity-policy', function (req, res) {
				req.session.data['feedback']['pya-continuity-policy'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/safran/feedback/pya-continuity')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/delete-pya-equality-policy', function (req, res) {
				req.session.data['feedback']['pya-equality-policy'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/safran/feedback/pya-equality')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/delete-pya-safeguarding-policy', function (req, res) {
				req.session.data['feedback']['pya-safeguarding-policy'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/safran/feedback/pya-safeguarding-policy')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/delete-pya-safeguarding-responsible', function (req, res) {
				req.session.data['feedback']['pya-safeguarding-responsible'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/safran/feedback/pya-safeguarding-responsible')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/delete-pya-safeguarding-preventduty', function (req, res) {
				req.session.data['feedback']['pya-safeguarding-preventduty'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/safran/feedback/pya-safeguarding-preventduty')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/delete-pya-healthandsafety-policy', function (req, res) {
				req.session.data['feedback']['pya-healthandsafety-policy'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/safran/feedback/pya-healthandsafety-policy')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/delete-pya-healthandsafety-responsible', function (req, res) {
				req.session.data['feedback']['pya-healthandsafety-responsible'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/safran/feedback/pya-healthandsafety-responsible')
			})
		/*
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/delete-pya-safeguarding', function (req, res) {
				req.session.data['aac-pya-safeguarding-feedback-record'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/safran/feedback/pya-safeguarding')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/safran/feedback/delete-pya-healthandsafety', function (req, res) {
				req.session.data['aac-pya-healthandsafety-feedback-record'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/safran/feedback/pya-healthandsafety')
			})
*/

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