const express = require('express')
const router = express.Router()
var fs = require("fs");

// Add your routes here - above the module.exports line



router.get("/z/:section/:version/:page", function(req, res){
    var section = req.params.section,
        version = req.params.version,
        userJourney = loadRoutesFromJSON(section, version ),
        page = req.params.page,
        oPage = userJourney[page],
        content = fs.readFileSync("./app/content-"+version+"/"+page+".json");
    
    parsedContent = JSON.parse(content);

    res.render("zframework/"+oPage.template, {pageSettings: oPage, pageName: page, pageContent: parsedContent});
});

 
router.post("/z/:section/:version/:page", function(req, res){
    var version = req.params.version;
    var userJourney = loadRoutesFromJSON(req.params.section, version );
    var page = req.body.pageName;
    var postedPage = userJourney[page];
    
    var nextPage;
    
    if( postedPage.nextPageLogic == undefined ){
        nextPage = postedPage.nextPage;
        res.redirect(nextPage);
    } else {
        // call skiplogic
        nextPage = skipLogicFunctions[postedPage.nextPageLogic](req, version);
        res.redirect(nextPage);
    }
    
    
});

var ver = "first-stab";

router.post("/join-register/" + ver + "/provider-type", function(req,res){ 
    req.session.providerType = req.body.q;
    
    if (req.session.providerType.toLowerCase() == 'supporting'){
        res.redirect("/z/org-details/" + ver + "/org-1a");
        return;
    }
    res.redirect("/z/org-details/" + ver + "/org-1");
});


function loadRoutesFromJSON(section, version){
    return JSON.parse(fs.readFileSync("./app/routes-"+version+"/"+section+".json"))
}


var skipLogicFunctions = {
    orgLogic1: function (req, version) { 
        
      if(req.body.q == "no" || req.body.q == "2"){
         return 'org-8'; 
      } else {
         return 'org-4';
      }
    },

    
    orgLogic2: function (req, version) { 
      if(req.body.q == "no" || req.body.q == "2"){
         return 'org-9'; 
      } else {
         return 'org-4';
      }
    },
    

    
    orgLogic3: function (req, version) { 
    
      req.session.skipFinancialSection = false;
    
      if(req.session.providerType.toLowerCase() != "employer"){
         if(req.body.q == 1 ||
             req.body.q == 2 ||
             req.body.q == 7 ||
             req.body.q == 9 ||
             req.body.q == 11 ||
             req.body.q == 13 ||
             req.body.q == 14 ||
             req.body.q == 15 ||
             req.body.q == 16) {
              req.session.skipFinancialSection = true;
          }
         }
      
        
      if(req.session.userType == "company"){
         return 'org-5'; 
      } else {
         return '/join-register/'+version+'/landing';
      }
    },
    
    orgLogic3v1: function (req, version) { 
    
      req.session.skipFinancialSection = undefined;
    
      if(req.session.providerType.toLowerCase() != "employer"){
          
         if(
             req.body.q == 3 ||
             req.body.q == 4 ||
             req.body.q == 19 ||
             req.body.q == 20 ||
             req.body.q == 21 ||
             req.body.q == 23 ){
                req.session.skipFinancialSection = false;
            }
          
         if(
             req.body.q == 8 ||
             req.body.q == 13 ||
             req.body.q == 14 ||
             req.body.q == 15 ||
             req.body.q == 16 ||
             req.body.q == 17) {
              req.session.skipFinancialSection = true;
          }
          
          if(
             req.body.q == 2 ||
             req.body.q == 5) {
              return 'org-15';
          }
          
          if(req.body.q == 7) {
              return 'org-16';
          }
          
          if(
             req.body.q == 6 ||
             req.body.q == 10 ||
             req.body.q == 11) {
              return 'org-17';
          }
       }
      
      if(req.session.userType == "company"){
         return 'org-5'; 
      } else {
         return '/join-register/'+version+'/landing';
      }
    },
    
    orgLogic15: function (req, version) { 
        req.session.skipFinancialSection = undefined;
        
        if(req.body.q == "yes" || req.body.q == "1")
           req.session.skipFinancialSection = true;
        else
           req.session.skipFinancialSection = false;
        
        if(req.session.userType == "company"){
             return 'org-5'; 
          } else {
             return '/join-register/'+version+'/landing';
          }
    },
    
    orgLogic4: function (req, version) { 
      if(req.body.q == "no" || req.body.q == "2"){
         return '/z/financial-health/first-stab/fha-1';
      } else {
         return 'org-6';
      }
    },
    
    orgLogic4v1: function (req, version) { 
      if(req.body.q == "no" || req.body.q == "2"){
         return '/join-register/'+version+'/landing';
      } else {
         return 'org-6';
      }
    },
    
    orgLogic5: function (req, version) { 
      
      if( req.session.userType == "charity" || req.session.userType == "company" ){
          if(req.session.providerType.toLowerCase() == "employer"){
             return 'org-3';
          } else {
             return 'org-3a';
          }
      } else {
          return 'org-10';
      }
         
      
      
    },
    
    orgLogic6: function (req) { 
      if(req.session.skipFinancialSection){
             return '/z/declaration/first-stab/declaration-1'
          }
          
         return '/z/financial-health/first-stab/fha-1';
        
    },
    
    orgLogic7: function (req, version) { 
      
      if(req.session.providerType.toLowerCase() == "employer"){
         return 'org-3';
      } else {
         return 'org-3a';
      }
    },
    
    orgLogic8: function (req, version) { 
        
        if(req.body.textInput == '111'){
            req.session.userType = 'company';
        } else if(req.body.textInput == '222'){
            req.session.userType = 'charity';
        } else {
            req.session.userType = 'soletrader';
        }
          return 'org-2';
    }, 
    
    fhaLogic1: function (req, version) { 
        if(req.body.q == "no" || req.body.q == "2"){
            if( req.session.providerType.toLowerCase() == 'supporting'){
                return 'fha-2c'
            } else {
                return 'fha-2b'
            }
                
        } else {
            if (req.session.userType == 'company' || req.session.userType == 'charity' ){
                return 'fha-2a'
            } else {
                return 'fha-2'
            }
        }
    }, 
    
    orglogic9: function(req, version) {
        if(req.body.q == "2" || req.body.q == "3"){
            return 'org-13'
        }
        
        return 'org-11'
    },
    
    declarationLogic1: function (req, version){
        if(req.body.q == "no" || req.body.q == "2"){
            return 'declaration-4';
        }
        
        return 'declaration-5'
    },
    
    declarationLogic2: function (req, version){
        if(req.body.q == "no" || req.body.q == "2"){
            return 'declaration-1';
        }
        
        return 'declaration-5'
    },
    
    mnpLogic3: function(req, version){
      if(req.session.providerType.toLowerCase() == "supporting"){
         return 'mnp-4a';
      } else {
         return 'mnp-4';
      }
    }
};




