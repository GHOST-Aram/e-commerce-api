import { describe, test, expect } from '@jest/globals'
import request from 'supertest'
import {app} from './lib/test.config'
import * as data from './mocks/raw-data'
import { expectations } from './lib/response-expectations'

describe('POST users', () =>{
    test('Responds with status 409 if user exists with same email', 
    async() =>{
        const response = await request(app).post('/users')
            .send(data.userWithExistingEmail)
        expectations.expectConflictResponse(response)
    })

    test('Responds with status 400 and errors array '+
        'for invalid input', 
    async() =>{
        const response = await request(app).post('/users')
            .send(data.invalidUserData)

        expectations.expectBadRequestResponse(response)
        expectations.expectErrorResponseWithArray(response)

    })

    test('Responds with status 201 if successfuly created', 
    async() =>{
        const response = await request(app).post('/users')
            .send(data.validUserData)

        expectations.expectCreatedResponse(response)
    })  


})