import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PUT Orders routes', () =>{
    test('Rejects update-all requests, status 405: '+
        'Method not allowed', 
    async() =>{
        const response = await request(app).put('/orders')
            .send(data.orderInput)

        assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validation errors, status 400: '+
        'Bad request -- Invalid reference Id.', 
    async() =>{
        const response = await request(app).put(
            '/orders/64c9e4f2df7')
            .send(data.orderInput)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with validation errors, status 400: '+
        'Bad request -- Invalid Input', 
    async() =>{
        const response = await request(app).put(
            '/orders/64c9e4f2df7cc072af2ac9e8')
            .send(data.invalidOrderInput)

        assert.respondsWithBadRequest(response)
       assert.respondsWithValidationErrors(response)
    })

    test('Responds with new resource URI, status 201: '+
        ' Target not found, new document created.', 
    async() =>{
        const response = await request(app).put(
            '/orders/64c9e4f2df7cc072af2ac9e5')
            .send(data.orderInput)

        assert.respondsWithCreatedResource(response)
    })

    test(' Responds with updated resource URI, status 200: '+
        'Update success', 
    async() =>{
        const response = await request(app).put(
            '/orders/64c9e4f2df7dd072af2ac9e5')
            .send(data.orderInput)

        assert.respondsWithSuccess(response)
        assert.respondsWithUpdatedResource(response)
    })
})