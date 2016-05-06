## Initialize the repository
With [webgme-cli](https://github.com/webgme/webgme-cli) installed the command `webgme` should be available.
To create a new webgme domain repository from a terminal invoke:
 ```
 webgme init FSM
 ```
This will create a folder `FSM` with the [`package.json`](https://docs.npmjs.com/files/package.json) 
needed for a (node)npm repository. It also contains the webgme specific [config](https://github.com/webgme/webgme/tree/master/config) directory
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

## Build FSM language with Example then create seed
Building the model by using the UI. To add our model to the project as seed so it can be the initial blueprint for our new project, we use the following command:
```
webgme new seed FSM
```