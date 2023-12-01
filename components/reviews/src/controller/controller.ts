import { BaseController } from "../z-library/bases/controller"
import { Controllable } from "../z-library/bases/controllable"
import { IReview } from "../data-access/model"
import { NextFunction, Request, Response } from "express"
import { ReviewDataAccess } from "../data-access/data-access"

export class ReviewsController extends BaseController implements Controllable{

    private dataAccess: ReviewDataAccess

    constructor(dataAccess: ReviewDataAccess){
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

    public getOne = async(req: Request, res: Response, next: NextFunction) =>{

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

    public getMany = async(req: Request, res: Response, next: NextFunction) =>{

        const paginator = this.paginate(req)

        try {
            const reviews = await this.dataAccess.findWithPagination(paginator)
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