import { assert} from "../z-library/testing/response-assertion";
import { app } from "./lib/test.config";
import { test, describe } from "@jest/globals"
import request from "supertest"

describe('GET Carts routes | Get all or with Customer ID', () =>{

    test('Responds with validation errors, status 400: '+
        ' Bad request -- Invalid reference Id.', 
    async() =>{
        const response = await request(app).get('/carts/69e4f2d')
        
        assert.respondsWithBadRequest(response)
        assert.respondsWithValidationErrors(response)
    })

    test('Responds with Not Found, status 404: '+
        'Target does not exist.', 
    async() =>{
        const response = await request(app).get(
            '/carts/64c9e4f2df7cc072af2ac9e3')
        
        assert.respondsWithNotFound(response)
    })

    test('Get one customer\'s cart: Responds with found resource, status 200:'+
        ' Success.', 
    async() =>{
        const response = await request(app).get(
            '/carts/64c9e4f2df7cc072af2ac9e5')
        
        assert.respondsWithSuccess(response)
        assert.respondsWithFoundResource(response)
    })

    test('Get many carts: Responds with paginated resource, status 200: '+
        ' Default pagination limit => 10.', 
    async() =>{
        const response = await request(app).get('/carts')

        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 10)
    })

    test('Get many carts: Responds with paginated resource, status 200: '+
        'Pagination limit => client requested = 23.', 
    async() =>{
        const response = await request(app).get(
            '/carts?page=1&limit=23')

        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 23)
    })
})