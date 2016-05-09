# Tutorials
Stepwise tutorials for building webgme components.

## Dependencies
To follow the tutorial the following dependendencies need to be installed:

To host a webgme server:
- https://nodejs.org/en/ (LTS is preferred)
- https://www.mongodb.org/downloads#production (>=2.6.0)
- https://git-scm.com/downloads

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
