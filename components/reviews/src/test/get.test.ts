import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"

describe('GET Reviews Routes (Get reviews by product ID | random reviews)', () =>{

    test('Responds with random reviews paginated with default limit ', 
    async() =>{
        const response = await request(app).get(
            '/reviews')
        
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('reviews')
        expect(response.body.reviews.length).toEqual(10)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with random reviews limited to the given'+
        ' pagination limit (status 200)', 
    async() =>{
        const response = await request(app).get(
            '/reviews?page=1&limit=23')
        
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(Array.isArray(response.body.reviews)).toBeTruthy()
        expect(response.body.reviews.length).toEqual(23)
    })

    test('Responds with status 200 and paginated list of default ' 
        +'length (10) (Get reviews by product ID)', 
    async() =>{
        const response = await request(app).get(
            '/reviews/64c9e4f2df7cc072af2ac9e4')
        
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('reviews')
        expect(response.body.reviews.length).toEqual(10)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with specific product reviews with length equal to given the'+
    'pagination limit (status 200)', 
    async() =>{
        const response = await request(app).get(
            '/reviews/64c9e4f2df7cc072af2ac9e4?page=1&limit=23')
        
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

})