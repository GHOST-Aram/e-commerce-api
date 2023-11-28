import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PUT Payments routes', () =>{
    test('Rejects batch update requests with status 405 '+
        '(Method not allowed)', 
    async() =>{
        const response = await request(app).put('/payments')
            .send(data.paymentInput)

        expect(response.status).toEqual(405)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not allowed/i)
    })

    test('Rejects invalid payment reference ID\'s with '+
        'status 400(Bad request) and validation errors', 
    async() =>{
        const response = await request(app).put(
            '/payments/64c9e4f2df7')
            .send(data.paymentInput)

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    })

    test('Rejects invalid input: Responds with status'+
        '(400 Bad request)', 
    async() =>{
        const response = await request(app).put(
            '/payments/64c9e4f2df7cc072af2ac9e8')
            .send(data.invalidInput)

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    })

    test('Creates new payment document if the target is not found:'+
        ' Responds with status 201 and location URI of the new doc', 
    async() =>{
        const response = await request(app).put(
            '/payments/64c9e4f2df7cc072af2ac9e5')
            .send(data.paymentInput)

        expect(response.status).toEqual(201)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/created/i)
        expect(response.header.location).toMatch(
            /^\/payments\/[a-fA-F0-9]{24}$/)
    })

    test(' Responds with status 200 and location URI if '+
        'update is successful', 
    async() =>{
        const response = await request(app).put(
            '/payments/64c9e4f2df7dd072af2ac9e5')
            .send(data.paymentInput)

        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/updated/i)
        expect(response.header.location).toMatch(
            /^\/payments\/64c9e4f2df7dd072af2ac9e5$/)
    })
})