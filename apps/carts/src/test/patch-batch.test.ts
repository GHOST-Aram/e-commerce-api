import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import request from "supertest"
import * as data from "./mocks/raw-data";

describe('PATCH (Batch request) Carts Route', () => {

    test('Rejects  patch-all requests, status 405:'+
        ' Method not allowed', 
    async() =>{
        const response = await request(app).patch('/carts')
            .send({
                ...data.validPatchData, 
                customer: '64c9e4f2df7cc072af2ac9e5'
            })
        
       assert.respondsWithMethodNotAllowed(response)
    })
})