## Authenticator Service

The Authenticator application in this project uses JSON Web tokens. It's purpose in the authentication process is to provide an authorizaion JSON web token. The authenticator verifies user details.The details required are a registered user `email` and a `password`. The authentication handler responds with a token if the user details are valid.  However, if `email` is not registered or the `password` is wrong, the authentication handler will respond with `401 Unauthorised` status.

An example of an authentication request.

```
(async () => {
    const response = await fetch('http://localhost:3700/auth', {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: "Allan51@gmail.com",
            password: "pass18hp4tsy7P"
        })
    })

    
    const token = await response.json()
    console.log(token)
})()
```
