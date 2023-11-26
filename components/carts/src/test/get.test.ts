import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"

describe('GET Carts routes | Get all or with Customer ID', () =>{

    test('Responds with list with default pagination limit (10) '+
        ' ( get Many carts)', 
    async() =>{
        const response = await request(app).get('/carts')

        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(Array.isArray(response.body.carts)).toBeTruthy()
        expect(response.body.carts.length).toEqual(10)
    })

    test('Responds with list limited to requested pagination', 
    async() =>{
        const response = await request(app).get(
            '/carts?page=1&limit=23')

        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(Array.isArray(response.body.carts)).toBeTruthy()
        expect(response.body.carts.length).toEqual(23)
    })

    test('Responds with status 200 and payload if cart is found', 
    async() =>{
        const response = await request(app).get(
            '/carts/64c9e4f2df7cc072af2ac9e5')
        
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('cart')
    })

    test('Responds with status 404 (Not found) if requested'+
        ' cart does not exist', 
    async() =>{
        const response = await request(app).get(
            '/carts/64c9e4f2df7cc072af2ac9e3')
        
        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with status 400 (Bad request) if customer ID'+
        ' is invalid', 
    async() =>{
        const response = await request(app).get('/carts/69e4f2d')
        
        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(
            /invalid/i)
    })
})