import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"
import * as data from "./mocks/raw-data";

describe('Cart POST routes', () =>{

	test('Rejects creating cart with client custom IDs (status 405)', 
	async() =>{
		const response = await request(app).post(
			'/carts/64c9e4f2df7cc072af2ac9e4')
			.send(data.cartData)

		expect(response.status).toEqual(405)
		expect(response.body.message).toMatch(/not allowed/i)
		expect(response.headers['content-type']).toMatch(/json/)
	})
	
	test('Responds with conflict if a cart already exists with'+
		' incoming customer ID (status 409)',
	async() => {
		const response = await request(app).post('/carts')
			.send(data.existingCart)

		expect(response.status).toEqual(409)
		expect(response.headers['content-type']).toMatch(/json/)
		expect(response.body.message).toMatch(/exists/)
	})
	
	test('Responds with validation Errors if input is invalid'+
		' (status 404)', 
	async() =>{
		const response = await request(app).post('/carts')
			.send(data.invalidInput)
		
		expect(response.status).toEqual(400)
		expect(response.body.message).toMatch(/invalid input/i)
		expect(response.headers['content-type']).toMatch(/json/)
		expect(response.body).toHaveProperty('errors')
		expect(Array.isArray(response.body.errors)).toBeTruthy()
	})

	test('Responds with location url (status 201) if created'+
		' successfully',
	async() => {
		const response = await request(app).post('/carts')
			.send(data.cartData)

		expect(response.status).toEqual(201)
		expect(response.body.message).toMatch(/created/i)
		expect(response.headers['content-type']).toMatch(/json/)
		expect(response.header.location).toMatch(
			/\/carts\/[a-fA-F0-9]{24}/)
	})
})