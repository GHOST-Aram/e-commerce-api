import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PUT Payments routes', () =>{
    test('Rejects update-all requests, (status 405): '+
        'Method not allowed', 
    async() =>{
        const response = await request(app).put('/payments')
            .send(data.paymentInput)

        assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validation errors, (status 400): '+
        'Bad request -- Invalid reference Id.', 
    async() =>{
        const response = await request(app).put(
            '/payments/64c9e4f2df7')
            .send(data.paymentInput)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with validation Errors, (status 400): '+
        'Bad request -- Invalid input.', 
    async() =>{
        const response = await request(app).put(
            '/payments/64c9e4f2df7cc072af2ac9e8')
            .send(data.invalidInput)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with created resource, (status 201):'+
        ' Target not found, New document created.', 
    async() =>{
        const response = await request(app).put(
            '/payments/64c9e4f2df7cc072af2ac9e5')
            .send(data.paymentInput)

        assert.respondsWithCreatedResource(response)
    })

    test(' Responds with update resource location URI, (status 200): '+
        'PUT update success.', 
    async() =>{
        const response = await request(app).put(
            '/payments/64c9e4f2df7cc072af2ac9e8')
            .send(data.paymentInput)

        assert.respondsWithSuccess(response)
        assert.respondsWithUpdatedResource(response)
    })
})