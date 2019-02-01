const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

var version = "v1";

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
    res.render("staff-app/" + version + "/register", {showMessage: showMessage});
});

router.post("/register", function(req, res){
    var searchStr = req.body.search;
    if(searchStr == ''){
        res.render("staff-app/" + version + "/register", {showError: true});
    } else {
        req.session.searchStr = searchStr;
        res.redirect("listv2");
    }
})

router.get("/listv2", function(req, res){
    res.render("staff-app/" + version + "/listv2", {searchStr: req.session.searchStr});
})

router.get("/listv2-2", function(req, res){
    res.render("staff-app/" + version + "/listv2-2", {searchStr: req.session.searchStr});
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
    res.render("staff-app/" + version + "/change-status", {showError: false, today: arrDate});
})


router.post("/change-organisation-details", function(req, res){    
    res.render("staff-app/" + version + "/change-organisation-details", {showError: true});
})

module.exports = router
