// DO NOT EDIT THIS FILE
// This file is automatically generated from the webgme-setup-tool.
'use strict';


var config = require('webgme/config/config.default'),
    validateConfig = require('webgme/config/validator');


// The paths can be loaded from the webgme-setup.json
config.seedProjects.basePaths.push('src/seeds/FSM');
config.plugin.basePaths.push('src/plugins');





// Visualizer descriptors

// Add requirejs paths



config.mongo.uri = 'mongodb://127.0.0.1:27017/fsm';
validateConfig(config);
module.exports = config;
