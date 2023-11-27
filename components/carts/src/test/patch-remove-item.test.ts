import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"
import * as data from "./mocks/raw-data";

describe('PATCH (Remove one Item from cart) Carts Route', () => {

    test('Responds with validation errors if input contains'+
        ' array of items Ids: (status 400)', 
    async() =>{
        const response = await request(app).patch(
            '/carts/64c9e4f2df7cc072af2ac9e5/remove-item')
            .send(data.validUpdateInput)

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    })

    test('Responds with validation errors if input contains'+
        ' an invalid item id: (status 400)', 
    async() =>{
        const response = await request(app).patch(
            '/carts/64c9e4f2df7cc072af2ac9e5/remove-item')
            .send(data.invalidPatchData)

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    })

    test('Responds with status 400 if customer id (cart reference) in request'+
        ' params is invalid',  
    async() =>{
        const response = await request(app).patch(
            '/carts/64c9e4f2dc9e5/remove-item')
            .send(data.invalidUpdateInput)

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with status 200 and location url if '+
        'item is succeffully  removed cart is successful', 
    async() =>{
        const  response = await request(app).patch(
            '/carts/64c9e4f2df7cc072af2ac9e5/remove-item')
            .send(data.validPatchData)

        expect(response.status).toEqual(200)
        expect(response.header.location).toMatch(
            /^\/carts\/64c9e4f2df7cc072af2ac9e5$/)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/modified/i)    
    })

    test('Responds with status 404 if the cart doesn\'t exist', 
    async() =>{
        const  response = await request(app).patch(
            '/carts/25c9e4f2df7cc072af2ac9e5/remove-item')
            .send(data.validPatchData)

        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })
    
})