# Tutorials
Stepwise tutorials for building webgme components.

## Dependencies
To follow the tutorial the following dependendencies need to be installed:

To host a webgme server:
- https://nodejs.org/en/ (LTS is preferred)
- https://www.mongodb.org/downloads#production (>=2.6.0)
- https://git-scm.com/downloads

After mongodb has been installed, start mongod (mongo deamon) at the default port 27017 and leave it running throughout the
tutorial.

[https://github.com/webgme/webgme-cli](https://github.com/webgme/webgme-cli) (v2.0.0), the tool for creating new webgme components (plugins, decorators, visualizers), needs to be installed globally as a node-module. Use the following command:
```
npm install -g webgme-cli
```
After installation check the version by entering `webgme --version`


The debug tools used during the tutorials:
- [nodemon](https://github.com/remy/nodemon) `npm install -g nodemon`
- [livereload](https://www.npmjs.com/package/livereload) `npm install -g livereload`

During the live tutorial we will use the IDE [webstorm](https://www.jetbrains.com/webstorm/download/#section=windows-version) (30 days trial version is available), an open source alternative is [atom](https://atom.io/).

## Repository Structure
The repository is broken down into different sessions. Each session contains a `README.md` with an outline of what the session will cover. The folders `_session*/FSM` contain the files in the repository after the session has been completed.

When following the tutorial, it is recommended to start from the root of the repository, i.e. where this file resides, and work from the generated `FSM` folder.

## Goals
The goal of this tutorial is to become familiar with using the webme-cli tool for creating components and more importantly how to implement these.

- The first tutorial covers how to initialize a repository and get the server running. During the live session a small meta-model for finite-state machines will be built up. The meta-model, together with an example, will then be stored as a seed (a template model for users to seed/start out from).

- In the second tutorial a model transformer, a plugin, will be written. It will use the model api (core-API) together with the defined meta model to gather the needed data to create a simulator class in javascript. This simulator will be saved back to the model and used in later sessions.

- In the third tutorial a visualizer for the nodes on the canvas (decorator) will be written. It will inherit from the default ModelDecorator but also display if a
node has results and if it is up-to-date or not. It will also provide a button for invoking the plugin from session2.

- In the forth

