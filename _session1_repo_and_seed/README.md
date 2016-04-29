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

## Starting webgme
As the output suggest start the webgme app by running