import { assert} from "../z-library/testing/response-assertion";
import { describe, expect, test } from "@jest/globals"
import request from "supertest"
import { app } from "./lib/app.test.config"


describe('GET Products routes | Get', () => { 

    test('Responds with paginated data (Default pagination), status 200: ' + 
        'Get request success --Pagination => 10', 
    async() =>{
        const response = await request(app).get(
            '/products')
        const products = response.body.products
        
        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 10)
    })

    test('Responds with paginated data, status 200: ' + 
        'Get request success -- Pagination -- user requested.', 
    async() =>{
        const response = await request(app).get(
            '/products?page=1&limit=4')
        const products = response.body.products
        
        assert.respondsWithSuccess(response)
        assert.respondsWithPaginatedResource(response, 4)
    })
 })
