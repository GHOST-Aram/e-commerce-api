import { app } from "./lib/test.config";
import { describe, test } from "@jest/globals";
import request from "supertest"
import * as rawData from "./mocks/raw-data";
import { expectations } from "./lib/response-expectations";

describe('PUT users route', () =>{
    test('Does not allow batch updates on users (405)', async() =>{
        const response = await request(app).put('/users')
            .send(rawData.validUserData)
        expectations.expectMethodNotAllowedResponse(response)
    })

    test('Rejects invalid users IDs with status 400',async () => {
        const response = await request(app).put(
            '/users/invalidId')
            .send(rawData.validUserData)
        expectations.expectBadRequestResponse(response)
    })

    test('Responds with validation errors and status 400 if '+
        'invalid input', 
    async() =>{
        const response = await request(app).put(
            '/users/64c9e4f2df7cc072af2ac9e4')
            .send(rawData.invalidUserData)

        expectations.expectBadRequestResponse(response)
        expectations.expectErrorResponseWithArray(response)
    })  

    test('Creates new user and responds with status 201 if userID'+
        ' is valid but does not exits', 
    async() =>{
        const response = await request(app).put(
            '/users/64c9e4f2df7cc072af2ac8a4')
            .send(rawData.validUserData)
        expectations.expectCreatedResponse(response)
    })

    test('Responds with 200 and location URI if user update '+
        'was success', 
    async() =>{
        const response = await request(app).put(
            '/users/64c9e4f2df7cc072af2ac9e4')
            .send(rawData.validUserData)
        expectations.expectUpdatedResponse(response)
    })
})