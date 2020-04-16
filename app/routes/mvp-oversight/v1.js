// Routes for MVP - Oversight v1

var v = 'v1';

module.exports = function (router) {

  router.post('/mvp-oversight/' + v + '/decision', function (req, res) {
	  res.redirect('/mvp-oversight/' + v + '/decision-confirmation')
	})

  router.post('/mvp-oversight/' + v + '/decision-confirmation', function (req, res) {
    if (req.session.data['oversight-abc-confirm'] === 'Yes') {
      res.redirect('/mvp-oversight/' + v + '/submitted')
    }
    if (req.session.data['oversight-abc-confirm'] === 'No') {
      res.redirect('/mvp-oversight/' + v + '/decision')
    }
  })

}