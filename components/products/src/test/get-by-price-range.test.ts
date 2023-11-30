import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./lib/app.test.config"
import { assert } from "./lib/response-assertion"

describe('GET products by Price Range', () =>{

    test('Responds with validation errors, status 400: '+
    'Invalid reference -- Invalid range format', 
    async() =>{
        const response = await request(app).get(
            '/products/selling-price/ksh499-Ksh599')

       assert.respondsWithBadRequest(response)
       assert.respondsWithValidationErrors(response)
    })

    test('Responds with validation errors, status 400: '+
    'Invalid reference -- start=end', 
    async() =>{
        const response = await request(app).get(
            '/products/selling-price/100-100')

       assert.respondsWithBadRequest(response)
       assert.respondsWithValidationErrors(response)
    })

    test('Responds with an empty array, status 200:' + 
        'No documents match requested creteria (price range).',
    async() =>{
        const response = await request(app).get(
            '/products/selling-price/10000000-200000000')

        assert.respondsWithSuccess(response)
        assert.respondsWithEmptyResourceArray(response)
    } )

    test('Responds with paginated resource, status 200: '+
        'Accepts revered price ranges.', 
    async() =>{
        const response = await request(app).get(
            '/products/selling-price/800-200')

        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 10)
    })

    test('Responds with paginated resource, status 200: '+ 
            'Pagination as requested by client.', 
        async() =>{
        const response = await request(app).get(
            '/products/selling-price/200-800?page=1&limit=23')
       
        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 23)
    })
})