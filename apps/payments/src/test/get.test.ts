import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import request from "supertest"

describe('GET Payments Routes', () =>{
    test('Responds with validation errors, (status 400): Invalid reference Id', 
        async() =>{
            const response = await request(app).get(
                '/payments/4f2df7cc072af2ac9e8')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Not Found, (status 404): Target does not exist.', 
        async() =>{
            const response = await request(app).get(
                '/payments/87c1e4f2df7cc972af2ac9e8')

            assert.respondsWithNotFound(response)
        }
    )

    test('Responds with paginated list, (status 200): Default pagination (limit 10).', 
        async() =>{
            const response = await request(app).get('/payments')

            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 10)
        }
    )

    test('Responds with paginated list (status 200): Requested pagination.', 
        async() =>{
            const response = await request(app).get(
                '/payments?page=1&limit=12')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithPaginatedResource(response, 12)
        }
    )

    test('Responds with found resource , status(200): GET-one operation success.', 
        async() =>{
            const response = await request(app).get(
                '/payments/64c9e4f2df7cc072af2ac9e8')
            
            assert.respondsWithSuccess(response)
            assert.respondsWithFoundResource(response)
        }
    )  
})