import { Controllable } from "../z-library/bases/controllable"
import { HttpResponse, Paginator } from "../z-library/HTTP/http-response"
import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { Order } from "../data-access/model"

export class OrdersController extends HttpResponse implements Controllable{

    private dataAcess: DataAccess

    constructor(dataAccess: DataAccess){
        super()
        this.dataAcess = dataAccess
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user
        console.log("Items: ", req.body)
        if(currentUser && req.isAuthenticated()){
            
            const orderData: Order = req.body
    
            try {
                const newOrder = await this.dataAcess.createNew(
                    {   ...orderData, 
                        placedBy: currentUser._id.toString()
                    }
                )
                console.log('NEW ORDER: ', newOrder)
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
                const order = await this.dataAcess.findByReferenceId(orderId)
                
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
                const orders = await this.dataAcess.findWithPagination(paginator)
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
                const updatedOrder = await this.dataAcess.findByIdAndUpdate(orderId, 
                    {
                        ...updateData, 
                        placedBy: currentUser._id.toString()
                    })
    
                if(updatedOrder)
                    this.respondWithUpdatedResource(orderId, res)
                else {
                    const newOrder = await this.dataAcess.createNew(updateData)
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

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){

            const orderId = req.params.orderId
            const patchDoc = req.body
    
            try {
                const modifiedDoc = await this.dataAcess.findByIdAndUpdate(orderId, 
                    {...patchDoc, placedBy: currentUser._id.toString()})
    
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
                const deletedOrder = await this.dataAcess.findByIdAndDelete(orderId)
    
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