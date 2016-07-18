## Introduction
Webgme provides a simple [authentication and authorization model](https://github.com/webgme/webgme/wiki/Users-and-Authentication).
By enabling authentication clients can login and be authenticated as different users each with different access rights 
(mainly to projects). By default the authentication is turned off and in this case all connected clients are authenticated as the guest account.

```
gmeConfig.authentication.guestAccount = 'guest'
```

Looking at the **Project History** we can see that each commit is current associated with this userId. For larger projects 
with more than one collaborator it is beneficial to be able to distinguish between who did what within a project, but also
to scope the rights of projects. In addition different extensions can store 
[component-settings](https://github.com/webgme/webgme/wiki/Component-Settings) within users. 


## Target
The target of this tutorial is to turn on authentication and generate appropriate keys for the token generation.

#### Detailed steps

##### 1. Key Generation
Before enabling authentication we must generate [RSA Keys](https://en.wikipedia.org/wiki/RSA_(cryptosystem)). These are used 
by the server to encrypt (the private key) and decrypt (the public key) the tokens containing the user-id. 
