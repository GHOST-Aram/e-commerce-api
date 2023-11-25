import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"

describe('GET Reviews Routes (Get reviews by product ID)', () =>{

    test('Responds with status 200 and paginated list of default ' 
        +'length (10)', 
    async() =>{
        const response = await request(app).get(
            '/reviews/64c9e4f2df7cc072af2ac9e4')
        
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('reviews')
        expect(response.body.reviews.length).toEqual(10)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with list with length equal to given the'+
    'pagination limit (status 200)', 
    async() =>{
        const response = await request(app).get(
            '/reviews/64c9e4f2df7cc072af2ac9e4?page=1&limit=21')
        
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(Array.isArray(response.body.reviews)).toBeTruthy()
        expect(response.body.reviews.length).toEqual(23)
    })

    test('Responds with 400 status (Bad Request) if the given '+
        'product ID is invalid', 
    async() =>{
        const response = await request(app).get(
            '/reviews/34522jdjd')

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with status 404 if no review exists under the '+
        ' given product Id does not exist', 
    async() =>{
        const response = await request(app).get(
            '/reviews/64c9e4f2df7cc072af2ac8e4')
        
        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })
})