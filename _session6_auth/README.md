## Introduction
Webgme provides a simple [authentication and authorization model](https://github.com/webgme/webgme/wiki/Users-and-Authentication).
By enabling authentication clients can login and be authenticated as different users each with different access rights 
(mainly to projects). By default the authentication is turned off and in this case all connected clients are authenticated as the guest account.

```
gmeConfig.authentication.guestAccount = 'guest'
```

Looking at the **Project History** we can see that each commit is current associated with this userId. For larger projects 
with more than one collaborator it is beneficial to be able to distinguish between who did what within a project, but also
to scope the rights to different projects. In addition different extensions can store 
[component-settings](https://github.com/webgme/webgme/wiki/Component-Settings) within users. 


## Target
The target of this tutorial is to turn on authentication and generate appropriate keys for the token generation.

#### Detailed steps

##### 1. Key Generation
Before enabling authentication we must generate the [RSA Keys](https://en.wikipedia.org/wiki/RSA_cryptosystem). These are used 
by the server to encrypt (the private key) and decrypt (the public key) the tokens containing the user-id. 
If we do not generate our own and set the configuration to the new keys - the example keys checked into the webgme repo will 
be used (which of course is a pretty bad idea).

1. Create a new directory, `token_keys`, out-side of the repository (if not guarded against all files under the cwd of the express server can accessed).
1. Using `openssl` (available for [windows](http://gnuwin32.sourceforge.net/packages/openssl.htm) first generate a private key
```
openssl genrsa -out token_keys/private_key 1024
```
from it generated a public key
```
openssl rsa -in token_keys/private_key -pubout > token_keys/public_key
```

##### 2. Enabling auth

```
config.authentication.enable = true;
config.authentication.jwt.privateKey = path.join(__dirname, '..', 'token_keys', 'private_key');
config.authentication.jwt.publicKey = path.join(__dirname, '..', 'token_keys', 'public_key');
```
