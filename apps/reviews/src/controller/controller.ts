import { HttpResponse } from "../z-library/HTTP/http-response"
import { Controllable } from "../z-library/bases/controllable"
import { NextFunction, Request, Response } from "express"
import { ReviewDataAccess } from "../data-access/data-access"

export class ReviewsController extends HttpResponse implements Controllable{

    private dataAccess: ReviewDataAccess

    constructor(dataAccess: ReviewDataAccess){
        super()
        this.dataAccess = dataAccess
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){

            const reviewData = req.body
    
            try {
                const reviewDoc = await this.dataAccess.createNew(reviewData)
                this.respondWithCreatedResource(reviewDoc.id, res)
            } catch (error) {
                next(error)
            }
        } else{
            this.respondWithUnauthorised(res)
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

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated() && currentUser.isAdmin){

            const paginator = this.paginate(req)
    
            try {
                const reviews = await this.dataAccess.findWithPagination(paginator)
                this.respondWithFoundResource(reviews, res)
            } catch (error) {
                next(error)
            }
        } else{
            this.respondWithForbidden(res)
        }
    }

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated()){

            const reviewId = req.params.reviewId
            const content: string = req.body.content
    
            try {
                const updatedReview = await this.dataAccess.findByIdAndUpdate(
                    reviewId, { content })
    
                if(updatedReview)
                    this.respondWithModifiedResource(updatedReview.id, res)
                else
                    this.respondWithNotFound(res)
            } catch (error) {
                next(error)
            }
        } else{
            this.respondWithUnauthorised(res)
        }
    }

    public deleteOne = async (req: Request, res: Response, next: NextFunction) =>{

        const currentUser:any = req.user

        if(currentUser && req.isAuthenticated() && currentUser.isAdmin){

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
        } else{
            this.respondWithForbidden(res)
        }
    }
}