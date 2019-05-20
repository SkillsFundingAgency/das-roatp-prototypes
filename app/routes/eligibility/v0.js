// Routes for Eligibility Checker v0

module.exports = function (router) {


    // Does your organisation have a UK provider reference number (UKPRN)?
    router.post('/eligibility/v0/ukprn-answer', function (req, res) {
      // Get the answer from session data
      // The name between the quotes is the same as the 'name' attribute on the input elements
      // However in JavaScript we can't use hyphens in variable names
  
      let ukprn = req.session.data['ukprn']
  
      if (ukprn === 'no') {
        res.redirect('/eligibility/v0/not-eligible-ukprn')
      } else {
        res.redirect('/eligibility/v0/ico')
      }
    })
  
    // Does your organisation have an Information Commissioner's Office (ICO) registration number?
    router.post('/eligibility/v0/ico-answer', function (req, res) {
  
      let ico = req.session.data['ico']
  
      if (ico === 'no') {
        res.redirect('/eligibility/v0/not-eligible-ico')
      } else {
        res.redirect('/eligibility/v0/ukaddress')
      }
    })
  
    // Does your organisation have an Information Commissioner's Office (ICO) registration number?
    router.post('/eligibility/v0/ukaddress-answer', function (req, res) {
  
      let ukaddress = req.session.data['ukaddress']
  
      if (ukaddress === 'no') {
        res.redirect('/eligibility/v0/not-eligible-ukaddress')
      } else {
        res.redirect('/eligibility/v0/financial-evidence')
      }
    })
  
    // Do you have financial evidence to show that your organisation has been trading for 12 months?
    router.post('/eligibility/v0/financial-evidence-answer', function (req, res) {
  
      let evidence = req.session.data['financial-evidence']
  
      if (evidence === 'no') {
        res.redirect('/eligibility/v0/not-eligible-financial-evidence')
      } else {
        res.redirect('/eligibility/v0/ofsted')
      }
    })
  
    // Has your organisation had an Ofsted inspection?
    router.post('/eligibility/v0/ofsted-answer', function (req, res) {
  
      let ofsted = req.session.data['ofsted']
  
      if (ofsted === 'no') {
        res.redirect('/eligibility/v0/eligible')
      } else {
        res.redirect('/eligibility/v0/ofsted-grade')
      }
    })
  
    // Did your organisation achieve an Ofsted rating of 'Requires improvement' or better?
    router.post('/eligibility/v0/ofsted-grade-answer', function (req, res) {
  
      let ofstedgrade = req.session.data['ofsted-grade']
  
      if (ofstedgrade === 'no') {
        res.redirect('/eligibility/v0/not-eligible-ofsted-grade')
      } else {
        res.redirect('/eligibility/v0/train-within')
      }
    })
  
      
  }