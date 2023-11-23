import { app } from "../config/config";
import { routesWrapper } from "../routes/urls";
import { ProductsController } from "../controller/controller";
import { ProductsDAL } from "./mocks/data-access";
import { describe, expect, test } from "@jest/globals"
import request from "supertest"


const dal = new ProductsDAL()
const controller = new ProductsController(dal)

app.use('/products', routesWrapper(controller))
describe('GET Products By Id', () =>{
    test('Responds with single product given ID', async() =>{
        const response = await request(app).get(
            '/products/64c9e4f2df7cc072af2ac9e4'
        )
        const product = response.body.product

        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.status).toEqual(200)
        expect(product).toHaveProperty('_id')
        expect(product).toHaveProperty('selling_price')
        expect(product).toHaveProperty('available_units')
    })

    test('Responds with 400 Error for invalid product IDs', async() =>{
        const response = await request(app).get(
            '/products/64c9e4'
        )

        expect(response.status).toEqual(400)
        expect(response.body.message).toMatch(/invalid/ig)
    })

    test('Responds with 404 Error for non-existing product IDs', async() =>{
        const response = await request(app).get(
            '/products/64c9e4f2df7cc072af2ac9d4'
        )

        expect(response.status).toEqual(404)
        expect(response.body.message).toMatch(/not found/ig)
    })
 })