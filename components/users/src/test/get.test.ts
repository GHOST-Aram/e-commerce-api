import { app } from "./lib/test.config";
import { describe, test, expect } from "@jest/globals";
import request from 'supertest'
import { expectations } from "./lib/response-expectations";

describe('GET Users Route', () =>{

    test('Responds with 200 status and users array on success ', 
    async() =>{
        const response = await request(app).get('/users')
        const users = response.body.users
        
        expectations.expectSuccessfulResponse(response)
        expectations.expectResponseWithPaginatedUsersArray(
            response, 10)
        expect(users[0]).not.toHaveProperty('password')
    })

    test('Responds with paginated data of default limit = 10', 
    async() =>{
        const response = await request(app).get('/users')
        const users = response.body.users

        expectations.expectSuccessfulResponse(response)
        expectations.expectResponseWithPaginatedUsersArray(
            response, 10)
        expect(users[0]).not.toHaveProperty('password')
    })

    test('Responds with paginated data limited to given limit', 
    async() =>{
        const response = await request(app).get(
            '/users?page=1&limit=23')

        expectations.expectSuccessfulResponse(response)
        expectations.expectResponseWithPaginatedUsersArray(
            response, 23)
    } )

    test('Responds with status 400 if user ID is invalid',  
    async() =>{
        const response = await request(app).get(
            '/users/9jdiks9sk0xx34')
        expectations.expectBadRequestResponse(response)
    })

    test('Responds with status 404 if user with a valid id '+
        'don\'t exist', 
    async() =>{
        const response = await request(app).get(
            '/users/64c9e4f2df7cc072af2ac8a4')
        expectations.expectNotFoundResponse(response)
    })

    test('Responds with 200 if user exists with a valid ID', 
    async() =>{
        const response = await request(app).get(
            '/users/64c9e4f2df7cc072af2ac9e4')
        
        expectations.expectSuccessfulResponse(response)
        expectations.expectResponseWithUserDocument(response)
    })
})