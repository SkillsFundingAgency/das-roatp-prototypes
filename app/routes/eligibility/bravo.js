// Routes for Eligibility Checker for Bravo

module.exports = function (router) {

  // Has your organisation had an Ofsted inspection?
  router.post('/eligibility/bravo/ofsted-answer', function (req, res) {

    let ofsted = req.session.data['ofsted']

    if (ofsted === 'no') {
      res.redirect('/eligibility/bravo/eligible')
    } else {
      res.redirect('/eligibility/bravo/ofsted-grade')
    }
	})

  // Has your organisation been actively trading for at least 12 months?
  router.post('/eligibility/bravo/actively-trading-answer', function (req, res) {

    let activelytraining = req.session.data['actively-trading']

    if (activelytraining === 'no') {
      res.redirect('/eligibility/bravo/train-within')
    } else {
      res.redirect('/eligibility/bravo/financial-evidence')
    }
	})
	
}