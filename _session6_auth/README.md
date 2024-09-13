## Introduction
Webgme provides a simple [authentication and authorization model](https://github.com/webgme/webgme/wiki/Users-and-Authentication).
By enabling authentication, clients can login and be authenticated as different users each with different access rights 
(mainly to projects). By default, the authentication is turned off and in this case all connected clients are authenticated as the guest account. 

```
gmeConfig.authentication.guestAccount = 'guest';
```

Looking at the **Project History** we can see that each commit is current associated with this userId. For larger projects 
with more than one collaborator it is beneficial to be able to distinguish between who did what within a project, but also
to scope the rights to different projects. In addition, different extensions can store 
[component-settings](https://github.com/webgme/webgme/wiki/Component-Settings) within users. 

A summary of the WebGME Authentication and Authorization model is presented in [this Youtube tutorial video](https://youtu.be/xS6_FK8kZhE).

## Target
The target of this tutorial is to:

1. Turn on authentication and generate appropriate keys for the token generation, and 
1. Get an idea of how the authorization model works.

## Detailed steps

### 1. Key Generation
Before enabling authentication we must generate the [RSA Keys](https://en.wikipedia.org/wiki/RSA_cryptosystem). These are used 
by the server to encrypt (the private key) and decrypt (the public key) the tokens containing the user-id. 
If we do not generate our own keys and set the configuration to use these new keys, the example keys checked into the webgme repo will be used (which of course is a pretty bad idea).

1. Create a new directory, `token_keys`, outside of the repository (if not guarded against all files under the cwd of the express server can accessed).
1. Using `openssl` (available for [windows](http://gnuwin32.sourceforge.net/packages/openssl.htm), the first step is to generate a private key
```
openssl genrsa -out token_keys/private_key 2048
```
and from it generated a public key
```
openssl rsa -in token_keys/private_key -pubout > token_keys/public_key
```

N.B. The token encoder/decoder is very sensitive to the format of the keys. That includes the line breaks as well. Make sure that both keys have the same linebreaks `CRLF` or `LF`.
Note that the minimum key size is 2048! There might be a warning when you start the server about this which can be disabled in the config as suggested in the warning.

### 2. Enabling auth
With our new keys generated we can safely turn on the authorization. (For the purpose of ease the keys are checked in to this repository; for an actual deployment, the keys should NOT be checked in to any repo).
Make sure to import the `path` module in your config file if you haven't already done so; (`FSM/config/config.default.js`) contains the final setup.

```
config.authentication.enable = true;
config.authentication.jwt.privateKey = path.join(__dirname, '..', '..', 'token_keys', 'private_key');
config.authentication.jwt.publicKey = path.join(__dirname, '..', '..', 'token_keys', 'public_key');
```

N.B. Webgme stores the tokens as cookies and if you are running multiple deployments on localhost with different keys - make sure to clear the cookies when switching deployments.

### 3. The Authorization Model
Import and optionally create a new seed from the seed at (relative to this file) `FSM/src/seeds/gmeAuth/gmeAuth.webgmex`.
To get an idea of how the authorization model works look at the model in the following order:

1. Study the META model
1. Look at the documentation in the root-node
1. Open the example model

### 4. Creating the first Site Admin
Site admins have full access to all projects, organizations, and users on the webgme-deployment. Although they can assign new site admins, the initial one must be created using the bin script on the server.

The following command creates an site admin named `admin` with the password `password`.
```
npm run users -- useradd -c -s admin admin@mail.com password
```

(`npm run users` is a [npm-run script](https://docs.npmjs.com/cli/run-script) defined in [package.json](https://github.com/webgme/tutorials/blob/master/_session6_auth/FSM/package.json#L12) and points to the usermanagement bin script inside webgme.)

### 5. Setting Preferences
By default, both guests and user registration are allowed. The guest account is used to identify users that aren't authenticated.

```
config.authentication.allowGuests = true;
config.authentication.guestAccount = 'guest';
config.authentication.allowUserRegistration = true;
```

Note that there is no mechanism for requesting a membership - it's either allowed or not allowed to create new users. For advanced users this can be accomplished by using the usermanagement bin script.

### 6. Routing
The regular editor page and the profile-page are two separate pages and it is possible to configure the paths of logging in and out from the editor. By default, these are set to the webgme profile page.

```
config.authentication.logInUrl = '/profile/login';
config.authentication.logOutUrl = '/profile/login';
```

### 7. More options
For more advanced configurations regarding the tokens used for authentication and how to replace the authorization module, see [gmeConfig](https://github.com/webgme/webgme/tree/master/config#authentication).

### 8. Important considerations
If your deployment is open to the public you should definitely make sure that you're running your webgme server behind a secure proxy (for instance [nginx](https://www.nginx.com/resources/wiki/)). The reason for this it two avoid hijacking of the token (or at login the user credentials) from a man in the middle attack.

### 9. External Authentication
By sharing the private key with a trusted 3rd party, authenticated requests to the webgme server can be made without explicit sign-in (using username and password). 

The webgme server looks for tokens in these places (ordered by look-up order):
1) Under the Authroization header `Bearer`, e.g. `Authorization: Bearer mF_9.B5f-4.1JqM....`
2) In the url-query parameter `token`, e.g. `?token=mF_9.B5f-4.1JqM....`.
3) Inside a cookie at `access_token` (configurable at gmeConfig.authentication.jwt.cookieId).

If an authenticated userId doesn't have an entry in the webgme user database - the user will be created automatically with a random password. (Users can later visit the profile page and change their password.) These "inferred" users will not be able to create new projects by default, however in version v2.12.0 this is configurable `config.authentication.inferredUsersCanCreate = false`). 

Tokens passed via the url-query will be placed in the `access_token`-cookie by the webgme server. If configured to do so (default) - the webgme server will also renew such tokens when they're about to expire.

### Common issues
If you have problems with faulty keys or are generating new keys for the same host clearing the stored cookies inside the browser can solve some 403 issues.
