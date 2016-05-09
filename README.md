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

During live tutorial we will use the IDE [webstorm](https://www.jetbrains.com/webstorm/download/#section=windows-version) (30 days trial version is available), an open source alternative is [atom](https://atom.io/).
