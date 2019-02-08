const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

var version = "first-stab";



router.post("/staff-app/" + version + "/esfa-sign-in", function(req, res){
    res.redirect("register");
});

router.post("/staff-app/" + version + "/add-new", function(req, res){
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

router.get("/staff-app/" + version + "/register", function(req, res){
    var showMessage = req.query.added == 1 ? true : false;
    res.render("staff-app/" + version + "/register", {showMessage: showMessage});
});

router.post("/staff-app/" + version + "/register", function(req, res){
    var searchStr = req.body.search;
    if(searchStr == ''){
        res.render("staff-app/" + version + "/register", {showError: true});
    } else {
        req.session.searchStr = searchStr;
        res.redirect("/staff-app/" + version + "/listv2");
    }
})

router.get("/staff-app/" + version + "/listv2", function(req, res){
    res.render("staff-app/" + version + "/listv2", {searchStr: req.session.searchStr});
})

router.post("/staff-app/" + version + "/org-details-select-route", function(req, res){
    res.redirect("/staff-app/" + version + "/org-details-data-entry-manual");
})

router.post("/staff-app/" + version + "/org-details-data-entry-manual", function(req, res){
    res.redirect("/staff-app/" + version + "/register?added=1");
})




var date = new Date();
var arrDate = [ date.getDate(), date.getMonth(), date.getFullYear() ];

router.get("/staff-app/" + version + "/change-status", function(req, res){
    res.render("staff-app/" + version + "/change-status", {showError: false, today: arrDate});
})


router.post("/staff-app/" + version + "/change-status", function(req, res){    
    res.render("staff-app/" + version + "/change-status", {showError: true, today: arrDate});
})


router.get("/join-register/first-stab/dfe-sign-in", function(req,res){  
    res.render("dfe-sign-in");
});

router.post("/join-register/first-stab/dfe-sign-in", function(req,res){  
    res.redirect("provider-type");
});

router.post("/join-register/first-stab/new-user", function(req,res){ 
    req.session.signup_email = req.body.email;
    res.redirect("confirm-details-message");
});

router.get("/join-register/first-stab/confirm-details-message", function(req,res){  
    res.render("join-register/first-stab/confirm-details-message", {email: req.session.signup_email});
});

router.post("/join-register/first-stab/signin-check", function(req,res){ 
    if(req.body.q == 'no'){
        res.redirect("new-user");
    } else {
        res.redirect("dfe-sign-in");
    }
    
});



router.post("/declarations/*", function(req,res){  
    
    var page = getLastURLSegment(req.url);
    
    switch (page) {
        case "first-stab":
            hasConviction(req,res);
            break;
            
        case "convictions-handed":
            convictionsHanded(req,res);
            break;
            
        default:
            break;
    }
    
//    res.send(getCurrentLocation(req.url));
});


router.get("/eligibility-check/" + version + "/eligibility-confirmation", function(req,res){ 
    res.render("eligibility-check/" + version + "/eligibility-confirmation", {type: req.session.application_type});
});

router.get("/eligibility-check/" + version + "/application-type", function(req,res){ 
    res.render("eligibility-check/" + version + "/application-type", {type: req.session.application_type});
});


router.post("/eligibility-check/*", function(req,res){  
    
    var page = getLastURLSegment(req.url);
    
    switch (page) {
        case "first-stab":
            isMainTrainer(req,res);
            break;
            
        case "q2":
            isEmployerTrainer(req,res);
            break;
            
            
        case "q3":
            isSupportingTrainer(req,res);
            break;
            
        case "eligibility-confirmation":
            
            console.log(req.body.checkbox);
            if (req.body.checkbox == "_unchecked"){
                res.redirect("/eligibility-check/" + version + "/eligibility-failed");
            } else {
                res.redirect("/eligibility-check/" + version + "/win-1");
            }
            break;
            
            
         case "win-1":
            if(req.body.yesno == 'yes'){
                res.redirect("win-2");
            } else {
                res.redirect("win-3");
            }
            break;
            
        case "win-2":
            if(req.body.yesno == 'yes'){
                res.send('show list of documents needed')
            } else {
                res.redirect("win-3");
            }
            break;
            
        case "win-3":
            if(req.body.yesno == 'yes'){
                res.redirect("win-4");
            } else {
                res.redirect("win-7");
            }
            break;
            
        case "win-4":
            if(req.body.yesno == 'yes'){
                res.redirect("win-5");
            } else {
                res.redirect("win-6");
            }
            break;
            
            
        case "win-5":
            if(req.body.yesno == 'yes'){
                res.send('show list of documents needed')
            } else {
                res.redirect("win-6");
            }
            break;
            
            
        case "win-6":
            if(req.body.yesno == 'yes'){
                res.send('show list of documents needed')
            } else {
                res.send('show list of documents needed')
            }
            break;
            
            
        case "win-7":
            if(req.body.yesno == 'yes'){
                res.send('show list of documents needed')
            } else {
                res.redirect("win-7");
            }
            break;
            

        default:
            break;
    }
    
//    res.send(getCurrentLocation(req.url));
});

function isMainTrainer(req,res){
    req.session.application_type = "main";
    if(req.body.yesno == 'yes'){
        res.redirect("application-type");
    } else {
        res.redirect("q2");
    }
}


function isEmployerTrainer(req,res){
    req.session.application_type = "employer";
    if(req.body.yesno == 'yes'){
        res.redirect("application-type");
    } else {
        res.redirect("q3");
    }
}

function isSupportingTrainer(req,res){
    req.session.application_type = "supporting";
    if(req.body.yesno == 'yes'){
        res.redirect("application-type");
    } else {
        res.send("WTF...");
    }
}

function getLastURLSegment(url){
    var arrURLSegments = url.split("/");
    return arrURLSegments[arrURLSegments.length-1].length > 1 ? arrURLSegments[arrURLSegments.length-1] : arrURLSegments[arrURLSegments.length-2];
}

function convictionsHanded(req,res){
    if(req.body.convictions == 'yes'){
        res.redirect("conviction-details");
    } else {
        res.redirect("due-diligence");
    }
}

function hasConviction(req,res){
    if(req.body.convictions == 'yes'){
        res.redirect("convictions-handed");
    } else {
        res.redirect("due-diligence");
    }
}

module.exports = router
