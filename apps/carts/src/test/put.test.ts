import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import request from "supertest"
import * as data from "./mocks/raw-data";

describe('PUT Carts Routes', () => {

    test('Rejects update-all requests, status 405: Method not allowed', 
        async() =>{
            const response = await request(app).put('/carts')
                .send(data.cartData).send({ customer: '64c9e4f2df7cc072af2ac9e5' })
            
        assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, status 400: Invalid input.', 
        async() =>{
            const response = await request(app).put(
                '/carts/64c9e4f2df7cc072af2ac9e5')
                .send({
                    ...data.invalidUpdateInput, 
                    customer: '64c9e4f2df7cc072af2ac9e5'
                })

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with validation errors, status 400: Invalid reference Id.',  
        async() =>{
            const response = await request(app).put(
                '/carts/64c9e4f2dc9e5')
                .send({
                    ...data.invalidUpdateInput, 
                    customer: '64c9e4f2df7cc072af2ac9e5'
                })

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with created resource URI, status 201: '+
        ' Target not found, new document created.',
        async() =>{
            const response = await request(app).put(
                '/carts/64c9e4f8df7cc072af2ac9e5')
                .send(
                    {
                        ...data.validUpdateInput, 
                        customer: '64c9e4f8df7cc072af2ac9e5'
                    }
                )

            assert.respondsWithCreatedResource(response)
        }
    )

    test('Responds with updated resource URI, status 200: Update request successful.', 
        async() =>{
            const  response = await request(app).put(
                '/carts/64c9e4f2df7cc072af2ac9e5')
                .send(
                    {
                        ...data.validUpdateInput,
                        customer: '64c9e4f2df7cc072af2ac9e5'
                    }
                )

            assert.respondsWithSuccess(response)   
            assert.respondsWithUpdatedResource(response)
        }
    )
})