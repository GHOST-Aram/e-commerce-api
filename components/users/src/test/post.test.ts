import { describe, test, expect } from '@jest/globals'
import request from 'supertest'
import {app} from './test.config'
import * as data from './mocks/raw-data'

describe('POST users', () =>{
    test('Responds with status 409 if user exists with same email', 
    async() =>{
        const response = await request(app).post('/users')
            .send(data.userWithExistingEmail)

        expect(response.status).toEqual(409)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/exists/)
    })

    test('Responds with status 400 and errors array '+
        'for invalid input', 
    async() =>{
        const response = await request(app).post('/users')
            .send(data.invalidUserData)

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
        expect(response.body.errors.length).toBeGreaterThan(0)

    })

    test('Responds with status 201 if successfuly created', 
    async() =>{
        const response = await request(app).post('/users')
            .send(data.validUserData)

        expect(response.status).toEqual(201)
        expect(response.body.message).toMatch(/created/i)
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('_id')
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.header.location).toMatch(
            /^\/users\/[a-zA-Z0-9]{24}$/)
    })  


})