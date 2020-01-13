// Routes for Staff App v11

var v = 'v11';

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

	router.post('/staff-app/' + v + '/esfa-sign-in', function (req, res) {
		if (req.session.data['staff-email'] == "assessor@esfa.gov.uk"){
			res.redirect('/staff-app/' + v + '/applications/applications-assessor')
		} else {
			res.redirect('/staff-app/' + v + '/dashboard')
		}
	})

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

		// Register of Removed Trustees
		router.post('/staff-app/' + v + '/applications/gateway/company/register/rort', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	/**********************************
	 *** Company - High Risk Checks ***
	 **********************************/

		// Organisation High risk
		router.post('/staff-app/' + v + '/applications/gateway/company/highrisk/organisation', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})

		// People High risk
		router.post('/staff-app/' + v + '/applications/gateway/company/highrisk/people', function (req, res) {
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	/******************************************
	 *** Company - Organisation information ***
	******************************************/


		// Organisation info - Parent company
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/info/parent', function (req, res) {
			req.session.data['rejects-orginfo'] = 0
			if (req.session.data['gw-company-info-parent'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/info/ico')
		})

		// Organisation info - ICO
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/info/ico', function (req, res) {
			if (req.session.data['gw-company-info-ico'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/info/website')
		})

		/* Organisation info - Trading for
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/trading', function (req, res) {
			if (req.session.data['gw-company-info-trading'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/website')
		}) */

		// Organisation info - Website
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/info/website', function (req, res) {
			if (req.session.data['gw-company-info-website'] == "Reject") {
				req.session.data['rejects-orginfo'] = req.session.data['rejects-orginfo'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	/***********************************
	 *** Company - Organisation type ***
	 ***********************************/

		// Organisation type
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/type/type', function (req, res) {
			if (req.session.data['gw-company-type-type'] == "Reject") {
				req.session.data['rejects-orgtype'] = req.session.data['rejects-orgtype'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/type/educationalinstitute')
		})

		// Organisation type - educational institute
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/type/educationalinstitute', function (req, res) {
			if (req.session.data['gw-company-type-edu'] == "Reject") {
				req.session.data['rejects-orgtype'] = req.session.data['rejects-orgtype'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/type/school')
		})

		// Organisation type - school
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/type/school', function (req, res) {
			if (req.session.data['gw-company-type-school'] == "Reject") {
				req.session.data['rejects-orgtype'] = req.session.data['rejects-orgtype'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
			//res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/type/funding')
		})

		// Organisation type - funding
		/*router.post('/staff-app/' + v + '/applications/gateway/company/organisation/type/funding', function (req, res) {
			if (req.session.data['gw-company-type-funding'] == "Reject") {
				req.session.data['rejects-orgtype'] = req.session.data['rejects-orgtype'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})*/


	/***********************************************
	 *** Company - Experience and accreditatipon ***
	 ***********************************************/

		// Experience and accreditation - ITT
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/experience/itt', function (req, res) {
			req.session.data['rejects-experience'] = 0
			if (req.session.data['gw-company-itt'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/experience/postgrad')
		})

		// Experience and accreditation - Post grad
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/experience/postgrad', function (req, res) {
			if (req.session.data['gw-company-postgrad'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/experience/ofsted')
		})

		// Experience and accreditation - Ofsted
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/experience/ofsted', function (req, res) {
			if (req.session.data['gw-company-experience-ofsted'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/experience/grade-apprenticeships')
		})

		// Experience and accreditation - Grade for apprenticeships
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/experience/grade-apprenticeships', function (req, res) {
			if (req.session.data['gw-company-experience-gradeapprenticeships'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/experience/grade-overall')
		})

		// Experience and accreditation - Grade for apprenticeships
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/experience/grade-overall', function (req, res) {
			if (req.session.data['gw-company-experience-gradeoverall'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/experience/grade-within3years')
		})

		// Experience and accreditation - Grade within 3 years
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/experience/grade-within3years', function (req, res) {
			if (req.session.data['gw-company-experience-gradewithin'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/experience/shortinspection')
		})

		// Experience and accreditation - Short inspection
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/experience/shortinspection', function (req, res) {
			if (req.session.data['gw-company-experience-shortinspection'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/experience/maintainedgrade')
		})

		// Experience and accreditation - Maintained grade
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/experience/maintainedgrade', function (req, res) {
			if (req.session.data['gw-company-experience-maintainedgrade'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/organisation/experience/maintainedfunding')
		})

		// Experience and accreditation - Maintained funding
		router.post('/staff-app/' + v + '/applications/gateway/company/organisation/experience/maintainedfunding', function (req, res) {
			if (req.session.data['gw-company-experience-maintainedfunding'] == "Reject") {
				req.session.data['rejects-experience'] = req.session.data['rejects-experience'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/tasklist-company')
		})


	/*****************************************************
	 *** Organisation - Criminal and compliance checks ***
	 *****************************************************/

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
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/fundingremoved')
		})

		// Organisation - Removed from RoTO
		/*router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/removedfromroto', function (req, res) {
			if (req.session.data['gw-company-criminal-removedfromroto'] == "Reject") {
				req.session.data['rejects-criminal-org'] = req.session.data['rejects-criminal-org'] + 1
			}
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/fundingremoved')
		})*/

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
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/removedfromcharity')
		})

		// Organisation - Removed from Charity registers
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/removedfromcharity', function (req, res) {
			if (req.session.data['gw-company-criminal-removedfromcharity'] == "Reject") {
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
			res.redirect('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/insolvency')
		})
		
		// Organisation - 
		router.post('/staff-app/' + v + '/applications/gateway/company/criminal/organisation/insolvency', function (req, res) {
			if (req.session.data['gw-company-criminal-insolvency'] == "Reject") {
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


// 
// ASSESSOR
//

	router.get('/staff-app/' + v + '/applications/assessor/assign-3127', function (req,res) {
		req.session.data['apr3127'] = "assigned"
		req.session.data['aac-new-count'] = req.session.data['aac-new-count'] - 1
		req.session.data['aac-inprogress-count'] = req.session.data['aac-inprogress-count'] + 1
		res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
	})

	router.get('/staff-app/' + v + '/applications/assessor/assign-4291', function (req,res) {
		req.session.data['apr4291'] = "assigned"
		req.session.data['aac-new-count'] = req.session.data['aac-new-count'] - 1
		req.session.data['aac-inprogress-count'] = req.session.data['aac-inprogress-count'] + 1
		res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-4291')
	})

	// Protect your apprentices

		router.post('/staff-app/' + v + '/applications/assessor/3127/pya/continuityplan', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/pya/equality', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/pya/safeguarding', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/pya/safeguarding-responsible')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/pya/safeguarding-responsible', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/pya/prevent-responsible')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/pya/prevent-responsible', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/pya/prevent-upload')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/pya/prevent-upload', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/pya/healthandsafety', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/pya/healthandsafety-responsible')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/pya/healthandsafety-responsible', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})

	// Readiness to engage

		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/engage', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/rte/engage-relationships')
		})

		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/engage-relationships', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/rte/engage-responsible')
		})

		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/engage-responsible', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/rte/engage-promote')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/engage-promote', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/complaints', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/rte/complaints-policy')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/complaints-policy', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/contractsforservices', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/commitment', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/process', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/rte/englishandmaths')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/englishandmaths', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/subcontractors', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/rte/subcontractors-duediligence')
		})
		
		router.post('/staff-app/' + v + '/applications/assessor/3127/rte/subcontractors-duediligence', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})


