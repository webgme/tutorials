## Introduction
[Plugins](https://github.com/webgme/webgme/wiki/GME-Plugins) are custom extension points to a webgme-deployment that are intended to be used for querying, interpreting, analyzing models.
In order to do so plugins have access to the [Core API](https://github.com/webgme/webgme/wiki/GME-Core-API) among other APIs.

## Target
Create a plugin that:
 - Starts from a **StateMachine** and loads all children.
 - Queries the encountered nodes using the Core API and extracts, attributes, paths, pointers and "reverse" pointers.
 - Builds up a data-model in json with the essence of a state machine.
 - Uses an ejs template to generate a state machine simulator in javascript.
 - Saves the generated code with some metadata (the commit-hash of execution) back to the model.

## Create plugin template code
Using [webgme-cli](https://github.com/webgme/webgme-cli) we can create the template code for a plugin by typing:
 ```
 webgme new plugin FSMCodeGenerator
 ```
This will create a new plugin in the src directory, two files are generated:
- `FSMCodeGenerator.js` - Defines the plugin as a javascript class-like object exposed as an requirejs AMD module.
- `metadata.json` - Contains information about the plugin, id, name, valid contexts of execution, configuration parameters etc.

Additionally the setup for writing [mocha] tests were generated in the test directory.
The new plugin was made available (as a requirejs module) to the webgme app by adding a path to the `plugin.basePaths` in [config.plugin](https://github.com/webgme/webgme/tree/master/config#plugin).
Lastly the `webgme-setup.json` populated with info that this plugin is defined in this particular repository, this will expose it to other users of [webgme-cli](https://github.com/webgme/webgme-cli).
