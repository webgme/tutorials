## Introduction
[Plugins](https://github.com/webgme/webgme/wiki/GME-Plugins) are custom extension points to a webgme-deployment that are intended to be used for querying, interpretation, analyzing models.
To access and interpreting the model, plugins have access to the [Core API](https://github.com/webgme/webgme/wiki/GME-Core-API).

## Create plugin template code
Using [webgme-cli](https://github.com/webgme/webgme-cli) we can create the template code for a plugin by typing:
 ```
 webgme new plugin FSMCodeGenerator
 ```
This will create a new plugin in the src directory. 
needed for a (node)npm repository. It also contains the webgme specific [config](https://github.com/webgme/webgme/tree/master/config#plugin) directory
and `webgme-setup.json`. The latter contains metadata about the webgme components this repo
defines or imports from another webgme domain repo and is used and maintained by [webgme-cli](https://github.com/webgme/webgme-cli). At this point it should be empty.

## Installing dependencies and staring the app
To install the node dependencies use the command
```
npm install
```

this will install the npm dependencies including webgme (in later versions of npm an explicit `npm install webgme` is needed as it is a [peer-dependency](https://nodejs.org/en/blog/npm/peer-dependencies/)).

To start the app run
```
npm start
```

A short-cut provided by the webgme-cli for these commands is `webgme start`.

## Open the app in a browser
In a browser (Chrome, Safari or (Firefox)) visit `127.0.0.1:8888` and the app should bring up the create project dialog.