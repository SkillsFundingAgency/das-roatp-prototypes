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
			req.session.data['aac-abc-pya-continuity-complete'] = "Yes"
			req.session.data['aac-abc-pya-equality-complete'] = "Yes"
			req.session.data['aac-abc-pya-safeguarding-complete'] = "Yes"
			req.session.data['aac-abc-pya-healthandsafety-complete'] = "Yes"
			res.redirect('/mvp-assessor/' + v + '/applications/applications-assessor')
		})

		router.get('/mvp-assessor/' + v + '/jump-assessed-withfeedback', function (req, res) {
			req.session.data['feedback-count'] = 2
			req.session.data['aac-abc-pya-continuity-complete'] = "Yes"
			req.session.data['aac-abc-pya-equality-complete'] = "Yes"
			req.session.data['aac-abc-pya-safeguarding-complete'] = "Yes"
			req.session.data['aac-abc-pya-healthandsafety-complete'] = "Yes"

			req.session.data['aac-abc-pya-continuity-policy-feedback'] = "Information missing regarding back-up and restore data in the continuity plan document."
			req.session.data['aac-abc-pya-safeguarding-policy-feedback'] = "Safeguarding policy is missing how the organisation will monitor its IT usage."

			saveFeedback(req,'pya','continuity','policy','abc');
			saveFeedback(req,'pya','safeguarding','policy','abc');
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

			function saveFeedback(req,seq,sec,q,org){
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
					'feedback': req.session.data['aac-'+org+'-'+seq+'-' + sec + '-' + q + '-feedback']
				}
				if (!req.session.data['feedback-'+org+'-'+seq+'-'+sec+'-'+q]) {
					req.session.data['feedback-'+org+'-'+seq+'-'+sec+'-'+q] = []
				}
				req.session.data['feedback-'+org+'-'+seq+'-'+sec+'-'+q].push(newFeedback)
			}

			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-continuity', function (req, res) {
				saveFeedback(req,'pya','continuity','policy','abc');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-continuity')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-equality', function (req, res) {
				saveFeedback(req,'pya','equality','policy','abc');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-equality')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-policy', function (req, res) {
				saveFeedback(req,'pya','safeguarding','policy','abc');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-responsible', function (req, res) {
				saveFeedback(req,'pya','safeguarding','responsible','abc');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-preventdutyincluded', function (req, res) {
				saveFeedback(req,'pya','safeguarding','preventdutyincluded','abc');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-preventdutyupload', function (req, res) {
				saveFeedback(req,'pya','safeguarding','preventdutyupload','abc');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-safeguarding')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-healthandsafety-policy', function (req, res) {
				saveFeedback(req,'pya','healthandsafety','policy','abc');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-healthandsafety')
			})
	
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/pya-healthandsafety-responsible', function (req, res) {
				saveFeedback(req,'pya','healthandsafety','responsible','abc');
				req.session.data['feedback-count'] = req.session.data['feedback-count'] + 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/questions-pya-healthandsafety')
			})

		// DELETE FEEDBACK
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-continuity-policy', function (req, res) {
				req.session.data['feedback-abc-pya-continuity-policy'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-continuity')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-equality-policy', function (req, res) {
				req.session.data['feedback-abc-pya-equality-policy'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-equality')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-safeguarding-policy', function (req, res) {
				req.session.data['feedback-abc-pya-safeguarding-policy'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-policy')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-safeguarding-responsible', function (req, res) {
				req.session.data['feedback-abc-pya-safeguarding-responsible'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-responsible')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-safeguarding-preventduty', function (req, res) {
				req.session.data['feedback-abc-pya-safeguarding-preventduty'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-safeguarding-preventduty')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-healthandsafety-policy', function (req, res) {
				req.session.data['feedback-abc-pya-healthandsafety-policy'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-healthandsafety-policy')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/abc/feedback/delete-pya-healthandsafety-responsible', function (req, res) {
				req.session.data['feedback-abc-pya-healthandsafety-responsible'].splice(req.session.data['feedbackid'],1)
				req.session.data['feedback-count'] = req.session.data['feedback-count'] - 1
				res.redirect('/mvp-assessor/' + v + '/applications/abc/feedback/pya-healthandsafety-responsible')
			})

	/*******************
	 * Confirm outcome *
	 *******************/
		
			router.post('/mvp-assessor/' + v + '/applications/tasklist-abc', function (req, res) {
				//req.session.data['assessor-abc-outcome'] = "done"
				res.redirect('/mvp-assessor/' + v + '/applications/outcome-abc-confirm')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/outcome-abc-confirm', function (req, res) {
				//req.session.data['assessor-abc-outcome'] = "done"
				res.redirect('/mvp-assessor/' + v + '/applications/outcome-abc-confirm-confirm')
			})
		
			router.post('/mvp-assessor/' + v + '/applications/outcome-abc-confirm-confirm', function (req, res) {
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

}