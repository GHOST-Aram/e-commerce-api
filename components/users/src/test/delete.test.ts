import { app } from "./lib/test.config";
import { describe, test, expect } from "@jest/globals";
import request from "supertest"
import { expectations } from "./lib/response-expectations";

describe('DELETE users route', () =>{
    test('Does not allow batch delete request on users (405 Error)', 
    async() =>{
        const response = await request(app).delete('/users')
        expectations.expectMethodNotAllowedResponse(response)
    })

    test('Rejects invalid user IDs with status code 400',async () => {
        const response = await request(app).delete(
            '/users/invalidId')
        expectations.expectBadRequestResponse(response)
       
    })

    test('Responds with 404 error if user with requested ID does not'+
        ' exits', 
    async() =>{
        const response = await request(app).delete(
            '/users/64c9e4f2df7cc072af2ac8a4')
       expectations.expectNotFoundResponse(response)
    })

    test('Responds with 200 if delete request is success', 
    async() =>{
        const response = await request(app).delete(
            '/users/64c9e4f2df7cc072af2ac9e4')
        
        expectations.expectSuccessfulDeletionResponse(response)
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('_id')
    })
})