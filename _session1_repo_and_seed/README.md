<!--- Commments -->

## Initialize the repository
With [webgme-cli](https://github.com/webgme/webgme-cli) installed the command `webgme` should be available.
To create a new webgme domain repository for these tutorials, open a terminal from the root [tutorials](https://github.com/webgme/tutorials) directory and invoke:
 ```
 webgme init FSM
 ```
This will create a folder `FSM` with the [`package.json`](https://docs.npmjs.com/files/package.json) 
needed for a (node)npm repository. It also contains the webgme specific [config](https://github.com/webgme/webgme/tree/master/config) directory and `webgme-setup.json`. The latter contains metadata about the webgme components this repo
defines or imports from another webgme domain repo and is used and maintained by [webgme-cli](https://github.com/webgme/webgme-cli). At this point it should be empty.

## Installing dependencies and starting the app
To install the node dependencies, first we need to enter the project directory (`FSM`), then use the command:
```
npm install
```
Since webgme is a [peer-dependency](https://nodejs.org/en/blog/npm/peer-dependencies/)) of the newly created package we need to install it explicitly (starting from npm 3).
```
npm install webgme
```

To start the app run
```
npm start
```
## Open the app in a browser
In a browser (Chrome, Safari or (Firefox)) visit `127.0.0.1:8888` (`localhost:8888`) and the app should bring up the `Create Project` dialog.

Create a new project and name it `FSM`. Start from a Seed and select the `EmptyProject` file-seed.

## Build FSM language with Example
Follow along with the [tutorial video](https://www.youtube.com/watch?v=YKi_256Vy_0&list=PLhvSjgKmeyjhp4_hnf-xPdCgES56dnMJb&index=3) to create the FSM meta-model and an example instance model. 

<!--- ```
webgme new seed FSM
``` -->
