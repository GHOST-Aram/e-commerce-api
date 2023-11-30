import { BaseController, Paginator } from "../../../library/bases/controller"
import { Controllable } from "../../../library/bases/controllable"
import { HydratedCartDoc, ICart } from "../data-access/model"
import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"

export class CartsController extends BaseController implements Controllable{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        super()
        this.dal = dataAccess
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const cartInfo: ICart = req.body

        try {
            const existingCart: HydratedCartDoc| null = await this.dal
                .findByReferenceId (cartInfo.customer)

            if(existingCart== null){
                const newCart: HydratedCartDoc = await this.dal.createNew(cartInfo)  
                this.respondWithCreatedResource(newCart.customer, res)
            } else {
                this.respondWithConflict(res)
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