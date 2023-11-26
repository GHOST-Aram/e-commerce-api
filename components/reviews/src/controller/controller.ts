import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { validationResult } from "express-validator"
import { isValidObjectId } from "mongoose"
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

    public addNewReviewWithId = async(req: Request, res: Response) =>{
        this.respondWithMethodNotAllowed(res)
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

    private respondWithMethodNotAllowed = (res: Response) =>{
        res.status(405).json({ message: 'Method not allowed'})
    }

    public getRandomReviews = async(
        req: Request, res: Response, next: NextFunction) =>{
            const paginator = this.paginate(req)

            try {
                const reviews = await this.dal.findReviews(paginator)
                res.status(200).json({ reviews })
            } catch (error) {
                next(error)
            }
    }

    private paginate = (req: Request) =>{
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

    public getReviewsByProductId = async(
        req: Request, res: Response, next: NextFunction) =>{
            const productId = req.params.productId
            this.handleInvalidId(productId, res)

            const paginator = this.paginate(req)
            try {
                const reviews = await this.dal.findReviewsByProductId(
                    productId, paginator)
                res.status(200).json({ reviews })
            } catch (error) {
                next(error)
            }
    }

    private handleInvalidId = (id: string, res: Response) =>{
        if(!isValidObjectId(id))
            res.status(400).json({ message: 'Invalid Id'})
    }

    public modifyAllReviews = (req: Request, res: Response) =>{
        this.respondWithMethodNotAllowed(res)
    }

    public modifyReview = async(
        req: Request, res: Response, next: NextFunction) =>{
        const reviewId = req.params.reviewId
        this.handleInvalidId(reviewId, res)

        try {
            const updatedReview = await this.dal
                .findReviewByIdAndUpdate(reviewId)

            if(updatedReview === null)
                res.status(404).json({ message: 'Not found' })

            res.status(200).json({ 
                message: 'Modified',
                review: updatedReview 
            })
        } catch (error) {
            next(error)
        }
    }

    public updateAllReviews = async(req: Request, res: Response) =>{
        this.respondWithMethodNotAllowed(res)
    }

    public updateReview = async(
        req: Request, res: Response, next: NextFunction) =>{
            const reviewId = req.params.reviewId
            this.handleInvalidId(reviewId, res)

            try {
                const updatedReview = await this.dal
                    .findReviewByIdAndUpdate(reviewId)

                if(updatedReview === null)
                    res.status(404).json({ message: 'Not found' })

                res.status(200).json({ 
                    message: 'Updated',
                    review: updatedReview 
                })
            } catch (error) {
                next(error)
            }
    }
}