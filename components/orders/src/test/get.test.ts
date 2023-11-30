import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"
import { assert } from "./lib/response-assertions";

describe('GET orders Routes', () =>{

    test('Responds with validation errors, status 400: '+
        'Bad request -- Invalid reference Id.', 
    async() =>{
        const response = await request(app).get(
            '/orders/4f2df7cc072af2ac9e8')

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with Not Found, status 404: '+
        'Target does not exist.', 
    async() =>{
        const response = await request(app).get(
            '/orders/87c1e4f2df7cc972af2ac9e8')

        assert.respondsWithNotFound(response)
    })

    test('Responds with paginated resource, status 200: '+ 
        'Default pagination -- limit = 10', 
    async() =>{
        const response = await request(app).get('/orders')

       assert.respondsWithSuccess(response)
       assert.respondsWithPaginatedResource(response, 10)
    })

    test('Responds with paginated resource, status 200:' +
        'Client requested pagination.', 
    async() =>{
        const response = await request(app).get(
            '/orders?page=1&limit=12')
        
       assert.respondsWithSuccess(response)
       assert.respondsWithPaginatedResource(response, 12)
    })

    test('Responds with found resource, status 200: '+
        'Get request sucees.', 
    async() =>{
        const response = await request(app).get(
            '/orders/64c9e4f2df7cc072af2ac9e8')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithFoundResource(response)
    })  
})