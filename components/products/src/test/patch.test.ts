import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./app.test.config"
import { 
    badPartialData, 
    partialData 
} from "./mocks/raw-document"

describe('PATCH requests', () =>{

    test('Responds with status 405 on pacth all', 
    async() =>{
        const response = await request(app).patch('/products')
            .send(partialData)

        expect(response.status).toEqual(405)
        expect(response.body.message).toMatch(/not allowed/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with 200 status for successfull pacth', 
    async() =>{
        const response = await request(app).patch(
            '/products/64c9e4f2df7cc072af2ac9e4')
            .send(partialData)

        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/modified/i)
        expect(response.header.location).toMatch(
            /^\/products\/[0-9a-fA-F]{24}$/i)

    })

    test('Responds with 404 if id don\'t exist', 
    async() =>{
        const response = await request(app).patch(
            '/products/64c9e4f2df7cc072af2ac8d4')
            .send(partialData)
        
        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with 400 if product ID is invalid', 
    async() =>{
        const response = await request(app).patch(
            '/products/67cc072af2ac8d4')
            .send(partialData)

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with status 400 if Invalid input', 
    async() =>{
        const response = await request(app).patch(
            '/products/64c9e4f2df7cc072af2ac9e4')
            .send(badPartialData)

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid input/i)
        expect(Array.isArray(response.body.errors)).toBeTruthy()
        expect(response.headers['content-type']).toMatch(/json/)

    })
})