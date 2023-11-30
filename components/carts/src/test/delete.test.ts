import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"
import { assert } from "./lib/response-assertions";

describe('DELETE Cart routes', () =>{
    test('Rejects delete all carts request with status 405:'+
        ' Method not allowed', 
        async() =>{
            const response = await request(app).delete('/carts')
            
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds  validation errors, status 400: '+
        ' Invalid reference Id (customet Id).',  
    async() =>{
        const response = await request(app).delete(
            '/carts/64c9e4f2dc9e5')

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with Not Found, status 404: Target doesn\'t exist', 
        async() =>{
            const  response = await request(app).delete(
                '/carts/25c9e4f2df7cc072af2ac9e5')

            assert.respondsWithNotFound(response)
        }
    )

    test('Responds deleted resource Id, status 200:  '+
        'Delete operation success.', 
        async() =>{
            const response = await request(app).delete(
                '/carts/64c9e4f2df7cc072af2ac9e5')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithDeletedResource(response)
        }
    )
})