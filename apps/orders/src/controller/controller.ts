import { Controllable } from "../z-library/bases/controllable"
import { HttpResponse, Paginator } from "../z-library/HTTP/http-response"
import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { Order } from "../data-access/model"

export class OrdersController extends HttpResponse implements Controllable{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        super()
        this.dal = dataAccess
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){
            
            const orderData: Order = req.body
    
            try {
                const newOrder = await this.dal.createNew(
                    {   ...orderData, 
                        placedBy: currentUser._id.toString()
                    }
                )
                this.respondWithCreatedResource(newOrder.id, res)
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnathorised(res)
        }
    }

    public getOne = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser = req.user

        if(currentUser && req.isAuthenticated()){

            const orderId = req.params.orderId
    
            try {
                const order = await this.dal.findByReferenceId(orderId)
                
                if(order)
                    this.respondWithFoundResource(order, res)
                
                this.respondWithNotFound(res)
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnathorised(res)
        }
    }


    public getMany = async(req: Request, res: Response, next: NextFunction)  =>{
        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated() && currentUser.isAdmin){

            const paginator: Paginator = this.paginate(req)
    
            try {
                const orders = await this.dal.findWithPagination(paginator)
                this.respondWithFoundResource(orders, res)
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnathorised(res)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){

            const updateData: Order = req.body 
            const orderId = req.params.orderId
    
            try {
                const updatedOrder = await this.dal.findByIdAndUpdate(orderId, 
                    {
                        ...updateData, 
                        placedBy: currentUser._id.toString()
                    })
    
                if(updatedOrder)
                    this.respondWithUpdatedResource(orderId, res)
                else {
                    const newOrder = await this.dal.createNew(updateData)
                    this.respondWithCreatedResource(newOrder.id, res)
                }
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnathorised(res)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser = req.user

        if(currentUser && req.isAuthenticated()){

            const orderId = req.params.orderId
            const patchDoc = req.body
    
            try {
                const modifiedDoc = await this.dal.findByIdAndUpdate(orderId, 
                    patchDoc)
    
                if(modifiedDoc)
                    this.respondWithModifiedResource(orderId, res)
                else
                    this.respondWithNotFound(res)
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnathorised(res)
        }
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated() && currentUser.isAdmin){

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
        } else {
            this.respondWithUnathorised(res)
        }
    }
}