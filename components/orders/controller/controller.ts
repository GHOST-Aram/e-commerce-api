import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { HydratedOrderDoc, IOrder, Order } from "../data-access/model"
export class Controller{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
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
            
            this.respondWithNotFoundError(res)
        } catch (error) {
            next(error)
        }
    }

    private respondWithNotFoundError = (res: Response) => {
        res.status(404).json({ message: 'Resource not found.'})
    }

    private respondWithCreatedResource = (resourceId: string, res:Response) =>{
        res.location(`/orders/${resourceId}`)
        res.status(201).json({ message: 'Created' })
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
            res.status(200).json({ resource})
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

    private respondWithUpdatedResource = (id: string, res: Response) =>{
        res.location(`/orders/${id}`)
        res.status(200).json({ message: 'Updated' })
    }

    public modifyOrder = async(req: Request, res: Response, next: NextFunction) =>{
        const orderId = req.params.orderId
        const patchDoc = req.body

        try {
            const modifiedDoc = await this.dal.findByIdAndUpdate(orderId, patchDoc)

            if(modifiedDoc)
                this.respondWithModifiedResource(orderId, res)
            else
                this.respondWithNotFoundError(res)
        } catch (error) {
            next(error)
        }
    }

    private respondWithModifiedResource = (id: string, res: Response) =>{
        res.location(`/orders/${id}`)
        res.status(200).json({ message: 'Modified' })
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) =>{
        const orderId = req.params.orderId

        try {
            const deletedOrder = await this.dal.findByIdAndDelete(orderId)

            if(deletedOrder){
                this.respondWithDeletedResource(deletedOrder.id, res)
            } else {
                this.respondWithNotFoundError(res)
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

export interface Paginator {
    skipDocs: number
    limit: number
}