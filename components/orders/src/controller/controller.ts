import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { validationResult } from "express-validator"
import { HydratedOrderDoc, IOrder } from "../data-access/model"
export class Controller{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        this.dal = dataAccess
    }

    public addNewOrder = async(
        req: Request, res: Response, next: NextFunction) =>{
            const orderData: IOrder = req.body

            try {
                const newOrder = await this.dal.createNewOrder(
                    orderData)

                this.respondWithCreatedResource(newOrder.id, res)
            } catch (error) {
                next(error)
            }
    }

    private respondWithCreatedResource = (
        resourceId: string, res:Response) =>{
            res.location(`/orders/${resourceId}`)
            res.status(201).json({ message: 'Created' })
    }

    public getOrders = async(
        req: Request, res: Response, next: NextFunction)  =>{
            const paginator: Paginator = this.paginate(req)

            try {
                const orders = await this.dal.findWithPagination(
                    paginator)

                this.respondWithFoundResource(orders, res)
            } catch (error) {
                next(error)
            }
    }

    private paginate = (req: Request): Paginator =>{
        const paginator: Paginator = {
            skipDocs: 0,
            limit: 10
        }

        if(req.query.page && req.query.limit){
            const page = Math.abs(Number(req.query.page))
            const limit = Math.abs(Number(req.query.limit))

            if(page && limit){
                paginator.limit = limit
                paginator.skipDocs = (page - 1) * limit
            }
        } 
        
        return paginator
        
    }

    private respondWithFoundResource = (
        resource: HydratedOrderDoc[] | HydratedOrderDoc, 
        res: Response ) =>{
            res.status(200)

            if(Array.isArray(resource))
                res.json({ orders: resource})
            else {
                res.json({ order: resource })
            }
        }

    public getOneOrder = async(
        req: Request, res: Response, next: NextFunction) =>{
            const orderId = req.params.orderId

            try {
                const order = await this.dal.findById(orderId)
                
                if(order)
                    this.respondWithFoundResource(order, res)
                
                this.respondWithNotFoundError(res)
            } catch (error) {
                next(error)
            }
    }

    private respondWithNotFoundError = (res: Response) => {
        res.status(404).json({ message: 'Resource not found.'})
    }
    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Invalid Input' 
                })
            } else {
                next()
            }
    }
    public respondWithMethodNotAllowed = (req: Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed'})
    }

}

export interface Paginator {
    skipDocs: number
    limit: number
}