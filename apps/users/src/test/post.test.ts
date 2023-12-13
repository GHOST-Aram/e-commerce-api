import { assert} from "../z-library/testing/response-assertion";
import { describe, test } from '@jest/globals'
import request from 'supertest'
import {app} from './config/app'
import * as data from './mocks/raw-data'


describe('POST users', () =>{

    test('Rejects request with client defined Id (status 405): Method not allowed. ', 
        async() =>{
            const response = await request(app).post(
                '/users/64c9e4f2df7cc072af2ac9e4')
            
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with conflict (status 409): User exists with same email.', 
        async() =>{
            const response = await request(app).post('/users')
                .send(data.userWithExistingEmail)

            assert.respondsWithConflict(response)
        }
    )

    test('Responds with validation errors (status 400): Invalid input.', 
        async() =>{
            const response = await request(app).post('/users')
                .send(data.invalidUserData)

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)

        }
    )

    test('Responds with created resource (status 201): Operation Success.', 
        async() =>{
            const response = await request(app).post('/users')
                .send(data.validUserData)

            assert.respondsWithCreatedResource(response)
        }
    )  
})