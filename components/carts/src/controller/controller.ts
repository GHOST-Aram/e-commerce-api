import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { HydratedCartDoc, ICart } from "../data-access/model"
import { validationResult } from "express-validator"
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
                    .findCartByCustomerId (cartInfo.customer)

                if(existingCart !== null){
                    this.respondWithConflict(res)
                } else {
                    const cart: HydratedCartDoc = await this.dal
                        .createNewCart(cartInfo)
                        
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