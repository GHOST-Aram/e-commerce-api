import { app } from "./lib/test.config";
import { describe, test } from "@jest/globals";
import request from "supertest"
import * as data from "./mocks/raw-data";
import { expectations } from "./lib/response-expectations";

describe('patch users route', () =>{
    test('Does not allow batch patches on users (405)', async() =>{
        const response = await request(app).patch('/users')
            .send(data.validPartialData)
        expectations.expectMethodNotAllowedResponse(response)
    })

    test('Rejects invalid users IDs with status 400',async () => {
        const response = await request(app).patch(
            '/users/invalidId')
            .send(data.validPartialData)
        expectations.expectBadRequestResponse(response)
    })

    test('Responds with validation errors and status 400 if '+
        'invalid patch input data', 
    async() =>{
        const response = await request(app).patch(
            '/users/64c9e4f2df7cc072af2ac9e4')
            .send(data.invalidPartialData)

        expectations.expectBadRequestResponse(response)
        expectations.expectErrorResponseWithArray(response)
    })  

    test('Responds with 404 error if userID is valid but does not '+
        'exits', 
    async() =>{
        const response = await request(app).patch(
            '/users/64c9e4f2df7cc072af2ac8a4')
            .send(data.validPartialData)
        expectations.expectNotFoundResponse(response)   
    })

    test('Responds with 200 and location URI if patch '+
        'was success', 
    async() =>{
        const response = await request(app).patch(
            '/users/64c9e4f2df7cc072af2ac9e4')
            .send(data.validPartialData)
        expectations.expectSuccessfullPatchResponse(response)
    })
})