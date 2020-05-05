// Routes for Application v15

var v = 'v15';
/*
var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY);
*/
var months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May',
	'Jun', 'Jul', 'Aug', 'Sep',
	'Oct', 'Nov', 'Dec'
	];

function monthNumToName(monthnum) {
	return months[monthnum - 1] || '';
}

function checkInspectionDate(d,m,y) {

	var today = new Date();
	var todayd = String(today.getDate()).padStart(2, '0');
	var todaym = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var todayy = today.getFullYear();
	
	var d1 = new Date( m + "/" + d + "/" + y);
	var d2 = new Date( todaym + "/" + todayd + "/" + todayy);

	var timeDiff = d2.getTime() - d1.getTime();
	var DaysDiff = timeDiff / (1000 * 3600 * 24);
	
	if (DaysDiff < (365*3)){
		return false;
	} else {
		return true;
	}
}


module.exports = function (router) {

  /***************
 *** Jump to ***
 ***************/
	// Completed organisation section - main provider...
	router.get('/application/' + v + '/jump/completedorgsection', function (req,res) {
		req.session.data['exempt_fha'] = "no"
		req.session.data['org-classification'] = ["None of the above"]
		req.session.data['org-ico'] = "12345678"
		req.session.data['org-parentcompany'] = "Yes"
		req.session.data['org-parentcompany-name'] = "Parent Company Limited"
		req.session.data['org-parentcompany-number'] = "89987987"
		req.session.data['org-selectedroute'] = "main"
		req.session.data['org-trading'] = "More than 23 months"
		req.session.data['org-type'] = "An employer training apprentices in other organisations"
		req.session.data['org-type-psb'] = "NHS Trust"
		req.session.data['org-type-subtype'] = "In your organisation and connected companies or charities"
		req.session.data['org-ukprn'] = "12340102"
		req.session.data['org-website'] = "Yes"
		req.session.data['org-website-address'] = "ourwebsite.com"
		req.session.data['pro-itt'] = "Yes"
		req.session.data['pro-ofsted-apprenticeships'] = "No"
		req.session.data['pro-ofsted-feskills'] = "Yes"
		req.session.data['pro-ofsted-overall-date'] = "No"
		req.session.data['pro-ofsted-overall-fundingmaintained'] = "No"
		req.session.data['pro-ofsted-overall-grade'] = "Good"
		req.session.data['pro-ofsted-overall-grademaintained'] = "Yes"
		req.session.data['pro-ofsted-overall-shortinspection'] = "Yes"
		req.session.data['pro-postgrad'] = "No"
		req.session.data['signedin'] = "yes"
		req.session.data['tl_org_details'] = "completed"
		req.session.data['tl_org_intro'] = "completed"
		req.session.data['tl_org_people'] = "completed"
		req.session.data['tl_org_profile'] = "completed"
		req.session.data['tl_org_type'] = "completed"
		req.session.data['tl_selectroute'] = "completed"
		res.redirect('/application/' + v + '/task-list')
	})

	// Application completed (including Finish section) - main provider...
	router.get('/application/' + v + '/jump/completedapplicationmain', function (req,res) {
		req.session.data['current_sector_id'] = "0"
		req.session.data['dec-org-contractterminated'] = "No"
		req.session.data['dec-org-contractterminated-detail'] = ""
		req.session.data['dec-org-debt'] = "No"
		req.session.data['dec-org-debt-detail'] = ""
		req.session.data['dec-org-fundingremoved'] = "No"
		req.session.data['dec-org-fundingremoved-detail'] = ""
		req.session.data['dec-org-insolvency'] = "No"
		req.session.data['dec-org-insolvency-detail'] = ""
		req.session.data['dec-org-ittwithdrawal'] = "No"
		req.session.data['dec-org-ittwithdrawal-detail'] = ""
		req.session.data['dec-org-repayfunding'] = "No"
		req.session.data['dec-org-repayfunding-detail'] = ""
		req.session.data['dec-org-roto'] = "No"
		req.session.data['dec-org-roto-detail'] = ""
		req.session.data['dec-org-safeguarding'] = "No"
		req.session.data['dec-org-safeguarding-detail'] = ""
		req.session.data['dec-org-traderegister'] = "No"
		req.session.data['dec-org-traderegister-detail'] = ""
		req.session.data['dec-org-whistleblowing'] = "No"
		req.session.data['dec-org-whistleblowing-detail'] = ""
		req.session.data['dec-org-withdrawncontract'] = "No"
		req.session.data['dec-org-withdrawncontract-detail'] = ""
		req.session.data['dec-people-bankrupt'] = "No"
		req.session.data['dec-people-bankrupt-detail'] = ""
		req.session.data['dec-people-charityregister'] = "No"
		req.session.data['dec-people-charityregister-detail'] = ""
		req.session.data['dec-people-contractterminated'] = "No"
		req.session.data['dec-people-contractterminated-detail'] = ""
		req.session.data['dec-people-convictions'] = "No"
		req.session.data['dec-people-convictions-detail'] = ""
		req.session.data['dec-people-fraud'] = "No"
		req.session.data['dec-people-fraud-detail'] = ""
		req.session.data['dec-people-fraudongoing'] = "No"
		req.session.data['dec-people-fraudongoing-detail'] = ""
		req.session.data['dec-people-insolvency'] = "No"
		req.session.data['dec-people-repayfunding'] = "No"
		req.session.data['dec-people-repayfunding-detail'] = ""
		req.session.data['dec-people-taxpayments'] = "No"
		req.session.data['dec-people-taxpayments-detail'] = ""
		req.session.data['dec-people-trusteeregister'] = "No"
		req.session.data['dec-people-trusteeregister-detail'] = ""
		req.session.data['dec-people-withdrawncontract'] = "No"
		req.session.data['dec-people-withdrawncontract-detail'] = ""
		req.session.data['del-developdeliver'] = "Yes"
		req.session.data['del-developdeliver-howworkedwith'] = "Vestibulum placerat facilisis dui a sodales. Nulla ac tellus ultrices, pulvinar magna vitae, ullamcorper tellus. Aenean tempus massa id nisl luctus, ac tristique ipsum facilisis. Donec ultricies tortor velit, et efficitur enim efficitur sed. Etiam luctus pharetra nisi eget tempus."
		req.session.data['del-developdeliver-overallaccountability-name'] = "Anne Peters"
		req.session.data['del-developdeliver-overallaccountability-email'] = "anne@peters.com"
		req.session.data['del-developdeliver-overallaccountability-number'] = "657483902"
		req.session.data['del-developdeliver-overallmanager'] = "Steven Collins"
		req.session.data['del-developdeliver-overallmanager-experience'] = "Over 18 months"
		req.session.data['del-developdeliver-workedwith'] = "Other organisations"
		req.session.data['del-development-implemented'] = "Sed in porttitor sapien. Nullam at urna vitae leo maximus interdum. Nunc elementum urna augue, ut feugiat justo rhoncus quis. Ut convallis sagittis ullamcorper. In hac habitasse platea dictumst. Donec tristique diam ac nisl mattis, a lacinia libero sodales. Duis porttitor lorem lorem, ut porta leo fringilla ac. Donec porta a massa in bibendum. Nam placerat ipsum nisl, at porttitor velit ultrices eget. Phasellus et justo orci. Etiam feugiat tortor tellus, vitae vulputate felis tristique nec. Sed interdum dolor sit amet felis posuere, in scelerisque nisl vehicula."
		req.session.data['del-development-reflected'] = "Maecenas ac ligula ut magna ornare ullamcorper. Proin velit lorem, blandit nec tellus sit amet, ultrices luctus ligula. Maecenas mattis, ex a euismod placerat, urna lorem tristique velit, nec malesuada nibh orci eu nisl. Mauris aliquet ipsum eu felis malesuada, sed lacinia mauris rhoncus. Praesent pharetra eget nisi ut pretium. Sed auctor tincidunt ante, non suscipit mi. Vivamus imperdiet gravida dui dictum bibendum. Fusce non ante tristique, semper metus ut, commodo magna. Nullam et aliquet nibh. Sed augue lectus, viverra feugiat magna vitae, facilisis lacinia mi. Suspendisse euismod hendrerit nisi, vitae pretium lorem semper vitae."
		req.session.data['del-employee'] = [
			{
				sector_id: "0",
				name: "Samantha Pearson",
				job_role: "Chief Design Officer",
				timeinrole_years: "4",
				timeinrole_months: "2"
			},
			{
				sector_id: "1",
				name: "Jessica Willmott",
				job_role: "Head of Digital",
				timeinrole_years: "5",
				timeinrole_months: "11"
			}
		]
		req.session.data['del-expectations'] = "Yes"
		req.session.data['del-expectations-comminicated'] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices lacinia leo, sollicitudin elementum neque. Nullam in blandit mauris. Aliquam vitae euismod risus. Aenean venenatis efficitur nibh quis pharetra. Vestibulum non orci eu mi semper laoreet. Morbi non erat sed tortor consequat tincidunt. Nam quam dolor, imperdiet eu neque sed, condimentum euismod nibh. Duis blandit risus mauris, ut efficitur lectus interdum facilisis. Aliquam at elit finibus, posuere tellus eget, pulvinar lectus. Vestibulum dignissim condimentum dolor, at scelerisque nibh dignissim eget. Fusce tempus sed massa in lobortis. Nulla id orci vel nisi ultrices egestas sit amet sit amet lacus. Integer vehicula purus at dui fringilla, eu placerat nibh eleifend. Nam dignissim erat eu iaculis consectetur. Suspendisse pellentesque augue vehicula nibh tristique dignissim. Nulla mattis, purus et tincidunt euismod, nisl lacus cursus metus, in mattis augue nulla eget dolor. In fringilla arcu non augue vestibulum, quis tincidunt dui feugiat. Phasellus at rutrum lorem. Etiam tempus orci in ultrices fermentum. Maecenas vel dolor rutrum, consequat ligula vitae, blandit metus. Cras imperdiet libero tempus, elementum est ac, placerat elit. Phasellus gravida sapien eu elementum pellentesque. Sed molestie, enim vitae convallis fermentum, dui mauris blandit lorem, nec ultricies lectus est nec lectus. In nec metus enim. Nunc sit amet pharetra eros. Curabitur in commodo magna."
		req.session.data['del-expectations-responsible-name'] = "Jeff Hall"
		req.session.data['del-expectations-responsible-email'] = "jeff@hall.com"
		req.session.data['del-expectations-responsible-number'] = "07625 376223"
		req.session.data['del-expectations-upload'] = ""
		req.session.data['del-hierarchy-person'] = [
			{
				name: "Michael Downes",
				job_role: "Head of Apprenticeships",
				time_in_role: "2.5 years",
				report_to: "CEO Percy Quinn",
				org_funding: "No"
			},{
				name: "Andrew Moyles",
				job_role: "CFO",
				time_in_role: "8 months",
				report_to: "CEO Percy Quinn",
				org_funding: "No"
			}
		]
		req.session.data['del-professional-development'] = ""
		req.session.data['del-sectors'] = ["Creative and design","Digital"]
		req.session.data['end-permission-commercial'] = "No"
		req.session.data['end-permission-named'] = ["Yes"]
		req.session.data['end-permission-submit'] = ["Yes"]
		req.session.data['end-yourdetails-email'] = "charles@peterson.com"
		req.session.data['end-yourdetails-name'] = "Charles Peterson"
		req.session.data['end-yourdetails-number'] = "07755 443322"
		req.session.data['eval-apprenticeships'] = "Yes"
		req.session.data['eval-collectdata'] = "Yes"
		req.session.data['eval-ilr'] = "Yes"
		req.session.data['eval-training'] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis porta magna. Aliquam ornare justo id placerat fringilla. Nunc metus justo, consequat sed neque sit amet, mattis vehicula justo. Phasellus vulputate ipsum a auctor convallis. Sed laoreet imperdiet est et hendrerit. Nam aliquet dolor sit amet ornare euismod. Aenean consectetur varius justo sed malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras dolor turpis, facilisis vitae scelerisque congue, interdum at massa."
		req.session.data['eval-training-improvements'] = "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer sit amet fringilla tortor, tristique hendrerit nunc. In eget libero metus. Curabitur in eleifend risus. Maecenas libero tellus, aliquet eget ex nec, luctus imperdiet mi. Nullam a suscipit neque. Morbi feugiat dolor vitae nibh commodo dictum. Nullam quis posuere tellus."
		req.session.data['eval-review'] = "Fusce sed massa quis nibh finibus faucibus. Fusce semper nibh odio, sed luctus nisl egestas eget. In imperdiet malesuada risus, id varius justo condimentum eget. Fusce porttitor mi at diam aliquet, sed dignissim metus ornare. Mauris convallis molestie eros, eget tempor nunc commodo ac. Fusce id eros lobortis sem aliquet pulvinar a at turpis. Duis cursus interdum nisi at euismod. Ut ornare mauris ac molestie euismod. Sed nulla eros, auctor non rhoncus non, tristique ac purus. Nam luctus odio et libero viverra, non malesuada velit consectetur. Nulla sed interdum massa, non malesuada odio. Pellentesque ut faucibus magna. Integer ornare ligula leo, eget feugiat ante porta nec. Praesent vitae imperdiet ex. Aliquam pharetra massa sollicitudin nulla facilisis finibus."
		req.session.data['exempt_fha'] = "no"
		req.session.data['fin-finstatements-upload'] = ""
		req.session.data['fin-fullstatements'] = "Yes"
		req.session.data['fin-managementaccounts-upload'] = ""
		req.session.data['fin-whoprepared'] = ["An employee in your organisation"]
		req.session.data['gethelp'] = ""
		req.session.data['org-classification'] = ["None of the above"]
		req.session.data['org-ico'] = "12345678"
		req.session.data['org-parentcompany'] = "Yes"
		req.session.data['org-parentcompany-name'] = "Parent Company Limited"
		req.session.data['org-parentcompany-number'] = "89987987"
		req.session.data['org-selectedroute'] = "main"
		req.session.data['org-trading'] = "More than 23 months"
		req.session.data['org-type'] = "An employer training apprentices in other organisations"
		req.session.data['org-type-psb'] = "NHS Trust"
		req.session.data['org-type-subtype'] = "In your organisation and connected companies or charities"
		req.session.data['org-ukprn'] = "12340102"
		req.session.data['org-website'] = "Yes"
		req.session.data['org-website-address'] = "ourwebsite.com"
		req.session.data['plan-contact-name'] = "David Walker"
		req.session.data['plan-contact-email'] = "david@walker.com"
		req.session.data['plan-engaging'] = "Phasellus tempor, mauris quis maximus condimentum, nisl massa semper mauris, ut imperdiet tortor quam bibendum lectus. Maecenas non massa sodales, mattis erat ut, tempus odio. Donec eleifend nibh sed nunc ultricies vestibulum eu vel est. Donec id nunc pulvinar, cursus felis eget, elementum erat. Duis varius turpis magna, ut luctus ipsum efficitur a. Pellentesque sit amet tortor felis. Aliquam euismod tellus ut augue hendrerit, rhoncus efficitur arcu condimentum. Aliquam ac commodo nibh, vitae finibus metus. Sed et dui eleifend, ultrices ex id, luctus ipsum. Suspendisse porta ipsum ut suscipit egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus vitae commodo mi, at tincidunt dolor. Duis consequat erat id vulputate viverra. Nullam venenatis odio vitae urna consequat gravida."
		req.session.data['plan-forecast-newstaff'] = "Yes"
		req.session.data['plan-forecast-ratio'] = "One trainer between 11 to 29 learners"
		req.session.data['plan-forecast-readytodeliver'] = "Between the first 3 to 6 months of joining RoATP"
		req.session.data['plan-forecast-starts'] = "One to 49"
		req.session.data['plan-otj-method'] = ["Self-directed distance learning - where the apprentice works alone with online material","Learning support and written assignments","Practical training - for example, shadowing, mentoring or industry visits"]
		req.session.data['plan-otj-relevant'] = "Ut in porttitor massa. Phasellus varius in nibh eget consequat. Fusce lorem libero, molestie eu accumsan vel, sodales porta velit. Integer convallis, ipsum accumsan aliquam maximus, arcu leo condimentum nisl, id euismod est nunc vel lacus. Nulla hendrerit, nulla ut fermentum dignissim, arcu est hendrerit massa, at auctor enim lacus ac lacus. Quisque lacinia quis erat eu imperdiet. Vestibulum fringilla mauris nec finibus congue. Phasellus vel mollis lacus. Pellentesque ac ligula quis augue maximus dictum et non magna. In facilisis ante vel sollicitudin volutpat. Nulla facilisi. Nunc ac erat sapien. Donec vehicula sem tellus, eu tincidunt erat suscipit ut. Duis tincidunt elit et turpis sollicitudin ultricies. In eu mi libero. Nunc eu dolor vel nisi tristique varius sit amet non purus. Sed quam elit, dapibus id est id, laoreet suscipit arcu. Mauris dictum et magna quis interdum."
		req.session.data['plan-readytodeliver'] = "Nullam eget est sagittis erat mattis ultrices. Mauris efficitur lacus lacinia lorem pretium accumsan. Nam pulvinar ornare enim, ac varius eros vestibulum eu. Donec at risus eu nisi consectetur hendrerit. Phasellus vel lacus lacinia, aliquet ligula in, venenatis quam. Integer dapibus turpis eu erat malesuada mattis. Donec pretium, lacus sit amet dapibus consectetur, erat leo vestibulum mi, ut semper nibh urna id nisi. Vestibulum et purus eros. Fusce tempus nec diam vel venenatis. Aliquam posuere eleifend tortor et placerat. Donec et pharetra erat. Aenean lacus tortor, pretium ac lectus ut, ultrices dignissim diam. Quisque nibh enim, vulputate sit amet nulla eget, porta sodales massa. Donec sed augue sed nisl gravida blandit. Duis risus velit, sollicitudin a nisl quis, pretium molestie lacus."
		req.session.data['plan-supported'] = "Donec vel venenatis nulla, at maximus enim. Donec tempor massa odio, sed malesuada velit tempus nec. Proin feugiat purus vel cursus consequat. In suscipit sodales ipsum id accumsan. Cras vel ex finibus, hendrerit libero nec, ultrices turpis. Ut arcu urna, aliquam a mi eu, blandit varius magna. Phasellus luctus orci non augue cursus, et condimentum justo dignissim. Aenean ut magna mauris. Morbi iaculis varius lorem in facilisis. Suspendisse eget tellus sit amet magna feugiat interdum. Donec dictum nisi tellus, ac egestas neque lacinia ut. Fusce sed metus sodales, interdum mauris at, finibus arcu. Praesent molestie felis vel tortor mattis pellentesque. Nunc id nisi ut enim accumsan pulvinar et non tortor. Ut luctus nulla id mattis posuere. Proin scelerisque at quam a blandit. Aenean sit amet magna eros. Aenean at risus viverra diam eleifend scelerisque at at nibh."
		req.session.data['plan-type'] = ["Apprenticeship standards"]
		req.session.data['plan-address-county'] = "Northants"
		req.session.data['plan-address-line1'] = "123"
		req.session.data['plan-address-line2'] = "Main road"
		req.session.data['plan-address-postcode'] = "NN1 6AA"
		req.session.data['plan-address-town'] = "Northampton"
		req.session.data['pro-itt'] = "Yes"
		req.session.data['pro-ofsted-apprenticeships'] = "No"
		req.session.data['pro-ofsted-feskills'] = "Yes"
		req.session.data['pro-ofsted-overall-date'] = "No"
		req.session.data['pro-ofsted-overall-fundingmaintained'] = "No"
		req.session.data['pro-ofsted-overall-grade'] = "Good"
		req.session.data['pro-ofsted-overall-grademaintained'] = "Yes"
		req.session.data['pro-ofsted-overall-shortinspection'] = "Yes"
		req.session.data['pro-postgrad'] = "No"
		req.session.data['rte-assessenglishmaths'] = "Nam laoreet velit ac accumsan maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla suscipit sapien ut massa elementum malesuada. Morbi quis nulla maximus, molestie magna et, eleifend urna. Donec ut sapien sit amet lacus scelerisque vehicula. Aenean vitae lacus ligula. Fusce nec vestibulum massa. Nulla facilisi. Suspendisse enim dui, blandit at sapien pharetra, tempor eleifend nisi. Nunc sit amet maximus enim, in volutpat massa. Nullam eros nibh, accumsan in volutpat eu, interdum at sapien. Phasellus vestibulum ligula non purus malesuada lacinia. Morbi non nibh bibendum, mollis mi rhoncus, interdum nibh. Nam sodales ullamcorper enim, bibendum consectetur diam viverra ac. Vivamus efficitur, est sed luctus pretium, diam velit dignissim est, quis condimentum odio nunc ac felis. Vestibulum sit amet quam aliquet, congue leo id, ullamcorper lorem. Maecenas luctus, dui vitae vestibulum ultrices, ante odio tempus est, eu finibus neque lacus quis tortor. Vivamus id eros sapien. Ut cursus lorem in eros laoreet imperdiet. Nam non justo ipsum. Duis lobortis leo vel faucibus faucibus. Morbi quis neque aliquet, suscipit tortor non, dapibus odio. Maecenas tempus rutrum elementum. Praesent risus enim, ultricies nec mollis eget, luctus quis tortor. Suspendisse ut aliquam quam, sed mollis leo. Quisque vehicula viverra rhoncus. Ut blandit eros sit amet libero pulvinar, in vehicula tortor hendrerit. Duis ullamcorper rhoncus odio at aliquet."
		req.session.data['rte-complaints'] = ""
		req.session.data['rte-complaints-link'] = "www.example.com/complaintspolicy"
		req.session.data['rte-contractforservices'] = ""
		req.session.data['rte-engaged'] = "Yes"
		req.session.data['rte-managingrelationships'] = "Yes"
		req.session.data['rte-priorlearning'] = "Curabitur gravida at mauris vitae tristique. In sit amet tellus ut odio ultrices aliquam eu at leo. Quisque nec ornare purus. Aenean massa augue, egestas a mi eget, ornare lacinia mauris. Nam pretium arcu justo, id venenatis mi rutrum non. Cras scelerisque consectetur sem, in pharetra metus maximus a. Fusce elit dolor, tempus eu maximus in, vehicula et ipsum. Quisque vitae nunc in dolor feugiat gravida. Sed et lobortis dolor. Etiam vitae magna at diam pellentesque mattis."
		req.session.data['rte-relationships'] = "Praesent elementum, tortor vel luctus interdum, ante odio laoreet ante, ac pretium nibh orci vitae tellus. Integer quis eros sit amet felis pharetra molestie. Donec eget erat eros. Nullam in augue ipsum. Mauris convallis feugiat porttitor. Nulla non scelerisque mauris, ut condimentum nulla. Curabitur vitae aliquet libero."
		req.session.data['rte-usesubcontractors'] = "No"
		req.session.data['signedin'] = "yes"
		req.session.data['tl_dec_intro'] = "completed"
		req.session.data['tl_dec_organisation'] = "completed"
		req.session.data['tl_dec_people'] = "completed"
		req.session.data['tl_dec_peopleintro'] = "completed"
		req.session.data['tl_del_accountability'] = "completed"
		req.session.data['tl_del_developdeliver'] = "completed"
		req.session.data['tl_del_development'] = "completed"
		req.session.data['tl_del_expectations'] = "completed"
		req.session.data['tl_del_hierarchy'] = "completed"
		req.session.data['tl_del_intro'] = "completed"
		req.session.data['tl_del_sectors'] = "completed"
		req.session.data['tl_eval_apprenticeships'] = "completed"
		req.session.data['tl_eval_collectdata'] = "completed"
		req.session.data['tl_eval_ilr'] = "completed"
		req.session.data['tl_eval_intro'] = "completed"
		req.session.data['tl_eval_training'] = "completed"
		req.session.data['tl_fin_intro'] = "completed"
		req.session.data['tl_fin_upload'] = "completed"
		req.session.data['tl_fin_parent'] = "completed"
    req.session.data['tl_ukparentcompany'] = "completed"
    req.session.data['tl_finish_permission'] = "completed"
		req.session.data['tl_finish_yourdetails'] = "completed"
		req.session.data['tl_org_details'] = "completed"
		req.session.data['tl_org_intro'] = "completed"
		req.session.data['tl_org_people'] = "completed"
		req.session.data['tl_org_profile'] = "completed"
		req.session.data['tl_org_type'] = "completed"
		req.session.data['tl_plan_address'] = "completed"
		req.session.data['tl_plan_contact'] = "completed"
		req.session.data['tl_plan_forecasting'] = "completed"
		req.session.data['tl_plan_intro'] = "completed"
		req.session.data['tl_plan_offthejob'] = "completed"
		//req.session.data['tl_plan_supporting'] = "completed"
		req.session.data['tl_plan_type'] = "completed"
		req.session.data['tl_profile_ofsted'] = "next"
		req.session.data['tl_rte_commitment'] = "completed"
		req.session.data['tl_rte_complaints'] = "completed"
		req.session.data['tl_rte_contractforservices'] = "completed"
		req.session.data['tl_rte_engagement'] = "completed"
		req.session.data['tl_rte_intro'] = "completed"
		req.session.data['tl_rte_priorlearning'] = "completed"
		req.session.data['tl_rte_subcontractors'] = "completed"
		req.session.data['tl_selectroute'] = "completed"
		req.session.data['tl_wel_continuity'] = "completed"
		req.session.data['tl_wel_diversity'] = "completed"
		req.session.data['tl_wel_healthandsafety'] = "completed"
		req.session.data['tl_wel_intro'] = "completed"
		//req.session.data['tl_wel_preventduty'] = "completed"
		req.session.data['tl_wel_safeguarding'] = "completed"
		req.session.data['wel-continuity'] = ""
		req.session.data['wel-diversity'] = ""
		req.session.data['wel-healthandsafety'] = ""
		req.session.data['wel-healthandsafetyresponsible-email'] = "pete@jones.com"
		req.session.data['wel-healthandsafetyresponsible-name'] = "Pete Jones"
		req.session.data['wel-healthandsafetyresponsible-tel'] = "0998765654"
		req.session.data['wel-preventduty'] = "Yes"
		req.session.data['wel-safeguarding'] = ""
		req.session.data['wel-safeguardingresponsible-email'] = "john@smith.com"
		req.session.data['wel-safeguardingresponsible-name'] = "John Smith"
		req.session.data['wel-safeguardingresponsible-tel'] = "01234987654"
		res.redirect('/application/' + v + '/task-list')
	})

	// Application completed except for sectors - main provider...
	router.get('/application/' + v + '/jump/sectors', function (req,res) {
		req.session.data['current_sector_id'] = "0"
		req.session.data['dec-org-contractterminated'] = "No"
		req.session.data['dec-org-contractterminated-detail'] = ""
		req.session.data['dec-org-debt'] = "No"
		req.session.data['dec-org-debt-detail'] = ""
		req.session.data['dec-org-fundingremoved'] = "No"
		req.session.data['dec-org-fundingremoved-detail'] = ""
		req.session.data['dec-org-insolvency'] = "No"
		req.session.data['dec-org-insolvency-detail'] = ""
		req.session.data['dec-org-ittwithdrawal'] = "No"
		req.session.data['dec-org-ittwithdrawal-detail'] = ""
		req.session.data['dec-org-repayfunding'] = "No"
		req.session.data['dec-org-repayfunding-detail'] = ""
		req.session.data['dec-org-roto'] = "No"
		req.session.data['dec-org-roto-detail'] = ""
		req.session.data['dec-org-safeguarding'] = "No"
		req.session.data['dec-org-safeguarding-detail'] = ""
		req.session.data['dec-org-traderegister'] = "No"
		req.session.data['dec-org-traderegister-detail'] = ""
		req.session.data['dec-org-whistleblowing'] = "No"
		req.session.data['dec-org-whistleblowing-detail'] = ""
		req.session.data['dec-org-withdrawncontract'] = "No"
		req.session.data['dec-org-withdrawncontract-detail'] = ""
		req.session.data['dec-people-bankrupt'] = "No"
		req.session.data['dec-people-bankrupt-detail'] = ""
		req.session.data['dec-people-charityregister'] = "No"
		req.session.data['dec-people-charityregister-detail'] = ""
		req.session.data['dec-people-contractterminated'] = "No"
		req.session.data['dec-people-contractterminated-detail'] = ""
		req.session.data['dec-people-convictions'] = "No"
		req.session.data['dec-people-convictions-detail'] = ""
		req.session.data['dec-people-fraud'] = "No"
		req.session.data['dec-people-fraud-detail'] = ""
		req.session.data['dec-people-fraudongoing'] = "No"
		req.session.data['dec-people-fraudongoing-detail'] = ""
		req.session.data['dec-people-insolvency'] = "No"
		req.session.data['dec-people-repayfunding'] = "No"
		req.session.data['dec-people-repayfunding-detail'] = ""
		req.session.data['dec-people-taxpayments'] = "No"
		req.session.data['dec-people-taxpayments-detail'] = ""
		req.session.data['dec-people-trusteeregister'] = "No"
		req.session.data['dec-people-trusteeregister-detail'] = ""
		req.session.data['dec-people-withdrawncontract'] = "No"
		req.session.data['dec-people-withdrawncontract-detail'] = ""
		req.session.data['del-developdeliver'] = "Yes"
		req.session.data['del-developdeliver-howworkedwith'] = "Vestibulum placerat facilisis dui a sodales. Nulla ac tellus ultrices, pulvinar magna vitae, ullamcorper tellus. Aenean tempus massa id nisl luctus, ac tristique ipsum facilisis. Donec ultricies tortor velit, et efficitur enim efficitur sed. Etiam luctus pharetra nisi eget tempus."
		req.session.data['del-developdeliver-overallaccountability-name'] = "Anne Peters"
		req.session.data['del-developdeliver-overallaccountability-email'] = "anne@peters.com"
		req.session.data['del-developdeliver-overallaccountability-number'] = "657483902"
		req.session.data['del-developdeliver-overallmanager'] = "Steven Collins"
		req.session.data['del-developdeliver-overallmanager-experience'] = "Over 18 months"
		req.session.data['del-developdeliver-workedwith'] = "Other organisations"
		req.session.data['del-development-implemented'] = "Sed in porttitor sapien. Nullam at urna vitae leo maximus interdum. Nunc elementum urna augue, ut feugiat justo rhoncus quis. Ut convallis sagittis ullamcorper. In hac habitasse platea dictumst. Donec tristique diam ac nisl mattis, a lacinia libero sodales. Duis porttitor lorem lorem, ut porta leo fringilla ac. Donec porta a massa in bibendum. Nam placerat ipsum nisl, at porttitor velit ultrices eget. Phasellus et justo orci. Etiam feugiat tortor tellus, vitae vulputate felis tristique nec. Sed interdum dolor sit amet felis posuere, in scelerisque nisl vehicula."
		req.session.data['del-development-reflected'] = "Maecenas ac ligula ut magna ornare ullamcorper. Proin velit lorem, blandit nec tellus sit amet, ultrices luctus ligula. Maecenas mattis, ex a euismod placerat, urna lorem tristique velit, nec malesuada nibh orci eu nisl. Mauris aliquet ipsum eu felis malesuada, sed lacinia mauris rhoncus. Praesent pharetra eget nisi ut pretium. Sed auctor tincidunt ante, non suscipit mi. Vivamus imperdiet gravida dui dictum bibendum. Fusce non ante tristique, semper metus ut, commodo magna. Nullam et aliquet nibh. Sed augue lectus, viverra feugiat magna vitae, facilisis lacinia mi. Suspendisse euismod hendrerit nisi, vitae pretium lorem semper vitae."
		/*req.session.data['del-employee'] = [
			{
				sector_id: "0",
				name: "Samantha Pearson",
				job_role: "Chief Design Officer",
				timeinrole_years: "4",
				timeinrole_months: "2"
			},
			{
				sector_id: "1",
				name: "Jessica Willmott",
				job_role: "Head of Digital",
				timeinrole_years: "5",
				timeinrole_months: "11"
			}
		]*/
		req.session.data['del-expectations'] = "Yes"
		req.session.data['del-expectations-comminicated'] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices lacinia leo, sollicitudin elementum neque. Nullam in blandit mauris. Aliquam vitae euismod risus. Aenean venenatis efficitur nibh quis pharetra. Vestibulum non orci eu mi semper laoreet. Morbi non erat sed tortor consequat tincidunt. Nam quam dolor, imperdiet eu neque sed, condimentum euismod nibh. Duis blandit risus mauris, ut efficitur lectus interdum facilisis. Aliquam at elit finibus, posuere tellus eget, pulvinar lectus. Vestibulum dignissim condimentum dolor, at scelerisque nibh dignissim eget. Fusce tempus sed massa in lobortis. Nulla id orci vel nisi ultrices egestas sit amet sit amet lacus. Integer vehicula purus at dui fringilla, eu placerat nibh eleifend. Nam dignissim erat eu iaculis consectetur. Suspendisse pellentesque augue vehicula nibh tristique dignissim. Nulla mattis, purus et tincidunt euismod, nisl lacus cursus metus, in mattis augue nulla eget dolor. In fringilla arcu non augue vestibulum, quis tincidunt dui feugiat. Phasellus at rutrum lorem. Etiam tempus orci in ultrices fermentum. Maecenas vel dolor rutrum, consequat ligula vitae, blandit metus. Cras imperdiet libero tempus, elementum est ac, placerat elit. Phasellus gravida sapien eu elementum pellentesque. Sed molestie, enim vitae convallis fermentum, dui mauris blandit lorem, nec ultricies lectus est nec lectus. In nec metus enim. Nunc sit amet pharetra eros. Curabitur in commodo magna."
		req.session.data['del-expectations-responsible-name'] = "Jeff Hall"
		req.session.data['del-expectations-responsible-email'] = "jeff@hall.com"
		req.session.data['del-expectations-responsible-number'] = "07625 376223"
		req.session.data['del-expectations-upload'] = ""
		req.session.data['del-hierarchy-person'] = [
			{
				name: "Michael Downes",
				job_role: "Head of Apprenticeships",
				time_in_role: "2.5 years",
				report_to: "CEO Percy Quinn",
				org_funding: "No"
			},{
				name: "Andrew Moyles",
				job_role: "CFO",
				time_in_role: "8 months",
				report_to: "CEO Percy Quinn",
				org_funding: "No"
			}
		]
		req.session.data['del-professional-development'] = ""
		//req.session.data['del-sectors'] = ["Creative and design","Digital"]
		req.session.data['end-permission-commercial'] = "No"
		req.session.data['end-permission-named'] = ["Yes"]
		req.session.data['end-permission-submit'] = ["Yes"]
		req.session.data['end-yourdetails-email'] = "charles@peterson.com"
		req.session.data['end-yourdetails-name'] = "Charles Peterson"
		req.session.data['end-yourdetails-number'] = "07755 443322"
		req.session.data['eval-apprenticeships'] = "Yes"
		req.session.data['eval-collectdata'] = "Yes"
		req.session.data['eval-ilr'] = "Yes"
		req.session.data['eval-training'] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis porta magna. Aliquam ornare justo id placerat fringilla. Nunc metus justo, consequat sed neque sit amet, mattis vehicula justo. Phasellus vulputate ipsum a auctor convallis. Sed laoreet imperdiet est et hendrerit. Nam aliquet dolor sit amet ornare euismod. Aenean consectetur varius justo sed malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras dolor turpis, facilisis vitae scelerisque congue, interdum at massa."
		req.session.data['eval-training-improvements'] = "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer sit amet fringilla tortor, tristique hendrerit nunc. In eget libero metus. Curabitur in eleifend risus. Maecenas libero tellus, aliquet eget ex nec, luctus imperdiet mi. Nullam a suscipit neque. Morbi feugiat dolor vitae nibh commodo dictum. Nullam quis posuere tellus."
		req.session.data['eval-review'] = "Fusce sed massa quis nibh finibus faucibus. Fusce semper nibh odio, sed luctus nisl egestas eget. In imperdiet malesuada risus, id varius justo condimentum eget. Fusce porttitor mi at diam aliquet, sed dignissim metus ornare. Mauris convallis molestie eros, eget tempor nunc commodo ac. Fusce id eros lobortis sem aliquet pulvinar a at turpis. Duis cursus interdum nisi at euismod. Ut ornare mauris ac molestie euismod. Sed nulla eros, auctor non rhoncus non, tristique ac purus. Nam luctus odio et libero viverra, non malesuada velit consectetur. Nulla sed interdum massa, non malesuada odio. Pellentesque ut faucibus magna. Integer ornare ligula leo, eget feugiat ante porta nec. Praesent vitae imperdiet ex. Aliquam pharetra massa sollicitudin nulla facilisis finibus."
		req.session.data['exempt_fha'] = "no"
		req.session.data['fin-finstatements-upload'] = ""
		req.session.data['fin-fullstatements'] = "Yes"
		req.session.data['fin-managementaccounts-upload'] = ""
		req.session.data['fin-whoprepared'] = ["An employee in your organisation"]
		req.session.data['gethelp'] = ""
		req.session.data['org-classification'] = ["None of the above"]
		req.session.data['org-ico'] = "12345678"
		req.session.data['org-parentcompany'] = "Yes"
		req.session.data['org-parentcompany-name'] = "Parent Company Limited"
		req.session.data['org-parentcompany-number'] = "89987987"
		req.session.data['org-selectedroute'] = "main"
		req.session.data['org-trading'] = "More than 23 months"
		req.session.data['org-type'] = "An employer training apprentices in other organisations"
		req.session.data['org-type-psb'] = "NHS Trust"
		req.session.data['org-type-subtype'] = "In your organisation and connected companies or charities"
		req.session.data['org-ukprn'] = "12340102"
		req.session.data['org-website'] = "Yes"
		req.session.data['org-website-address'] = "ourwebsite.com"
		req.session.data['plan-contact-name'] = "David Walker"
		req.session.data['plan-contact-email'] = "david@walker.com"
		req.session.data['plan-engaging'] = "Phasellus tempor, mauris quis maximus condimentum, nisl massa semper mauris, ut imperdiet tortor quam bibendum lectus. Maecenas non massa sodales, mattis erat ut, tempus odio. Donec eleifend nibh sed nunc ultricies vestibulum eu vel est. Donec id nunc pulvinar, cursus felis eget, elementum erat. Duis varius turpis magna, ut luctus ipsum efficitur a. Pellentesque sit amet tortor felis. Aliquam euismod tellus ut augue hendrerit, rhoncus efficitur arcu condimentum. Aliquam ac commodo nibh, vitae finibus metus. Sed et dui eleifend, ultrices ex id, luctus ipsum. Suspendisse porta ipsum ut suscipit egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus vitae commodo mi, at tincidunt dolor. Duis consequat erat id vulputate viverra. Nullam venenatis odio vitae urna consequat gravida."
		req.session.data['plan-forecast-newstaff'] = "Yes"
		req.session.data['plan-forecast-ratio'] = "One trainer between 11 to 29 learners"
		req.session.data['plan-forecast-readytodeliver'] = "Between the first 3 to 6 months of joining RoATP"
		req.session.data['plan-forecast-starts'] = "One to 49"
		req.session.data['plan-otj-method'] = ["Self-directed distance learning - where the apprentice works alone with online material","Learning support and written assignments","Practical training - for example, shadowing, mentoring or industry visits"]
		req.session.data['plan-otj-relevant'] = "Ut in porttitor massa. Phasellus varius in nibh eget consequat. Fusce lorem libero, molestie eu accumsan vel, sodales porta velit. Integer convallis, ipsum accumsan aliquam maximus, arcu leo condimentum nisl, id euismod est nunc vel lacus. Nulla hendrerit, nulla ut fermentum dignissim, arcu est hendrerit massa, at auctor enim lacus ac lacus. Quisque lacinia quis erat eu imperdiet. Vestibulum fringilla mauris nec finibus congue. Phasellus vel mollis lacus. Pellentesque ac ligula quis augue maximus dictum et non magna. In facilisis ante vel sollicitudin volutpat. Nulla facilisi. Nunc ac erat sapien. Donec vehicula sem tellus, eu tincidunt erat suscipit ut. Duis tincidunt elit et turpis sollicitudin ultricies. In eu mi libero. Nunc eu dolor vel nisi tristique varius sit amet non purus. Sed quam elit, dapibus id est id, laoreet suscipit arcu. Mauris dictum et magna quis interdum."
		req.session.data['plan-readytodeliver'] = "Nullam eget est sagittis erat mattis ultrices. Mauris efficitur lacus lacinia lorem pretium accumsan. Nam pulvinar ornare enim, ac varius eros vestibulum eu. Donec at risus eu nisi consectetur hendrerit. Phasellus vel lacus lacinia, aliquet ligula in, venenatis quam. Integer dapibus turpis eu erat malesuada mattis. Donec pretium, lacus sit amet dapibus consectetur, erat leo vestibulum mi, ut semper nibh urna id nisi. Vestibulum et purus eros. Fusce tempus nec diam vel venenatis. Aliquam posuere eleifend tortor et placerat. Donec et pharetra erat. Aenean lacus tortor, pretium ac lectus ut, ultrices dignissim diam. Quisque nibh enim, vulputate sit amet nulla eget, porta sodales massa. Donec sed augue sed nisl gravida blandit. Duis risus velit, sollicitudin a nisl quis, pretium molestie lacus."
		req.session.data['plan-supported'] = "Donec vel venenatis nulla, at maximus enim. Donec tempor massa odio, sed malesuada velit tempus nec. Proin feugiat purus vel cursus consequat. In suscipit sodales ipsum id accumsan. Cras vel ex finibus, hendrerit libero nec, ultrices turpis. Ut arcu urna, aliquam a mi eu, blandit varius magna. Phasellus luctus orci non augue cursus, et condimentum justo dignissim. Aenean ut magna mauris. Morbi iaculis varius lorem in facilisis. Suspendisse eget tellus sit amet magna feugiat interdum. Donec dictum nisi tellus, ac egestas neque lacinia ut. Fusce sed metus sodales, interdum mauris at, finibus arcu. Praesent molestie felis vel tortor mattis pellentesque. Nunc id nisi ut enim accumsan pulvinar et non tortor. Ut luctus nulla id mattis posuere. Proin scelerisque at quam a blandit. Aenean sit amet magna eros. Aenean at risus viverra diam eleifend scelerisque at at nibh."
		req.session.data['plan-type'] = ["Apprenticeship standards"]
		req.session.data['plan-address-county'] = "Northants"
		req.session.data['plan-address-line1'] = "123"
		req.session.data['plan-address-line2'] = "Main road"
		req.session.data['plan-address-postcode'] = "NN1 6AA"
		req.session.data['plan-address-town'] = "Northampton"
		req.session.data['pro-itt'] = "Yes"
		req.session.data['pro-ofsted-apprenticeships'] = "No"
		req.session.data['pro-ofsted-feskills'] = "Yes"
		req.session.data['pro-ofsted-overall-date'] = "No"
		req.session.data['pro-ofsted-overall-fundingmaintained'] = "No"
		req.session.data['pro-ofsted-overall-grade'] = "Good"
		req.session.data['pro-ofsted-overall-grademaintained'] = "Yes"
		req.session.data['pro-ofsted-overall-shortinspection'] = "Yes"
		req.session.data['pro-postgrad'] = "No"
		req.session.data['rte-assessenglishmaths'] = "Nam laoreet velit ac accumsan maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla suscipit sapien ut massa elementum malesuada. Morbi quis nulla maximus, molestie magna et, eleifend urna. Donec ut sapien sit amet lacus scelerisque vehicula. Aenean vitae lacus ligula. Fusce nec vestibulum massa. Nulla facilisi. Suspendisse enim dui, blandit at sapien pharetra, tempor eleifend nisi. Nunc sit amet maximus enim, in volutpat massa. Nullam eros nibh, accumsan in volutpat eu, interdum at sapien. Phasellus vestibulum ligula non purus malesuada lacinia. Morbi non nibh bibendum, mollis mi rhoncus, interdum nibh. Nam sodales ullamcorper enim, bibendum consectetur diam viverra ac. Vivamus efficitur, est sed luctus pretium, diam velit dignissim est, quis condimentum odio nunc ac felis. Vestibulum sit amet quam aliquet, congue leo id, ullamcorper lorem. Maecenas luctus, dui vitae vestibulum ultrices, ante odio tempus est, eu finibus neque lacus quis tortor. Vivamus id eros sapien. Ut cursus lorem in eros laoreet imperdiet. Nam non justo ipsum. Duis lobortis leo vel faucibus faucibus. Morbi quis neque aliquet, suscipit tortor non, dapibus odio. Maecenas tempus rutrum elementum. Praesent risus enim, ultricies nec mollis eget, luctus quis tortor. Suspendisse ut aliquam quam, sed mollis leo. Quisque vehicula viverra rhoncus. Ut blandit eros sit amet libero pulvinar, in vehicula tortor hendrerit. Duis ullamcorper rhoncus odio at aliquet."
		req.session.data['rte-complaints'] = ""
		req.session.data['rte-complaints-link'] = "www.example.com/complaintspolicy"
		req.session.data['rte-contractforservices'] = ""
		req.session.data['rte-engaged'] = "Yes"
		req.session.data['rte-managingrelationships'] = "Yes"
		req.session.data['rte-priorlearning'] = "Curabitur gravida at mauris vitae tristique. In sit amet tellus ut odio ultrices aliquam eu at leo. Quisque nec ornare purus. Aenean massa augue, egestas a mi eget, ornare lacinia mauris. Nam pretium arcu justo, id venenatis mi rutrum non. Cras scelerisque consectetur sem, in pharetra metus maximus a. Fusce elit dolor, tempus eu maximus in, vehicula et ipsum. Quisque vitae nunc in dolor feugiat gravida. Sed et lobortis dolor. Etiam vitae magna at diam pellentesque mattis."
		req.session.data['rte-relationships'] = "Praesent elementum, tortor vel luctus interdum, ante odio laoreet ante, ac pretium nibh orci vitae tellus. Integer quis eros sit amet felis pharetra molestie. Donec eget erat eros. Nullam in augue ipsum. Mauris convallis feugiat porttitor. Nulla non scelerisque mauris, ut condimentum nulla. Curabitur vitae aliquet libero."
		req.session.data['rte-usesubcontractors'] = "No"
		req.session.data['signedin'] = "yes"
		req.session.data['tl_dec_intro'] = "completed"
		req.session.data['tl_dec_organisation'] = "completed"
		req.session.data['tl_dec_people'] = "completed"
		req.session.data['tl_dec_peopleintro'] = "completed"
		req.session.data['tl_del_accountability'] = "completed"
		req.session.data['tl_del_developdeliver'] = "completed"
		req.session.data['tl_del_development'] = "completed"
		req.session.data['tl_del_expectations'] = "completed"
		req.session.data['tl_del_hierarchy'] = "completed"
		req.session.data['tl_del_intro'] = "completed"
		//req.session.data['tl_del_sectors'] = "completed"
		req.session.data['tl_eval_apprenticeships'] = "completed"
		req.session.data['tl_eval_collectdata'] = "completed"
		req.session.data['tl_eval_ilr'] = "completed"
		req.session.data['tl_eval_intro'] = "completed"
		req.session.data['tl_eval_training'] = "completed"
		req.session.data['tl_fin_intro'] = "completed"
		req.session.data['tl_fin_parent'] = "completed"
		req.session.data['tl_fin_upload'] = "completed"
		req.session.data['tl_finish_permission'] = "completed"
		req.session.data['tl_finish_yourdetails'] = "completed"
		req.session.data['tl_org_details'] = "completed"
		req.session.data['tl_org_intro'] = "completed"
		req.session.data['tl_org_people'] = "completed"
		req.session.data['tl_org_profile'] = "completed"
		req.session.data['tl_ukparentcompany'] = "completed"
		req.session.data['tl_org_type'] = "completed"
		req.session.data['tl_plan_address'] = "completed"
		req.session.data['tl_plan_contact'] = "completed"
		req.session.data['tl_plan_forecasting'] = "completed"
		req.session.data['tl_plan_intro'] = "completed"
		req.session.data['tl_plan_offthejob'] = "completed"
		//req.session.data['tl_plan_supporting'] = "completed"
		req.session.data['tl_plan_type'] = "completed"
		//req.session.data['tl_profile_ofsted'] = "next"
		req.session.data['tl_rte_commitment'] = "completed"
		req.session.data['tl_rte_complaints'] = "completed"
		req.session.data['tl_rte_contractforservices'] = "completed"
		req.session.data['tl_rte_engagement'] = "completed"
		req.session.data['tl_rte_intro'] = "completed"
		req.session.data['tl_rte_priorlearning'] = "completed"
		req.session.data['tl_rte_subcontractors'] = "completed"
		req.session.data['tl_selectroute'] = "completed"
		req.session.data['tl_wel_continuity'] = "completed"
		req.session.data['tl_wel_diversity'] = "completed"
		req.session.data['tl_wel_healthandsafety'] = "completed"
		req.session.data['tl_wel_intro'] = "completed"
		//req.session.data['tl_wel_preventduty'] = "completed"
		req.session.data['tl_wel_safeguarding'] = "completed"
		req.session.data['wel-continuity'] = ""
		req.session.data['wel-diversity'] = ""
		req.session.data['wel-healthandsafety'] = ""
		req.session.data['wel-healthandsafetyresponsible-email'] = "pete@jones.com"
		req.session.data['wel-healthandsafetyresponsible-name'] = "Pete Jones"
		req.session.data['wel-healthandsafetyresponsible-tel'] = "0998765654"
		req.session.data['wel-preventduty'] = "Yes"
		req.session.data['wel-safeguarding'] = ""
		req.session.data['wel-safeguardingresponsible-email'] = "john@smith.com"
		req.session.data['wel-safeguardingresponsible-name'] = "John Smith"
		req.session.data['wel-safeguardingresponsible-tel'] = "01234987654"
		res.redirect('/application/' + v + '/task-list')
	})

	// Application completed (including Finish section) - main provider...
	router.get('/application/' + v + '/jump/cya', function (req,res) {
		req.session.data['current_sector_id'] = "0"
		req.session.data['dec-org-contractterminated'] = "No"
		req.session.data['dec-org-contractterminated-detail'] = ""
		req.session.data['dec-org-debt'] = "No"
		req.session.data['dec-org-debt-detail'] = ""
		req.session.data['dec-org-fundingremoved'] = "No"
		req.session.data['dec-org-fundingremoved-detail'] = ""
		req.session.data['dec-org-insolvency'] = "No"
		req.session.data['dec-org-insolvency-detail'] = ""
		req.session.data['dec-org-ittwithdrawal'] = "No"
		req.session.data['dec-org-ittwithdrawal-detail'] = ""
		req.session.data['dec-org-repayfunding'] = "No"
		req.session.data['dec-org-repayfunding-detail'] = ""
		req.session.data['dec-org-roto'] = "No"
		req.session.data['dec-org-roto-detail'] = ""
		req.session.data['dec-org-safeguarding'] = "No"
		req.session.data['dec-org-safeguarding-detail'] = ""
		req.session.data['dec-org-traderegister'] = "No"
		req.session.data['dec-org-traderegister-detail'] = ""
		req.session.data['dec-org-whistleblowing'] = "No"
		req.session.data['dec-org-whistleblowing-detail'] = ""
		req.session.data['dec-org-withdrawncontract'] = "No"
		req.session.data['dec-org-withdrawncontract-detail'] = ""
		req.session.data['dec-people-bankrupt'] = "No"
		req.session.data['dec-people-bankrupt-detail'] = ""
		req.session.data['dec-people-charityregister'] = "No"
		req.session.data['dec-people-charityregister-detail'] = ""
		req.session.data['dec-people-contractterminated'] = "No"
		req.session.data['dec-people-contractterminated-detail'] = ""
		req.session.data['dec-people-convictions'] = "No"
		req.session.data['dec-people-convictions-detail'] = ""
		req.session.data['dec-people-fraud'] = "No"
		req.session.data['dec-people-fraud-detail'] = ""
		req.session.data['dec-people-fraudongoing'] = "No"
		req.session.data['dec-people-fraudongoing-detail'] = ""
		req.session.data['dec-people-insolvency'] = "No"
		req.session.data['dec-people-repayfunding'] = "No"
		req.session.data['dec-people-repayfunding-detail'] = ""
		req.session.data['dec-people-taxpayments'] = "No"
		req.session.data['dec-people-taxpayments-detail'] = ""
		req.session.data['dec-people-trusteeregister'] = "No"
		req.session.data['dec-people-trusteeregister-detail'] = ""
		req.session.data['dec-people-withdrawncontract'] = "No"
		req.session.data['dec-people-withdrawncontract-detail'] = ""
		req.session.data['del-developdeliver'] = "Yes"
		req.session.data['del-developdeliver-howworkedwith'] = "Vestibulum placerat facilisis dui a sodales. Nulla ac tellus ultrices, pulvinar magna vitae, ullamcorper tellus. Aenean tempus massa id nisl luctus, ac tristique ipsum facilisis. Donec ultricies tortor velit, et efficitur enim efficitur sed. Etiam luctus pharetra nisi eget tempus."
		req.session.data['del-developdeliver-overallaccountability-name'] = "Anne Peters"
		req.session.data['del-developdeliver-overallaccountability-email'] = "anne@peters.com"
		req.session.data['del-developdeliver-overallaccountability-number'] = "657483902"
		req.session.data['del-developdeliver-overallmanager'] = "Steven Collins"
		req.session.data['del-developdeliver-overallmanager-experience'] = "Over 18 months"
		req.session.data['del-developdeliver-workedwith'] = "Other organisations"
		req.session.data['del-development-implemented'] = "Sed in porttitor sapien. Nullam at urna vitae leo maximus interdum. Nunc elementum urna augue, ut feugiat justo rhoncus quis. Ut convallis sagittis ullamcorper. In hac habitasse platea dictumst. Donec tristique diam ac nisl mattis, a lacinia libero sodales. Duis porttitor lorem lorem, ut porta leo fringilla ac. Donec porta a massa in bibendum. Nam placerat ipsum nisl, at porttitor velit ultrices eget. Phasellus et justo orci. Etiam feugiat tortor tellus, vitae vulputate felis tristique nec. Sed interdum dolor sit amet felis posuere, in scelerisque nisl vehicula."
		req.session.data['del-development-reflected'] = "Maecenas ac ligula ut magna ornare ullamcorper. Proin velit lorem, blandit nec tellus sit amet, ultrices luctus ligula. Maecenas mattis, ex a euismod placerat, urna lorem tristique velit, nec malesuada nibh orci eu nisl. Mauris aliquet ipsum eu felis malesuada, sed lacinia mauris rhoncus. Praesent pharetra eget nisi ut pretium. Sed auctor tincidunt ante, non suscipit mi. Vivamus imperdiet gravida dui dictum bibendum. Fusce non ante tristique, semper metus ut, commodo magna. Nullam et aliquet nibh. Sed augue lectus, viverra feugiat magna vitae, facilisis lacinia mi. Suspendisse euismod hendrerit nisi, vitae pretium lorem semper vitae."
		req.session.data['del-employee'] = [
			{
				sector_id: "0",
				name: "Samantha Pearson",
				job_role: "Chief Design Officer",
				timeinrole_years: "4",
				timeinrole_months: "2"
			},
			{
				sector_id: "1",
				name: "Jessica Willmott",
				job_role: "Head of Digital",
				timeinrole_years: "5",
				timeinrole_months: "11"
			}
		]
		req.session.data['del-expectations'] = "Yes"
		req.session.data['del-expectations-comminicated'] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices lacinia leo, sollicitudin elementum neque. Nullam in blandit mauris. Aliquam vitae euismod risus. Aenean venenatis efficitur nibh quis pharetra. Vestibulum non orci eu mi semper laoreet. Morbi non erat sed tortor consequat tincidunt. Nam quam dolor, imperdiet eu neque sed, condimentum euismod nibh. Duis blandit risus mauris, ut efficitur lectus interdum facilisis. Aliquam at elit finibus, posuere tellus eget, pulvinar lectus. Vestibulum dignissim condimentum dolor, at scelerisque nibh dignissim eget. Fusce tempus sed massa in lobortis. Nulla id orci vel nisi ultrices egestas sit amet sit amet lacus. Integer vehicula purus at dui fringilla, eu placerat nibh eleifend. Nam dignissim erat eu iaculis consectetur. Suspendisse pellentesque augue vehicula nibh tristique dignissim. Nulla mattis, purus et tincidunt euismod, nisl lacus cursus metus, in mattis augue nulla eget dolor. In fringilla arcu non augue vestibulum, quis tincidunt dui feugiat. Phasellus at rutrum lorem. Etiam tempus orci in ultrices fermentum. Maecenas vel dolor rutrum, consequat ligula vitae, blandit metus. Cras imperdiet libero tempus, elementum est ac, placerat elit. Phasellus gravida sapien eu elementum pellentesque. Sed molestie, enim vitae convallis fermentum, dui mauris blandit lorem, nec ultricies lectus est nec lectus. In nec metus enim. Nunc sit amet pharetra eros. Curabitur in commodo magna."
		req.session.data['del-expectations-responsible-name'] = "Jeff Hall"
		req.session.data['del-expectations-responsible-email'] = "jeff@hall.com"
		req.session.data['del-expectations-responsible-number'] = "07625 376223"
		req.session.data['del-expectations-upload'] = ""
		req.session.data['del-hierarchy-person'] = [
			{
				name: "Michael Downes",
				job_role: "Head of Apprenticeships",
				time_in_role: "2.5 years",
				report_to: "CEO Percy Quinn",
				org_funding: "No"
			},{
				name: "Andrew Moyles",
				job_role: "CFO",
				time_in_role: "8 months",
				report_to: "CEO Percy Quinn",
				org_funding: "No"
			}
		]
		req.session.data['del-professional-development'] = ""
		req.session.data['del-sectors'] = ["Creative and design","Digital"]
		req.session.data['end-permission-commercial'] = "No"
		req.session.data['end-permission-named'] = ["Yes"]
		req.session.data['end-permission-submit'] = ["Yes"]
		req.session.data['end-yourdetails-email'] = "charles@peterson.com"
		req.session.data['end-yourdetails-name'] = "Charles Peterson"
		req.session.data['end-yourdetails-number'] = "07755 443322"
		req.session.data['eval-apprenticeships'] = "Yes"
		req.session.data['eval-collectdata'] = "Yes"
		req.session.data['eval-ilr'] = "Yes"
		req.session.data['eval-training'] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis porta magna. Aliquam ornare justo id placerat fringilla. Nunc metus justo, consequat sed neque sit amet, mattis vehicula justo. Phasellus vulputate ipsum a auctor convallis. Sed laoreet imperdiet est et hendrerit. Nam aliquet dolor sit amet ornare euismod. Aenean consectetur varius justo sed malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras dolor turpis, facilisis vitae scelerisque congue, interdum at massa."
		req.session.data['eval-training-improvements'] = "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer sit amet fringilla tortor, tristique hendrerit nunc. In eget libero metus. Curabitur in eleifend risus. Maecenas libero tellus, aliquet eget ex nec, luctus imperdiet mi. Nullam a suscipit neque. Morbi feugiat dolor vitae nibh commodo dictum. Nullam quis posuere tellus."
		req.session.data['eval-review'] = "Fusce sed massa quis nibh finibus faucibus. Fusce semper nibh odio, sed luctus nisl egestas eget. In imperdiet malesuada risus, id varius justo condimentum eget. Fusce porttitor mi at diam aliquet, sed dignissim metus ornare. Mauris convallis molestie eros, eget tempor nunc commodo ac. Fusce id eros lobortis sem aliquet pulvinar a at turpis. Duis cursus interdum nisi at euismod. Ut ornare mauris ac molestie euismod. Sed nulla eros, auctor non rhoncus non, tristique ac purus. Nam luctus odio et libero viverra, non malesuada velit consectetur. Nulla sed interdum massa, non malesuada odio. Pellentesque ut faucibus magna. Integer ornare ligula leo, eget feugiat ante porta nec. Praesent vitae imperdiet ex. Aliquam pharetra massa sollicitudin nulla facilisis finibus."
		req.session.data['exempt_fha'] = "no"
		req.session.data['fin-finstatements-upload'] = ""
		req.session.data['fin-fullstatements'] = "Yes"
		req.session.data['fin-managementaccounts-upload'] = ""
		req.session.data['fin-whoprepared'] = ["An employee in your organisation"]
		req.session.data['gethelp'] = ""
		req.session.data['org-classification'] = ["None of the above"]
		req.session.data['org-ico'] = "12345678"
		req.session.data['org-parentcompany'] = "Yes"
		req.session.data['org-parentcompany-name'] = "Parent Company Limited"
		req.session.data['org-parentcompany-number'] = "89987987"
		req.session.data['org-selectedroute'] = "main"
		req.session.data['org-trading'] = "More than 23 months"
		req.session.data['org-type'] = "An employer training apprentices in other organisations"
		req.session.data['org-type-psb'] = "NHS Trust"
		req.session.data['org-type-subtype'] = "In your organisation and connected companies or charities"
		req.session.data['org-ukprn'] = "12340102"
		req.session.data['org-website'] = "Yes"
		req.session.data['org-website-address'] = "ourwebsite.com"
		req.session.data['plan-contact-name'] = "David Walker"
		req.session.data['plan-contact-email'] = "david@walker.com"
		req.session.data['plan-engaging'] = "Phasellus tempor, mauris quis maximus condimentum, nisl massa semper mauris, ut imperdiet tortor quam bibendum lectus. Maecenas non massa sodales, mattis erat ut, tempus odio. Donec eleifend nibh sed nunc ultricies vestibulum eu vel est. Donec id nunc pulvinar, cursus felis eget, elementum erat. Duis varius turpis magna, ut luctus ipsum efficitur a. Pellentesque sit amet tortor felis. Aliquam euismod tellus ut augue hendrerit, rhoncus efficitur arcu condimentum. Aliquam ac commodo nibh, vitae finibus metus. Sed et dui eleifend, ultrices ex id, luctus ipsum. Suspendisse porta ipsum ut suscipit egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus vitae commodo mi, at tincidunt dolor. Duis consequat erat id vulputate viverra. Nullam venenatis odio vitae urna consequat gravida."
		req.session.data['plan-forecast-newstaff'] = "Yes"
		req.session.data['plan-forecast-ratio'] = "One trainer between 11 to 29 learners"
		req.session.data['plan-forecast-readytodeliver'] = "Between the first 3 to 6 months of joining RoATP"
		req.session.data['plan-forecast-starts'] = "One to 49"
		req.session.data['plan-otj-method'] = ["Self-directed distance learning - where the apprentice works alone with online material","Learning support and written assignments","Practical training - for example, shadowing, mentoring or industry visits"]
		req.session.data['plan-otj-relevant'] = "Ut in porttitor massa. Phasellus varius in nibh eget consequat. Fusce lorem libero, molestie eu accumsan vel, sodales porta velit. Integer convallis, ipsum accumsan aliquam maximus, arcu leo condimentum nisl, id euismod est nunc vel lacus. Nulla hendrerit, nulla ut fermentum dignissim, arcu est hendrerit massa, at auctor enim lacus ac lacus. Quisque lacinia quis erat eu imperdiet. Vestibulum fringilla mauris nec finibus congue. Phasellus vel mollis lacus. Pellentesque ac ligula quis augue maximus dictum et non magna. In facilisis ante vel sollicitudin volutpat. Nulla facilisi. Nunc ac erat sapien. Donec vehicula sem tellus, eu tincidunt erat suscipit ut. Duis tincidunt elit et turpis sollicitudin ultricies. In eu mi libero. Nunc eu dolor vel nisi tristique varius sit amet non purus. Sed quam elit, dapibus id est id, laoreet suscipit arcu. Mauris dictum et magna quis interdum."
		req.session.data['plan-readytodeliver'] = "Nullam eget est sagittis erat mattis ultrices. Mauris efficitur lacus lacinia lorem pretium accumsan. Nam pulvinar ornare enim, ac varius eros vestibulum eu. Donec at risus eu nisi consectetur hendrerit. Phasellus vel lacus lacinia, aliquet ligula in, venenatis quam. Integer dapibus turpis eu erat malesuada mattis. Donec pretium, lacus sit amet dapibus consectetur, erat leo vestibulum mi, ut semper nibh urna id nisi. Vestibulum et purus eros. Fusce tempus nec diam vel venenatis. Aliquam posuere eleifend tortor et placerat. Donec et pharetra erat. Aenean lacus tortor, pretium ac lectus ut, ultrices dignissim diam. Quisque nibh enim, vulputate sit amet nulla eget, porta sodales massa. Donec sed augue sed nisl gravida blandit. Duis risus velit, sollicitudin a nisl quis, pretium molestie lacus."
		req.session.data['plan-supported'] = "Donec vel venenatis nulla, at maximus enim. Donec tempor massa odio, sed malesuada velit tempus nec. Proin feugiat purus vel cursus consequat. In suscipit sodales ipsum id accumsan. Cras vel ex finibus, hendrerit libero nec, ultrices turpis. Ut arcu urna, aliquam a mi eu, blandit varius magna. Phasellus luctus orci non augue cursus, et condimentum justo dignissim. Aenean ut magna mauris. Morbi iaculis varius lorem in facilisis. Suspendisse eget tellus sit amet magna feugiat interdum. Donec dictum nisi tellus, ac egestas neque lacinia ut. Fusce sed metus sodales, interdum mauris at, finibus arcu. Praesent molestie felis vel tortor mattis pellentesque. Nunc id nisi ut enim accumsan pulvinar et non tortor. Ut luctus nulla id mattis posuere. Proin scelerisque at quam a blandit. Aenean sit amet magna eros. Aenean at risus viverra diam eleifend scelerisque at at nibh."
		req.session.data['plan-type'] = ["Apprenticeship standards"]
		req.session.data['plan-address-county'] = "Northants"
		req.session.data['plan-address-line1'] = "123"
		req.session.data['plan-address-line2'] = "Main road"
		req.session.data['plan-address-postcode'] = "NN1 6AA"
		req.session.data['plan-address-town'] = "Northampton"
		req.session.data['pro-itt'] = "Yes"
		req.session.data['pro-ofsted-apprenticeships'] = "No"
		req.session.data['pro-ofsted-feskills'] = "Yes"
		req.session.data['pro-ofsted-overall-date'] = "No"
		req.session.data['pro-ofsted-overall-fundingmaintained'] = "No"
		req.session.data['pro-ofsted-overall-grade'] = "Good"
		req.session.data['pro-ofsted-overall-grademaintained'] = "Yes"
		req.session.data['pro-ofsted-overall-shortinspection'] = "Yes"
		req.session.data['pro-postgrad'] = "No"
		req.session.data['rte-assessenglishmaths'] = "Nam laoreet velit ac accumsan maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla suscipit sapien ut massa elementum malesuada. Morbi quis nulla maximus, molestie magna et, eleifend urna. Donec ut sapien sit amet lacus scelerisque vehicula. Aenean vitae lacus ligula. Fusce nec vestibulum massa. Nulla facilisi. Suspendisse enim dui, blandit at sapien pharetra, tempor eleifend nisi. Nunc sit amet maximus enim, in volutpat massa. Nullam eros nibh, accumsan in volutpat eu, interdum at sapien. Phasellus vestibulum ligula non purus malesuada lacinia. Morbi non nibh bibendum, mollis mi rhoncus, interdum nibh. Nam sodales ullamcorper enim, bibendum consectetur diam viverra ac. Vivamus efficitur, est sed luctus pretium, diam velit dignissim est, quis condimentum odio nunc ac felis. Vestibulum sit amet quam aliquet, congue leo id, ullamcorper lorem. Maecenas luctus, dui vitae vestibulum ultrices, ante odio tempus est, eu finibus neque lacus quis tortor. Vivamus id eros sapien. Ut cursus lorem in eros laoreet imperdiet. Nam non justo ipsum. Duis lobortis leo vel faucibus faucibus. Morbi quis neque aliquet, suscipit tortor non, dapibus odio. Maecenas tempus rutrum elementum. Praesent risus enim, ultricies nec mollis eget, luctus quis tortor. Suspendisse ut aliquam quam, sed mollis leo. Quisque vehicula viverra rhoncus. Ut blandit eros sit amet libero pulvinar, in vehicula tortor hendrerit. Duis ullamcorper rhoncus odio at aliquet."
		req.session.data['rte-complaints'] = ""
		req.session.data['rte-complaints-link'] = "www.example.com/complaintspolicy"
		req.session.data['rte-contractforservices'] = ""
		req.session.data['rte-engaged'] = "Yes"
		req.session.data['rte-managingrelationships'] = "Yes"
		req.session.data['rte-priorlearning'] = "Curabitur gravida at mauris vitae tristique. In sit amet tellus ut odio ultrices aliquam eu at leo. Quisque nec ornare purus. Aenean massa augue, egestas a mi eget, ornare lacinia mauris. Nam pretium arcu justo, id venenatis mi rutrum non. Cras scelerisque consectetur sem, in pharetra metus maximus a. Fusce elit dolor, tempus eu maximus in, vehicula et ipsum. Quisque vitae nunc in dolor feugiat gravida. Sed et lobortis dolor. Etiam vitae magna at diam pellentesque mattis."
		req.session.data['rte-relationships'] = "Praesent elementum, tortor vel luctus interdum, ante odio laoreet ante, ac pretium nibh orci vitae tellus. Integer quis eros sit amet felis pharetra molestie. Donec eget erat eros. Nullam in augue ipsum. Mauris convallis feugiat porttitor. Nulla non scelerisque mauris, ut condimentum nulla. Curabitur vitae aliquet libero."
		req.session.data['rte-usesubcontractors'] = "No"
		req.session.data['signedin'] = "yes"
		req.session.data['tl_dec_intro'] = "completed"
		req.session.data['tl_dec_organisation'] = "completed"
		req.session.data['tl_dec_people'] = "completed"
		req.session.data['tl_dec_peopleintro'] = "completed"
		req.session.data['tl_del_accountability'] = "completed"
		req.session.data['tl_del_developdeliver'] = "completed"
		req.session.data['tl_del_development'] = "completed"
		req.session.data['tl_del_expectations'] = "completed"
		req.session.data['tl_del_hierarchy'] = "completed"
		req.session.data['tl_del_intro'] = "completed"
		req.session.data['tl_del_sectors'] = "completed"
		req.session.data['tl_eval_apprenticeships'] = "completed"
		req.session.data['tl_eval_collectdata'] = "completed"
		req.session.data['tl_eval_ilr'] = "completed"
		req.session.data['tl_eval_intro'] = "completed"
		req.session.data['tl_eval_training'] = "completed"
		req.session.data['tl_fin_intro'] = "completed"
		req.session.data['tl_fin_upload'] = "completed"
		req.session.data['tl_finish_permission'] = "completed"
		req.session.data['tl_finish_yourdetails'] = "completed"
		req.session.data['tl_org_details'] = "completed"
		req.session.data['tl_org_intro'] = "completed"
		req.session.data['tl_org_people'] = "completed"
		req.session.data['tl_org_profile'] = "completed"
		req.session.data['tl_org_type'] = "completed"
		req.session.data['tl_plan_address'] = "completed"
		req.session.data['tl_plan_contact'] = "completed"
		req.session.data['tl_plan_forecasting'] = "completed"
		req.session.data['tl_plan_intro'] = "completed"
		req.session.data['tl_plan_offthejob'] = "completed"
		//req.session.data['tl_plan_supporting'] = "completed"
		req.session.data['tl_plan_type'] = "completed"
		//req.session.data['tl_profile_ofsted'] = "next"
		req.session.data['tl_rte_commitment'] = "completed"
		req.session.data['tl_rte_complaints'] = "completed"
		req.session.data['tl_rte_contractforservices'] = "completed"
		req.session.data['tl_rte_engagement'] = "completed"
		req.session.data['tl_rte_intro'] = "completed"
		req.session.data['tl_rte_priorlearning'] = "completed"
		req.session.data['tl_rte_subcontractors'] = "completed"
		req.session.data['tl_selectroute'] = "completed"
		req.session.data['tl_wel_continuity'] = "completed"
		req.session.data['tl_wel_diversity'] = "completed"
		req.session.data['tl_wel_healthandsafety'] = "completed"
		req.session.data['tl_wel_intro'] = "completed"
		//req.session.data['tl_wel_preventduty'] = "completed"
		req.session.data['tl_wel_safeguarding'] = "completed"
		req.session.data['wel-continuity'] = ""
		req.session.data['wel-diversity'] = ""
		req.session.data['wel-healthandsafety'] = ""
		req.session.data['wel-healthandsafetyresponsible-email'] = "pete@jones.com"
		req.session.data['wel-healthandsafetyresponsible-name'] = "Pete Jones"
		req.session.data['wel-healthandsafetyresponsible-tel'] = "0998765654"
		req.session.data['wel-preventduty'] = "Yes"
		req.session.data['wel-safeguarding'] = ""
		req.session.data['wel-safeguardingresponsible-email'] = "john@smith.com"
		req.session.data['wel-safeguardingresponsible-name'] = "John Smith"
		req.session.data['wel-safeguardingresponsible-tel'] = "01234987654"
		res.redirect('/application/' + v + '/checkyouranswers')
	})

	// Application completed (including Finish section) - main provider...
	router.get('/application/' + v + '/jump/dashboard', function (req,res) {
		req.session.data['signedin'] = "yes"
		req.session.data['application_status'] = "dashboard"
		res.redirect('/application/' + v + '/dashboard')
	})
	

/************************
 *** Have an account? ***
 ************************/

	router.post('/application/' + v + '/haveanaccount', function (req, res) {
		if (req.session.data['haveanaccount'] == "No" ){
			res.redirect('/application/' + v + '/signin')
		} else {
			res.redirect('/application/' + v + '/createaccount')
		}
	})

/**********************
 *** Create account ***
 **********************/

	router.post('/application/' + v + '/createaccount', function (req, res) {
/*
		notify.sendEmail(
			// this long string is the template ID, copy it from the template
			// page in GOV.UK Notify. It’s not a secret so it’s fine to put it
			// in your code.
			'43fcf9ee-6f62-47f4-ad88-4514a3ee23e7',
			// `emailAddress` here needs to match the name of the form field in
			// your HTML page
			req.body.createEmail
		);
		*/
		res.redirect('/application/' + v + '/createaccount-invitesent')
	})

/**************************
 *** Forgotten password ***
 **************************/

	router.post('/application/' + v + '/forgottenpassword', function (req, res) {
/*
		notify.sendEmail(
			// this long string is the template ID, copy it from the template
			// page in GOV.UK Notify. It’s not a secret so it’s fine to put it
			// in your code.
			'7d0752a2-fe97-4fde-a2ba-596dbb49d93c',
			// `emailAddress` here needs to match the name of the form field in
			// your HTML page
			req.body.forgottenEmail
		);
		*/
		res.redirect('/application/' + v + '/forgottenpassword-sent')
	})


/***************
 *** Sign in ***
 ***************/

	router.post('/application/' + v + '/signin', function (req, res) {

		req.session.data['signedin'] = 'yes'

		// Set default progress on sign in
		// var signinemailtouse = "employer@organisation.parent"
		var signinemailtouse = ""

		if (
			signinemailtouse == "" ||
			req.session.data['signin-email'] == "skip@ofsted" ||
			req.session.data['signin-email'] == "skip@organisation" ||
			req.session.data['signin-email'] == "main@organisation.parent" ||
			req.session.data['signin-email'] == "employer@organisation.parent" ||
			req.session.data['signin-email'] == "supporting@organisation.parent"
		){
			signinemailtouse = req.session.data['signin-email']
		}

		if (signinemailtouse == "skip@ofsted") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "No"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = "12 to 18 months"
			req.session.data['org-type'] = "An employer training apprentices in other organisations"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "next"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_profile_ofsted'] = "next"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')
		} else if (signinemailtouse == "skip@organisation") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "No"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = "12 to 18 months"
			req.session.data['org-type'] = "An employer training apprentices in other organisations"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['pro-itt'] = "No"
			req.session.data['pro-monitoring-visit'] = "No"
			req.session.data['pro-ofsted-feskills'] = "No"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')
		} else if (signinemailtouse == "main@organisation.parent") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "Yes"
			req.session.data['org-parentcompany-name'] = "Parent Company Limited"
			req.session.data['org-parentcompany-number'] = "89987987"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['org-trading'] = "12 to 18 months"
			req.session.data['org-type'] = "An employer training apprentices in other organisations"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['pro-itt'] = "No"
			req.session.data['pro-monitoring-visit'] = "No"
			req.session.data['pro-ofsted-feskills'] = "No"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')
		} else if (signinemailtouse == "employer@organisation.parent") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "Yes"
			req.session.data['org-parentcompany-name'] = "Parent Company Limited"
			req.session.data['org-parentcompany-number'] = "89987987"
			req.session.data['org-selectedroute'] = "employer"
			req.session.data['org-trading'] = "12 to 18 months"
			req.session.data['org-type'] = "An employer training apprentices in other organisations"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['pro-itt'] = "no"
			req.session.data['pro-monitoring-visit'] = "No"
			req.session.data['pro-ofsted-feskills'] = "No"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')
		} else if (signinemailtouse == "supporting@organisation.parent") {
			req.session.data['exempt_fha'] = "no"
			req.session.data['org-classification'] = "none"
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "Yes"
			req.session.data['org-parentcompany-name'] = "Parent Company Limited"
			req.session.data['org-parentcompany-number'] = "89987987"
			req.session.data['org-selectedroute'] = "supporting"
			req.session.data['org-trading'] = "3 to 6 months"
			req.session.data['org-type'] = "An employer training apprentices in other organisations"
			req.session.data['org-ukprn'] = "12340101"
			req.session.data['pro-itt'] = "No"
			req.session.data['pro-monitoring-visit'] = "No"
			req.session.data['pro-ofsted-feskills'] = "No"
			req.session.data['signedin'] = "yes"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_profile'] = "completed"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_selectroute'] = "completed"
			res.redirect('/application/' + v + '/task-list')

		} else {
			res.redirect('/application/' + v + '/coa')
		}

	})

	router.get('/application/' + v + '/signout', function (req, res) {
		req.session.data['signedin'] = "no"
		if (req.session.data['application_status']){
			res.redirect('/application/' + v + '/signedout')
		} else {
			res.redirect('/application/' + v + '/saveandsignout')
		}
	})


