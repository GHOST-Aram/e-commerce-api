import { NextFunction, Request, Response, request } from "express"
import { DataAccess } from "../data-access/data-access"
import { HydratedCartDoc, ICart } from "../data-access/model"
import { validationResult } from "express-validator"
import { isValidObjectId } from "mongoose"

export class Controller{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        this.dal = dataAccess
    }

    public addItem = async(
        req: Request, res: Response, next: NextFunction) =>{
            const customerId = req.params.customerId
            this.handleInvalidId(customerId, res)

            const itemId: string = req.body.item
            try {
                const modifiedCart = await this.dal.findCartAndAddItemId(
                    customerId, itemId)
                    
                if(modifiedCart){
                    this.respondWithModifiedResource(
                        modifiedCart.customer, res)
                } else {
                    this.respondResourceWithNotFound(res)
                }    
            } catch (error) {
                next(error)
            }
    }

    public removeItem = async(
        req: Request, res: Response, next: NextFunction) =>{
            const customerId = req.params.customerId
            this.handleInvalidId(customerId, res)

            const itemId: string = req.body.item
            try {
                const modifiedCart = await this.dal.findCartAndRemoveItemId(
                    customerId, itemId
                )
                if(modifiedCart){
                    this.respondWithModifiedResource(
                        modifiedCart.customer, res)
                } else {
                    this.respondResourceWithNotFound(res)
                }    
            } catch (error) {
                next(error)
            }
    }

    private respondWithModifiedResource = (
        resourceId: string, res: Response) =>{
            res.location(`/carts/${resourceId}`)
            res.status(200).json({ message: 'Modified' })
    } 


    public addNewCart = async(
        req: Request, res: Response, next: NextFunction) =>{
            const cartInfo: ICart = req.body

            try {
                const existingCart: HydratedCartDoc| null = await this.dal
                    .findByCustomerId (cartInfo.customer)

                if(existingCart !== null){
                    this.respondWithConflict(res)
                } else {
                    const cart: HydratedCartDoc = await this.dal
                        .createNew(cartInfo)
                        
                    this.respondWithCreatedResource(
                        cart.customer, res)
                }
            } catch (error) {
                next(error)
            }
    }

    private respondWithConflict = (res: Response) =>{
        res.status(409).json({message: 'Cart already exists'})
    }

    private respondWithCreatedResource = (
        resourceId: string, res: Response) =>{
            res.location(`/carts/${resourceId}`)
            res.status(201).json({ message: 'Created'})
    }

    public deleteCart = async(
        req: Request, res: Response, next:NextFunction
        ) =>{
            const customerId = req.params.customerId
            this.handleInvalidId(customerId, res)

            try {
                const deletedCart = await this.dal
                    .findByCustomerIDAndDelete(customerId)
                
                if(deletedCart){
                    this.respondWithDeletedResource(
                        deletedCart.customer, res)
                } else {
                    this.respondResourceWithNotFound(res)
                }
            } catch (error) {
                next(error)
            }
    }

    private respondWithDeletedResource = (id: string, res: Response) =>{
        res.status(200).json({
            message: 'Deleted',
            id: id
        })
    }
    public getOneCart = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const customerId = req.params.customerId
            this.handleInvalidId(customerId, res)

            try {
                const cart = await this.dal.findByCustomerId(
                    customerId)

                if(cart !== null)
                    this.respondWithFoundResource(cart, res)
               
                this.respondResourceWithNotFound(res)
            } catch (error) {
                next(error)   
            }
    }
    
    private handleInvalidId = (id: string, res: Response) =>{
        if(!isValidObjectId(id)){
            res.status(400).json({ message: 'Invalid id'})
        }
    }

    private respondResourceWithNotFound = (res: Response) =>{
        res.status(404).json({ message: 'Resource not Found'})
    }

    private respondWithFoundResource = (
        resource: HydratedCartDoc[]| HydratedCartDoc, 
        res: Response
        ) =>{
            if(Array.isArray(resource)){
                res.status(200).json({ carts: resource })
            } else{
                res.status(200).json({ cart: resource })
            }
    }

    public getManyCarts = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const paginator: Paginator = this.paginate(req)

            try {
                const carts = await this.dal.findWithPagination(
                    paginator)

                this.respondWithFoundResource(carts, res)
            } catch (error) {
                next(error)
            }

    }

    private paginate = (req: Request): Paginator =>{
        const paginator = {
            skipDocs: 0,
            limit: 10
        }

        const page = Math.abs(Number(req.query.page))
        const limit = Math.abs(Number(req.query.limit))

        if(page && limit){
            paginator.skipDocs = (page - 1) * limit
            paginator.limit = limit
        }

        return paginator
    }

    public respondWithMethodNotAllowed = (
        req: Request, res: Response) =>{
            res.status(405).json({ message: 'Method not allowed' })
    }

    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json(
                    {
                        message: 'Invalid input',
                        errors: errors.array()
                    }
                )
            } else
                next()
    }

    public updateCartItems = async(
        req: Request, res: Response, next: NextFunction) =>{
            const customerId = req.params.customerId
            this.handleInvalidId(customerId, res)
            
            const updateDoc: {items: string[]} = req.body
            try {
                const updatedCart = await this.dal
                    .findByCustomerIdAndUpdate(customerId, updateDoc)
                if(updatedCart){
                    this.respondWithUpdatedResource(updatedCart.customer,
                         res)

                } else {
                    const newCart = await this.dal.createNew({
                        customer: customerId,
                        items: updateDoc.items,
                    })

                    this.respondWithCreatedResource(newCart.customer, 
                        res)
                }
            } catch (error) {
                next(error)
            }
    }
    
    private respondWithUpdatedResource = (
        resourceId: string, res: Response
        ) =>{
            res.location(`/carts/${resourceId}`)
            res.status(200).json({ message: 'Updated' })
        }
}

export interface Paginator{
    skipDocs: number,
    limit: number
}
type Change = 'updated' | 'deleted' | 'modified'