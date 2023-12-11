import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PUT Payments routes', () =>{
    test('Rejects update-all requests, (status 405): Method not allowed', 
        async() =>{
            const response = await request(app).put('/payments')
                .send(data.paymentInput)

            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Rejects updates on specific payment document from all users, (status 405)'+
        'Method not allowed', 
        async() =>{
            const response = await request(app).put(
                '/payments/64c9e4f2df7cc072af2ac9e8')
                .send(data.paymentInput)

            assert.respondsWithMethodNotAllowed(response)
        }
    )
})