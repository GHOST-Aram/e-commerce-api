import { assert} from "../z-library/testing/response-assertion";
import { app } from "./lib/app";
import { test, describe } from "@jest/globals"
import request from "supertest"

describe('Auth Post route', () => {
    test('Rejects requests with user Ids, status 405: Method not allowed', async() =>{
        const response = await request(app).post('/auth/64c9e4f2df7cc072af2ac9e8')
            .send({
                email: 'abc@xyz.com',
                password: 'OneHundred100'
            })
        
        assert.respondsWithMethodNotAllowed(response)
    })

    test('Responds with validation errors, status 400: Invalid input', async() => {
        const response = await request(app).post('/auth').send({
            username: 'John',
            password: 'plainpassword'
        })

        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with Unauthorised, status 401: Invalid login credentials', async() =>{
        const response = await request(app).post('/auth').send({
            email: 'unknown@gmail.com',
            password: 'OverOneHundred230'
        })

        assert.respondsWithUnathorised(response)
    })


    test('Responds with access token, status 200: Sign In sucess', async() =>{
        const response = await request(app).post('/auth').send({
            email: 'correctEmail@gmail.com',
            password: 'CorrectPassword2030'
        })

        assert.respondsWithSuccess(response)
        assert.respondsWithToken(response)
    })
})
