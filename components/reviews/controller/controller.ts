import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { HydratedReviewDoc, IReview } from "../data-access/model"
import { BaseController } from "../../../library/bases/controller"

export class ReviewsController extends BaseController{

    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        super()
        this.dataAccess = dataAccess
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{
        const reviewData = req.body

        try {
            const reviewDoc = await this.dataAccess.createNew(reviewData)
            this.respondWithCreatedResource(reviewDoc.id, res)
        } catch (error) {
            next(error)
        }
    }

    public getByProductId = async(req: Request, res: Response, next: NextFunction) =>{
        const productId = req.params.productId

        const paginator = this.paginate(req)
        try {
            const reviews = await this.dataAccess
                .findByProductId(productId, paginator)

            this.respondWithFoundResource(reviews, res)
        } catch (error) {
            next(error)
        }
    }

    public getRandomDocs = async(req: Request, res: Response, next: NextFunction) =>{
        const paginator = this.paginate(req)

        try {
            const reviews = await this.dataAccess.findRandomDocs(paginator)
            this.respondWithFoundResource(reviews, res)
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const reviewId = req.params.reviewId
        const updateDoc: IReview = req.body

        try {
            const updatedReview = await this.dataAccess.findByIdAndUpdate(
                reviewId, updateDoc)

            if(updatedReview)
                this.respondWithUpdatedResource(updatedReview.id,res)
            else{
                const newReview = await this.dataAccess.createNew(updateDoc)
                this.respondWithCreatedResource(newReview.id, res)
            }
        } catch (error) {
            next(error)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        const reviewId = req.params.reviewId
        const updateDoc: IReview = req.body

        try {
            const updatedReview = await this.dataAccess.findByIdAndUpdate(
                reviewId, updateDoc)

            if(updatedReview)
                this.respondWithModifiedResource(updatedReview.id, res)
            else
                this.respondWithNotFound(res)
        } catch (error) {
            next(error)
        }
    }

    public deleteOne = async (req: Request, res: Response, next: NextFunction) =>{
        const reviewId = req.params.reviewId
        
        try {
            const deletedReview = await this.dataAccess.findByIdAndDelete(reviewId)

            if(deletedReview)
                this.respondWithDeletedResource( deletedReview.id, res)
            else
                this.respondWithNotFound(res)
        } catch (error) {
            next(error)
        }    
    }
}