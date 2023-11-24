import { app } from "./test.config";
import { describe, test, expect } from "@jest/globals";
import request from 'supertest'

describe('GET Users Route', () =>{

    test('Responds with 200 status and users array on success ', 
    async() =>{
        const response = await request(app).get('/users')
        const users = response.body.users
        
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('users')
        expect(Array.isArray(users)).toBeTruthy()
        expect(users[0]).not.toHaveProperty('password')
    })

    test('Responds with paginated data of default limit = 10', 
    async() =>{
        const response = await request(app).get('/users')
        const users = response.body.users

        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(Array.isArray(users)).toBeTruthy()
        expect(users.length).toEqual(10)
        expect(users[0]).not.toHaveProperty('password')
    })

    test('Responds with paginated data limited to given limit', 
    async() =>{
        const response = await request(app).get(
            '/users?page=1&limit=23')
        const users = response.body.users

        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(Array.isArray(users)).toBeTruthy()
        expect(users.length).toEqual(23)
        expect(users[0]).not.toHaveProperty('password')
    } )

    test('Responds with status 400 if user ID is invalid',  
    async() =>{
        const response = await request(app).get(
            '/users/9jdiks9sk0xx34')

        expect(response.status).toEqual(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.message).toMatch(/invalid/i)
    })

    test('Responds with status 404 if user with a valid id '+
        'don\'t exist', 
    async() =>{
        const response = await request(app).get(
            '/users/64c9e4f2df7cc072af2ac8a4')

        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/)
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with 200 if user exists with a valid ID', 
    async() =>{
        const response = await request(app).get(
            '/users/64c9e4f2df7cc072af2ac9e4')
        
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('_id')
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body.user).not.toHaveProperty('password')
    })
})