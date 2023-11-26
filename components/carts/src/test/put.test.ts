import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"
import * as data from "./mocks/raw-data";

describe('PUT Carts Routes', () => {

    test('Rejects  batch update request with status 405:'+
        ' Method not allowed', 
    async() =>{
        const response = await request(app).put('/carts')
            .send(data.cartData)
        
        expect(response.status).toEqual(405)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not allowed/i)
    })

    test('Rejects full updates on carts with status 405:'+
        ' Method not Allowed', 
    async() =>{
        const response = await request(app).put(
            '/carts/64c9e4f2df7cc072af2ac9e5')
            .send(data.cartData)

        expect(response.status).toEqual(405)
        expect(response.body.message).toMatch(/not all/i)
        expect(response.headers['content-type']).toMatch(/json/)
    })
})