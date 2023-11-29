import { app } from "./lib/test.config";
import { describe, test } from "@jest/globals";
import request from 'supertest'
import { expectations as assert} from "./lib/response-expectations";

describe('GET Users Route', () =>{

    test('Responds with paginated users array: Default lenght 10 ', 
    async() =>{
        const response = await request(app).get('/users')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 10)
    })

    test('Responds with paginated array: Length equals given limit', 
    async() =>{
        const response = await request(app).get(
            '/users?page=1&limit=23')

        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 23)
    } )

    test('Responds with validationErrors:  If referenceId is Invalid',  
    async() =>{
        const response = await request(app).get(
            '/users/9jdiks9sk0xx34')
        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrorsArray(response)
    })

    test('Responds with Not Found if requested user does not exist', 
    async() =>{
        const response = await request(app).get(
            '/users/64c9e4f2df7cc072af2ac8a4')
        assert.respondsWithNotFoundError(response)
    })

    test('Responds with 200 if user exists with a valid ID', 
    async() =>{
        const response = await request(app).get(
            '/users/64c9e4f2df7cc072af2ac9e4')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithFoundResource(response)
    })
})