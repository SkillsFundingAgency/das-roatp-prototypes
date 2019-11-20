// Routes for Staff App v8

var v = 'v8';

var months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May',
	'Jun', 'Jul', 'Aug', 'Sep',
	'Oct', 'Nov', 'Dec'
	];

function monthNumToName(monthnum) {
	return months[monthnum - 1] || '';
}

function govDateTime() {
	var d = new Date(),
			minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
			hours = d.getHours().toString().length == 1 ? d.getHours() : d.getHours(),
			ampm = d.getHours() >= 12 ? 'pm' : 'am',
			months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
			days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	return d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear()+' at '+hours+':'+minutes+ampm;
}

module.exports = function (router) {

	// Training Provider Added
	router.post('/staff-app/' + v + '/register', function (req, res) {
		if (req.session.data['action'] == "add") {
			res.render("staff-app/' + v + '/register", {showAdded: true});
		} else if (req.session.data['action'] == "upload") {
			res.render("staff-app/' + v + '/register", {showUploaded: true});
		}
	})

	// Register search
	router.post('/staff-app/' + v + '/register/search/register-a', function (req, res) {

		let searchterm = req.session.data['staff-search']
		
		if (searchterm == '1234567') {
			res.redirect('/staff-app/' + v + '/register/search/detail')
		} else {
			res.redirect('/staff-app/' + v + '/register/search/search-results')
		}

	})

	// UKPRN Routing
	router.post('/staff-app/' + v + '/register/add/add-ukprn-search', function (req, res){

		let staff_ukprn = req.session.data['staff-add-ukprn']

		if (staff_ukprn === '11110001') {

			req.session.data['staff-add-companynumber'] = "1893839"
			req.session.data['staff-add-orgname'] = "ACME Solutions"
			req.session.data['staff-add-ukprn'] = "11110001"
			req.session.data['staff-add-tradingname'] = ""
			req.session.data['staff-add-charitynumber'] = ""
			req.session.data['staff-add-hascharitynumber'] = "no"
			req.session.data['staff-add-hascompanynumber'] = "yes"
			req.session.data['staff-add-hastradingname'] = "no"
			
			// UKRLP returns data
			res.redirect('/staff-app/' + v + '/register/add/add-fromukrlp-playback')

		} else if (staff_ukprn === '11110002') {
			
			// UKPRN is deactivated/unknown
			res.redirect('/staff-app/' + v + '/register/add/add-ukprn-deactivated')

		} else {

			res.redirect('/staff-app/' + v + '/register/add/add-ukprn')

		}
		
	})

	// UKRLP unavailable
	router.post('/staff-app/' + v + '/add-ukprn-outage-a', function (req, res) {

		let staff_ukprn = req.session.data['staff-add-ukprn']
		let staff_outage = req.session.data['staff-outagechoice']

		if (staff_outage === 'register') {
			res.redirect('/staff-app/' + v + '/register')
		} else {
			if (staff_ukprn === '11110004') {
				res.redirect('/staff-app/' + v + '/add-route')
			} else if (staff_ukprn === '11110003') {
				res.redirect('/staff-app/' + v + '/add-stopgap-route')
			}
		}
	})

	// UKRLP unavailable
	router.post('/staff-app/' + v + '/add-manually-a', function (req, res) {

		if (req.session.data['staff-add-charitynumber'] != "" ){
			req.session.data['staff-add-hascharitynumber'] = "yes"
		} else {
			req.session.data['staff-add-hascharitynumber'] = "no"
		}
		if (req.session.data['staff-add-companynumber'] != "" ){
			req.session.data['staff-add-hascompanynumber'] = "yes"
		} else {
			req.session.data['staff-add-hascompanynumber'] = "no"
		}
		if (req.session.data['staff-add-tradingname'] != "" ){
			req.session.data['staff-add-hastradingname'] = "yes"
		} else {
			req.session.data['staff-add-hastradingname'] = "no"
		}

		res.redirect('/staff-app/' + v + '/add-confirm')
	})

	router.post('/staff-app/' + v + '/register/add/add-fromukrlp-determined-a', function (req, res) {

		req.session.data['staff-add-determined-monthname'] = monthNumToName(req.session.data['staff-add-determined-month']);
		res.redirect('/staff-app/' + v + '/register/add/add-confirm')

	})


	/********************************
	 *** Company - Initial checks ***
	********************************/

		// Legal and address
		router.post('/staff-app/' + v + '/applications/gateway/company/initial/legal', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	/*********************************
	 *** Company - Register checks ***
	 *********************************/

		// RoATP
		router.post('/staff-app/' + v + '/applications/gateway/company/register/roatp', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})

		// RoTO
		/*router.post('/staff-app/' + v + '/applications/gateway/company/register/roto', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})*/

		// EPAO
		router.post('/staff-app/' + v + '/applications/gateway/company/register/epao', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	/*************************************
	 *** Company - Organisation checks ***
	 *************************************/

		// Organisation info - High risk
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/highrisk-people', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


		// Organisation info - Parent company
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/parent', function (req, res) {
			req.session.data['rejects-orginfo'] = 0
			if (req.session.data['gw-company-parent'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/ico')
		})

		// Organisation info - ICO
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/ico', function (req, res) {
			if (req.session.data['gw-company-ico'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/trading')
		})

		// Organisation info - Trading for
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/trading', function (req, res) {
			if (req.session.data['gw-company-trading'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/website')
		})

		// Organisation info - Website
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/website', function (req, res) {
			if (req.session.data['gw-company-website'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})

		// Organisation type
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/type', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})

		// Experience and accreditation - ITT
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/itt', function (req, res) {
			req.session.data['rejects-experience'] = 0
			if (req.session.data['gw-company-itt'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/ofsted')
		})

		// Experience and accreditation - Ofsted
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/ofsted', function (req, res) {
			if (req.session.data['gw-company-ofsted'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	/************************************************
	 *** Company - Criminal and compliance checks ***
	 ************************************************/

		// Organisation - Creditors
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/creditors', function (req, res) {
			if (req.session.data['gw-company-criminal-creditors'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/paybackfunds')
		})

		// Organisation - Payback funds
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/paybackfunds', function (req, res) {
			if (req.session.data['gw-company-criminal-paybackfunds'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/contractterminated')
		})

		// Organisation - Contract terminated
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/contractterminated', function (req, res) {
			if (req.session.data['gw-company-criminal-contractterminated'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/earlywithdrawal')
		})

		// Organisation - Early withdrawal
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/earlywithdrawal', function (req, res) {
			if (req.session.data['gw-company-criminal-earlywithdrawal'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/removedfromroto')
		})

		// Organisation - Removed from RoTO
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/removedfromroto', function (req, res) {
			if (req.session.data['gw-company-criminal-removedfromroto'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/fundingremoved')
		})

		// Organisation - Funding removed
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/fundingremoved', function (req, res) {
			if (req.session.data['gw-company-criminal-fundingremoved'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/removedfromtrade')
		})

		// Organisation - Removed from trade
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/removedfromtrade', function (req, res) {
			if (req.session.data['gw-company-criminal-removedfromtrade'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/withdrawalfromitt')
		})

		// Organisation - Withdrawal from ITT
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/withdrawalfromitt', function (req, res) {
			if (req.session.data['gw-company-criminal-withdrawalfromitt'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/safeguarding')
		})

		// Organisation - Safeguarding
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/safeguarding', function (req, res) {
			if (req.session.data['gw-company-criminal-safeguarding'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/whistleblowing')
		})
		
		// Organisation - Whistleblowing
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/whistleblowing', function (req, res) {
			if (req.session.data['gw-company-criminal-whistleblowing'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	/***********************************************
	 *** People - Criminal and compliance checks ***
	 ***********************************************/

		// People - Convictions
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/convictions', function (req, res) {
			if (req.session.data['gw-company-criminal-people-convictions'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/paybackfunds')
		})

		// People - Pay back funds
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/paybackfunds', function (req, res) {
			if (req.session.data['gw-company-criminal-people-paybackfunds'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/fraud')
		})

		// People - Fraud
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/fraud', function (req, res) {
			if (req.session.data['gw-company-criminal-people-fraud'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/fraudongoing')
		})

		// People - Fraud ongoing
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/fraudongoing', function (req, res) {
			if (req.session.data['gw-company-criminal-people-fraudongoing'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/contractterminated')
		})

		// People - Contract terminated
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/contractterminated', function (req, res) {
			if (req.session.data['gw-company-criminal-people-contractterminated'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/earlywithdrawal')
		})

		// People - Early withdrawal
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/earlywithdrawal', function (req, res) {
			if (req.session.data['gw-company-criminal-people-earlywithdrawal'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/breachedtaxpayments')
		})

		// People - Breached tax payments
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/breachedtaxpayments', function (req, res) {
			if (req.session.data['gw-company-criminal-people-breachedtaxpayments'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/removedfromcharity')
		})

		// People - Removed from charity register
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/removedfromcharity', function (req, res) {
			if (req.session.data['gw-company-criminal-people-removedfromcharity'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/rort')
		})

		// People - On register of removed trustees
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/rort', function (req, res) {
			if (req.session.data['gw-company-criminal-people-rort'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/bankrupt')
		})

		// People - Bankrupt
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/bankrupt', function (req, res) {
			if (req.session.data['gw-company-criminal-people-bankrupt'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/insolvency')
		})

		// People - Insolvency
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/insolvency', function (req, res) {
			if (req.session.data['gw-company-criminal-people-insolvency'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/people/controlofother')
		})

		// People - Control of other organisations
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/people/controlofother', function (req, res) {
			if (req.session.data['gw-company-criminal-people-controlofother'] == "Reject") {
				req.session.data['rejects-criminal-people'] = req.session.data['rejects-criminal-people'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})
		


/******************* ROATP DOWN  */

	/********************************
	 *** Company - Initial checks ***
	********************************/

		// Legal and address
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/initial/legal', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})


	/*********************************
	 *** roatpdown - Register checks ***
	 *********************************/

		// RoATP
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/register/roatp', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})

		// RoTO
		/*router.post('/staff-app/' + v + '/applications/gateway/roatpdown/register/roto', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})*/

		// EPAO
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/register/epao', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})


	/*************************************
	 *** roatpdown - Organisation checks ***
	 *************************************/

		// Organisation info - Parent roatpdown
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/parent', function (req, res) {
			req.session.data['rejects-orginfo'] = 0
			if (req.session.data['gw-roatpdown-parent'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/ico')
		})

		// Organisation info - ICO
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/ico', function (req, res) {
			if (req.session.data['gw-roatpdown-ico'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/trading')
		})

		// Organisation info - Trading for
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/trading', function (req, res) {
			if (req.session.data['gw-roatpdown-trading'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/website')
		})

		// Organisation info - Website
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/website', function (req, res) {
			if (req.session.data['gw-roatpdown-website'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})

		// Organisation type
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/type', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})

		// Experience and accreditation - ITT
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/itt', function (req, res) {
			req.session.data['rejects-experience'] = 0
			if (req.session.data['gw-roatpdown-itt'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/ofsted')
		})

		// Experience and accreditation - Ofsted
		router.post('/staff-app/' + v + '/applications/gateway/roatpdown/organisation/ofsted', function (req, res) {
			if (req.session.data['gw-roatpdown-ofsted'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-roatpdown')
		})


}