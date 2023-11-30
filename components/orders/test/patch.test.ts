import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"
import { assert } from "./lib/response-assertions";

describe('PATCH Orders routes', () =>{
    test('Rejects patch-all requests,  status 405: '+
        'Method not allowed', 
    async() =>{
        const response = await request(app).patch('/orders')
            .send(data.orderInput)

       assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validation errors, status 400: '+
        'Bad request -- Invalid reference Id.', 
    async() =>{
        const response = await request(app).patch(
            '/orders/64c9e4f2df7')
            .send(data.orderInput)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with validation errors, status 400:'+
        'Bad request -- Invalid Input.', 
    async() =>{
        const response = await request(app).patch(
            '/orders/64c9e4f2df7cc072af2ac9e8')
            .send(data.invalidOrderInput)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with Not Found, status 404: ' + 
        'Target not found.', 
    async() =>{
        const response = await request(app).patch(
            '/orders/64c9e4f2df7cc072af2ac9e5')
            .send(data.orderInput)

        assert.respondsWithNotFound(response)
    })

    test(' Responds with modified resource URI, status 200: '+
        'Patch request success.', 
    async() =>{
        const response = await request(app).patch(
            '/orders/64c9e4f2df7dd072af2ac9e5')
            .send(data.orderInput)

        assert.respondsWithSuccess(response)
        assert.respondsWithModifedResource(response)
    })
})