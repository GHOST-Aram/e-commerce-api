import { Controllable } from "../z-library/bases/controllable"
import { BaseController, Paginator } from "../z-library/bases/controller"
import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { IOrder } from "../data-access/model"

export class OrdersController extends BaseController implements Controllable{

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
            const order = await this.dal.findByReferenceId(orderId)
            
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

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

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
}