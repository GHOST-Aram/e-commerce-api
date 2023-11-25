import { app } from "./test.config";
import { describe, test, expect } from "@jest/globals";
import request from "supertest"

describe('DELETE users route', () =>{
    test('Does not allow batch deletees on users (405)', async() =>{
        const response = await request(app).delete('/users')

        expect(response.status).toEqual(405)
        expect(response.body.message).toMatch(/not allowed/i)
        expect(response.headers['content-type']).toMatch(/json/i)
    })

    test('Rejects invalid users IDs with status 400',async () => {
        const response = await request(app).delete(
            '/users/invalidId')

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with 404 error if userID is valid but does not'+
        ' exits', 
    async() =>{
        const response = await request(app).delete(
            '/users/64c9e4f2df7cc072af2ac8a4')
        
        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with 200 if delete was success', 
    async() =>{
        const response = await request(app).delete(
            '/users/64c9e4f2df7cc072af2ac9e4')
        
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/deleted/i)
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('_id')
    })
})