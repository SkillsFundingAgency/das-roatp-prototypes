// Routes for Staff App v2

module.exports = function (router) {

	// Sign in
	router.post('/staff-app/v2/register', function (req, res) {
		res.render("staff-app/v2/register", {showMessage: true});
	})

}