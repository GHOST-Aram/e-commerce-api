import { app } from "./lib/test.config";
import { describe, test } from "@jest/globals";
import request from "supertest"
import * as data from "./mocks/raw-data";
import { expectations as assert} from "./lib/response-expectations";

describe('PATCH Users route', () =>{
    test('Rejects patch-all request: Status 405 Method not allowed', async() =>{
        const response = await request(app).patch('/users')
            .send(data.validPartialData)

        assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with Validation errors: Invalid reference Id.',async () => {
        const response = await request(app).patch(
            '/users/7ryew8qwq').send(data.validPartialData)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrorsArray(response)
    })

    test('Responds with validation errors: Invalid input', 
    async() =>{
        const response = await request(app).patch(
            '/users/64c9e4f2df7cc072af2ac9e4')
            .send(data.invalidPartialData)

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrorsArray(response)
    })  

    test('Responds with Not Found(404): User does not exist', 
    async() =>{
        const response = await request(app).patch(
            '/users/64c9e4f2df7cc072af2ac8a4')
            .send(data.validPartialData)

        assert.respondsWithNotFoundError(response)   
    })

    test('Responds with modified resource (200 and location uri): User found', 
    async() =>{
        const response = await request(app).patch(
            '/users/64c9e4f2df7cc072af2ac9e4')
            .send(data.validPartialData)
            
        assert.respondsWithSuccess(response)
        assert.respondsWithModifedResource(response)
    })
})