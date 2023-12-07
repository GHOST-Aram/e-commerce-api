import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PATCH Payments routes', () =>{
    test('Rejects patch-all request, (status 405): '+
        'Method not allowed', 
    async() =>{
        const response = await request(app).patch('/payments')
            .send(data.patchInput)

        assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validation erros, status(400): '+
        'Bad request -- Invalid reference id.', 
    async() =>{
        const response = await request(app).patch(
            '/payments/64c9e4f2df7')
            .send(data.patchInput)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with validation errors, (status 400): '+
        ' Bad request -- Invalid input.', 
    async() =>{
        const response = await request(app).patch(
            '/payments/64c9e4f2df7cc072af2ac9e8')
            .send(data.invalidInput)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with Not Found, (status 404): Target not found.', 
    async() =>{
        const response = await request(app).patch(
            '/payments/64c9e4f2df7cc072af2ac9e5')
            .send(data.patchInput)

        assert.respondsWithNotFound(response)
    })

    test(' Responds with modified resource location URI, (status 200): '+
        'Patch success.', 
    async() =>{
        const response = await request(app).patch(
            '/payments/64c9e4f2df7cc072af2ac9e8')
            .send(data.patchInput)

        assert.respondsWithSuccess(response)
        assert.respondsWithModifedResource(response)
    })
})