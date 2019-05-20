// Routes for Eligibility Checker v1a

module.exports = function (router) {

  // Are you starting a new application?
  router.post('/eligibility/v1a/new-application-answer', function (req, res) {

    let ofsted = req.session.data['index']

    if (ofsted === 'no') {
      res.redirect('/eligibility/v1a/sign-in')
    } else {
      res.redirect('/eligibility/v1a/before-you-start')
    }
  })

  // Has your organisation had an Ofsted inspection?
  router.post('/eligibility/v1a/ofsted-answer', function (req, res) {

    let ofsted = req.session.data['ofsted']

    if (ofsted === 'no') {
      res.redirect('/eligibility/v1a/eligible')
    } else {
      res.redirect('/eligibility/v1a/ofsted-grade')
    }
	})
	
}