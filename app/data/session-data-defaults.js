/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  /*
  ================================================
    Questions for Eligibility Checker v1 and v1a
  ================================================
  */
  
    "q-main-supporting": "What is your organisation applying to?",
  
    "q-england-wales": "Will your organisation train apprentices in the UK?",
  
    "q-experience--mainemployer": "Does the person responsible for your apprenticeship training programme have at least 9 months experience?",
    "q-experience--supporting": "Does the person responsible for your apprenticeship training programme have at least 3 months experience?",
  
    "q-train-within": "Will your organisation start training apprentices within the first 12 months of becoming an apprenticeship training provider?",
  
    "q-financial-evidence--mainemployer": "Has your organisation been trading for at least 12 months?",
    "q-financial-evidence--supporting": "Has your organisation been trading for at least 3 months?",
  
    "q-ukprn": "Does your organisation have a UK provider reference number (UKPRN)?",
  
    "q-ico": "Does your organisation have an Information Commissioner's Office (ICO) registration number?",
  
    "q-ukaddress": "Does your organisation have a UK business address?",
  
    "q-ofsted": "Has your organisation had an Ofsted inspection?",
  
    "q-ofsted-grade": "What Ofsted grade did your organisation get?",

    "aac-new-count": 4,
    "aac-inprogress-count": 5
  
  }
  