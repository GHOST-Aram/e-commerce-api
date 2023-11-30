import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { HydratedPaymentDoc, IPayment } from "../data-access/model"
import { Paginator } from "../data-access/data-access"

export class Controller{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        this.dal = dataAccess
    }

    public addNew = async(
        req: Request, res: Response, next: NextFunction) =>{
            const paymentData: IPayment = req.body

            try {
                const createdDoc = await this.dal.createNew(
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

    public getOne = async(req: Request, res:Response, next: NextFunction) =>{
        const referenceId =  req.params.orderId

        try {
            const payment = await this.dal.findByOrderId(referenceId)

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
            res.status(200).json({ resource })
           
    }

    private respondWithNotFoundError = (res: Response) =>{
        res.status(404).json({ message: 'Not Found.' })
    }

    public getMany = async(
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

    public updateOne = async(
        req: Request, res: Response, next: NextFunction) =>{
            const referenceId =  req.params.orderId
            const updateDoc: IPayment = req.body

            try {
                const updatedPayment = await this.dal.findByOrderIdAndUpdate(
                    referenceId, updateDoc)

                if(updatedPayment){
                    this.respondWithChangedResource( updatedPayment.orderId, 
                        'Updated', res)
                } else {
                    const newPayment = await this.dal.createNew(updateDoc)
                    this.respondWithCreatedResource(newPayment.orderId, res)
                }
            } catch (error) {
                next(error)
            }
    }

    private respondWithChangedResource = (
        orderId: string, change: string, res: Response) =>{
            res.location(`/payments/${ orderId }`)
            res.status(200).json({ message: change })
    }
    
    public modifyOne = async(
        req: Request, res: Response, next: NextFunction) =>{
            const referenceId = req.params.orderId
            const updateDoc = req.body

            try {
                const modifiedPayment = await this.dal.findByOrderIdAndUpdate(
                    referenceId, updateDoc)
                    
                if(modifiedPayment){
                    this.respondWithChangedResource(modifiedPayment.orderId, 
                        'Modified', res)
                } else {
                    this.respondWithNotFoundError(res)
                }
            } catch (error) {
                next(error)
            }
    }

    public deleteOne = async(
        req: Request, res: Response, next: NextFunction) =>{
            const referenceId = req.params.orderId

            try {
                const deletedDoc = await this.dal.findByOrderIdAndDelete(
                    referenceId)

                if(deletedDoc){
                    this.respondWithDeletedResource(deletedDoc.orderId, 
                        res)
                } else {
                    this.respondWithNotFoundError(res)
                }
                
            } catch (error) {
                next(error)
            }
    }

    private respondWithDeletedResource = (
        id: string, res: Response) =>{
            res.status(200).json({ message: 'Deleted', id })
    }

    public respondWithMethodNotAllowed = (
        req: Request, res: Response) =>{
            res.status(405).json({ message: 'Method not allowed' })
    }
    
}

