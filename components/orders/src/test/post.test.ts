import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"
import { assert } from "./lib/response-assertions";

describe('POST Orders route', () =>{

   test('Rejects request with client defined Ids, status 405: '+
      'Method not allowed.', 
   async() =>{
      const response = await request(app).post(
         '/orders/64c9e4f2df7cc072af2ac9e8')
         .send(data.orderInput)

      assert.respondsWithMethodNotAllowed(response)
   })

   test('Responds with validation errors, status 400: '+
      'Bad request -- Invalid Input.',
   async() =>{
      const response = await request(app).post('/orders')
         .send(data.invalidOrderInput)

      assert.respondsWithBadRequest(response)
      assert.respondsWithValidationErrors(response)
   })

   test('Responds with created resource URI, status 201 '+
      'Post operation success.', 
   async() =>{
      const response = await request(app).post('/orders')
         .send(data.orderInput)

      assert.respondsWithCreatedResource(response)
   })
})