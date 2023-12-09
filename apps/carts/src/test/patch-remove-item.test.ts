import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import request from "supertest"
import * as data from "./mocks/raw-data";

describe('PATCH (Remove one Item from cart) Carts Route', () => {

    test('Responds with validation errors, status 400: Invalid reference Id',  
        async() =>{
            const response = await request(app).patch(
                '/carts/64c9e4f2dc9e5/remove-item')
                .send({
                    ...data.invalidUpdateInput,
                    customer: '64c9e4f2df7cc072af2ac9e5'
                })

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with Not Found, status 404: Target doesn\'t exist', 
        async() =>{
            const  response = await request(app).patch(
                '/carts/25c9e4f2df7cc072af2ac9e5/remove-item')
                .send({
                    ...data.validPatchData,
                    customer: '25c9e4f2df7cc072af2ac9e5'
                })

            assert.respondsWithNotFound(response)
        }
    )

    test('Responds with validation errors, status 400: Invalid Input: ', 
        async() =>{
            const response = await request(app).patch(
                '/carts/64c9e4f2df7cc072af2ac9e5/remove-item')
                .send({
                    ...data.invalidPatchData,
                    customer: '64c9e4f2df7cc072af2ac9e5'
                })

            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with modified resource URI, status 200: '+
        'Itme succeffully removed from cart.', 
        async() =>{
            const  response = await request(app).patch(
                '/carts/64c9e4f2df7cc072af2ac9e5/remove-item')
                .send({
                    ...data.validPatchData,
                    customer: '64c9e4f2df7cc072af2ac9e5'
                })

        assert.respondsWithSuccess(response)  
        assert.respondsWithModifedResource(response)
        }
    )
})