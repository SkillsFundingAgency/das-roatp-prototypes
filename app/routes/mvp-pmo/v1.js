// Routes for MVP - Assessor v1

var v = 'v1';

var months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May',
	'Jun', 'Jul', 'Aug', 'Sep',
	'Oct', 'Nov', 'Dec'
	];

function monthNumToName(monthnum) {
	return months[monthnum - 1] || '';
}

module.exports = function (router) {

	/****************
	 * PMO Assessor *
	 ****************/

		router.get('/mvp-pmo/' + v + '/roatp/abc-setinprogress', function (req, res) {
			req.session.data['pmo-abc-status'] = 'inprogress'
			res.redirect('/mvp-pmo/' + v + '/roatp/abc-evaluation')
		})

		router.post('/mvp-pmo/' + v + '/roatp/abc-evaluation', function (req, res) {
			res.redirect('/mvp-pmo/' + v + '/roatp/abc-submitted')
		})

		
	/************************
	 * Sign in and register *
	 ************************/

		// Sign in
		router.post('/mvp-pmo/' + v + '/sign-in', function (req, res) {
			res.redirect('/mvp-pmo/' + v + '/dashboard')
		})



}