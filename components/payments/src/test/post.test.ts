import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('POST Payments route', () =>{

   test('Rejects requests to create new payment docs with client '+
      'defined IDs', 
   async() =>{
      const response = await request(app).post(
         '/payments/64c9e4f2df7cc072af2ac9e8')
         .send(data.paymentInput)

      expect(response.status).toEqual(405)
      expect(response.headers['content-type']).toMatch(/json/)
      expect(response.body.message).toMatch(/not allowed/i)
   })

   test('Responds with validation errors if client input is '+
      'invalid: (400 Bad request)',
   async() =>{
      const response = await request(app).post('/payments')
         .send(data.invalidInput)

      expect(response.status).toEqual(400)
      expect(response.headers['content-type']).toMatch(/json/)
      expect(response.body.message).toMatch(/invalid/i)
      expect(response.body).toHaveProperty('errors')
      expect(Array.isArray(response.body.errors)).toBeTruthy()
   })

   test('Responds with status 201 and resource location URI '+
      'if post request is successful', 
   async() =>{
      const response = await request(app).post('/payments')
         .send(data.paymentInput)

      expect(response.status).toEqual(201)
      expect(response.header.location).toMatch(
         /^\/orders\/[a-fA-F0-9]{24}$/)
   })
})