## Introduction
Some panels (e.g. visualizers such as ModelEditor or the PartBrowser) support customization of their node decoration.
These [decorators](https://github.com/webgme/webgme/wiki/GME-Decorators) 

## Create decorator inheriting from ModelEditor
Using [webgme-cli](https://github.com/webgme/webgme-cli) we can create a decorator that inherits from the ModelEditor.
 ```
 webgme new plugin FSMCodeGenerator
 ```
This will create a new decorator  in the src directory, two files are generated:
- `FSMCodeGenerator.js` - Defines the plugin as a javascript class-like object exposed as an requirejs AMD module.
- `metadata.json` - Contains information about the plugin, id, name, valid contexts of execution, configuration parameters etc.

Additionally the setup for writing [mocha] tests were generated in the test directory.
The new plugin was made available (as a requirejs module) to the webgme app by adding a path to the `plugin.basePaths` in [config.plugin](https://github.com/webgme/webgme/tree/master/config#plugin).
Lastly the `webgme-setup.json` populated with info that this plugin is defined in this particular repository, this will expose it to other users of [webgme-cli](https://github.com/webgme/webgme-cli).

