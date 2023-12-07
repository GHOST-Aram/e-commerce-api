import { assert} from "../z-library/testing/response-assertion";
import { describe, test } from "@jest/globals"
import request from "supertest"
import { app } from "./config/app.test.config"

describe('GET Products by model Name', () =>{

    test('Responds with validation errors, status 400: '+
        'Invalid reference name (model name).',
    async() =>{
        const response = await request(app).get(
            '/products/models/_}":')

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    } )

    test('Responds with an empty array, status 200:' + 
        'No documents match requested creteria (model name).',
    async() =>{
        const response = await request(app).get(
            '/products/models/model10')

        assert.respondsWithSuccess(response)
        assert.respondsWithEmptyResourceArray(response)
    } )

    test('Responds with paginated resource, status 200: '+ 
        'Default pagination --- limit = 10.', 
    async() =>{
        const response = await request(app).get(
            '/products/models/A10S')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 10)
    })

    test('Responds with paginated resource, status 200: '+ 
            'Client requested pagination limit.', 
        async() =>{
        const response =  await request(app).get(
            '/products/models/A10S?page=1&limit=20')

        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 20)
    })
})