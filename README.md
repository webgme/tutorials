<!--- USE THESE BRACKETS FOR MARKDOWN COMMENTS-->
# Tutorials
Source code for WebGME components; to be used in conjunction with [WebGME Seminar tutorials](https://www.youtube.com/watch?v=fbDgGCz3piQ&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb).

## Dependencies
To follow the tutorial the following dependencies need to be installed:

To host a webgme server:
- https://nodejs.org/en/ (LTS is preferred)
- https://www.mongodb.org/downloads#production (>=2.6.0)
- https://git-scm.com/downloads

After mongodb has been installed, start mongod (mongo deamon) at the default port 27017 and leave it running throughout the
tutorial:
```
%Path\to\mongod.exe% --dbpath %Path\to\database\root\directory%
```

[webgme-cli](https://github.com/webgme/webgme-cli) (v2.0.0), the tool for creating new webgme components (plugins, decorators, visualizers), needs to be installed globally as a node-module. Use the following command:
```
npm install -g webgme-cli
```
After installation check the version by entering `webgme --version`

The debug tools used during the tutorials:
- [nodemon](https://github.com/remy/nodemon) `npm install -g nodemon`
- [livereload](https://www.npmjs.com/package/livereload) `npm install -g livereload`

N.B. livereload requires python 2.7 to be installed and available in path.

During the live tutorial we will use the IDE [webstorm](https://www.jetbrains.com/webstorm/download/#section=windows-version) (30 days trial version is available), an open source alternative is [atom](https://atom.io/).

## Repository Structure
The repository is broken down into different sessions. Each session contains a `README.md` with an outline of what the session will cover. The folders `_session*/FSM` contain the files in the repository after the session has been completed.

When following the tutorial, it is recommended to start from the root of the repository, i.e. where *this* `README.md` file resides, and work from the generated `FSM` folder.

## Goals
The goal of these tutorials is (1) to become familiar with using the webme-cli tool for creating components, and more importantly, (2) how to implement these components.

- The [first tutorial](https://www.youtube.com/watch?v=YKi_256Vy_0&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb&index=3) covers how to initialize a repository and get the server running. During the live session a small meta-model for finite-state machines will be built up, as well as an example instance model.

- In the [second tutorial](https://www.youtube.com/watch?v=Ri4IC_u-TO4&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb&index=4), a model transformer - a WebGME plugin - will be written. It will use the model api (core-API) together with the FSM meta-model to gather the needed data to create a simulator class in javascript. This simulator will be saved back to the model and used in later sessions.

- In the [third tutorial](https://www.youtube.com/watch?v=ol_Y7Zr5_Ao&index=5&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb), a decorator will be written, which defines how the model nodes are displayed for the user. Our decorator will inherit from the default ModelDecorator, and we will extend it to display a) the node's 'result' object, and b) if the result object is up-to-date. It will also provide a button for invoking the plugin from the previous tutorial.

- In the [fourth tutorial](https://www.youtube.com/watch?v=pV4BIBrKrwo&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb&index=6), a visualizer will be written, allowing users to access properties and artifacts of the models, and dynamically visualize the state of the model.

- In the [fifth tutorial](https://www.youtube.com/watch?v=PR_EcNss-2g&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb&index=7) video, we see how an existing model (and meta-model) can be attached to a new WebGME project as a library, allowing users to extend a modeling paradigm and build upon the instance models, without modifying the original model/meta-model.
