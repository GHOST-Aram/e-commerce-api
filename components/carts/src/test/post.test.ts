import { app } from "./lib/test.config";
import { expect, test, describe } from "@jest/globals"
import request from "supertest"
import * as data from "./mocks/raw-data";
import { assert } from "./lib/response-assertions";

describe('Cart POST routes', () =>{

	test('Rejects requests with client defined ID, (status 405): ' +
		'Method not allowed', 
	async() =>{
		const response = await request(app).post(
			'/carts/64c9e4f2df7cc072af2ac9e4')
			.send(data.cartData)

		assert.respondsWithMethodNotAllowed(response)
	})
	
	test('Responds with conflict, status 409: '+
	' Customer\'s cart already exists.',
	async() => {
		const response = await request(app).post('/carts')
			.send(data.existingCart)

		assert.respondsWithConflict(response)
	})
	
	test('Responds with validation Errors, status 400: '+
		' Invalid input.', 
	async() =>{
		const response = await request(app).post('/carts')
			.send(data.invalidInput)
		
		assert.respondsWithBadRequest(response)
		assert.respondsWithValidationErrors(response)
	})

	test('Responds with created resource URI, status 201: '+
		' Post request successful.',
	async() => {
		const response = await request(app).post('/carts')
			.send(data.cartData)

		assert.respondsWithCreatedResource(response)
	})
})