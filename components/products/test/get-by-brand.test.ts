import { assert} from "../../../library/api-testing/response-assertion";
import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./lib/app.test.config"


describe('GET Products by brand', () =>{

    test('Responds with validation errors, status 400: '+ 
        'Invalid reference (brand name).',
    async() =>{
        const response = await request(app).get(
            '/products/brands/4(){}')

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    } )

    test('Responds with an empty array, status 200:' + 
        'No documents match requested creteria (manufacturer name).',
    async() =>{
        const response = await request(app).get(
            '/products/brands/hisense')

        assert.respondsWithSuccess(response)
        assert.respondsWithEmptyResourceArray(response)
    } )

    test('Responds with paginated resource, status 200: '+
        'Default pagination => 10.', 
    async() =>{
        const response = await request(app).get(
            '/products/brands/samsung')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response,10)
    })


    test('Responds with paginated resource, status 200: '+ 
        'Requested pagination  => limit 20.', 
    async() =>{
        const response =  await request(app).get(
            '/products/brands/samsung?page=1&limit=20')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 20)
    })
})