import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { describe, test } from "@jest/globals";
import request from "supertest"
import * as rawData from "./mocks/raw-data";

describe('PUT users route', () =>{
    
    test('Rejects update-all requests ( status 405): Method not Allowed.', 
        async() =>{
            const response = await request(app).put('/users')
                .send(rawData.validUserData)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors (status 400): Invalid reference Id.',
        async () => {
            const response = await request(app).put(
                '/users/invalidId')
                .send(rawData.validUserData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with validation errors (status 400): Invalid input.', 
        async() =>{
            const response = await request(app).put(
                '/users/64c9e4f2df7cc072af2ac9e4')
                .send(rawData.invalidUserData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )  

    test('Responds with created resource location URI(status 201): New user created.', 
        async() =>{
            const response = await request(app).put(
                '/users/64c9e4f2df7cc072af2ac8a4')
                .send(rawData.validUserData)

            assert.respondsWithCreatedResource(response)
        }
    )

    test('Responds with updated resource location URI (status 200): Update success.', 
        async() =>{
            const response = await request(app).put(
                '/users/64c9e4f2df7cc072af2ac9e4')
                .send(rawData.validUserData)
            assert.respondsWithSuccess(response)
            assert.respondsWithUpdatedResource(response)
        }
    )
})