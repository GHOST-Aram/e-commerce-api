import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PATCH Payments routes', () =>{
    test('Rejects patch-all request, (status 405): Method not allowed', 
        async() =>{
            const response = await request(app).patch('/payments')
                .send(data.patchInput)

            assert.respondsWithMethodNotAllowed(response)
        }
    )


    test(' Rejects PATCH requests from all users', 
        async() =>{
            const response = await request(app).patch(
                '/payments/64c9e4f2df7cc072af2ac9e8')
                .send(data.patchInput)

            assert.respondsWithMethodNotAllowed(response)
        }
    )
})