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
