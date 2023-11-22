import { ProductsDAL } from "../data-access/data-access"

export class ProductsController{
    private dal

    constructor(dataAccessLayer: ProductsDAL){
        this.dal = dataAccessLayer
    }
}