import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./app.test.config"


describe('PATCH requests', () =>{

    test('Responds with status 405 for delete all', 
    async() =>{
        const response = await request(app).delete('/products')

        expect(response.status).toEqual(405)
        expect(response.body.message).toMatch(/not allowed/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with 200 status for successfull delete', 
    async() =>{
        const response = await request(app).delete(
            '/products/64c9e4f2df7cc072af2ac9e4')

        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/deleted/i)
        expect(response.body.product).toHaveProperty('_id')
        expect(response.body.product._id.toString()).toMatch(
            /^[0-9a-zA-Z]{24}$/)

    })

    test('Responds with 404 if id don\'t exist', 
    async() =>{
        const response = await request(app).delete(
            '/products/64c9e4f2df7cc072af2ac8d4')
        
        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with 400 if product ID is invalid', 
    async() =>{
        const response = await request(app).delete(
            '/products/67cc072af2ac8d4')

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid id/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

})