import { assert} from "../z-library/testing/response-assertion";
import { app } from "./lib/test.config";
import { test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('PUT reviews (By Review ID)', () =>{

    test('Rejects update-all requests,  (status 405): '+
        ' Method not allowed.', 
        async() =>{
            const response = await request(app).put('/reviews')
                .send(data.reviewData)
            
            assert.respondsWithMethodNotAllowed(response)
        }
    )

    test('Responds with validation errors, (status 400): ' + 
        'Invalid reference Id.', 
        async() =>{
            const response = await request(app).put(
                '/reviews/64c9e4f2df7').send(data.reviewData)
            
            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )

    test('Responds with validation errors, status 400: '+
    'Invalid Input.', 
        async() =>{
            const response = await request(app).put(
                '/reviews/64c9e4f2df7cc072af2ac9e4')
                .send(data.badData)
            
            assert.respondsWithBadRequest(response)
            assert.respondsWithValidationErrors(response)
        }
    )
    
    test('Responds with created resource URI, (status 201): '+
        'Target not found, new document was created.', 
        async() =>{
            const response = await request(app).put(
                '/reviews/64c9e4f2df7cc072af2ac8e4')
                .send(data.reviewData)

            assert.respondsWithCreatedResource(response)
        }
    )

    test('Responds with updated resource URI, status 200: '+
        ' Update success.',
        async() =>{
            const response = await request(app).put(
                '/reviews/64c9e4f2df7cc072af2ac9e4')
                .send(data.reviewData)
            
            assert.respondsWithSuccess(response)
            assert.respondsWithUpdatedResource(response)
        }
    )
   
})