import { assert} from "../../../library/testing/response-assertion";
import { app } from "./lib/test.config";
import { test, describe } from "@jest/globals"
import request from "supertest"

describe('DELETE Orders routes', () =>{
    test('Rejects delete-all requests, status 405: '+
        '(Method not allowed)', 
    async() =>{
        const response = await request(app).delete('/orders')

        assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validaton errors, status 400:'+ 
        'Invalid reference Id', 
    async() =>{
        const response = await request(app).delete(
            '/orders/4f2df7cc072af2ac9e8')

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with Not Found, status 404: '+
        ' Target does not exist.', 
    async() =>{
        const response = await request(app).delete(
            '/orders/87c1e4f2df7cc972af2ac9e8')

        assert.respondsWithNotFound(response)
    })

    test('Responds with deleted resource Id, status 200:  '+
        'Delete request successful.', 
    async() =>{
        const response = await request(app).delete(
            '/orders/64c9e4f2df7cc072af2ac9e8')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithDeletedResource(response)       
    })  

})