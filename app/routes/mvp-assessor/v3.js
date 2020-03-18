// Routes for MVP - Assessor v3

var v = 'v3';

var months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May',
	'Jun', 'Jul', 'Aug', 'Sep',
	'Oct', 'Nov', 'Dec'
	];

function monthNumToName(monthnum) {
	return months[monthnum - 1] || '';
}

module.exports = function (router) {

	/**************
	 * Jump links *
	 **************/

		router.get('/mvp-assessor/' + v + '/jump-assessed-nofeedback', function (req, res) {
			req.session.data['feedback-count'] = 0
			req.session.data['aac-pya-continuity-complete'] = "Yes"
			req.session.data['aac-pya-equality-complete'] = "Yes"
			req.session.data['aac-pya-safeguarding-complete'] = "Yes"
			req.session.data['aac-pya-healthandsafety-complete'] = "Yes"
			res.redirect('/mvp-assessor/' + v + '/applications/applications-assessor')
		})

		router.get('/mvp-assessor/' + v + '/jump-assessed-withfeedback', function (req, res) {
			req.session.data['feedback-count'] = 2
			req.session.data['aac-pya-continuity-complete'] = "Yes"
			req.session.data['aac-pya-equality-complete'] = "Yes"
			req.session.data['aac-pya-safeguarding-complete'] = "Yes"
			req.session.data['aac-pya-healthandsafety-complete'] = "Yes"

			req.session.data['aac-pya-continuity-policy-feedback'] = "Information missing regarding back-up and restore data in the continuity plan document."
			req.session.data['aac-pya-safeguarding-policy-feedback'] = "Safeguarding policy is missing how the organisation will monitor its IT usage."

			saveFeedback(req,'pya','continuity','policy');
			saveFeedback(req,'pya','safeguarding','policy');
			req.session.data['feedback-count'] = 2

			res.redirect('/mvp-assessor/' + v + '/applications/applications-assessor')
		})

	/******************
	 * Assessor - PYA *
	 ******************/

		router.post('/mvp-assessor/' + v + '/applications/abc/questions-pya-continuity', function (req, res) {
			res.redirect('/mvp-assessor/' + v + '/applications/tasklist-abc-pya')
		})

		router.post('/mvp-assessor/' + v + '/applications/abc/questions-pya-equality', function (req, res) {
			res.redirect('/mvp-assessor/' + v + '/applications/tasklist-abc-pya')
		})

		router.post('/mvp-assessor/' + v + '/applications/abc/questions-pya-safeguarding', function (req, res) {
			res.redirect('/mvp-assessor/' + v + '/applications/tasklist-abc-pya')
		})

		router.post('/mvp-assessor/' + v + '/applications/abc/questions-pya-healthandsafety', function (req, res) {
			res.redirect('/mvp-assessor/' + v + '/applications/tasklist-abc-pya')
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

			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-continuity', function (req, res) {
				saveFeedback(req,'pya','continuity','policy');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-continuity')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-equality', function (req, res) {
				saveFeedback(req,'pya','equality','policy');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-equality')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-policy', function (req, res) {
				saveFeedback(req,'pya','safeguarding','policy');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-responsible', function (req, res) {
				saveFeedback(req,'pya','safeguarding','responsible');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-preventdutyincluded', function (req, res) {
				saveFeedback(req,'pya','safeguarding','preventdutyincluded');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-preventdutyupload', function (req, res) {
				saveFeedback(req,'pya','safeguarding','preventdutyupload');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-healthandsafety-policy', function (req, res) {
				saveFeedback(req,'pya','healthandsafety','policy');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-healthandsafety')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-healthandsafety-responsible', function (req, res) {
				saveFeedback(req,'pya','healthandsafety','responsible');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-healthandsafety')
			})
/*
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding', function (req, res) {
				saveFeedback(req,'pya','safeguarding');
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-healthandsafety', function (req, res) {
				saveFeedback(req,'pya','healthandsafety');
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-healthandsafety')
			})
*/

		// DELETE FEEDBACK
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-continuity-policy', function (req, res) {
				req.session.data['feedback-pya-continuity-policy'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-continuity')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-equality-policy', function (req, res) {
				req.session.data['feedback-pya-equality-policy'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-equality')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-safeguarding-policy', function (req, res) {
				req.session.data['feedback-pya-safeguarding-policy'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-policy')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-safeguarding-responsible', function (req, res) {
				req.session.data['feedback-pya-safeguarding-responsible'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-responsible')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-safeguarding-preventduty', function (req, res) {
				req.session.data['feedback-pya-safeguarding-preventduty'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-preventduty')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-healthandsafety-policy', function (req, res) {
				req.session.data['feedback-pya-healthandsafety-policy'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-healthandsafety-policy')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-healthandsafety-responsible', function (req, res) {
				req.session.data['feedback-pya-healthandsafety-responsible'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-healthandsafety-responsible')
			})
		/*
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-safeguarding', function (req, res) {
				req.session.data['aac-pya-safeguarding-feedback-record'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-healthandsafety', function (req, res) {
				req.session.data['aac-pya-healthandsafety-feedback-record'].splice(req.session.data['feedbackid'],1)
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-healthandsafety')
			})
*/

	/*******************
	 * Confirm outcome *
	 *******************/
		
			router.post('/mvp-assessor/' + v + '/applications/tasklist-abc', function (req, res) {
				//req.session.data['assessor-abc-outcome'] = "done"
				res.redirect('/mvp-assessor/' + v + '/applications/outcome-confirm')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/outcome-confirm', function (req, res) {
				//req.session.data['assessor-abc-outcome'] = "done"
				res.redirect('/mvp-assessor/' + v + '/applications/outcome-confirm-confirm')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/outcome-confirm-confirm', function (req, res) {
				//req.session.data['assessor-abc-outcome'] = "done"
				res.redirect('/mvp-assessor/' + v + '/applications/outcome-abc')
			})

			

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