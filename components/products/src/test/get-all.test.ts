import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./app.test.config"

describe('GET PRODUCTS', () => { 
    test('Respond with JSON content-type', async() =>{
        const response = await request(app).get('/products')
    
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with an array of all products', async()=>{
        const response = await request(app).get('/products')

        expect(Array.isArray(response.body.products)).toBeTruthy()
    })

    test('Responds with 200 status if products found', async() =>{
        const response = await request(app).get('/products')

        expect(response.status).toEqual(200)
    })

    test('Responds with paginated data', async() =>{
        const response = await request(app).get(
            '/products?page=1&limit=4'
        )
        const products = response.body.products
        expect(products).toHaveProperty('length')
        expect(products.length).toBeGreaterThan(0)
        expect(products.length).toBeLessThanOrEqual(4)
    })
 })
