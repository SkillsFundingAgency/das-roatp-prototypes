const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

var ver = "v1";

router.post("/esfa-sign-in", function(req, res){
    res.redirect("register");
});

router.post("/add-new", function(req, res){
    var orgNumber = req.body.orgNumber;
    if( orgNumber == '000000'){
        res.redirect("not-found");
    }
    
    if( orgNumber == '123123'){
        res.redirect("confirm");
    }
    
    if( orgNumber == '123456'){
        res.redirect("confirm-2");
    }
})

router.get("/register", function(req, res){
    var showMessage = req.query.added == 1 ? true : false;
    res.render("staff-app/" + ver + "/register", {showMessage: showMessage});
});

router.post("/register", function(req, res){
    var searchStr = req.body.search;
    if(searchStr == ''){
        res.render("staff-app/" + ver + "/register", {showError: true});
    } else {
        req.session.searchStr = searchStr;
        res.redirect("listv2");
    }
})

router.get("/listv2", function(req, res){
    res.render("staff-app/" + ver + "/listv2", {searchStr: req.session.searchStr});
})

router.get("/listv2-2", function(req, res){
    res.render("staff-app/" + ver + "/listv2-2", {searchStr: req.session.searchStr});
})


router.post("/org-details-select-route", function(req, res){
    res.redirect("org-details-data-entry-manual");
})

router.post("/org-details-data-entry-manual", function(req, res){
    res.redirect("register?added=1");
})




var date = new Date();
var arrDate = [ date.getDate(), date.getMonth(), date.getFullYear() ];

router.get("/change-status", function(req, res){
    res.render("staff-app/" + ver + "/change-status", {showError: false, today: arrDate});
})


router.post("/change-organisation-details", function(req, res){    
    res.render("staff-app/" + ver + "/change-organisation-details", {showError: true});
})




// -- apply journey --//

router.post("/signin-check", function(req,res){ 
    console.log('x');
    if(req.body.q == 'no'){
        res.redirect("new-user");
    } else {
        res.redirect("dfe-sign-in");
    }
    
});

router.get("/dfe-sign-in", function(req,res){  
    res.render("dfe-sign-in");
});

router.post("/dfe-sign-in", function(req,res){  
    res.redirect("provider-type");
});

router.post("/new-user", function(req,res){ 
    req.session.signup_email = req.body.email;
    res.redirect("confirm-details-message");
});

router.get("/confirm-details-message", function(req,res){  
    res.render("join-register/" + ver + "/confirm-details-message", {email: req.session.signup_email});
});

router.get("/provider-type", function(req,res){ 
    req.session.declarationStarted = false;
    req.session.fhaStarted = false;
    req.session.orgDetailsStarted = false;
    
    res.render("join-register/" + ver + "/provider-type");
});

router.post("/provider-type", function(req,res){ 
    req.session.providerType = req.body.q;
    res.redirect("/join-register/" + ver + "/landing");
});

router.get("/landing", function(req,res){ 
    
    var providerType = req.session.providerType;
    var nextPage = "/z/org-details/" + ver + "/org-1";
    
    if (providerType == 'Supporting')
        nextPage = "/z/org-details/" + ver + "/org-1a"
    
    var progress = { orgDetails: req.session.orgDetailsStarted,
                            fha: req.session.fhaStarted,
                            declaration: req.session.declarationStarted}
    
    res.render("join-register/" + ver + "/landing", {providerType: providerType, nextPage: nextPage, progress: progress, skipFHA: req.session.skipFinancialSection});
});



module.exports = router
