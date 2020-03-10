// Routes for MVP - Oversight v1

var v = 'v1';

module.exports = function (router) {

	router.post('/mvp-oversight/' + v + '/decision', function (req, res) {
		res.redirect('/mvp-oversight/' + v + '/submitted')
	})

}