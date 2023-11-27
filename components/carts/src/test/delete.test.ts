import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"

describe('DELETE Cart routes', () =>{
    test('Rejects delete all carts request with status 405:'+
        ' Method not allowed', 
        async() =>{
            const response = await request(app).delete('/carts')
            
            expect(response.status).toEqual(405)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body.message).toMatch(/not allowed/i)
        }
    )

    test('Responds with status 404 if cart to be deleted doesn\'t exist', 
        async() =>{
            const  response = await request(app).delete(
                '/carts/25c9e4f2df7cc072af2ac9e5')

            expect(response.status).toEqual(404)
            expect(response.body.message).toMatch(/not found/i)
            expect(response.headers['content-type']).toMatch(/json/)
        }
    )

    test('Responds with status 400 if cart reference id (customer id )in request'+
        ' params is invalid',  
    async() =>{
        const response = await request(app).delete(
            '/carts/64c9e4f2dc9e5')

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with status 200 and cart reference ID if '+
        'delete is success', 
        async() =>{
            const response = await request(app).delete(
                '/carts/64c9e4f2df7cc072af2ac9e5')
            
            expect(response.status).toEqual(200)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body.message).toMatch(/deleted/i)
            expect(response.body.id).toMatch(
                /^64c9e4f2df7cc072af2ac9e5$/)
        }
    )
})