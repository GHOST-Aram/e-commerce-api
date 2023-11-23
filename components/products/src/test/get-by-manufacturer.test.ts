import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./app.test.config"

describe('GET Products by manufacturer', () =>{
    test('Responds with JSON content', async() =>{
        const response = await request(app).get(
            '/products/manufacturer/samsung'
        )

        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with status 200 if products in the manufacturer exist', 
    async() =>{
        const response = await request(app).get(
            '/products/manufacturer/samsung'
        )

        expect(response.status).toEqual(200)
    })

    test('Responds with Array of products if manufacturer exists', 
    async() =>{
        const response = await request(app).get(
            '/products/manufacturer/samsung'
        )

        expect(Array.isArray(response.body.products)).toBeTruthy()
    })

    test('Responds with array limited to pagination limit', async() =>{
        const response =  await request(app).get(
            '/products/manufacturer/samsung?page=1&limit=20'
        )
        const products = response.body.products

        expect(products.length).toBeLessThanOrEqual(20)
        expect(products.length).toEqual(20)
    })

    test('Responds with list limited to default limit if no limit', 
    async() =>{
        const response = await request(app).get(
            '/products/manufacturer/samsung'
        )

        expect(response.body.products.length).toEqual(10)
    })

    test('Responds with error 404 if product of requested manufacturer not found', 
    async() =>{
        const response = await request(app).get(
            '/products/manufacturer/nokia'
        )

        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/ig)
    })

    test('Responds with status 400 if manufacturer name is empty',async() =>{
        const response = await request(app).get('/products/manufacturer/4a')

        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid manufacturer/ig)
    } )
})