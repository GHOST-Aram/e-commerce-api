import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./lib/app.test.config"
import { assert } from "./lib/response-assertion"



describe('GET Products By Id', () =>{

    test('Responds with validation errors, status 400: '+
        'Invalid reference Id (product id).', 
    async() =>{
        const response = await request(app).get(
            '/products/64c9e4')

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with Not Found, status 404: '+
        'Target does not exist.', 
    async() =>{
        const response = await request(app).get(
            '/products/64c9e4f2df7cc072af2ac9d4')

        assert.respondsWithNotFound(response)
    })

    test('Responds with found resource, status 200:' +
        ' Get request success.', 
    async() =>{
        const response = await request(app).get(
            '/products/64c9e4f2df7cc072af2ac9e4')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithFoundResource(response)
    })
 })