/****************
 *** Preamble ***
 ****************/

	router.post('/application/' + v + '/coa', function (req, res) {
		if (req.session.data['coa-accept'] == "Yes") {
			res.redirect('/application/' + v + '/ukprn')
		} else {
			res.redirect('/application/' + v + '/coa-notaccepted')
		}
	})

	// UKPRN?
	router.post('/application/' + v + '/ukprn', function (req, res) {

		let org_ukprn = req.session.data['org-ukprn']

	// companies
		if (org_ukprn === '12340101') { // Company - Happy Path
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
		} else if (org_ukprn === '12340102') { // Company - Active with no website
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
		} else if (org_ukprn === '12340103') { // Company - Active with no directors
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
	// charities
		} else if (org_ukprn === '12340201') { // Company - Also a charity
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
		} else if (org_ukprn === '12340202') { // Charity only, not a company
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
		} else if (org_ukprn === '12340203') { // Charity with no trustees listed
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
	// sole traders and partnerships
		} else if (org_ukprn === '12340301') { // Not a company (sole trader or partnership)
			res.redirect('/application/' + v + '/ukprn-confirmdetails')
	// ineligible
		} else if (org_ukprn === '12340401') { // Company - Inactive
			res.redirect('/application/' + v + '/shutter/ukprn-inactivecompany')
		} else if (org_ukprn === '12340402') { // Company - Already on register (no option to change route)
			res.redirect('/application/' + v + '/shutter/ukprn-onregister')
		} else if (org_ukprn === '12340403') { // Incorporation date less than 12 months ago (3 months for supporting)
			res.redirect('/application/' + v + '/shutter/incorporation')
		} else if (org_ukprn === '12340404') { // Removed from register
			res.redirect('/application/' + v + '/shutter/removed')
		} else if (org_ukprn === '12340405') { // Organisation already on register as a supporting provider
			res.redirect('/application/' + v + '/ukprn-onregister')
		} else if (org_ukprn === '12340406') { // Application already submitted for UKPRN
			res.redirect('/application/' + v + '/shutter/ukprn-applicationsubmitted')
		} else if (org_ukprn === '12340407') { // Application already exists for UKPRN
			res.redirect('/application/' + v + '/shutter/ukprn-applicationexists')
	// error page
		} else {
			res.redirect('/application/' + v + '/ukprn-error')
		}
	})

	// Confirm company details
	router.post('/application/' + v + '/ukprn-confirmdetails', function (req, res) {
		res.redirect('/application/' + v + '/select-route')
	})

	// Organisation already on register as a supporting provider
	router.post('/application/' + v + '/ukprn-onregister', function (req, res) {
		if (req.session.data['ukprn-onregister'] == "Yes"){
			res.redirect('/application/' + v + '/select-route')
		} else {
			res.redirect('/application/' + v + '/shutter/ukprn-supportingonregister')
		}
	})

	// Select route
	router.post('/application/' + v + '/select-route', function (req, res) {

		let selected_route = req.session.data['org-selectedroute']

		if (selected_route != '') {
			if (selected_route == "employer"){
				res.redirect('/application/' + v + '/select-route-employer')
			} else {
				//req.session.data['tl_selectroute'] = 'completed'
				//req.session.data['tl_org_intro'] = 'next'
				res.redirect('/application/' + v + '/task-list')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/select-route')
		}
		
	})

	// Select route - if employer
	router.post('/application/' + v + '/select-route-employer', function (req, res) {
		if (req.session.data['org-selectedroute-employer'] == "Yes"){
			res.redirect('/application/' + v + '/task-list')
		} else {
			res.redirect('/application/' + v + '/select-route-employer-nonlevy')
		}
	})

	// Select route - if employer and non-levy
	router.post('/application/' + v + '/select-route-employer-nonlevy', function (req, res) {
		if (req.session.data['org-selectedroute-employer-nonlevy'] == "Yes"){
			res.redirect('/application/' + v + '/select-route')
		} else {
			req.session.data['signedin'] = 'no'
			res.redirect('/application/' + v + '/shutter/select-route')
		}
	})


/*****************************
 *** Change UKPRN or route ***
 *****************************/
	
 	// Change UKPRN
	router.post('/application/' + v + '/change-ukprn', function (req, res) {
		if (req.session.data['change-ukprn'] == "Yes"){
			req.session.data = {}
			res.redirect('/application/' + v + '/ukprn')
		} else {
			res.redirect('/application/' + v + '/task-list')
		}
	})
	
	// Change provider route
   router.post('/application/' + v + '/change-route', function (req, res) {
	   if (req.session.data['change-route'] == "Yes"){
		   let storeukprn = req.session.data['org-ukprn']
		   req.session.data = {}
		   req.session.data['org-ukprn'] = storeukprn
		   res.redirect('/application/' + v + '/select-route')
	   } else {
		   res.redirect('/application/' + v + '/task-list')
	   }
   })


/*************************
 *** Your organisation ***
 *************************/

	// Intro and what you'll need
	router.post('/application/' + v + '/organisation/intro', function (req, res) {
		req.session.data['tl_org_intro'] = 'completed'
		req.session.data['tl_org_details'] = 'next'
		res.redirect('/application/' + v + '/task-list#section-organisation')
	})

	// ICO number?
	router.post('/application/' + v + '/organisation/org-ico', function (req, res) {

		let org_ico = req.session.data['org-ico']

		if (req.session.data['org-ukprn'] == "12340102"){
			// Org has no website in UKRLP
			res.redirect('/application/' + v + '/organisation/org-website')
		} else {
			res.redirect('/application/' + v + '/organisation/org-trading')
		}
	})

	// Legal status
	router.post('/application/' + v + '/organisation/org-legalstatus', function (req, res) {

		if (req.session.data['org-legalstatus']) {
			if (req.session.data['org-legalstatus'] === 'Sole trader') {
				res.redirect('/application/' + v + '/organisation/org-legalstatus-sole')
			}
			if (req.session.data['org-legalstatus'] === 'Partnership') {
				res.redirect('/application/' + v + '/organisation/org-legalstatus-partnership')
			}
			if (req.session.data['org-legalstatus'] === 'Public body') {
				/******* TODO ??? - ASK FOR DIRECTORS!!! ********/
				//res.redirect('/application/' + v + '/organisation/org-type')
				res.redirect('/application/' + v + '/organisation/org-legalstatus-publicbody')
			}
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-legalstatus')
		}

	})


	/*** Sole trader ***/

		// Sole trader details
		router.post('/application/' + v + '/organisation/org-legalstatus-sole', function (req, res) {

			if (req.session.data['org-soletrader-dob-month'] && req.session.data['org-soletrader-dob-year'] ) {
				req.session.data['org-soletrader-dob-monthname'] = monthNumToName(req.session.data['org-soletrader-dob-month'])
				res.redirect('/application/' + v + '/organisation/org-legalstatus-sole-confirm')
			} else {
				res.redirect('/application/' + v + '/organisation/error/org-legalstatus-sole')
			}

		})

		// Sole trader details confirmation
		router.post('/application/' + v + '/organisation/org-legalstatus-sole-confirm', function (req, res) {
			res.redirect('/application/' + v + '/organisation/org-type')
		})


	/*** Partnership ***/

		// Partnership details
		router.post('/application/' + v + '/organisation/org-legalstatus-partnership', function (req, res) {

			var newPartner = {
				'name': req.session.data['org-partnership-name'],
				'dob_month': monthNumToName(req.session.data['org-partnership-dob-month']),
				'dob_year': req.session.data['org-partnership-dob-year']
			}

			req.session.data['org-partnership-name'] = null
			req.session.data['org-partnership-dob-month'] = null
			req.session.data['org-partnership-dob-year'] = null

			if (!req.session.data['org-partners']) {
				req.session.data['org-partners'] = []
				var firstPartner = true;
			} else {
				var firstPartner = false;
			}
			req.session.data['org-partners'].push(newPartner)

			if (firstPartner) {
				res.redirect('/application/' + v + '/organisation/org-legalstatus-partnership-choice')
			} else {
				res.redirect('/application/' + v + '/organisation/org-legalstatus-partnership-confirm')
			}

		})

		// Add partner choice
		router.post('/application/' + v + '/organisation/org-legalstatus-partnership-choice', function (req, res) {

			res.redirect('/application/' + v + '/organisation/org-legalstatus-partnership')

		})

		// Confirm partner details
		router.post('/application/' + v + '/organisation/org-legalstatus-partnership-confirm', function (req, res) {
			res.redirect('/application/' + v + '/organisation/org-type')
		})


	/*** Public body ***/

		// Public body details
		router.post('/application/' + v + '/organisation/org-legalstatus-publicbody', function (req, res) {

			var newPBPartner = {
				'name': req.session.data['org-publicbody-name'],
				'dob_month': monthNumToName(req.session.data['org-publicbody-dob-month']),
				'dob_year': req.session.data['org-publicbody-dob-year']
			}

			req.session.data['org-publicbody-name'] = null
			req.session.data['org-publicbody-dob-month'] = null
			req.session.data['org-publicbody-dob-year'] = null

			if (!req.session.data['org-publicbodypartner']) {
				req.session.data['org-publicbodypartner'] = []
			}
			req.session.data['org-publicbodypartner'].push(newPBPartner)

			res.redirect('/application/' + v + '/organisation/org-legalstatus-publicbody-confirm')

		})

		// Confirm partner details
		router.post('/application/' + v + '/organisation/org-legalstatus-publicbody-confirm', function (req, res) {
			res.redirect('/application/' + v + '/organisation/org-type')
		})


	// Website
	router.post('/application/' + v + '/organisation/org-website', function (req, res) {
		if (req.session.data['org-website']) {
			res.redirect('/application/' + v + '/organisation/org-trading')
		} else {
			res.redirect('/application/' + v + '/organisation/error/org-website')
		}
	})

	// Started trading date
	router.post('/application/' + v + '/organisation/org-trading', function (req, res) {

		if (req.session.data['org-trading']) {

			if ( req.session.data['org-trading'] == "Less than 3 months" || req.session.data['org-trading'] == "Less than 12 months") {
				res.redirect('/application/' + v + '/shutter/org-trading')
			} else {
				req.session.data['tl_org_details'] = 'completed'
				req.session.data['tl_org_people'] = 'next'

				if (req.session.data['org-ukprn'] == '12340301') {
					res.redirect('/application/' + v + '/organisation/org-legalstatus')
				} else {
					res.redirect('/application/' + v + '/task-list#section-organisation')
				}
			}

		} else {
			res.redirect('/application/' + v + '/organisation/error/org-trading')
		}

	})


	/*** People in control ***/

		// Missing people in control
		router.post('/application/' + v + '/organisation/org-peopleincontrol-missing', function (req, res) {

			var newMissing = {
				'name': req.session.data['org-personincontrol-name'],
				'dob_month': monthNumToName(req.session.data['org-personincontrol-dob-month']),
				'dob_year': req.session.data['org-personincontrol-dob-year']
			}

			delete req.session.data['org-personincontrol-name']
			delete req.session.data['org-personincontrol-dob-month']
			delete req.session.data['org-personincontrol-dob-year']

			if (!req.session.data['org-personincontrol-missing']) {
				req.session.data['org-personincontrol-missing'] = []
			}
			req.session.data['org-personincontrol-missing'].push(newMissing)

			res.redirect('/application/' + v + '/organisation/org-peopleincontrol-missing-confirm')

		})

		// Confirm missing people in control
		router.post('/application/' + v + '/organisation/org-peopleincontrol-missing-confirm', function (req, res) {
			req.session.data['tl_org_people'] = 'completed'
			req.session.data['tl_org_type'] = 'next'
			res.redirect('/application/' + v + '/task-list#section-organisation')
		})

		router.get('/application/' + v + '/organisation/org-peopleincontrol-remove-route', function (req, res) {
			res.redirect('/application/' + v + '/organisation/org-peopleincontrol-remove')
		})

		// Remove employee to sector
		router.post('/application/' + v + '/organisation/org-peopleincontrol-remove', function (req, res) {
			if (req.session.data['del-employee-remove'] == "Yes"){
				req.session.data['org-personincontrol-missing'].splice(req.session.data['current_pic_id'],1)
			}
			if (req.session.data['org-personincontrol-missing'].length == 0){
				res.redirect('/application/' + v + '/organisation/org-peopleincontrol-missing')
			} else {
				res.redirect('/application/' + v + '/organisation/org-peopleincontrol-missing-confirm')
			}
		})

		// Confirm people in control
		/*
		router.get('/application/' + v + '/organisation/org-peopleincontrol', function (req, res) {
			if (req.session.data['tl_org_profile'] == "completed" && req.session.data['redir'] != "true") {
				req.session.data['redir_fromtasklist'] = 'org-peopleincontrol'
				res.redirect('/application/' + v + '/changeorganswer-tasklist')
			}
		})*/

		router.post('/application/' + v + '/organisation/org-peopleincontrol', function (req, res) {
			if (req.session.data['org-ukprn'] === "12340201") {
				res.redirect('/application/' + v + '/organisation/org-trustees')
			} else if (req.session.data['org-ukprn'] === "12340203") {
				res.redirect('/application/' + v + '/organisation/org-trustees-declare')
			} else {
				req.session.data['tl_org_people'] = 'completed'
				req.session.data['tl_org_profile'] = 'next'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			}
		})


	/*** Trustees ***/

		// Trustees from API
		router.post('/application/' + v + '/organisation/org-trustees', function (req, res) {
			res.redirect('/application/' + v + '/organisation/org-trustees-dob')
		})

		// Trustees from API - Enter dates of birth
		router.post('/application/' + v + '/organisation/org-trustees-dob', function (req, res) {
			req.session.data['org-trustee-dob1-monthname'] = monthNumToName(req.session.data['org-trustee-dob1-month'])
			req.session.data['org-trustee-dob2-monthname'] = monthNumToName(req.session.data['org-trustee-dob2-month'])
			req.session.data['org-trustee-dob3-monthname'] = monthNumToName(req.session.data['org-trustee-dob3-month'])
			res.redirect('/application/' + v + '/organisation/org-trustees-confirm')
		})

		// Declare trustees - Manual Entry
		router.post('/application/' + v + '/organisation/org-trustees-declare', function (req, res) {

			var newTrustee = {
				'name': req.session.data['org-trustee-name'],
				'dob_month': monthNumToName(req.session.data['org-trustee-dob-month']),
				'dob_year': req.session.data['org-trustee-dob-year']
			}

			delete req.session.data['org-trustee-name']
			delete req.session.data['org-trustee-dob-month']
			delete req.session.data['org-trustee-dob-year']

			if (!req.session.data['org-trustees']) {
				req.session.data['org-trustees'] = []
			}
			req.session.data['org-trustees'].push(newTrustee)

			res.redirect('/application/' + v + '/organisation/org-trustees-confirm-fromdeclare')

		})

		// Confirm trustees - Info from API plus manual DoB entry
		router.post('/application/' + v + '/organisation/org-trustees-confirm', function (req, res) {
			req.session.data['tl_org_people'] = 'completed'
			req.session.data['tl_org_type'] = 'next'
			res.redirect('/application/' + v + '/task-list#section-organisation')
		})

		// Confirm trustees - Manual entry
		router.post('/application/' + v + '/organisation/org-trustees-confirm-fromdeclare', function (req, res) {
			req.session.data['tl_org_people'] = 'completed'
			req.session.data['tl_org_type'] = 'next'
			res.redirect('/application/' + v + '/task-list#section-organisation')
		})

		// Organisation type = Education
		router.post('/application/' + v + '/organisation/org-type-education', function (req, res) {

			let org_orgtype_edu = req.session.data['org-type-education']
			let org_route = req.session.data['org-selectedroute']

			if (
				org_orgtype_edu === 'National college' ||
				org_orgtype_edu === 'Sixth form college' ||
				org_orgtype_edu === 'General further education college')
			{
				req.session.data['org-fundedbytext'] = 'receiving funding from ESFA'
			} else if (
				org_orgtype_edu === 'Academy' ||
				org_orgtype_edu === 'Multi-academy trust' ||
				org_orgtype_edu === 'Further education institute')
			{
				req.session.data['org-fundedbytext'] = 'already registered with ESFA'
			} else if (org_orgtype_edu === 'Higher education institute') {
				req.session.data['org-fundedbytext'] = 'funded by the Office for Students'
			} else if (org_orgtype_edu === 'School') {
				res.redirect('/application/' + v + '/organisation/org-type-education-school')
			} else {
				res.redirect('/application/' + v + '/organisation/error/org-type-education')
			}

			res.redirect('/application/' + v + '/organisation/org-fundedby')

		})

		// Organisation type = Education - School type
		router.post('/application/' + v + '/organisation/org-type-education-school', function (req, res) {

			let org_orgtype_edu_school = req.session.data['org-type-education-school']

			if (req.session.data['org-type-education']) {
				if (org_orgtype_edu_school === 'Free school') {
					req.session.data['org-fundedbytext'] = 'already registered with ESFA'
					res.redirect('/application/' + v + '/organisation/org-fundedby')
				} else {
					res.redirect('/application/' + v + '/organisation/org-classification')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/org-type-education-school')
			}
		})

		// Organisation type = Public Sector Body
		router.post('/application/' + v + '/organisation/org-type-psb', function (req, res) {

			let org_orgtype_psb = req.session.data['org-type-psb']
			let org_route = req.session.data['org-selectedroute']
			req.session.data['exempt_fha'] = 'yes'
      res.redirect('/application/' + v + '/organisation/org-classification')
		})

		// Organisation type - Funded by
		router.post('/application/' + v + '/organisation/org-fundedby', function (req, res) {

			let org_fundedby = req.session.data['org-fundedby']
			let org_route = req.session.data['org-selectedroute']
			req.session.data['tl_org_type'] = 'completed'

			if (org_fundedby === 'Yes') {
				req.session.data['exempt_fha'] = 'yes'
			} else if (org_fundedby === 'No') {
				req.session.data['exempt_fha'] = 'no'
			} else {
				res.redirect('/application/' + v + '/organisation/error/org-fundedby')
			}

			if (org_route === 'employer') {
				res.redirect('/application/' + v + '/organisation/org-type-subtype')
			} else {
				res.redirect('/application/' + v + '/organisation/org-classification')
			}

		})

		// Employer route organisation - Sub-type
		router.post('/application/' + v + '/organisation/org-type-subtype', function (req, res) {
			res.redirect('/application/' + v + '/organisation/org-classification')
		})

		// Organisation classification
		router.post('/application/' + v + '/organisation/org-classification', function (req, res) {

			req.session.data['tl_org_profile'] = 'next'
			req.session.data['tl_org_type'] = 'completed'
			if (req.session.data['org-selectedroute'] == 'supporting') {
				res.redirect('/application/' + v + '/organisation/pro-subcontractor')
			} else {
				req.session.data['tl_org_profile'] = 'next'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			}

		})


	/*** PR3 ***/
		/*
		router.get('/application/' + v + '/organisation/pro-itt', function (req, res) {
			if (req.session.data['tl_org_profile'] == "completed" && req.session.data['redir'] != "true") {
				req.session.data['redir_fromtasklist'] = 'pro-itt'
				res.redirect('/application/' + v + '/changeorganswer-tasklist')
			}
		})*/

  router.post('/application/' + v + '/organisation/pro-funded', function (req, res) {
    res.redirect('/application/' + v + '/organisation/pro-itt')
  })

		// Profile - ITT accreditation
		router.post('/application/' + v + '/organisation/pro-itt', function (req, res) {
			if (req.session.data['pro-itt']) {
				req.session.data['tl_org_profile'] = 'inprogress'
				if (req.session.data['pro-itt'] == "Yes") {
					res.redirect('/application/' + v + '/organisation/pro-postgrad')
				} else {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-feskills')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-itt')
			}
		})

		// Profile - Post-grad teaching apprenticeship only
		router.post('/application/' + v + '/organisation/pro-postgrad', function (req, res) {
			if (req.session.data['pro-postgrad']) {
				if (req.session.data['pro-postgrad'] == "Yes") {
					req.session.data['tl_org_profile'] = 'completed'
					/***** EXEMPT FROM L&M and AW *****/
					req.session.data['exempt_lm'] = 'yes'
					req.session.data['exempt_aw'] = 'yes'
					res.redirect('/application/' + v + '/task-list#section-organisation')
				} else {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-feskills')
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-postgrad')
			}
		})


	/*** PR1 ***/

		// Profile - Ofsted inspection for further education and skills
		router.post('/application/' + v + '/organisation/pro-ofsted-feskills', function (req, res) {
			if (req.session.data['pro-ofsted-feskills']) {
				if (req.session.data['pro-ofsted-feskills'] == "Yes") {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships')
				} else {
					/*** PR2 ***/
					if (req.session.data['org-type-education'] == "Higher education institute" && req.session.data['org-fundedby'] == "Yes"){
						// EXEMPT FROM AW and CCLM1-6
						req.session.data['exempt_lm'] = 'partial'
						req.session.data['exempt_aw'] = 'yes'
					}
					res.redirect('/application/' + v + '/organisation/pro-monitoring-visit')
				}
			}
		})

		// Profile - Monitoring visit
		router.post('/application/' + v + '/organisation/pro-monitoring-visit', function (req, res) {
			req.session.data['tl_org_profile'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-organisation')
		})

		// Profile - Ofsted inspection for apprentices
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships', function (req, res) {
			if (req.session.data['pro-ofsted-apprenticeships']) {
				if (req.session.data['pro-ofsted-apprenticeships'] == "Yes") {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grade')
				} else {
					if (req.session.data['org-type-education'] == "Higher education institute" && req.session.data['org-fundedby'] == "Yes"){
						// EXEMPT FROM AW and CCLM1-6
						req.session.data['exempt_lm'] = 'partial'
						req.session.data['exempt_aw'] = 'yes'
						req.session.data['tl_org_profile'] = 'completed'
						res.redirect('/application/' + v + '/task-list#section-organisation')
					} else {
						res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grade')
					}
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships')
			}
		})

		// Profile - Grade of Ofsted inspection for apprentices
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grade', function (req, res) {
			if (req.session.data['pro-ofsted-apprenticeships-grade'] == "Requires improvement") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grade')
			} else {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-date')
			}
		})

		// Profile - Grade of Ofsted inspection for apprentices within 3 years
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-date', function (req, res) {
			
			if (req.session.data['pro-ofsted-apprenticeships-date']) {
				if (req.session.data['pro-ofsted-apprenticeships-date'] == "Yes") {
					if (req.session.data['pro-ofsted-apprenticeships-grade'] == "Inadequate") {
						// INELIGIBLE TO APPLY > SHUTTER PAGE
						res.redirect('/application/' + v + '/shutter/organisation/pro-ofsted-apprenticeships-date')
					} else { 
						// Grade is outstanding or good
						res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-fundingmaintained')
					}
				} else { // NOT WITHIN LAST 3 YEARS
					//
					if (req.session.data['pro-ofsted-apprenticeships-grade'] == "Inadequate") {
						req.session.data['tl_org_profile'] = 'completed'
						res.redirect('/application/' + v + '/task-list')
					} else { 
						// Grade is outstanding or good
						res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection')
					}
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships-date')
			}

		})
		

		// Profile - Apprentices short inspection <3 years
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-shortinspection', function (req, res) {

			if (req.session.data['pro-ofsted-apprenticeships-shortinspection'] == "Yes") {

				if (req.session.data['pro-ofsted-apprenticeships-shortinspection-date'] == "No"){ 
					// NOT WITHIN LAST 3 YEARS
					// COMPLETE ALL SECTIONS
					req.session.data['tl_org_profile'] = 'completed'
					res.redirect('/application/' + v + '/task-list')
				} else { // WITHIN LAST 3 YEARS
					// GO TO GRADE MAINTAINED
					res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grademaintained')
				}
				
			} else {
				// COMPLETE ALL SECTIONS
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			}

		})

		// Profile - Grade maindained from short inspection for apprentices
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-grademaintained', function (req, res) {
			if (req.session.data['pro-ofsted-apprenticeships-grademaintained'] == "Yes") {
				// GO TO FUNDING MAINTAINED
				res.redirect('/application/' + v + '/organisation/pro-ofsted-apprenticeships-fundingmaintained')
			} else {
				// COMPLETE ALL SECTIONS
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			}
		})

		// Profile - Ofsted inspection for apprentices outstanding/good - maintained funding
		router.post('/application/' + v + '/organisation/pro-ofsted-apprenticeships-fundingmaintained', function (req, res) {

			if (req.session.data['pro-ofsted-apprenticeships-fundingmaintained']) {
				if (req.session.data['pro-ofsted-apprenticeships-fundingmaintained'] == "Yes") {
					/***** EXEMPT FROM L&M and AW *****/
					req.session.data['exempt_lm'] = 'yes'
					req.session.data['exempt_aw'] = 'yes'
				}
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-apprenticeships-fundingmaintained')
			}
		})


	/*** PR4 ***/

		// Profile - Overall Effectiveness Grade of Ofsted inspection
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-grade', function (req, res) {
			
			if (req.session.data['pro-ofsted-overall-grade'] == "Outstanding" || req.session.data['pro-ofsted-overall-grade'] == "Good" || req.session.data['pro-ofsted-overall-grade'] == "Inadequate") {
				res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-date')
			} else {
				// Ofsted grade of 'Requires improvement'
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			}

		})

		// Profile - Overall Effectiveness Grade less than 3 years ago
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-date', function (req, res) {
			if (req.session.data['pro-ofsted-overall-date']) {
				if (req.session.data['pro-ofsted-overall-date'] == "Yes") {
					if (req.session.data['pro-ofsted-overall-grade'] == "Inadequate") {
						res.redirect('/application/' + v + '/shutter/organisation/pro-ofsted-overall-inadequate')
					} else { // OUTSTANDING OR GOOD
						res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-fundingmaintained')
					}
				} else {
					if (req.session.data['pro-ofsted-overall-grade'] == "Inadequate") {
						req.session.data['tl_org_profile'] = 'completed'
						res.redirect('/application/' + v + '/task-list')
					} else {
						res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection')
					}
				}
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-date')
			}
		})

		// Profile - Overall short inspection
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-shortinspection', function (req, res) {
			if (req.session.data['pro-ofsted-overall-shortinspection']) {
				if (req.session.data['pro-ofsted-overall-shortinspection'] == "Yes") {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-grademaintained')
				} else {
					req.session.data['tl_org_profile'] = 'completed'
					res.redirect('/application/' + v + '/task-list#section-organisation')
				}

			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-shortinspection')
			}
		})

		// Profile - Overall grade maintained
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-grademaintained', function (req, res) {
			if (req.session.data['pro-ofsted-overall-grademaintained']) {
				if (req.session.data['pro-ofsted-overall-grademaintained'] == "Yes") {
					res.redirect('/application/' + v + '/organisation/pro-ofsted-overall-fundingmaintained')
				}
				req.session.data['tl_org_profile'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-organisation')
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-grademaintained')
			}
		})

		// Profile - Overall Ofsted inspection - Maintained funding?
		router.post('/application/' + v + '/organisation/pro-ofsted-overall-fundingmaintained', function (req, res) {
			if (req.session.data['pro-ofsted-overall-fundingmaintained']) {
				if (req.session.data['pro-ofsted-overall-fundingmaintained'] == "Yes") {
					/***** EXEMPT FROM AW and CCLM1-6 *****/
					req.session.data['exempt_lm'] = 'partial'
					req.session.data['exempt_aw'] = 'yes'
					req.session.data['tl_org_profile'] = 'completed'
				} else {
					req.session.data['tl_org_profile'] = 'completed'
				}
				res.redirect('/application/' + v + '/task-list#section-organisation')
			} else {
				res.redirect('/application/' + v + '/organisation/error/pro-ofsted-overall-fundingmaintained')
			}
		})
		

	/*** PR5 ***/

		// Profile - Subcontractor
		router.post('/application/' + v + '/organisation/pro-subcontractor', function (req, res) {
			// if yes limit = £500k 
			// if no limit = £100k
			req.session.data['tl_org_profile'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-organisation')
		})


/**************************
 *** Financial Evidence ***
 **************************/

	// Intro and what you'll need
	router.post('/application/' + v + '/financial/intro', function (req, res) {
		req.session.data['tl_fin_intro'] = 'completed'
		req.session.data['tl_ukparentcompany'] = 'next'
		res.redirect('/application/' + v + '/task-list#section-financial')
	})

  /*** Parent company ***/
  /*
  router.get('/application/' + v + '/financial/org-parentcompany', function (req, res) {
    if (req.session.data['tl_org_profile'] == "completed" && req.session.data['redir'] != "true") {
      req.session.data['redir_fromtasklist'] = 'org-parentcompany'
      res.redirect('/application/' + v + '/changeorganswer-tasklist')
    }
  })*/

  // Have a parent company?
  router.post('/application/' + v + '/financial/org-parentcompany', function (req, res) {
    req.session.data['tl_ukparentcompany'] = 'inprogress'
    if (req.session.data['org-parentcompany'] === 'Yes'){
      res.redirect('/application/' + v + '/financial/org-parentcompany-details')
    } else {
      req.session.data['tl_ukparentcompany'] = 'completed'
      res.redirect('/application/' + v + '/task-list#section-financial')
    }
  })

  // Parent company details
  router.post('/application/' + v + '/financial/org-parentcompany-details', function (req, res) {
    req.session.data['tl_ukparentcompany'] = 'completed'
    res.redirect('/application/' + v + '/task-list#section-financial')
  })

  /*** Organisation type ***/
  /*
  router.get('/application/' + v + '/organisation/org-type', function (req, res) {
    if (req.session.data['tl_org_profile'] == "completed" && req.session.data['redir'] != "true") {
      req.session.data['redir_fromtasklist'] = 'org-type'
      res.redirect('/application/' + v + '/changeorganswer-tasklist')
    }
  })*/

  // Organisation type
  router.post('/application/' + v + '/financial/org-type', function (req, res) {

    let org_orgtype = req.session.data['org-type']
    let org_route = req.session.data['org-selectedroute']

    if (org_route === 'employer') {

      if (org_orgtype === 'An educational institute'){
        req.session.data['tl_org_type'] = 'inprogress'
        res.redirect('/application/' + v + '/financial/org-type-education')
      } else if (org_orgtype === 'A public body') {
        req.session.data['tl_org_type'] = 'inprogress'
        req.session.data['exempt_fha'] = 'yes'
        res.redirect('/application/' + v + '/financial/org-type-psb')
      } else if (org_orgtype === 'None of the above') {
        req.session.data['tl_org_type'] = 'completed'
        req.session.data['tl_fin_upload'] = 'next'
        res.redirect('/application/' + v + '/task-list#section-financial')
      }

    } else {

      if (org_orgtype === 'An educational institute') {
        req.session.data['tl_org_type'] = 'inprogress'
        res.redirect('/application/' + v + '/financial/org-type-education')
      } else if (org_orgtype === 'An employer') {
        req.session.data['tl_org_type'] = 'inprogress'
        req.session.data['exempt_fha'] = 'no'
        res.redirect('/application/' + v + '/financial/org-classification')
      } else if (org_orgtype === 'A public body') {
        req.session.data['tl_org_type'] = 'inprogress'
        req.session.data['exempt_fha'] = 'yes'
        res.redirect('/application/' + v + '/financial/org-type-psb')
      } else if (org_orgtype === 'An apprenticeship training agency' || org_orgtype === 'An independent training provider' || org_orgtype === 'A group training association') {
        req.session.data['tl_org_type'] = 'inprogress'
        req.session.data['exempt_fha'] = 'no'
        res.redirect('/application/' + v + '/financial/org-classification')

      }

    }

  })

  router.post('/application/' + v + '/financial/org-type-psb', function (req, res) {
    res.redirect('/application/' + v + '/financial/org-classification')
  })

  // Organisation type = Education
  router.post('/application/' + v + '/financial/org-type-education', function (req, res) {

    let org_orgtype_edu = req.session.data['org-type-education']
    let org_route = req.session.data['org-selectedroute']

    if (
      org_orgtype_edu === 'National college' ||
      org_orgtype_edu === 'Sixth form college' ||
      org_orgtype_edu === 'General further education college')
    {
      req.session.data['org-fundedbytext'] = 'receiving funding from ESFA'
    } else if (
      org_orgtype_edu === 'Academy' ||
      org_orgtype_edu === 'Multi-academy trust' ||
      org_orgtype_edu === 'Further education institute')
    {
      req.session.data['org-fundedbytext'] = 'already registered with ESFA'
    } else if (org_orgtype_edu === 'Higher education institute') {
      req.session.data['org-fundedbytext'] = 'funded by the Office for Students'
    }

    if (
      org_orgtype_edu === 'National college' ||
      org_orgtype_edu === 'Sixth form college' ||
      org_orgtype_edu === 'General further education college')
    {
      res.redirect('/application/' + v + '/financial/org-type-education-college')
    }

    else if (
      org_orgtype_edu === 'Academy' ||
      org_orgtype_edu === 'Multi-academy trust')
    {
      res.redirect('/application/' + v + '/financial/org-type-education-academy')
    }

    else if (
      org_orgtype_edu === 'School')
    {
      res.redirect('/application/' + v + '/financial/org-type-education-school')
    }

    else if (
      org_orgtype_edu === 'Higher education institute')
    {
      res.redirect('/application/' + v + '/financial/org-type-education-hei')
    }

    else if (
      org_orgtype_edu === 'Further education institute')
    {
      req.session.data['tl_org_type'] = 'completed'
      req.session.data['tl_fin_upload'] = 'next'
      res.redirect('/application/' + v + '/task-list#section-financial')
    }

  })

  router.post('/application/' + v + '/financial/org-type-education-school', function (req, res) {
    if (
      req.session.data['org-type-education-school'] === 'Free school')
    {
      res.redirect('/application/' + v + '/financial/org-type-education-free-school')
    }
    else {
      res.redirect('/application/' + v + '/financial/org-classification')
    }
  })

  router.post('/application/' + v + '/financial/org-type-education-free-school', function (req, res) {
    if (req.session.data['org-type-education-free-school'] === 'Yes')
    {
      req.session.data['exempt_fha'] = 'yes'
    }
    res.redirect('/application/' + v + '/financial/org-classification')
  })

  router.post('/application/' + v + '/financial/org-type-education-college', function (req, res) {
    if (req.session.data['org-type-education-college'] === 'Yes')
    {
      req.session.data['exempt_fha'] = 'yes'
    }
    res.redirect('/application/' + v + '/financial/org-classification')
  })

  router.post('/application/' + v + '/financial/org-type-education-academy', function (req, res) {
    if (req.session.data['org-type-education-academy'] === 'Yes')
    {
      req.session.data['exempt_fha'] = 'yes'
    }
    res.redirect('/application/' + v + '/financial/org-classification')
  })

  router.post('/application/' + v + '/financial/org-type-education-hei', function (req, res) {
    if (req.session.data['org-type-education-hei'] === 'Yes')
    {
      req.session.data['exempt_fha'] = 'yes'
    }
    res.redirect('/application/' + v + '/financial/org-classification')
  })

  // Organisation classification
  router.post('/application/' + v + '/financial/org-classification', function (req, res) {

    if (!req.session.data['exempt_fha']) {
      req.session.data['tl_fin_upload'] = 'next'
    }
    if (req.session.data['exempt_fha'] == 'no') {
      req.session.data['tl_fin_upload'] = 'next'
    }
    req.session.data['tl_org_type'] = 'completed'
    res.redirect('/application/' + v + '/task-list#section-financial')


  })


	// Financial evidence - turnover
	router.post('/application/' + v + '/financial/turnover', function (req, res) {
		//req.session.data['tl_fin_upload'] = 'completed'
		if (req.session.data['fin-turnover'] == "Yes"){
			res.redirect('/application/' + v + '/financial/expect-funding')
		} else {
			res.redirect('/application/' + v + '/financial/evidence')
		}
	})

	// Financial evidence
	router.post('/application/' + v + '/financial/evidence', function (req, res) {
		//req.session.data['tl_fin_upload'] = 'completed'
		res.redirect('/application/' + v + '/financial/full-statements')
	})

	// Funding expected
	router.post('/application/' + v + '/financial/expect-funding', function (req, res) {
		res.redirect('/application/' + v + '/financial/full-statements')
	})

	// Full financial statements for the last year?
	router.post('/application/' + v + '/financial/full-statements', function (req, res) {
		//req.session.data['tl_fin_upload'] = 'inprogress'
		if (req.session.data['fin-fullstatements'] == "Yes"){
			res.redirect('/application/' + v + '/financial/full-statements-upload')
		} else {
			if (req.session.data['org-selectedroute'] == "supporting"){
				res.redirect('/application/' + v + '/financial/incomplete-statements-supporting')
			} else {
				res.redirect('/application/' + v + '/financial/incomplete-statements')
			}
		}
	})

  // Full statements add another file

  router.get('/application/' + v + '/financial/full-statements-upload-add-another-file', function (req, res) {
    if (req.session.data['numOfStatements'] === undefined) {
      req.session.data['numOfStatements'] = 0
    }
    req.session.data['numOfStatements'] = req.session.data['numOfStatements'] + 1
    req.session.data['financialStatements'] = 'file.pdf'
    res.redirect('/application/' + v + '/financial/full-statements-upload')
  })

  router.get('/application/' + v + '/financial/full-statements-upload-remove', function (req, res) {
    req.session.data['numOfStatements'] = req.session.data['numOfStatements'] - 1
    res.redirect('/application/' + v + '/financial/full-statements-upload')
  })

	// Full statements upload
	router.post('/application/' + v + '/financial/full-statements-upload', function (req, res) {
		res.redirect('/application/' + v + '/financial/who-prepared')
	})

	// Main or employer

		// Incomplete statements
		router.post('/application/' + v + '/financial/incomplete-statements', function (req, res) {
			res.redirect('/application/' + v + '/financial/incomplete-statements-upload')
		})

		// Who prepared incomplete statements
		router.post('/application/' + v + '/financial/incomplete-statements-upload', function (req, res) {
			res.redirect('/application/' + v + '/financial/who-prepared')
		})

	// Supporting

		// Incomplete statements
		router.post('/application/' + v + '/financial/incomplete-statements-supporting', function (req, res) {
			res.redirect('/application/' + v + '/financial/incomplete-statements-supporting-upload')
		})

		// Who prepared incomplete statements
		router.post('/application/' + v + '/financial/incomplete-statements-supporting-upload', function (req, res) {
			res.redirect('/application/' + v + '/financial/who-prepared')
		})

	// Who prepared statements
	router.post('/application/' + v + '/financial/who-prepared', function (req, res) {
		req.session.data['tl_fin_upload'] = 'completed'
    if (req.session.data['org-parentcompany'] == "Yes") {
      req.session.data['tl_fin_upload'] = 'completed'
      req.session.data['tl_fin_parent'] = 'next'
    }
    else {
      req.session.data['tl_fin'] = 'completed'
    }
		res.redirect('/application/' + v + '/task-list#section-financial')
	})

	// Parent company

		// Parent company interstitial
		router.post('/application/' + v + '/financial/parentcompany', function (req, res) {
			req.session.data['tl_fin_parent'] = 'inprogress'
			if (req.session.data['fin-consolidatedstatements'] == "No") {
				res.redirect('/application/' + v + '/financial/parentcompany-subsidiary')
			} else {
				res.redirect('/application/' + v + '/financial/parentcompany-upload')
			}
		})

		// Parent company have a subsidiary
		router.post('/application/' + v + '/financial/parentcompany-subsidiary', function (req, res) {
			if (req.session.data['fin-parentsubsidiary'] == "Yes"){
				res.redirect('/application/' + v + '/financial/parentcompany-subsidiary-upload')
			} else {
				res.redirect('/application/' + v + '/financial/parentcompany-consolidated')
			}
		})

		// Parent company upload
		router.post('/application/' + v + '/financial/parentcompany-upload', function (req, res) {
			res.redirect('/application/' + v + '/financial/parentcompany-subsidiary-upload')
		})

		// Parent company subsidiary upload
		router.post('/application/' + v + '/financial/parentcompany-subsidiary-upload', function (req, res) {
			res.redirect('/application/' + v + '/financial/parentcompany-who-prepared')
		})

		// Parent company consolidated
		router.post('/application/' + v + '/financial/parentcompany-consolidated', function (req, res) {
			res.redirect('/application/' + v + '/financial/parentcompany-who-prepared')
		})

		// Parent company subsidiary upload
		router.post('/application/' + v + '/financial/parentcompany-who-prepared', function (req, res) {
			req.session.data['tl_fin_parent'] = 'completed'
      req.session.data['tl_fin'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-financial')
		})

	// Upload management accounts
	router.post('/application/' + v + '/financial/upload-management', function (req, res) {
    req.session.data['tl_fin_upload'] = 'completed'
    req.session.data['tl_fin'] = 'completed'
    res.redirect('/application/' + v + '/task-list#section-financial')
	})


/************************************
 *** Criminal & compliance checks ***
 ************************************/

	// Intro and what you'll need
	router.post('/application/' + v + '/declarations/intro', function (req, res) {
		req.session.data['tl_dec_intro'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-declarations')
	})

	// Organisation - Debt?
	router.post('/application/' + v + '/declarations/org-debt', function (req, res) {
		req.session.data['tl_dec_organisation'] = 'inprogress'
		res.redirect('/application/' + v + '/declarations/org-repay-funding')
	})

	// Organisation - Failed to repay funding?
	router.post('/application/' + v + '/declarations/org-repay-funding', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-contract-terminated')
	})

	// Organisation - Contract terminated by a public body?
	router.post('/application/' + v + '/declarations/org-contract-terminated', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-withdrawn-contract')
	})

	// Organisation - Withdrawn from a contract
	router.post('/application/' + v + '/declarations/org-withdrawn-contract', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-roto')
	})

	// Organisation - Removed from Register of Training Organisations
	router.post('/application/' + v + '/declarations/org-roto', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-funding-removed')
	})

	// Organisation - funding removed from any education bodies
	router.post('/application/' + v + '/declarations/org-funding-removed', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-trade-register')
	})

	// Organisation - removed from any professional or trade registers
	router.post('/application/' + v + '/declarations/org-trade-register', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-itt-withdrawal')
	})

	// Organisation - ITT withdrawal
	router.post('/application/' + v + '/declarations/org-itt-withdrawal', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-safeguarding')
	})

	// Organisation - Safeguarding
	router.post('/application/' + v + '/declarations/org-safeguarding', function (req, res) {
		res.redirect('/application/' + v + '/declarations/org-whistleblowing')
	})

	// Organisation - Whistleblowing
	router.post('/application/' + v + '/declarations/org-whistleblowing', function (req, res) {
		req.session.data['tl_dec_organisation'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-declarations')
	})


	// Who’s in control intro and what you'll need
	router.post('/application/' + v + '/declarations/people-intro', function (req, res) {
		req.session.data['tl_dec_peopleintro'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-declarations')
	})


	// Who’s in control - Criminal convictions
	router.post('/application/' + v + '/declarations/people-convictions', function (req, res) {
		// Will need to go in to a loop if answered yes
		req.session.data['tl_dec_people'] = 'inprogress'
		res.redirect('/application/' + v + '/declarations/people-repay-funding')
	})


	// Who’s in control - failed to repay funding
	router.post('/application/' + v + '/declarations/people-repay-funding', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-fraud')
	})

	// Who’s in control - fraud or irregularities last 3 years
	router.post('/application/' + v + '/declarations/people-fraud', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-fraud-ongoing')
	})

	// Who’s in control - ongoing fraud or irregularities
	router.post('/application/' + v + '/declarations/people-fraud-ongoing', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-contract-terminated')
	})

	// Who’s in control - Contract terminated by a public body?
	router.post('/application/' + v + '/declarations/people-contract-terminated', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-withdrawn-contract')
	})

	// Who’s in control - Withdrawn from a contract
	router.post('/application/' + v + '/declarations/people-withdrawn-contract', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-tax-payments')
	})

	// Who’s in control - Breached tax payments or social security contributions
	router.post('/application/' + v + '/declarations/people-tax-payments', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-charity-register')
	})

	// Who’s in control - Charity register
	router.post('/application/' + v + '/declarations/people-charity-register', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-trustee-register')
	})

	// Who’s in control - Trustee register
	router.post('/application/' + v + '/declarations/people-trustee-register', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-bankrupt')
	})

	// Who’s in control - Bankrupt?
	router.post('/application/' + v + '/declarations/people-bankrupt', function (req, res) {
		if (req.session.data['org-legalstatus'] == "Partnership"){
			res.redirect('/application/' + v + '/declarations/people-bankrupt-partners')
		} else {
			res.redirect('/application/' + v + '/declarations/people-insolvency')
		}
	})

	// Who’s in control - Partners b§ankrupt?
	router.post('/application/' + v + '/declarations/people-bankrupt-partners', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-insolvency')
	})

	// Who’s in control - Insolvency?
	router.post('/application/' + v + '/declarations/people-insolvency', function (req, res) {
		res.redirect('/application/' + v + '/declarations/people-otherorgs')
	})

	// Who’s in control - Other orgs?
	router.post('/application/' + v + '/declarations/people-otherorgs', function (req, res) {
		if (req.session.data['dec-org-otherorgs'] == "Yes"){
			res.redirect('/application/' + v + '/declarations/people-otherorgs-insolvency')
		} else {
			req.session.data['tl_dec_people'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-declarations')
		}		
	})

	// Who’s in control - Other orgs insolvency?
	router.post('/application/' + v + '/declarations/people-otherorgs-insolvency', function (req, res) {
		req.session.data['tl_dec_people'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-declarations')	
	})


/******************************
 *** Apprenticeship welfare ***
 ******************************/

	// What you'll need
	router.post('/application/' + v + '/welfare/intro', function (req, res) {
		req.session.data['tl_wel_intro'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Continuity plan upload
	router.post('/application/' + v + '/welfare/upload-continuity', function (req, res) {
		req.session.data['tl_wel_continuity'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Equality and diversity policy upload
	router.post('/application/' + v + '/welfare/upload-diversity', function (req, res) {
		req.session.data['tl_wel_diversity'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Safeguarding policy upload
	router.post('/application/' + v + '/welfare/upload-safeguarding', function (req, res) {
		req.session.data['tl_wel_safeguarding'] = 'inprogress'
		res.redirect('/application/' + v + '/welfare/safeguarding')
	})

	// Who's responsible for safeguarding
	router.post('/application/' + v + '/welfare/safeguarding', function (req, res) {
		req.session.data['tl_wel_safeguarding'] = 'inprogress'
		res.redirect('/application/' + v + '/welfare/preventduty')
	})

	// Include responsibilities to Prevent duty
	router.post('/application/' + v + '/welfare/preventduty', function (req, res) {
		if (req.session.data['wel-preventduty'] == "No") {
			res.redirect('/application/' + v + '/welfare/upload-preventduty')
		} else {
			req.session.data['tl_wel_safeguarding'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-welfare')
		}
	})

	// Prevent duty policy upload
	router.post('/application/' + v + '/welfare/upload-preventduty', function (req, res) {
		req.session.data['tl_wel_safeguarding'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Health and safety policy upload
	router.post('/application/' + v + '/welfare/upload-healthandsafety', function (req, res) {
		req.session.data['tl_wel_healthandsafety'] = 'inprogress'
		res.redirect('/application/' + v + '/welfare/healthandsafety-details')
	})

	// Who's responsible for health and safety - details
	router.post('/application/' + v + '/welfare/healthandsafety-details', function (req, res) {
		req.session.data['tl_wel_healthandsafety'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})

	// Who's responsible for health and safety - details
	router.post('/application/' + v + '/welfare/otherpolicies', function (req, res) {
		req.session.data['tl_wel_other'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-welfare')
	})


/***************************
 *** Readiness to engage ***
 ***************************/

	// What you'll need
	router.post('/application/' + v + '/readiness/intro', function (req, res) {
		req.session.data['tl_rte_intro'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})	

	// Engaged with employers?
	router.post('/application/' + v + '/readiness/engaged', function (req, res) {
		req.session.data['tl_rte_engagement'] = 'inprogress'
		res.redirect('/application/' + v + '/readiness/relationships')
	})	

	// Manage relationships with employers?
	router.post('/application/' + v + '/readiness/relationships', function (req, res) {
		//res.redirect('/application/' + v + '/readiness/managing-relationships')
		res.redirect('/application/' + v + '/readiness/managing-relationships-detail')
	})		

	// Managing relationships?
	/*router.post('/application/' + v + '/readiness/managing-relationships', function (req, res) {
		if (req.session.data['rte-managingrelationships'] == "Yes") {
			res.redirect('/application/' + v + '/readiness/managing-relationships-detail')
		} else {
			req.session.data['tl_rte_engagement'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-readiness')
		}
	})*/

	// Managing relationships?
	router.post('/application/' + v + '/readiness/managing-relationships-detail', function (req, res) {
		//req.session.data['tl_rte_engagement'] = 'completed'
		//res.redirect('/application/' + v + '/task-list#section-readiness')
		res.redirect('/application/' + v + '/readiness/promote')
	})

	// Promote?
	router.post('/application/' + v + '/readiness/promote', function (req, res) {
		req.session.data['tl_rte_engagement'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})

	// Upload complaints policy
	router.post('/application/' + v + '/readiness/upload-complaints', function (req, res) {
		req.session.data['tl_rte_complaints'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})

	// Upload contract for services
	router.post('/application/' + v + '/readiness/upload-contractforservices', function (req, res) {
		req.session.data['tl_rte_contractforservices'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})

	// Upload commitment statement
	router.post('/application/' + v + '/readiness/upload-commitmentstatement', function (req, res) {
		req.session.data['tl_rte_commitment'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})

	// Prior learning assessments
	router.post('/application/' + v + '/readiness/prior-learning-assessments', function (req, res) {
		req.session.data['tl_rte_priorlearning'] = 'inprogress'
		res.redirect('/application/' + v + '/readiness/asses-english-maths')
	})

	// Assess English and Maths
	router.post('/application/' + v + '/readiness/asses-english-maths', function (req, res) {
		req.session.data['tl_rte_priorlearning'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})

	// Use subcontractors?
	router.post('/application/' + v + '/readiness/use-subcontractors', function (req, res) {
		req.session.data['tl_rte_subcontractors'] = 'inprogress'
		if (req.session.data['rte-usesubcontractors'] == "Yes") {
			res.redirect('/application/' + v + '/readiness/manage-subcontractors')
		} else {
			req.session.data['tl_rte_subcontractors'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-readiness')
		}
	})

	// Manage subcontractors?
	router.post('/application/' + v + '/readiness/manage-subcontractors', function (req, res) {
		req.session.data['tl_rte_subcontractors'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-readiness')
	})


/****************************************
 *** Planning apprenticeship delivery ***
 ****************************************/

	// What you'll need
	router.post('/application/' + v + '/planning/intro', function (req, res) {
		req.session.data['tl_plan_intro'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-planning')
	})	

	// Type of apprenticeship training
	router.post('/application/' + v + '/planning/01-type', function (req, res) {
		req.session.data['tl_plan_type'] = 'inprogress'
		if (
			req.session.data['plan-type']['0'] == "apprenticeship-standards" || 
			req.session.data['plan-type']['0'] == "full-apprenticeship-standards" || 
			req.session.data['plan-type']['0'] == "part-apprenticeship-standards" || 
			req.session.data['plan-type']['1'] == "part-apprenticeship-standards")
			{
				res.redirect('/application/' + v + '/planning/02-readytodeliver')
		} else {
			if (req.session.data["org-selectedroute"] == "supporting"){
				req.session.data['tl_plan_type'] = 'completed'
				res.redirect('/application/' + v + '/task-list#section-planning')
			} else {
				res.redirect('/application/' + v + '/planning/03-engaging')
			}
		}
	})	

	// Ready to deliver
	router.post('/application/' + v + '/planning/02-readytodeliver', function (req, res) {
		if (req.session.data["org-selectedroute"] == "supporting"){
			//req.session.data['tl_plan_type'] = 'completed'
			//res.redirect('/application/' + v + '/task-list#section-planning')
			res.redirect('/application/' + v + '/planning/05-contact')
		} else {
			res.redirect('/application/' + v + '/planning/03-engaging')
		}
	})	

	// Plan to engage
	router.post('/application/' + v + '/planning/03-engaging', function (req, res) {
		req.session.data['tl_plan_type'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-planning')
		//res.redirect('/application/' + v + '/planning/04-supported')
	})

  router.post('/application/' + v + '/planning/org-type-subtype', function (req, res) {
    req.session.data['tl_plan_subtype'] = 'completed'
    res.redirect('/application/' + v + '/task-list#section-planning')
  })

	// Course directory contact
	router.post('/application/' + v + '/planning/05-contact', function (req, res) {
		//req.session.data['tl_plan_contact'] = 'completed'
		req.session.data['tl_plan_type'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-planning')
	})

	// Apprentices supported
	router.post('/application/' + v + '/planning/04-supported', function (req, res) {
		req.session.data['tl_plan_supporting'] = 'completed'
		//res.redirect('/application/' + v + '/task-list#section-planning')
    res.redirect('/application/' + v + '/task-list#section-planning')
	})

	// Forecast - Starts
	router.post('/application/' + v + '/planning/06-forecast-starts', function (req, res) {
		req.session.data['tl_plan_forecasting'] = 'inprogress'
		res.redirect('/application/' + v + '/planning/07-forecast-readytodeliver')
	})

	// Forecast - Ready to deliver
	router.post('/application/' + v + '/planning/07-forecast-readytodeliver', function (req, res) {
		res.redirect('/application/' + v + '/planning/08-forecast-newstaff')
	})

	// Forecast - New staff
	router.post('/application/' + v + '/planning/08-forecast-newstaff', function (req, res) {
		res.redirect('/application/' + v + '/planning/09-forecast-ratio')
	})

	// Forecast - Ratio
	router.post('/application/' + v + '/planning/09-forecast-ratio', function (req, res) {
		req.session.data['tl_plan_forecasting'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-planning')
	})

	// Off the job - Teaching methods
	router.post('/application/' + v + '/planning/10-otj-methods', function (req, res) {
		req.session.data['tl_plan_offthejob'] = 'inprogress'
		res.redirect('/application/' + v + '/planning/11-otj-relevant')
	})


	// Off the job - Teaching methods
	router.post('/application/' + v + '/planning/11-otj-relevant', function (req, res) {
		req.session.data['tl_plan_offthejob'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-planning')
	})

	// Off the job - Teaching methods
	router.post('/application/' + v + '/planning/12-address', function (req, res) {
		req.session.data['tl_plan_address'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-planning')
	})


/******************************************
 *** Delivering apprenticeship training ***
 ******************************************/

	// What you'll need
	router.post('/application/' + v + '/delivering/intro', function (req, res) {
		req.session.data['tl_del_intro'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
	})	

	// Who's accountable for apprenticeships?
	router.post('/application/' + v + '/delivering/whosaccountable', function (req, res) {
		req.session.data['tl_del_hierarchy'] = 'inprogress'
		if (!req.session.data['del-hierarchy-person']) {
			res.redirect('/application/' + v + '/delivering/hierarchy-add')
		} else {
			res.redirect('/application/' + v + '/delivering/hierarchy-confirm')
		}
	})	

	// Management hierarchy
	router.post('/application/' + v + '/delivering/hierarchy-add', function (req, res) {

		var newPerson = {
			'name': req.session.data['del-hierarchy-name'],
			'job_role': req.session.data['del-hierarchy-role'],
			'time_in_role': req.session.data['del-hierarchy-timeinrole'],
			'report_to': req.session.data['del-hierarchy-reportto'],
			'org_funding': req.session.data['del-hierarchy-orgfunding'],
			'org_funding_name': req.session.data['del-hierarchy-orgfunding-name'],
			'subcontractor_funding': req.session.data['del-hierarchy-subcontractorfunding']
		}

		req.session.data['del-hierarchy-name'] = null
		req.session.data['del-hierarchy-role'] = null
		req.session.data['del-hierarchy-timeinrole'] = null
		req.session.data['del-hierarchy-reportto'] = null
		req.session.data['del-hierarchy-orgfunding'] = null
		req.session.data['del-hierarchy-orgfunding-name'] = null
		req.session.data['del-hierarchy-subcontractorfunding'] = null

		if (!req.session.data['del-hierarchy-person']) {
			req.session.data['del-hierarchy-person'] = []
		}
		req.session.data['del-hierarchy-person'].push(newPerson)
			
		res.redirect('/application/' + v + '/delivering/hierarchy-confirm')

	})

	// Who's accountable for apprenticeships confirmation
	router.post('/application/' + v + '/delivering/hierarchy-confirm', function (req, res) {

		req.session.data['tl_del_hierarchy'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
	})

	router.get('/application/' + v + '/delivering/hierarchy-remove-route', function (req, res) {
		res.redirect('/application/' + v + '/delivering/hierarchy-remove')
	})

	// Remove employee to sector
	router.post('/application/' + v + '/delivering/hierarchy-remove', function (req, res) {
		if (req.session.data['del-hierarchy-remove'] == "Yes"){
			req.session.data['del-hierarchy-person'].splice(req.session.data['remove_hierarchy_id'],1)
		}
		res.redirect('/application/' + v + '/delivering/hierarchy-confirm')
	})

	// Expectations (high standards)
	router.post('/application/' + v + '/delivering/expectations', function (req, res) {
		req.session.data['tl_del_expectations'] = 'inprogress'
		if (req.session.data['del-expectations'] == "Yes") {
			res.redirect('/application/' + v + '/delivering/expectations-upload')
		} else {
			res.redirect('/application/' + v + '/delivering/expectations-responsible')
		}
	})

	// Expectations - Upload document for high standards
	router.post('/application/' + v + '/delivering/expectations-upload', function (req, res) {
		res.redirect('/application/' + v + '/delivering/expectations-responsible')
	})

	// Expectations - Who's responsible?
	router.post('/application/' + v + '/delivering/expectations-responsible', function (req, res) {
		res.redirect('/application/' + v + '/delivering/expectations-communicated')
	})

	// Expectations - How communicated to employees?
	router.post('/application/' + v + '/delivering/expectations-communicated', function (req, res) {
		req.session.data['tl_del_expectations'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
	})


	// Developing and Delivering - Does your organisation have a team responsible?
	router.post('/application/' + v + '/delivering/developdeliver', function (req, res) {
		req.session.data['tl_del_developdeliver'] = 'inprogress'
		if (req.session.data["org-selectedroute"] == "employer"){
			res.redirect('/application/' + v + '/delivering/developdeliver-overallmanager')
		} else {
			res.redirect('/application/' + v + '/delivering/developdeliver-workedwith')
		}
	})

	// Developing and Delivering - Worked with to deliver
	router.post('/application/' + v + '/delivering/developdeliver-workedwith', function (req, res) {
		res.redirect('/application/' + v + '/delivering/developdeliver-howworkedwith')
	})

	// Developing and Delivering - Worked with to deliver
	router.post('/application/' + v + '/delivering/developdeliver-howworkedwith', function (req, res) {
		res.redirect('/application/' + v + '/delivering/developdeliver-overallmanager')
	})

	// Developing and Delivering - Overall manager
	router.post('/application/' + v + '/delivering/developdeliver-overallmanager', function (req, res) {
		req.session.data['tl_del_developdeliver'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
	})

	// Developing and Delivering - Overall accountability
	router.post('/application/' + v + '/delivering/overallaccountability', function (req, res) {
		req.session.data['tl_del_accountability'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
	})

	// Sectors training in
	router.post('/application/' + v + '/delivering/sectors', function (req, res) {
		req.session.data['tl_del_sectors'] = 'inprogress'
		res.redirect('/application/' + v + '/delivering/sectors-tasklist')
	})

	// Select sector to which they will add an employee
	router.get('/application/' + v + '/delivering/sectors-employee-add-route', function (req, res) {
		res.redirect('/application/' + v + '/delivering/sectors-employee-add')
	})

	router.get('/application/' + v + '/delivering/sectors-employee-remove-route', function (req, res) {
		res.redirect('/application/' + v + '/delivering/sectors-employee-remove')
	})

	// Remove employee to sector
	router.post('/application/' + v + '/delivering/sectors-employee-remove', function (req, res) {
		if (req.session.data['del-employee-remove'] == "Yes"){
			req.session.data['del-employee'][req.session.data['remove_employee_id']] = null
		}
		res.redirect('/application/' + v + '/delivering/sectors-employees')
	})

	// Add employee to sector
	router.post('/application/' + v + '/delivering/sectors-employee-add', function (req, res) {

		// Create new employee for selected sector
		var newEmployee = {
			'sector_id': req.session.data['current_sector_id'],
			'name': req.session.data['del-employee-name'],
			'job_role': req.session.data['del-employee-role'],
			'timeinrole_years': req.session.data['del-employee-timeinrole-years'],
			'timeinrole_months': req.session.data['del-employee-timeinrole-months']
		}
		
		// Now employee data is save to a local array, clear related session variables
		delete req.session.data['del-employee-name']
		delete req.session.data['del-employee-role']
		delete req.session.data['del-employee-timeinrole-years']
		delete req.session.data['del-employee-timeinrole-months']

		// If the employee array doesn't exist, create it
		if (!req.session.data['del-employee']) {
			req.session.data['del-employee'] = []
		}

		// Store the local employee array in the session array
		req.session.data['del-employee'][req.session.data['current_sector_id']] = newEmployee

		// Move on to the next employee question
		res.redirect('/application/' + v + '/delivering/sectors-employee-sectorexperience')

	})

	// Add employee to sector
	router.post('/application/' + v + '/delivering/sectors-employee-sectorexperience', function (req, res) {

		req.session.data['del-employee'][req.session.data['current_sector_id']]['sectorexperience'] = req.session.data['del-employee-sectorexperience']

		if (req.session.data['del-employee-sectorexperience'] == "Less than a year"){
			req.session.data['del-employee'][req.session.data['current_sector_id']]['sectorexperience-detail'] = req.session.data['del-employee-sectorexperience-detail'][0]
		} else if (req.session.data['del-employee-sectorexperience'] == "One to 2 years"){
			req.session.data['del-employee'][req.session.data['current_sector_id']]['sectorexperience-detail'] = req.session.data['del-employee-sectorexperience-detail'][1]
		} else if (req.session.data['del-employee-sectorexperience'] == "3 to 5 years"){
			req.session.data['del-employee'][req.session.data['current_sector_id']]['sectorexperience-detail'] = req.session.data['del-employee-sectorexperience-detail'][2]
		} else if (req.session.data['del-employee-sectorexperience'] == "Over 5 years"){
			req.session.data['del-employee'][req.session.data['current_sector_id']]['sectorexperience-detail'] = req.session.data['del-employee-sectorexperience-detail'][3]
		}

		req.session.data['del-employee'][req.session.data['current_sector_id']]['overallexperience'] = req.session.data['del-employee-overallexperience']

		delete req.session.data['del-employee-sectorexperience']
		delete req.session.data['del-employee-sectorexperience-detail']
		delete req.session.data['del-employee-overallexperience']

		res.redirect('/application/' + v + '/delivering/sectors-employee-qualifications')
		
	})

	// Employee qualifications
	router.post('/application/' + v + '/delivering/sectors-employee-qualifications', function (req, res) {

		req.session.data['del-employee'][req.session.data['current_sector_id']]['awarding'] = req.session.data['del-employee-awarding']
		req.session.data['del-employee'][req.session.data['current_sector_id']]['memberships'] = req.session.data['del-employee-memberships']
		req.session.data['del-employee'][req.session.data['current_sector_id']]['qualifications'] = req.session.data['del-employee-qualifications']

		if (req.session.data['del-employee-awarding'] == "Yes"){
			req.session.data['del-employee'][req.session.data['current_sector_id']]['awarding-detail'] = req.session.data['del-employee-awarding-detail']
		}

		if (req.session.data['del-employee-memberships'] == "Yes"){
			req.session.data['del-employee'][req.session.data['current_sector_id']]['memberships-detail'] = req.session.data['del-employee-memberships-detail']
		}

		if (req.session.data['del-employee-qualifications'] == "Yes"){
			req.session.data['del-employee'][req.session.data['current_sector_id']]['qualifications-detail'] = req.session.data['del-employee-qualifications-detail']
		}

		delete req.session.data['del-employee-awarding']
		delete req.session.data['del-employee-awarding-detail']
		delete req.session.data['del-employee-memberships']
		delete req.session.data['del-employee-memberships-detail']
		delete req.session.data['del-employee-qualifications']
		delete req.session.data['del-employee-qualifications-detail']

		res.redirect('/application/' + v + '/delivering/sectors-employee-trainingdelivered')
	})

	// Employee training delivered
	router.post('/application/' + v + '/delivering/sectors-employee-trainingdelivered', function (req, res) {

		req.session.data['del-employee'][req.session.data['current_sector_id']]['trainingdelivered'] = req.session.data['del-employee-trainingdelivered']

		if (req.session.data['del-employee-trainingdelivered'] == "No apprenticeship training delivered"){
			delete req.session.data['del-employee-trainingdelivered']
			res.redirect('/application/' + v + '/delivering/sectors-employees')
		} else {
			delete req.session.data['del-employee-trainingdelivered']
			res.redirect('/application/' + v + '/delivering/sectors-employee-trainingdelivered-detail')
		}
	})

	// Employee training delivered details
	router.post('/application/' + v + '/delivering/sectors-employee-trainingdelivered-detail', function (req, res) {

		req.session.data['del-employee'][req.session.data['current_sector_id']]['howdelivered'] = req.session.data['del-employee-howdelivered']
		req.session.data['del-employee'][req.session.data['current_sector_id']]['howdelivered-other'] = req.session.data['del-employee-howdelivered-other']
		req.session.data['del-employee'][req.session.data['current_sector_id']]['experience-delivering'] = req.session.data['del-employee-experience-delivering']
		req.session.data['del-employee'][req.session.data['current_sector_id']]['trainingduration'] = req.session.data['del-employee-trainingduration']

		delete req.session.data['del-employee-howdelivered']
		delete req.session.data['del-employee-howdelivered-other']
		delete req.session.data['del-employee-experience-delivering']
		delete req.session.data['del-employee-trainingduration']

		res.redirect('/application/' + v + '/delivering/sectors-tasklist')

	})

	// Confirm sectors and employee experience
	router.post('/application/' + v + '/delivering/sectors-employees', function (req, res) {
		req.session.data['tl_del_sectors'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
	})
		
	router.post('/application/' + v + '/delivering/development-upload', function (req, res) {
		req.session.data['tl_del_development'] = 'inprogress'
		res.redirect('/application/' + v + '/delivering/development-implemented')
	})
		
	router.post('/application/' + v + '/delivering/development-implemented', function (req, res) {
		res.redirect('/application/' + v + '/delivering/development-reflected')
	})

	router.post('/application/' + v + '/delivering/development-reflected', function (req, res) {
		req.session.data['tl_del_development'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-delivering')
	})

	// Select the sectors which employee delivers
	router.post('/application/' + v + '/delivering/employee-sectors', function (req, res) {

		// Add selected sectors to current employee array item
		req.session.data['del-employee'][req.session.data['del-employee-count']]['sectors'] = req.session.data['del-employee-sector']

		res.redirect('/application/' + v + '/delivering/employee-sectors-experience')

	})


/***************************
 *** Evaluating training ***
 ***************************/

	// What you'll need
	router.post('/application/' + v + '/evaluating/intro', function (req, res) {
		req.session.data['tl_eval_intro'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-evaluating')
	})	

	// Existing process for evaluating training
	router.post('/application/' + v + '/evaluating/training', function (req, res) {
		req.session.data['tl_eval_training'] = 'inprogress'
		res.redirect('/application/' + v + '/evaluating/training-improvements')
	})

	// Example of potential improvements (LM 14)
	router.post('/application/' + v + '/evaluating/training-improvements', function (req, res) {
		req.session.data['tl_eval_training'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-evaluating')
	})	

	// Existing process suitable for apprenticeships
	router.post('/application/' + v + '/evaluating/apprenticeships', function (req, res) {
		req.session.data['tl_eval_apprenticeships'] = 'inprogress'
		if (req.session.data['eval-apprenticeships'] == "Yes"){
			res.redirect('/application/' + v + '/evaluating/review')
		} else {
			res.redirect('/application/' + v + '/evaluating/apprenticeships-how')
		}
	})

	// Process for evaluating quality of training and outcomes (LM 12)
	router.post('/application/' + v + '/evaluating/apprenticeships-how', function (req, res) {
		res.redirect('/application/' + v + '/evaluating/review')
	})

	// Review process for evaluating the quality of training delivered
	router.post('/application/' + v + '/evaluating/review', function (req, res) {
		req.session.data['tl_eval_apprenticeships'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-evaluating')
	})

	// Systems and processes to get info on training (LM 16)
	router.post('/application/' + v + '/evaluating/collectdata', function (req, res) {
		req.session.data['tl_eval_collectdata'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-evaluating')
	})

	// Systems and processes to get info on training (LM 16)
	router.post('/application/' + v + '/evaluating/ilr', function (req, res) {
		req.session.data['tl_eval_ilr'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-evaluating')
	})


/**************
 *** Finish ***
 **************/

	// Your details
	router.post('/application/' + v + '/finish/yourdetails', function (req, res) {
		if (req.session.data['end-permission-submit'] && req.session.data['end-permission-named']){
			req.session.data['tl_finish_yourdetails'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-finish')
		} else {
			req.session.data['tl_finish_yourdetails'] = 'inprogress'
			res.redirect('/application/' + v + '/shutter/finish')
		}
	})	

	// Permission of 'Commercial in confidence'
	router.post('/application/' + v + '/finish/permission-commercial', function (req, res) {
		req.session.data['tl_finish_permission'] = 'completed'
		res.redirect('/application/' + v + '/task-list#section-evaluating')
	})	

	// Permission of 'Commercial in confidence'
	router.post('/application/' + v + '/finish/coa', function (req, res) {
		if (req.session.data['fin-coa'] == "No"){
			res.redirect('/application/' + v + '/shutter/finish-coa')
			
		} else {
			req.session.data['tl_finish_coa'] = 'completed'
			res.redirect('/application/' + v + '/task-list#section-evaluating')
		}
	})	



/**************************
 *** Check your answers ***
 **************************/

	router.post('/application/' + v + '/checkyouranswers', function (req, res) {
		req.session.data['application_status'] = 'sent'
		res.redirect('/application/' + v + '/application-complete')
	})	

	router.post('/application/' + v + '/checkyouranswers-org', function (req, res) {
		req.session.data['cya_org'] = 'done'
		res.redirect('/application/' + v + '/checkyouranswers')
	})	

	router.post('/application/' + v + '/checkyouranswers-fha', function (req, res) {
		req.session.data['cya_fha'] = 'done'
		res.redirect('/application/' + v + '/checkyouranswers')
	})	

	router.post('/application/' + v + '/checkyouranswers-dec', function (req, res) {
		req.session.data['cya_dec'] = 'done'
		res.redirect('/application/' + v + '/checkyouranswers')
	})	

	router.post('/application/' + v + '/checkyouranswers-wel', function (req, res) {
		req.session.data['cya_wel'] = 'done'
		res.redirect('/application/' + v + '/checkyouranswers')
	})	

	router.post('/application/' + v + '/checkyouranswers-rte', function (req, res) {
		req.session.data['cya_rte'] = 'done'
		res.redirect('/application/' + v + '/checkyouranswers')
	})	

	router.post('/application/' + v + '/checkyouranswers-pat', function (req, res) {
		req.session.data['cya_pat'] = 'done'
		res.redirect('/application/' + v + '/checkyouranswers')
	})	

	router.post('/application/' + v + '/checkyouranswers-del', function (req, res) {
		req.session.data['cya_del'] = 'done'
		res.redirect('/application/' + v + '/checkyouranswers')
	})	

	router.post('/application/' + v + '/checkyouranswers-eval', function (req, res) {
		req.session.data['cya_eval'] = 'done'
		res.redirect('/application/' + v + '/checkyouranswers')
	})	

	router.post('/application/' + v + '/checkyouranswers-finish', function (req, res) {
		req.session.data['cya_finish'] = 'done'
		res.redirect('/application/' + v + '/checkyouranswers')
	})


/*****************************************
 *** Change org question from tasklist ***
 *****************************************/
/*
	router.post('/application/' + v + '/changeorganswer-tasklist', function (req, res) {
		
		let redirectfrom = req.session.data['from']

		// Clear all session data
		req.session.data = {}

		if (redirectfrom == "org-ico" || redirectfrom == "org-peopleincontrol" || redirectfrom == "org-type" || redirectfrom == "pro-itt"){
			req.session.data['signedin'] = "yes"
			req.session.data['org-ukprn'] = "12340102"
			req.session.data['org-selectedroute'] = "main"
			req.session.data['tl_org_intro'] = "completed"
			req.session.data['tl_org_details'] = "next"
		}

		if (redirectfrom == "org-peopleincontrol" || redirectfrom == "org-type" || redirectfrom == "pro-itt"){
			req.session.data['org-ico'] = "12345678"
			req.session.data['org-parentcompany'] = "Yes"
			req.session.data['org-parentcompany-name'] = "Parent Company Limited"
			req.session.data['org-parentcompany-number'] = "89987987"
			req.session.data['org-trading'] = "More than 23 months"
			req.session.data['tl_org_details'] = "completed"
			req.session.data['tl_org_people'] = "next"
		}

		if (redirectfrom == "org-type" || redirectfrom == "pro-itt"){
			req.session.data['tl_org_people'] = "completed"
			req.session.data['tl_org_type'] = "next"
		}

		if (redirectfrom == "pro-itt"){
			req.session.data['org-classification'] = ["None of the above"]
			req.session.data['org-type'] = "An employer training apprentices in other organisations"
			req.session.data['org-type-subtype'] = "In your organisation and connected companies or charities"
			req.session.data['tl_org_type'] = "completed"
			req.session.data['tl_org_profile'] = "next"
		}

		res.redirect('/application/' + v + '/organisation/' + redirectfrom)

	})
*/

/****************
 *** Sign out ***
 ****************/

	router.get('/application/' + v + '/signout', function (req, res) {
		req.session.data['signedin'] = 'no'
		res.redirect('/application/' + v + '/signout')
	})

	router.get('/application/' + v + '/signoutsignin', function (req, res) {
		req.session.data['signedin'] = 'no'
		res.redirect('/application/' + v + '/signin')
	})

}