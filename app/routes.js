const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

var version = "first-stab";

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


router.get("/eligibility-check/first-stab/eligibility-confirmation/:type", function(req,res){ 
    res.render("eligibility-check/first-stab/eligibility-confirmation", {type: req.params.type});
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
            
        case "main":
            if (req.body.checkbox.length == 6){
                res.redirect("/eligibility-check/first-stab/eligibility-confirmation-2");
            } else {
                res.redirect("/eligibility-check/first-stab/eligibility-failed");
            }
            break;
            
        case "employer":
        case "supporting":
            if (req.body.checkbox.length == 3){
                res.redirect("/eligibility-check/first-stab/eligibility-confirmation-2");
                
            } else {
                res.redirect("/eligibility-check/first-stab/eligibility-failed");
            }
            break;

        default:
            break;
    }
    
//    res.send(getCurrentLocation(req.url));
});

function isMainTrainer(req,res){
    if(req.body.yesno == 'yes'){
        res.redirect(version + "/eligibility-confirmation/main");
    } else {
        res.redirect(version + "/q2");
    }
}


function isEmployerTrainer(req,res){
    if(req.body.yesno == 'yes'){
        res.redirect("eligibility-confirmation/employer");
    } else {
        res.redirect("q3");
    }
}

function isSupportingTrainer(req,res){
    if(req.body.yesno == 'yes'){
        res.redirect("eligibility-confirmation/supporting");
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
        res.redirect(version + "/convictions-handed");
    } else {
        res.redirect(version + "/due-diligence");
    }
}

module.exports = router