// ------ //



router.post("/staff-app/" + ver + "/esfa-sign-in", function(req, res){
    res.redirect("register");
});

router.post("/staff-app/" + ver + "/add-new", function(req, res){
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

router.get("/staff-app/" + ver + "/register", function(req, res){
    var showMessage = req.query.added == 1 ? true : false;
    res.render("staff-app/" + ver + "/register", {showMessage: showMessage});
});

router.post("/staff-app/" + ver + "/register", function(req, res){
    var searchStr = req.body.search;
    if(searchStr == ''){
        res.render("staff-app/" + ver + "/register", {showError: true});
    } else {
        req.session.searchStr = searchStr;
        res.redirect("/staff-app/" + ver + "/listv2");
    }
})

router.get("/staff-app/" + ver + "/listv2", function(req, res){
    res.render("staff-app/" + ver + "/listv2", {searchStr: req.session.searchStr});
})

router.post("/staff-app/" + ver + "/org-details-select-route", function(req, res){
    res.redirect("/staff-app/" + ver + "/org-details-data-entry-manual");
})

router.post("/staff-app/" + ver + "/org-details-data-entry-manual", function(req, res){
    res.redirect("/staff-app/" + ver + "/register?added=1");
})




var date = new Date();
var arrDate = [ date.getDate(), date.getMonth(), date.getFullYear() ];

router.get("/staff-app/" + ver + "/change-status", function(req, res){
    res.render("staff-app/" + ver + "/change-status", {showError: false, today: arrDate});
})


router.post("/staff-app/" + ver + "/change-status", function(req, res){    
    res.render("staff-app/" + ver + "/change-status", {showError: true, today: arrDate});
})


router.get("/join-register/" + ver + "/dfe-sign-in", function(req,res){  
    res.render("dfe-sign-in");
});

router.post("/join-register/" + ver + "/dfe-sign-in", function(req,res){  
    res.redirect("provider-type");
});

router.post("/join-register/" + ver + "/new-user", function(req,res){ 
    req.session.signup_email = req.body.email;
    res.redirect("confirm-details-message");
});

router.get("/join-register/" + ver + "/confirm-details-message", function(req,res){  
    res.render("join-register/" + ver + "/confirm-details-message", {email: req.session.signup_email});
});

router.post("/join-register/" + ver + "/signin-check", function(req,res){ 
    if(req.body.q == 'no'){
        res.redirect("new-user");
    } else {
        res.redirect("dfe-sign-in");
    }
    
});


router.post("/join-register/" + ver + "/main-prerequisites", function(req,res){ 
    if (Array.isArray(req.body.requisites)){
        res.redirect("main-win");
    } else {
        res.redirect("main-prerequisites-fail");
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


router.get("/eligibility-check/" + ver + "/eligibility-confirmation", function(req,res){ 
    res.render("eligibility-check/" + ver + "/eligibility-confirmation", {type: req.session.application_type});
});

router.get("/eligibility-check/" + ver + "/application-type", function(req,res){ 
    res.render("eligibility-check/" + ver + "/application-type", {type: req.session.application_type});
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
            if (req.body.checkbox == "_unchecked"){
                res.redirect("/eligibility-check/" + ver + "/eligibility-failed");
            } else {
                res.redirect("/eligibility-check/" + ver + "/win-1");
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
