import { assert} from "../../../library/api-testing/response-assertion";
import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./lib/app.test.config"



describe('DELETE Products requests', () =>{

    test('Responds delete-all requests, status 405: '+ 
        'Method not allowed.', 
    async() =>{
        const response = await request(app).delete('/products')

        assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validation errors, status 400: '+
        'Invalid reference Id.', 
    async() =>{
        const response = await request(app).delete(
            '/products/67cc072af2ac8d4')

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with Not Found, status 404: '+ 
        ' Target does not exist.', 
    async() =>{
        const response = await request(app).delete(
            '/products/64c9e4f2df7cc072af2ac8d4')
        
        assert.respondsWithNotFound(response)
    })

    test('Responds with deleted resource Id, status 200: '+ 
        'Delete request success.', 
    async() =>{
        const response = await request(app).delete(
            '/products/64c9e4f2df7cc072af2ac9e4')

        assert.respondsWithSuccess(response)
        assert.respondsWithDeletedResource(response)
    })
})