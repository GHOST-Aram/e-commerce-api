import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./app.test.config"
import { badData, productData } from "./mocks/raw-document"

describe('PUT request', () =>{
    test('Responds with 204 status for successfull update', 
    async() =>{
        const response = await request(app).put(
            '/products/64c9e4f2df7cc072af2ac9e4')
            .send(productData)

        expect(response.status).toEqual(204)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/updated/i)
    })

    test('Responds with 201 if new document was created', 
    async() =>{
        const response = await request(app).put(
            '/products/64c9e4f2df7cc072af2ac8d4')
            .send(productData)
        
        expect(response.status).toEqual(201)
        expect(response.header.location).toMatch(/^\/products\/[0-9a-fA-F]{24}$/i)
        expect(response.body.message).toMatch(/created/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with 400 if product ID is invalid', 
    async() =>{
        const response = await request(app).put(
            '/products/67cc072af2ac8d4')
            .send(productData)

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with status 400 if Invalid input', 
    async() =>{
        const response = await request(app).put(
            '/products/64c9e4f2df7cc072af2ac8d4')
            .send(badData)

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with status 405 on update all', 
    async() =>{
        const response = await request(app).put('/products')
            .send(productData)

        expect(response.status).toEqual(405)
        expect(response.body.message).toMatch(/not allowed/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })
})