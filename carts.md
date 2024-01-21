# Carts
The Carts service handles the shopping cart. The service can be used to create, update, modify and delete a cart. Only authorised users can create and manipulate shopping carts. Visit [the authorization documentation](./authorization.md) to get an authorization token. Provide the authorization token in the `Authorization` header of the request as a Bearer token.

## Endpoints

### 1. POST 
The following details are required to create a cart:

```
items: string[], // items Ids
```
The Carts uses hexadecimal string ids to identify users and items. The ids must be 24 characters in length.

Once the request has been processed, the server sends a response containing a message. The location url is sent in the location header of the response if a new item is successfully created.

The following code snippet provides an example of how to create a cart:

```
(async () => {
    const response = await fetch('http://localhost:3100/carts', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFsbGFuNTFAZ21haWwuY29tIiwiaWF0IjoxNzA1ODA2NjU2LCJleHAiOjE3MDgzOTg2NTYsInN1YiI6IjY1NzJjM2U2ZWVhNDA1Nzc0NTVjMjY3YyJ9.buzpIR1VpItAA5zvpT1bxAVakVe7sOJzWr3sVbkC5pk'
        },
        body: JSON.stringify({
            items: [
                "657369bf3c915ab149f1d8af", 
                "657369bf3c915ab149f1d9af",
                "64c9e4f2df7cc072af2ac9e5"
            ]
        })
    })
    
    const message = await response.json()
    console.log(message)

    const itemLocation = response.headers.get('Location')
    console.log(itemLocation)
})()
```





