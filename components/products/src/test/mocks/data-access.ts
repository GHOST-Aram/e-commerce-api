import { jest } from "@jest/globals";
import { IProduct, Product } from "../../data-access/model";

export class ProductsDAL {
    createNewProduct = jest.fn(async(productData : IProduct) =>{
        const product = new Product()

        return product.id
    })
}