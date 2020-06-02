// Routes for MVP - Assessor v1

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

	/**********************
	 * PMO Assessor - ABC *
	 **********************/

		router.get('/mvp-pmo/' + v + '/roatp/abc-setinprogress', function (req, res) {
			req.session.data['pmo-abc-status'] = 'inprogress'
			res.redirect('/mvp-pmo/' + v + '/roatp/abc-evaluation')
		})

		router.post('/mvp-pmo/' + v + '/roatp/abc-evaluation', function (req, res) {
			res.redirect('/mvp-pmo/' + v + '/roatp/abc-submitted')
		})


	/**********************
	 * PMO Assessor - XYZ *
	 **********************/

	router.get('/mvp-pmo/' + v + '/roatp/xyz-setinprogress', function (req, res) {
		req.session.data['pmo-xyz-status'] = 'inprogress'
		res.redirect('/mvp-pmo/' + v + '/roatp/xyz-evaluation')
	})

	router.post('/mvp-pmo/' + v + '/roatp/xyz-evaluation', function (req, res) {
		res.redirect('/mvp-pmo/' + v + '/roatp/xyz-submitted')
	})

		
	/************************
	 * Sign in and register *
	 ************************/

		// Sign in
		router.post('/mvp-pmo/' + v + '/sign-in', function (req, res) {
			res.redirect('/mvp-pmo/' + v + '/dashboard')
		})

  // Upload in clarification
  router.get('/mvp-pmo/' + v + '/roatp/abc-upload-file', function (req, res) {
    if (req.session.data['pmoUpload'] === undefined) {
      req.session.data['pmoUpload'] = 0
    }
    req.session.data['pmoUpload'] = req.session.data['pmoUpload'] + 1
    req.session.data['pmoFilename'] = 'file.pdf'
    res.redirect('/mvp-pmo/' + v + '/roatp/abc-evaluation')
  })

  router.get('/mvp-pmo/' + v + '/roatp/abc-upload-file-remove', function (req, res) {
    req.session.data['pmoUpload'] = req.session.data['pmoUpload'] - 1
    res.redirect('/mvp-pmo/' + v + '/roatp/abc-evaluation')
  })


}