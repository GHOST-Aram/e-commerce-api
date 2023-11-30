import { BaseController, Paginator } from "../../../library/bases/controller"
import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { IOrder } from "../data-access/model"

export class OrdersController extends BaseController{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        super()
        this.dal = dataAccess
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const orderData: IOrder = req.body

        try {
            const newOrder = await this.dal.createNew(orderData)
            this.respondWithCreatedResource(newOrder.id, res)
        } catch (error) {
            next(error)
        }
    }

    public getOne = async(req: Request, res: Response, next: NextFunction) =>{
        const orderId = req.params.orderId

        try {
            const order = await this.dal.findById(orderId)
            
            if(order)
                this.respondWithFoundResource(order, res)
            
            this.respondWithNotFound(res)
        } catch (error) {
            next(error)
        }
    }


    public getMany = async(req: Request, res: Response, next: NextFunction)  =>{
        const paginator: Paginator = this.paginate(req)

        try {
            const orders = await this.dal.findWithPagination(paginator)
            this.respondWithFoundResource(orders, res)
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const updateData: IOrder = req.body 
        const orderId = req.params.orderId

        try {
            const updatedOrder = await this.dal.findByIdAndUpdate(orderId, 
                updateData)

            if(updatedOrder)
                this.respondWithUpdatedResource(orderId, res)
            else {
                const newOrder = await this.dal.createNew(updateData)
                this.respondWithCreatedResource(newOrder.id, res)
            }
        } catch (error) {
            next(error)
        }
    }

    public modifyOrder = async(req: Request, res: Response, next: NextFunction) =>{
        const orderId = req.params.orderId
        const patchDoc = req.body

        try {
            const modifiedDoc = await this.dal.findByIdAndUpdate(orderId, patchDoc)

            if(modifiedDoc)
                this.respondWithModifiedResource(orderId, res)
            else
                this.respondWithNotFound(res)
        } catch (error) {
            next(error)
        }
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) =>{
        const orderId = req.params.orderId

        try {
            const deletedOrder = await this.dal.findByIdAndDelete(orderId)

            if(deletedOrder){
                this.respondWithDeletedResource(deletedOrder.id, res)
            } else {
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }

    public respondWithDeletedResource = (id: string, res: Response) =>{
        res.status(200).json({ message: 'Deleted', id})
    }

    public respondWithMethodNotAllowed = (req: Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed'})
    }
}