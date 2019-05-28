const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Application Journey
require('./routes/application/v0.js')(router);

// Organisation Journey
require('./routes/organisation/v01.js')(router);
require('./routes/organisation/v0.js')(router);

// Staff App
require('./routes/staff-app/v2.js')(router);
require('./routes/staff-app/v2a.js')(router);
require('./routes/staff-app/v3.js')(router);

// Eligibility Checker
require('./routes/eligibility/bravo.js')(router); // Bravo

require('./routes/eligibility/v2.js')(router);
require('./routes/eligibility/v1a.js')(router);
require('./routes/eligibility/v1.js')(router);
require('./routes/eligibility/v0.js')(router);

module.exports = router
