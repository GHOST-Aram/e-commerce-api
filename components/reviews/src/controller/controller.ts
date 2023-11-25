import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { validationResult } from "express-validator"
export class Controller{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        this.dal = dataAccess
    }

    public addNewReview = async(
        req: Request, res: Response, next: NextFunction) =>{
            const reviewData = req.body
            try {
                const reviewDoc = await this.dal.createNewReview(
                    reviewData)
                    
                res.location(`/reviews/${reviewDoc.id}`)
                res.status(201).json({ message: 'Created'})
            } catch (error) {
                next(error)
            }
    }

    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({ 
                message: 'Invalid input',
                errors: errors.array()
            })
        } else {
            next()
        }
    }
    public handleNotAllowedRequest = (
        req: Request, res: Response) =>{
        if(req.params.id){
            res.status(405).json({ message: 'Method not allowed'})
        }
    }
}