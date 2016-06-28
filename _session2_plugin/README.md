## Introduction
[Plugins](https://github.com/webgme/webgme/wiki/GME-Plugins) are custom extension points to a webgme-deployment that are intended to be used for querying, interpreting, analyzing, and modifying models. This is accomplished by giving plugins access to the [Core API](https://github.com/webgme/webgme/wiki/GME-Core-API) among other APIs.

## Goal
The goal of [tutorial session 2](https://www.youtube.com/watch?v=Ri4IC_u-TO4&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb&index=4) is to create a plugin that:
 - Starts from a **StateMachine** and loads all children.
 - Queries the encountered nodes using the Core API and extracts attributes, paths, pointers and "reverse" pointers.
 - Builds up a data-model in json with the essence of a state machine.
 - Uses an ejs template to generate a state machine simulator in javascript.
 - Saves the generated code with some metadata (the commit-hash of execution) back to the model.

## Create plugin template code
Using [webgme-cli](https://github.com/webgme/webgme-cli) we can create the template code for a plugin by typing:
 ```
 webgme new plugin FSMCodeGenerator
 ```
This will create a new plugin in the src directory; two files are generated:
- `FSMCodeGenerator.js` - Defines the plugin as a javascript class-like object exposed as an requirejs AMD module.
- `metadata.json` - Contains information about the plugin, id, name, valid contexts of execution, configuration parameters etc.

Additionally, the setup for writing [mocha] tests were generated in the test directory.
The new plugin was made available (as a requirejs module) to the webgme app by adding a path to the `plugin.basePaths` in [config.plugin](https://github.com/webgme/webgme/tree/master/config#plugin).
Lastly, the `webgme-setup.json` is populated with info indicating that this plugin is defined in this particular repository; this will expose it to other users of [webgme-cli](https://github.com/webgme/webgme-cli).

The procedure for writing a new plugin if documented in [tutorial session 2](https://www.youtube.com/watch?v=Ri4IC_u-TO4&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb&index=4)


## [Tutorial Steps](https://www.youtube.com/watch?v=Ri4IC_u-TO4&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb&index=4)

- Restart WebGME server after the plugin is generated.

- Register plugin: expand language folder in the tree browser, double click on StateMachine, select the 'Meta' tab in the property editor, select FSMCodeGenerator for valid plugins.

- Open the Examples/Deployment process object and click on the play button on the toolbar, then select the FSMCodeGenerator.

- Look at the results.

- Open the web browser's inspector and show how to debug the plugin.

- Add `debugger;` statement to the source code. Then, remove it.

- Executing plugins from the command line.

```
npm run

npm run plugin

node ./node_modules/webgme/src/bin/run_plugin.js

node ./node_modules/webgme/src/bin/run_plugin.js FSMCodeGenerator FSM -s /a/F
```   

- Automated execution by using nodemon.

```
npm install -g nodemon

nodemon ./node_modules/webgme/src/bin/run_plugin.js FSMCodeGenerator FSM -s /a/F

nodemon --ext ejs,js ./node_modules/webgme/src/bin/run_plugin.js FSMCodeGenerator FSM -s /a/F
```

- Change source code and save.
