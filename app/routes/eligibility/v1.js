// Routes for Eligibility Checker v1

module.exports = function (router) {

  //Will you be training in England or Wales?
  router.post('/eligibility/v1/england-wales-answer', function (req, res) {

    let mainsupporting = req.session.data['england-wales']

    if (mainsupporting === 'no') {
      res.redirect('/eligibility/v1/not-eligible-england-wales')
    } else {
      res.redirect('/eligibility/v1/experience')
    }
  })

  //Person with X months experience...
  router.post('/eligibility/v1/experience-answer', function (req, res) {

    let experience = req.session.data['experience']

    if (experience === 'no') {
      res.redirect('/eligibility/v1/not-eligible-experience')
    } else {
      if (req.session.data['main-supporting'] == "mainemployer"){
        res.redirect('/eligibility/v1/train-within')
      } else {
        res.redirect('/eligibility/v1/financial-evidence')
      }
    }
  })

  // Will your organisation begin training apprentices within the first 12 months of becoming an apprenticeship training providers?
  router.post('/eligibility/v1/train-within-answer', function (req, res) {

    let mainsupporting = req.session.data['train-within']

    if (mainsupporting === 'no') {
      res.redirect('/eligibility/v1/not-eligible-train-within')
    } else {
      res.redirect('/eligibility/v1/financial-evidence')
    }
  })

  // Do you have financial evidence to show that your organisation has been trading for 12 months?
  router.post('/eligibility/v1/financial-evidence-answer', function (req, res) {

    let evidence = req.session.data['financial-evidence']

    if (evidence === 'no') {
      res.redirect('/eligibility/v1/not-eligible-financial-evidence')
    } else {
      res.redirect('/eligibility/v1/ukprn')
    }
  })

  // Does your organisation have a UK provider reference number (UKPRN)?
  router.post('/eligibility/v1/ukprn-answer', function (req, res) {

    let ukprn = req.session.data['ukprn']

    if (ukprn === 'no') {
      res.redirect('/eligibility/v1/not-eligible-ukprn')
    } else {
      res.redirect('/eligibility/v1/ico')
    }
  })

  // Does your organisation have an Information Commissioner's Office (ICO) registration number?
  router.post('/eligibility/v1/ico-answer', function (req, res) {

    let ico = req.session.data['ico']

    if (ico === 'no') {
      res.redirect('/eligibility/v1/not-eligible-ico')
    } else {
      res.redirect('/eligibility/v1/ukaddress')
    }
  })

  // Does your organisation have an Information Commissioner's Office (ICO) registration number?
  router.post('/eligibility/v1/ukaddress-answer', function (req, res) {

    let ukaddress = req.session.data['ukaddress']

    if (ukaddress === 'no') {
      res.redirect('/eligibility/v1/not-eligible-ukaddress')
    } else {
      res.redirect('/eligibility/v1/ofsted')
    }
  })

  // Has your organisation had an Ofsted inspection?
  router.post('/eligibility/v1/ofsted-answer', function (req, res) {

    let ofsted = req.session.data['ofsted']

    if (ofsted === 'no') {
      res.redirect('/eligibility/v1/eligible')
    } else {
      res.redirect('/eligibility/v1/ofsted-grade')
    }
  })

  // Did your organisation achieve an Ofsted rating of 'Requires improvement' or better?
  router.post('/eligibility/v1/ofsted-grade-answer', function (req, res) {

    let ofstedgrade = req.session.data['ofsted-grade']

    if (ofstedgrade === 'inadequate') {
      res.redirect('/eligibility/v1/not-eligible-ofsted-grade')
    } else {
      res.redirect('/eligibility/v1/eligible')
    }
  })
	
}