import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PUT reviews (By Review ID)', () =>{

    test('Responds with method not allowed (405) on batch update'+
        ' request', 
        async() =>{
            const response = await request(app).put('/reviews')
                .send(data.reviewData)
            
            expect(response.status).toEqual(405)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body.message).toMatch(/not allowed/i)
        }
    )

    test('Responds with status 400 if review ID is invalid', 
        async() =>{
            const response = await request(app).put(
                '/reviews/64c9e4f2df7').send(data.reviewData)
            
            expect(response.status).toEqual(400)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body.message).toMatch(/invalid/i)
        }
    )
    
    test('Responds with not found (status 404) if review ID don\'t '+
        'exist', 
        async() =>{
            const response = await request(app).put(
                '/reviews/64c9e4f2df7cc072af2ac8e4')
                .send(data.reviewData)

            expect(response.status).toEqual(404)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body.message).toMatch(/not found/i)
        }
    )

    test('Responds with review payload if update is successfull'+
        ' status(200)',
        async() =>{
            const response = await request(app).put(
                '/reviews/64c9e4f2df7cc072af2ac9e4')
                .send(data.reviewData)
            
            expect(response.status).toEqual(200)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body).toHaveProperty('review')
            expect(response.body.review).toHaveProperty('_id')
            expect(response.body.message).toMatch(/updated/i)
        }
    )
    test('Responds with validation errors array (status 400) if '+
        'input is invalid', 
        async() =>{
            const response = await request(app).put(
                '/reviews/64c9e4f2df7cc072af2ac9e4')
                .send(data.badData)
            
            expect(response.status).toEqual(400)
            expect(response.headers['content-type']).toMatch(/json/)
            expect(response.body.message).toMatch(/invalid input/i)
            expect(Array.isArray(response.body.errors)).toBeTruthy()
        }
    )
})