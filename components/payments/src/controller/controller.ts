import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { HydratedPaymentDoc, IPayment } from "../data-access/model"
import { validationResult } from "express-validator"
import { Paginator } from "../data-access/data-access"

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

    public getOnePayment = async(req: Request, res:Response, next: NextFunction) =>{
        const orderId = req.params.orderId

        try {
            const payment = await this.dal.findByOrderId(orderId)
            
            if(payment){
                this.respondWithFoundResource(payment, res)
            } else {
                this.respondWithNotFoundError(res)
            }
        } catch (error) {
            next(error)
        }
    }

    private respondWithFoundResource = async(
        resource: HydratedPaymentDoc [] | HydratedPaymentDoc,
        res: Response
        ) =>{
            res.status(200)

            if(Array.isArray(resource)){
                res.json({ payments: resource })
            } else {
                res.json({ payment: resource })
            }
    }

    private respondWithNotFoundError = (res: Response) =>{
        res.status(404).json({ message: 'Not Found.' })
    }

    public getManyPayments = async(
        req: Request, res: Response, next: NextFunction) =>{
            const paginator = this.paginate(req)

            try {
                const payments = await this.dal.findWithPagination(paginator)
                this.respondWithFoundResource(payments, res)
            } catch (error) {
                next(error)
            }

    }

    private paginate = (req: Request): Paginator =>{
        const paginator: Paginator = {
            skipDocs: 0,
            limit: 10
        }

        const page = Math.abs(Number(req.query.page))
        const limit =  Math.abs(Number(req.query.limit))

        if(page && limit){
            paginator.skipDocs = (page - 1) * limit,
            paginator.limit = limit
        }

        return paginator
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

