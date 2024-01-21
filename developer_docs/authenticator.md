# The Authenticator
The Authenticator uses JSON web tokens. The role of the Authenticator is to provide an authorization token. The authentication request handler signs in the user by verifying the user's `email` and the `password`. 

The details are verified against the users details stored in the users database. The authentication request handler signs a JWT token if user details are valid.

A `secretOrKey` is required as an environment varaible. If the key is not provided, the authentication request handler will through an error. The error thrown for undefined `secretOrKey` is sent to the user as an internal server error.