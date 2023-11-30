import { assert} from "../../../library/api-testing/response-assertion";
import { describe, test } from "@jest/globals"
import request from "supertest"
import { app } from "./lib/app.test.config"
import { 
    badPartialData, 
    partialData 
} from "./mocks/raw-document"


describe('PATCH requests', () =>{

    test('Rejecys patch-all request, status 405: ' + 
        'Method not allowed.', 
    async() =>{
        const response = await request(app).patch('/products')
            .send(partialData)

        assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validation errors, status 400:' + 
        'Invalid reference Id -- product Id.', 
    async() =>{
        const response = await request(app).patch(
            '/products/67cc072af2ac8d4')
            .send(partialData)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with validation errors, status 400' + 
        'Invalid input.', 
    async() =>{
        const response = await request(app).patch(
            '/products/64c9e4f2df7cc072af2ac9e4')
            .send(badPartialData)

       assert.respondsWithBadRequest(response)
       assert.respondsWithValidationErrors(response)

    })

    test('Responds with not found, status 404: '+
        'Target does not exist.', 
    async() =>{
        const response = await request(app).patch(
            '/products/64c9e4f2df7cc072af2ac8d4')
            .send(partialData)
        
       assert.respondsWithNotFound(response)
    })

    test('Responds with modified resource URI, status 200: '+ 
        'Patch operation success.', 
    async() =>{
        const response = await request(app).patch(
            '/products/64c9e4f2df7cc072af2ac9e4')
            .send(partialData)

        assert.respondsWithSuccess(response)
        assert.respondsWithModifedResource(response)
    })
})