// Planning apprenticeship training

	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/type', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
	})

	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/ensuring', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/3127/pat/ensuring-frameworks')
	})

	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/ensuring-frameworks', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/3127/pat/engage-epao')
	})

	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/engage-epao', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/3127/pat/engage-awarding')
	})

	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/engage-awarding', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
	})

	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/starts', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/3127/pat/recruit')
	})

	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/recruit', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/3127/pat/ratio')
	})

	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/ratio', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/3127/pat/deliver')
	})

	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/deliver', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
	})

	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/otj', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
	})
		
	router.post('/staff-app/' + v + '/applications/assessor/3127/pat/where-trained', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
	})


	// Evaluating apprenticeship training
	
		router.post('/staff-app/' + v + '/applications/assessor/3127/eat/process', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/eat/process-improvements')
		})
	
		router.post('/staff-app/' + v + '/applications/assessor/3127/eat/process-improvements', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})
	
		router.post('/staff-app/' + v + '/applications/assessor/3127/eat/evaluating', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})
	
		router.post('/staff-app/' + v + '/applications/assessor/3127/eat/systems', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/3127/eat/systems-ilr')
		})
	
		router.post('/staff-app/' + v + '/applications/assessor/3127/eat/systems-ilr', function (req,res) {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-3127')
		})


	
// 
// ASSESSOR -  VIEW ONLY
//

	router.post('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/continuityplan', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/viewonly-tasklist-3127')
	})

	router.post('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/equality', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/viewonly-tasklist-3127')
	})

	router.post('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/safeguarding', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/safeguarding-responsible')
	})

	router.post('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/safeguarding-responsible', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/prevent-responsible')
	})

	router.post('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/prevent-responsible', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/prevent-upload')
	})

	router.post('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/prevent-upload', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/viewonly-tasklist-3127')
	})

	router.post('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/healthandsafety', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/healthandsafety-responsible')
	})

	router.post('/staff-app/' + v + '/applications/assessor/viewonly-3127/pya/healthandsafety-responsible', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/viewonly-tasklist-3127')
	})


// 
// ASSESSOR - RE-ASSIGN
//

	router.post('/staff-app/' + v + '/applications/assessor/reassign', function (req,res) {
		req.session.data[req.session.data['aac-reassign']] = req.session.data['aac-loggedinas']
		res.redirect('/staff-app/' + v + '/applications/assessor/reassign-confirmation')
	})

	router.post('/staff-app/' + v + '/applications/assessor/reassign-confirmation', function (req,res) {
		if (req.session.data['aac-reassign-confirmation'] == "Assess the remaining checks this application") {
			res.redirect('/staff-app/' + v + '/applications/assessor/tasklist-4102')
		} else {
			res.redirect('/staff-app/' + v + '/applications/applications-assessor#inprogress')
		}
	})


	// 
	// ASSESSOR - MODERATION
	//

	router.post('/staff-app/' + v + '/applications/assessor/moderate/pya/safeguarding', function (req,res) {
		res.redirect('/staff-app/' + v + '/applications/assessor/moderate/tasklist')
	})

}