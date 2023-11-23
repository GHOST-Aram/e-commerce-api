import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { badData, productData } from "./mocks/raw-document"
import { app } from "./app.test.config"

describe('POST PRODUCTS ROUTE', () =>{
    test('Responds with status 201 and \'created\' message', 
    async() =>{
        const response =  await request(app).post('/products')
            .send(productData)

        expect(response.status).toEqual(201)
        expect(response.body.message).toMatch(/created/i)
    } )
    
    test('Responds with JSON content-type', async() =>{
        const response =  await request(app).post('/products')
            .send(productData)
        expect(response.headers['content-type']).toMatch(/json/)
    })
    
    test('Responds with resource URI in the location header', 
    async() =>{
        const response =  await request(app).post('/products')
            .send(productData)
        expect(response.headers['location']).toMatch(
            /^\/products\/[0-9a-fA-F]{24}$/)
    })
    
    test('Responds with status 400 Bad request and errors'+
        ' array for no input', 
    async() =>{
        const response =  await request(app).post('/products')
            
        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/Invalid input/i)
    }) 
    
    test('Responds with status 400 Bad request for Invalid input', 
    async() =>{
        const response =  await request(app).post('/products')
            .send(badData)
        
        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/Invalid input/i)
    })
    
    test('Responds with erros array for Invalid input', 
    async() =>{
        const response =  await request(app).post('/products')
            .send(badData)
        expect(Array.isArray(response.body.errors)).toBeTruthy()
    })

})    
