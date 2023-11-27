import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PATCH Orders routes', () =>{
    test('Rejects batch modification requests with status 405 '+
        '(Method not allowed)', 
    async() =>{
        const response = await request(app).patch('/orders')
            .send(data.orderInput)

        expect(response.status).toEqual(405)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not allowed/i)
    })

    test('Rejects invalid order reference ID\'s with '+
        'status 400(Bad request) and validation errors', 
    async() =>{
        const response = await request(app).patch(
            '/orders/64c9e4f2df7')
            .send(data.orderInput)

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    })

    test('Rejects invalid input: Responds with status'+
        '(400 Bad request)', 
    async() =>{
        const response = await request(app).patch(
            '/orders/64c9e4f2df7cc072af2ac9e8')
            .send(data.invalidOrderInput)

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    })

    test('Responds with status 404 if target not found.', 
    async() =>{
        const response = await request(app).patch(
            '/orders/64c9e4f2df7cc072af2ac9e5')
            .send(data.orderInput)

        expect(response.status).toEqual(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not found/i)
    })

    test(' Responds with status 200 and location URI if '+
        'patch is successful', 
    async() =>{
        const response = await request(app).patch(
            '/orders/64c9e4f2df7dd072af2ac9e5')
            .send(data.orderInput)

        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/modified/i)
        expect(response.header.location).toMatch(
            /^\/orders\/64c9e4f2df7dd072af2ac9e5$/)
    })
})