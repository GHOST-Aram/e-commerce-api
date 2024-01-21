## Authorization

The authorization system issuess an authorizaion token. The details required are a registered `email` and a `password`. The authenticator verifies user details and responds with a token or an error. The system responds with an authorization token if the user details are valid.  However, if the `email` is not registered or the `password` is wrong, a `401 Unauthorised` status will be sent.

Here is an example of an authentication request.

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
