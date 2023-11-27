import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"
import * as data from "./mocks/raw-data";

describe('PATCH (Batch request) Carts Route', () => {

    test('Rejects  batch modification request with status 405:'+
        ' Method not allowed', 
    async() =>{
        const response = await request(app).patch('/carts')
            .send(data.validPatchData)
        
        expect(response.status).toEqual(405)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/not allowed/i)
    })
})