import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { HydratedCartDoc, ICart } from "../data-access/model"
import { validationResult } from "express-validator"
import { isValidObjectId } from "mongoose"
export class Controller{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        this.dal = dataAccess
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
        if(!isValidObjectId(id))
            res.status(400).json({ message: 'Invalid id'})
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

    public handleMethodNotAllowed = (
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
            }
            next()
    }

}

export interface Paginator{
    skipDocs: number,
    limit: number
}