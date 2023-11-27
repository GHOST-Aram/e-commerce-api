import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { validationResult } from "express-validator"
import { IOrder } from "../data-access/model"
export class Controller{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        this.dal = dataAccess
    }
    
    public addNewOrder = async(
        req: Request, res: Response, next: NextFunction) =>{
            const orderData: IOrder = req.body

            try {
                const newOrder = await this.dal.createNewOrder(
                    orderData)

                this.respondWithCreatedResource(newOrder.id, res)
            } catch (error) {
                next(error)
            }
    }

    public respondWithCreatedResource = (
        resourceId: string, res:Response) =>{
            res.location(`/orders/${resourceId}`)
            res.status(201).json({ message: 'Created' })
    }

    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({ 
                    errors: errors.array(),
                    message: 'Invalid Input' 
                })
            } else {
                next()
            }
    }
    public respondWithMethodNotAllowed = (req: Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed'})
    }

}