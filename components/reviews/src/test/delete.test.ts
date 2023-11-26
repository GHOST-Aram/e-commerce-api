import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"

describe('DELETE reviews (By Review ID)', () =>{

    test('Responds with method not allowed (405) on batch'+
        ' delete request', 
        async() =>{
            const response = await request(app).delete('/reviews')
            
            expect(response.status).toEqual(405)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body.message).toMatch(/not allowed/i)
        }
    )

    test('Responds with status 400 if review ID provided is invalid', 
        async() =>{
            const response = await request(app).delete(
                '/reviews/64c9e4f2')
            
            expect(response.status).toEqual(400)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body.message).toMatch(/invalid/i)
        }
    )
    
    test('Responds with status 404 (NOT FOUND) if review ID don\'t '+
        'exist', 
        async() =>{
            const response = await request(app).delete(
                '/reviews/64c9e4f2df7cc072af2ac8e4')

            expect(response.status).toEqual(404)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body.message).toMatch(/not found/i)
        }
    )

    test('Responds with review payload if modified successfully'+
        ' status(200)',
        async() =>{
            const response = await request(app).delete(
                '/reviews/64c9e4f2df7cc072af2ac9e4')
            
            expect(response.status).toEqual(200)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body).toHaveProperty('review')
            expect(response.body.review).toHaveProperty('_id')
            expect(response.body.message).toMatch(/deleted/i)
        }
    )
})