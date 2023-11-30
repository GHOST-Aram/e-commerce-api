import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { badData, productData } from "./mocks/raw-document"
import { app } from "./lib/app.test.config"
import { assert } from "./lib/response-assertion"

describe('POST Products route', () =>{

    test('Rejects requests with client defined Ids, status 405: '+ 
        'Method not allowed.', 
    async() =>{
        const response =  await request(app).post(
            '/products/64c9e4f2df7cc072af2ac9e4')
            .send(productData)

        assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validation errors, status 400: '+ 
        'Invalid Input', 
    async() =>{
        const response =  await request(app).post('/products')
            .send(badData)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with created resource URI, status 201: '+ 
        'Post operation success.', 
    async() =>{
        const response =  await request(app).post('/products')
            .send(productData)

       assert.respondsWithCreatedResource(response)
    } )
})    
