import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./lib/app.test.config"
import { badData, productData } from "./mocks/raw-document"
import { assert } from "./lib/response-assertion"

describe('PUT requests', () =>{

    test('Rejects update-all request, status 405: '+ 
        'Method not allowed.', 
    async() =>{
        const response = await request(app).put('/products')
            .send(productData)

       assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validation errors, status 400:'+
        'Invalid reference Id.', 
    async() =>{
        const response = await request(app).get(
            '/products/7888938878723232')
            .send(productData)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with validation errors, status 400: '+
        'Invalid input.', 
    async() =>{
        const response = await request(app).put(
            '/products/64c9e4f2df7cc072af2ac8d4')
            .send(badData)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with created resource URI, status 201: '+
        'Target does not exist, new document created.', 
    async() =>{
        const response = await request(app).put(
            '/products/64c9e4f2df7cc072af2ac8d4')
            .send(productData)
        
       assert.respondsWithCreatedResource(response)
    })

    test('Responds with updated resource URI, status 200: '+ 
        'Put request success.', 
    async() =>{
        const response = await request(app).put(
            '/products/64c9e4f2df7cc072af2ac9e4')
            .send(productData)

        assert.respondsWithSuccess(response)
        assert.respondsWithUpdatedResource(response)
    })
})