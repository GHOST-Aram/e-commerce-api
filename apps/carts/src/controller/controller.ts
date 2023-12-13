import { HttpResponse, Paginator } from "../z-library/HTTP/http-response"
import { Controllable } from "../z-library/bases/controllable"
import { Cart } from "../data-access/model"
import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"

export class CartsController extends HttpResponse implements Controllable{

    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        super()
        this.dataAccess = dataAccess
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const currentUser:any = req.user
        
        if(currentUser && req.isAuthenticated()){
            const { items } = req.body

            try {
                const currentUserId = currentUser?._id.toString()
                const existingCart = await this.dataAccess.findByReferenceId (
                    currentUserId)
                    
                if(existingCart== null){
                const cartData: Cart = { items, customer:currentUserId}
                
                const newCart = await this.dataAccess.createNew(cartData)  
                this.respondWithCreatedResource(newCart.customer, res)
                } else {
                    this.respondWithConflict(res)
                }
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
        }
    }

    public getOne = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user
        
        if(currentUser && req.isAuthenticated()){
            const customerId = currentUser._id.toString()

            try {
                const cart = await this.dataAccess.findByReferenceId(customerId)
    
                if(cart)
                    this.respondWithFoundResource(cart, res)
                else
                    this.respondWithNotFound(res)
            } catch (error) {
                next(error)   
            }
        } else {
            this.respondWithUnauthorised(res)
        }
    }

    public getMany = async(req: Request, res: Response, next: NextFunction) =>{
        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){
            const paginator: Paginator = this.paginate(req)

            try {
                const carts = await this.dataAccess.findWithPagination(paginator)
                this.respondWithFoundResource(carts, res)
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) => {
        this.respondWithMethodNotAllowed(req, res)
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){
            const customerId = currentUser._id.toString()
            const updateDoc: {items: string[]} = req.body
    
            try {
                const updatedCart = await this.dataAccess.findByIdAndUpdate(
                    customerId, updateDoc)
                if(updatedCart){
                    this.respondWithUpdatedResource(updatedCart.customer,res)
                } else {
                    const newCart = await this.dataAccess.createNew({
                        customer: customerId,
                        items: updateDoc.items,
                    })
    
                    this.respondWithCreatedResource(newCart.customer, res)
                }
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
        }
    }

    public addtoCart = async(req: Request, res: Response, next: NextFunction) =>{
        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){
            const customerId = currentUser._id.toString()
            const itemId: string = req.body.item
    
            try {
                const modifiedCart = await this.dataAccess.findCartAndAddItemId(
                    customerId, itemId)
                    
                if(modifiedCart){
                    this.respondWithModifiedResource(modifiedCart.customer, res)
                } else {
                    this.respondWithNotFound(res)
                }    
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
        }

    }

    public removeFromCart = async(req: Request, res: Response, next: NextFunction
        ) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){
            const customerId = currentUser._id.toString()
            const itemId: string = req.body.item
    
            try {
                const modifiedCart = await this.dataAccess.findCartAndRemoveItemId(
                    customerId, itemId
                )
                if(modifiedCart){
                    this.respondWithModifiedResource( modifiedCart.customer, res)
                } else {
                    this.respondWithNotFound(res)
                }    
            } catch (error) {
                next(error)
            }

        } else {
            this.respondWithUnauthorised(res)
        }
    }

    public deleteOne = async(req: Request, res: Response, next:NextFunction) =>{
        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){
            const customerId = currentUser._id.toString()
    
            try {
                const deletedCart = await this.dataAccess.findByIdAndDelete(customerId)
                
                if(deletedCart){
                    this.respondWithDeletedResource(deletedCart.customer, res)
                } else {
                    this.respondWithNotFound(res)
                }
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
        }
    }
}