import { BaseController } from "../../../library/bases/controller"
import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { IPayment } from "../data-access/model"
import { Controllable } from "../../../library/bases/controllable"

export class PayController extends BaseController implements Controllable{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        super()
        this.dal = dataAccess
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const paymentData: IPayment = req.body

        try {
            const createdDoc = await this.dal.createNew(paymentData)
            this.respondWithCreatedResource(createdDoc.orderId, res)
        } catch (error) {
            next(error)
        }
    }

    public getOne = async(req: Request, res:Response, next: NextFunction) =>{
        const referenceId =  req.params.orderId

        try {
            const payment = await this.dal.findByOrderId(referenceId)

            if(payment){
                this.respondWithFoundResource(payment, res)
            } else {
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }

    public getMany = async(req: Request, res: Response, next: NextFunction) =>{
        const paginator = this.paginate(req)

        try {
            const payments = await this.dal.findWithPagination(paginator)
            this.respondWithFoundResource(payments, res)
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const referenceId =  req.params.orderId
        const updateDoc: IPayment = req.body

        try {
            const updatedPayment = await this.dal.findByOrderIdAndUpdate(
                referenceId, updateDoc)

            if(updatedPayment){
                this.respondWithUpdatedResource( updatedPayment.orderId, res)
            } else {
                const newPayment = await this.dal.createNew(updateDoc)
                this.respondWithCreatedResource(newPayment.orderId, res)
            }
        } catch (error) {
            next(error)
        }
    }
    
    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        const referenceId = req.params.orderId
        const updateDoc = req.body

        try {
            const modifiedPayment = await this.dal.findByOrderIdAndUpdate(
                referenceId, updateDoc)
                
            if(modifiedPayment){
                this.respondWithModifiedResource(modifiedPayment.orderId, res)
            } else {
                this.respondWithNotFound(res)
            }
        } catch (error) {
            next(error)
        }
    }

    public deleteOne = async(req: Request, res: Response, next: NextFunction) =>{
        const referenceId = req.params.orderId

        try {
            const deletedDoc = await this.dal.findByOrderIdAndDelete(referenceId)

            if(deletedDoc){
                this.respondWithDeletedResource(deletedDoc.orderId, res)
            } else {
                this.respondWithNotFound(res)
            }
            
        } catch (error) {
            next(error)
        }
    }
}

