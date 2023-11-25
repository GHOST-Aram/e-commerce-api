import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import * as data from "./mocks/raw-data"
import request from "supertest"

describe('POST Reviews route', () =>{
   test('Rejects request to create reiview with client defined id', 
   async() =>{
      const response = await request(app).post(
         '/reviews/64c9e4f2df7cc072af2ac9e4')
         .send(data.reviewData)

      expect(response.status).toEqual(405)
      expect(response.body.message).toMatch(/method not allowed/i)
      expect(response.headers['content-type']).toMatch(/json/)  
   })

   test('Responds with validation errors if invalid input', 
   async() =>{
      const response = await request(app).post('/reviews')
         .send(data.badData)
      
      expect(response.status).toEqual(400)
      expect(response.body.message).toMatch(/invalid/i)
      expect(response.headers['content-type']).toMatch(/json/)
      expect(response.body).toHaveProperty('errors')
      expect(Array.isArray(response.body.errors)).toBeTruthy()
   })

   test('Responds with 204 status if created successfully', 
   async() =>{
      const response = await request(app).post('/reviews')
         .send(data.reviewData)

      expect(response.status).toEqual(201)
      expect(response.headers['content-type']).toMatch(/json/)
      expect(response.body.message).toMatch(/created/i)
      expect(response.header.location).toMatch(
         /^\/[.\w]+\/[a-fA-F0-9]{24}$/)
   })
})