import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"

describe('DELETE Payments routes', () =>{
    test('Rejects delete-all requests with status 405 '+
        '(Method not allowed)', 
    async() =>{
        const response = await request(app).delete('/payments')

        expect(response.status).toEqual(405)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not allowed/i)
    })

    test('Rejects requests with invalid payment Ids (400 Bad request)', 
    async() =>{
        const response = await request(app).delete(
            '/payments/4f2df7cc072af2ac9e8')

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/Invalid/i)
    })

    test('Responds with status 404 (Not Found) if target'+
        ' does not exist', 
    async() =>{
        const response = await request(app).delete(
            '/payments/87c1e4f2df7cc972af2ac9e8')

        expect(response.status).toEqual(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not found/i)
    })

    test('Responds with status 200 and deletedId if request '+
        'is successful', 
    async() =>{
        const response = await request(app).delete(
            '/payments/64c9e4f2df7cc072af2ac9e8')
        
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('id')
        expect(response.body.message).toMatch(/deleted/i)
        expect(response.body.id).toMatch(/^[a-fA-F0-9]{24}$/)       
    })  

})