import { app } from "../config/config";
import { routesWrapper } from "../routes/urls";
import { ProductsController } from "../controller/controller";
import { ProductsDAL } from "../data-access/data-access";
import { describe, expect, test } from "@jest/globals"
import request from "supertest"


const dal = new ProductsDAL()
const controller = new ProductsController(dal)

app.use('/products', routesWrapper(controller))

describe('POST products route', async() =>{

    test('Responds with status 201 and \'created\' message', 
    async() =>{
        const response =  await request(app).post('/products')
            .send({
                name: "Samsung galaxy A10S",
                image_url: "https://images/phones/galaxyA10s",
                description: 'Best smartphone in town',
                brand: 'galaxy',
                manufacturer: 'Samsung',
                model: 'a10s',
                category: 'smartphone',
                selling_price: 10000,
                marked_price: 10299,
                availabile_units: 28, 
                specifications: [
                    'black', '6 inch', 
                    'display', '3g net',
                     'bluetooth'
                ],
                
            })
        expect(response.status).toEqual(201)
        expect(response.body.message).toMatch(/created/i)
    } )

    test('Responds with JSON content-type', async() =>{
        const response =  await request(app).post('/products')
            .send({
                name: "Samsung galaxy A10S",
                image_url: "https://images/phones/galaxyA10s",
                description: 'Best smartphone in town',
                brand: 'galaxy',
                manufacturer: 'Samsung',
                model: 'a10s',
                category: 'smartphone',
                selling_price: 10000,
                marked_price: 10299,
                availabile_units: 28, 
                specifications:[
                    'black', '6 inch', 
                    'display', '3g net',
                     'bluetooth'
                ],
                
            })
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with resource URI in the location header', 
    async() =>{
        const response =  await request(app).post('/products')
            .send({
                name: "Samsung galaxy A10S",
                image_url: "https://images/phones/galaxyA10s",
                description: 'Best smartphone in town',
                brand: 'galaxy',
                manufacturer: 'Samsung',
                model: 'a10s',
                category: 'smartphone',
                selling_price: 10000,
                marked_price: 10299,
                availabile_units: 28, 
                specifications: [
                    'black', '6 inch', 
                    'display', '3g net',
                     'bluetooth'
                ],
                
            })
        expect(response.headers['location']).toMatch(
            /\/products\/5bd761dcae323e45a93cd0ea/)
    })

    test('Responds with status 400 Bad request for no input', 
    async() =>{
        const response =  await request(app).post('/products')
            
        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/Invalid input/i)
    }) 

    test('Responds with status 400 Bad request for Invalid input', 
    async() =>{
        const response =  await request(app).post('/products')
            .send({
                name: 90,
                image_url: 'path',
                description: 'Best smartphone in town',
                brand: '',
                manufacturer: 'Samsung',
                model: 'a10s',
                category: 'smartphone',
                selling_price: 10000,
                marked_price: 10299,
                availabile_units: 28, 
                specifications: [
                    'black', '6 inch', 
                    'display', '3g net',
                     'bluetooth'
                ],
            })
            
        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/Invalid input/i)
    }) 
})


