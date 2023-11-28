import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { IPayment } from "../data-access/model"
import { validationResult } from "express-validator"
export class Controller{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        this.dal = dataAccess
    }

    public addNewPayment = async(
        req: Request, res: Response, next: NextFunction) =>{
            const paymentData: IPayment = req.body

            try {
                const createdDoc = await this.dal.createNewPayment(
                    paymentData)

                this.respondWithCreatedResource(createdDoc.orderId, res)
            } catch (error) {
                next(error)
            }

    }

    private respondWithCreatedResource = (id: string, res: Response) =>{
        res.location(`/payments/${id}`)
        res.status(201).json({ message: 'Created' })
    }

    public respondWithMethodNotAllowed = (
        req: Request, res: Response) =>{
            res.status(405).json({ message: 'Method not allowed' })
    }

    public handleValidationErrors = (req: Request, res: Response, next:NextFunction) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({
                message: 'Invalid Input or reference Id',
                errors: errors.array()
            })
        } else {
            next()
        }

    }
    
}