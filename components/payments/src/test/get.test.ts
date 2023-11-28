import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"

describe('GET Payments Routes', () =>{
    test('Responds with payments list paginated to default limit', 
    async() =>{
        const response = await request(app).get('/payments')

        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('payments')
        expect(Array.isArray(response.body.payments)).toBeTruthy()
        expect(response.body.payments.length).toEqual(10)
    })

    test('Responds with payments list paginated to requested lmit', 
    async() =>{
        const response = await request(app).get(
            '/payments?page=1&limit=12')
        
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('payments')
        expect(Array.isArray(response.body.payments)).toBeTruthy()
        expect(response.body.payments.length).toEqual(12)
    })

    test('Rejects requests with invalid order Ids (400 Bad request)', 
    async() =>{
        const response = await request(app).get(
            '/payments/4f2df7cc072af2ac9e8')

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/Invalid/i)
    })

    test('Responds with status 404 (Not Found) if the order '+
        'requested does not exist', 
    async() =>{
        const response = await request(app).get(
            '/payments/87c1e4f2df7cc972af2ac9e8')

        expect(response.status).toEqual(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not found/i)
    })

    test('Responds with status 200 and order payload if request '+
        'is successful', 
    async() =>{
        const response = await request(app).get(
            '/payments/64c9e4f2df7cc072af2ac9e8')
        
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('payment')
        expect(response.body.payment).toHaveProperty('orderId')
        expect(response.body.payment).toHaveProperty('amount')
    })  
})