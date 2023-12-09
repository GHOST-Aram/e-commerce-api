import { HttpResponse, Paginator } from "../z-library/HTTP/http-response"
import { Controllable } from "../z-library/bases/controllable"
import { HydratedCartDoc, Cart } from "../data-access/model"
import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"

export class CartsController extends HttpResponse implements Controllable{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        super()
        this.dal = dataAccess
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const { items } = req.body
        const currentUser:any = req.user
        
        try {
            if(currentUser){
                const currentUserId = currentUser?._id.toString()
                const existingCart = await this.dal.findByReferenceId (
                    currentUserId)
                    
                if(existingCart== null){
                const cartData: Cart = { items, customer:currentUserId}
                
                const newCart = await this.dal.createNew(cartData)  
                this.respondWithCreatedResource(newCart.customer, res)
                } else {
                    this.respondWithConflict(res)
                }
            } else {
                this.respondWithUnauthorised(res)
            }
        } catch (error) {
            next(error)
        }
    }

    public getOne = async(req: Request, res: Response, next: NextFunction) =>{

        const customerId = req.params.customerId

        try {
            const cart = await this.dal.findByReferenceId(customerId)

            if(cart)
                this.respondWithFoundResource(cart, res)
            else
                this.respondWithNotFound(res)
        } catch (error) {
            next(error)   
        }
    }

    public getMany = async(req: Request, res: Response, next: NextFunction) =>{

        const paginator: Paginator = this.paginate(req)

        try {
            const carts = await this.dal.findWithPagination(paginator)
            this.respondWithFoundResource(carts, res)
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{

        const customerId = req.params.customerId
        const updateDoc: {items: string[]} = req.body

        try {
            const updatedCart = await this.dal
                .findByIdAndUpdate(customerId, updateDoc)
            if(updatedCart){
                this.respondWithUpdatedResource(updatedCart.customer,res)
            } else {
                const newCart = await this.dal.createNew({
                    customer: customerId,
                    items: updateDoc.items,
                })

                this.respondWithCreatedResource(newCart.customer, res)
            }
        } catch (error) {
            next(error)
        }
    }

    public addtoCart = async(req: Request, res: Response, next: NextFunction) =>{

        const customerId = req.params.customerId
        const itemId: string = req.body.item

        try {
            const modifiedCart = await this.dal.findCartAndAddItemId(
                customerId, itemId)
                
            if(modifiedCart){
                this.respondWithModifiedResource(modifiedCart.customer, res)
            } else {
                this.respondWithNotFound(res)
            }    
        } catch (error) {
            next(error)
        }
    }

    public removeFromCart = async(req: Request, res: Response, next: NextFunction
        ) =>{
        const customerId = req.params.customerId
        const itemId: string = req.body.item

        try {
            const modifiedCart = await this.dal.findCartAndRemoveItemId(
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
    }

    public deleteOne = async(req: Request, res: Response, next:NextFunction) =>{

        const customerId = req.params.customerId

        try {
            const deletedCart = await this.dal.findByIdAndDelete(customerId)
            
            if(deletedCart){
                this.respondWithDeletedResource(deletedCart.customer, res)
            } else {
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }
}