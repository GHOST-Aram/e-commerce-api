import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./app.test.config"

describe('GET products by Price Range', () =>{
    test('Responds with status code 200 if successful', 
    async() =>{
        const response = await request(app).get(
            '/products/selling-price/200-800')
        expect(response.status).toEqual(200)
    })

    test('Resonds with json content-type', async() =>{
        const response = await request(app).get(
            '/products/selling-price/200-800')
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with array if successfull', async() =>{
        const response = await request(app).get(
            '/products/selling-price/200-800')
        const products = response.body.products

        expect(response.status).toEqual(200)
        expect(Array.isArray(products)).toBeTruthy()
        expect(products).toHaveProperty('length')
        expect(products.length).toBeGreaterThanOrEqual(1)
    })

    test('Responds with 404 status if no products matches the '+
        'range', 
    async() =>{
        const response = await request(app).get(
            '/products/selling-price/10000000-200000000')

        expect(response.status).toEqual(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not found/i)
    })

    test('Responds with 200 status and available products for '+
        'reversed ranges', 
    async() =>{
        const response = await request(app).get(
            '/products/selling-price/800-200')

        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('products')
    })

    test('Responds with 400 status for requests containing '+
        'non-numerical characters in range parameter', 
    async() =>{
        const response = await request(app).get(
            '/products/selling-price/ksh499-599')

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/invalid range/i)
    })

    test('Responds wih 400 status for invalid range format', 
    async() =>{
        const response = await request(app).get(
            '/products/selling-price/200800')

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/invalid range/i)
    })
})