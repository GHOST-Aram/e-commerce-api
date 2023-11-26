import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"
import * as data from "./mocks/raw-data";

describe('PUT Carts Routes', () => {

    test('Rejects  batch update request with status 405:'+
        ' Method not allowed', 
    async() =>{
        const response = await request(app).put('/carts')
            .send(data.cartData)
        
        expect(response.status).toEqual(405)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not allowed/i)
    })

    test('Responds with validation errors if input array contains'+
        ' invalid id: (status 400)', 
    async() =>{
        const response = await request(app).put(
            '/carts/64c9e4f2df7cc072af2ac9e5')
            .send(data.invalidUpdateInput)

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('errors')
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    })

    test('Responds with status 400 if customer id in request'+
        ' params is invalid',  
    async() =>{
        const response = await request(app).put(
            '/carts/64c9e4f2dc9e5')
            .send(data.invalidUpdateInput)

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with status 200 and location url if update is '+
        'successful', 
    async() =>{
        const  response = await request(app).put(
            '/carts/64c9e4f2df7cc072af2ac9e5')
            .send(data.validUpdateInput)

        expect(response.status).toEqual(200)
        expect(response.header.location).toMatch(
            /^\/carts\/64c9e4f2df7cc072af2ac9e5$/)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/updated/i)    
    })

    test('Responds with status 201 (Created) and resource'+
        ' location if new cart was created',
    async() =>{
        const response = await request(app).put(
            '/carts/64c9e4f8df7cc072af2ac9e5')
            .send(data.validUpdateInput)

        expect(response.status).toEqual(201)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.header.location).toMatch(
            /^\/carts\/64c9e4f8df7cc072af2ac9e5$/)
        expect(response.body.message).toMatch(/created/i)
    })
})