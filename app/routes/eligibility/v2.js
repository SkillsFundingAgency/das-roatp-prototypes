// Routes for Eligibility Checker v2

module.exports = function (router) {

  // Are you starting a new application?
  router.post('/eligibility/v2/new-application-answer', function (req, res) {

    let ofsted = req.session.data['index']

    if (ofsted === 'no') {
      res.redirect('/eligibility/v2/sign-in')
    } else {
      res.redirect('/eligibility/v2/before-you-start')
    }
  })

  // Has your organisation had an Ofsted inspection?
  router.post('/eligibility/v2/ofsted-answer', function (req, res) {

    let ofsted = req.session.data['ofsted']

    if (ofsted === 'no') {
      res.redirect('/eligibility/v2/eligible')
    } else {
      res.redirect('/eligibility/v2/ofsted-grade')
    }
	})

  // What Ofsted grade did your organisation get?
  router.post('/eligibility/v2/ofsted-grade-answer', function (req, res) {

    let ofstedgrade = req.session.data['ofsted-grade']

    if (ofstedgrade === 'inadequate') {
      res.redirect('/eligibility/v2/ofsted-inadequate')
    } else {
      res.redirect('/eligibility/v2/eligible')
    }
	})
	
}