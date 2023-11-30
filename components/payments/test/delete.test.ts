import { assert} from "../../../library/testing/response-assertion";
import { app } from "./lib/test.config";
import { test, describe } from "@jest/globals"
import request from "supertest"

describe('DELETE Payments routes', () =>{
    test('Rejects delete-all requests (status 405): '+
        'Method not allowed', 
    async() =>{
        const response = await request(app).delete('/payments')

        assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validation errors status(400): '+
        'Invalid reference Id.', 
    async() =>{
        const response = await request(app).delete(
            '/payments/4f2df7cc072af2ac9e8')

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with Not Found status(404): '+
        'Target does not exist.', 
    async() =>{
        const response = await request(app).delete(
            '/payments/87c1e4f2df7cc972af2ac9e8')

        assert.respondsWithNotFound(response)
    })

    test('Responds with deleted resource id, status(200): '+
        'Delete operation success.', 
    async() =>{
        const response = await request(app).delete(
            '/payments/64c9e4f2df7cc072af2ac9e8')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithDeletedResource(response)      
    })  

})