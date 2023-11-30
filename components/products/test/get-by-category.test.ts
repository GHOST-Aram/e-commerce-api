import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./lib/app.test.config"
import { assert } from "./lib/response-assertion"

describe('GET Products by category', () =>{


    test('Responds with validation errors, status 400: ' +
        'Invalid reference name (category name).',
    async() =>{
        const response = await request(app).get(
            '/products/categories/4a|><')

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    } )

    test('Responds with an empty array, status 200:' + 
        'No documents match requested creteria (category name).',
    async() =>{
        const response = await request(app).get(
            '/products/categories/smartphones')

        assert.respondsWithSuccess(response)
        assert.respondsWithEmptyResourceArray(response)
    } )

    test('Responds with paginated resource, status 200: '+ 
        'Default pagination -- limit = 10.', 
    async() =>{
        const response = await request(app).get(
            '/products/categories/phones')
        
            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
    })

    test('Responds with paginated resource, status 200: '+ 
        'Paginates resource as requested.', 
    async() =>{
        const response =  await request(app).get(
            '/products/categories/phones?page=1&limit=20')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 20)
    })
})