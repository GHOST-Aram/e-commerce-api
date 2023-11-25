import { app } from "./test.config";
import { describe, test, expect } from "@jest/globals";
import request from "supertest"
import { invalidUserData, validUserData } from "./mocks/raw-data";

describe('PUT users route', () =>{
    test('Does not allow batch updates on users (405)', async() =>{
        const response = await request(app).put('/users')
            .send(validUserData)

        expect(response.status).toEqual(405)
        expect(response.body.message).toMatch(/not allowed/i)
        expect(response.headers['content-type']).toMatch(/json/i)
    })

    test('Rejects invalid users IDs with status 400',async () => {
        const response = await request(app).put(
            '/users/invalidId')
            .send(validUserData)

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with validation errors and status 400 if '+
        'invalid input', 
    async() =>{
        const response = await request(app).put(
            '/users/64c9e4f2df7cc072af2ac9e4')
            .send(invalidUserData)

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    })  

    test('Responds with 404 error if userID is valid but does not '+
        'exits', 
    async() =>{
        const response = await request(app).put(
            '/users/64c9e4f2df7cc072af2ac8a4')
            .send(validUserData)
        
        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with 200 and location URI if user update '+
        'was success', 
    async() =>{
        const response = await request(app).put(
            '/users/64c9e4f2df7cc072af2ac9e4')
            .send(validUserData)
        
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.header.location).toMatch(
            /^\/users\/[a-fA-F0-9]{24}$/)
        expect(response.body.message).toMatch(/updated/i)
    })
})