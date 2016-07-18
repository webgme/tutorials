'use strict';

var config = require('./config.webgme'),
    validateConfig = require('webgme/config/validator');

// Add/overwrite any additional settings here
// config.server.port = 8080;
// config.mongo.uri = 'mongodb://127.0.0.1:27017/webgme_my_app';

// Authentication/Authorization
config.authentication.enable = true;

// Just to highlight defaults
config.authentication.allowGuests = true;
config.authentication.allowRegistration = true;
config.authentication.guestAccount = 'guest';

// IMPORTANT - DO NOT USE DEFAULT KEYS.



validateConfig(config);
module.exports = config;