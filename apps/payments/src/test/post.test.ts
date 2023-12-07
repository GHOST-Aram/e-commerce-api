import { assert} from "../z-library/testing/response-assertion";
import { app } from "./config/app";
import { test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('POST Payments route', () =>{

   test('Rejects requests with client defined Ids, (status 405):'+
      'Method not allowed.', 
   async() =>{
      const response = await request(app).post(
         '/payments/64c9e4f2df7cc072af2ac9e8')
         .send(data.paymentInput)

      assert.respondsWithMethodNotAllowed(response)
   })

   test('Responds with validation errors, (status 400): '+
      'Bad request -- Invalid input.',
   async() =>{
      const response = await request(app).post('/payments')
         .send(data.invalidInput)

      assert.respondsWithBadRequest(response)
      assert.respondsWithValidationErrors(response)
   })

   test('Responds with created resource location URI (status 201): '+
      'Post operation success.', 
   async() =>{
      const response = await request(app).post('/payments')
         .send(data.paymentInput)

      assert.respondsWithCreatedResource(response)
   })
})