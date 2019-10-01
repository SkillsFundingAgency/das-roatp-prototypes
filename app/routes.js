const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Application Journey
require('./routes/application/v0.js')(router);
require('./routes/application/v1.js')(router);
require('./routes/application/v2.js')(router);
require('./routes/application/v3.js')(router);
require('./routes/application/v4.js')(router);
require('./routes/application/v5.js')(router);
require('./routes/application/v6.js')(router);
require('./routes/application/v7.js')(router);
require('./routes/application/v8.js')(router);
require('./routes/application/v9.js')(router);
require('./routes/application/v10.js')(router);
require('./routes/application/v11.js')(router);

// Organisation Journey
require('./routes/organisation/v01.js')(router);
require('./routes/organisation/v0.js')(router);

// Staff App
require('./routes/staff-app/v2.js')(router);
require('./routes/staff-app/v2a.js')(router);
require('./routes/staff-app/v3.js')(router);
require('./routes/staff-app/v4.js')(router);
require('./routes/staff-app/v5.js')(router);

// Eligibility Checker
require('./routes/eligibility/bravo.js')(router); // Bravo

require('./routes/eligibility/v2.js')(router);
require('./routes/eligibility/v1a.js')(router);
require('./routes/eligibility/v1.js')(router);
require('./routes/eligibility/v0.js')(router);

module.exports = router
