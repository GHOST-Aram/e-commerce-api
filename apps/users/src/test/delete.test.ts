import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { describe, test } from "@jest/globals";
import request from "supertest"

describe('DELETE users route', () =>{
    test('Rejects delete-all request: (status 405): Method not allowed.', 
        async() =>{
            const response = await request(app).delete('/users')
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors (status 400): Invalid reference Id.',
        async () => {
            const response = await request(app).delete(
                '/users/invalidId78327874823')

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)  
        }
    )

    test('Responds with Not Found (status 404): User does not exist.', 
        async() =>{
            const response = await request(app).delete(
                '/users/64c9e4f2df7cc072af2ac8a4')

        assert.respondsWithNotFound(response)
        }
    )

    test('Responds with deleted resource Id (status 200): Delete Operation success.', 
        async() =>{
            const response = await request(app).delete(
                '/users/64c9e4f2df7cc072af2ac9e4')

            assert.respondsWithSuccess(response)
            assert.respondsWithDeletedResource(response)
        }
    )
})