import { NextFunction, Request, Response } from "express"
import { DataAccess } from "../data-access/data-access"
import { HydratedReviewDoc, IReview } from "../data-access/model"

export class Controller{

    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        this.dataAccess = dataAccess
    }

    public addNew = async(
        req: Request, res: Response, next: NextFunction) =>{
            const reviewData = req.body
            try {
                const reviewDoc = await this.dataAccess
                    .createNew(reviewData)
                this.respondWithCreatedResource(reviewDoc.id, res)
            } catch (error) {
                next(error)
            }
    }

    private respondWithCreatedResource = (
        resourceId: string, res: Response) =>{
            res.location(`/reviews/${resourceId}`)
            res.status(201).json({ message: 'Created'})
    }

    public getByProductId = async(
        req: Request, res: Response, next: NextFunction) =>{
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

    private respondWithFoundResource = (
        resource: HydratedReviewDoc[], res: Response) =>{
            res.status(200).json({ resource })
    }

    public getRandomDocs = async(
        req: Request, res: Response, next: NextFunction) =>{
            const paginator = this.paginate(req)

            try {
                const reviews = await this.dataAccess
                    .findRandomDocs(paginator)

                this.respondWithFoundResource(reviews, res)
            } catch (error) {
                next(error)
            }
    }

    public updateOne = async(
        req: Request, res: Response, next: NextFunction) =>{
            const reviewId = req.params.reviewId
            const updateDoc: IReview = req.body

            try {
                const updatedReview = await this.dataAccess
                    .findByIdAndUpdate(reviewId, updateDoc)

                if(updatedReview)
                    this.respondWithUpdatedResource(updatedReview.id,
                    res)
                
                else{
                    const newReview = await this.dataAccess
                        .createNew(updateDoc)
                    this.respondWithCreatedResource(newReview.id, res)
                }
            } catch (error) {
                next(error)
            }
    }

    private respondWithUpdatedResource = (
        id: HydratedReviewDoc, res: Response
        ) =>{
            res.location(`/reviews/${id}`)
            res.status(200).json({  message: 'Updated' })
    }

    public modifyOne = async(
        req: Request, res: Response, next: NextFunction) =>{
        const reviewId = req.params.reviewId
        const updateDoc: IReview = req.body

        try {
            const updatedReview = await this.dataAccess
                .findByIdAndUpdate(reviewId, updateDoc)

            if(updatedReview)
                this.respondWithModifiedResource(updatedReview.id, 
                res)

            this.respondWithNotFound(res)
        } catch (error) {
            next(error)
        }
    }

    private respondWithModifiedResource = (
        id: HydratedReviewDoc, res: Response
        ) =>{
            res.location(`/reviews/${id}`)
            res.status(200).json({  message: 'Modified' })
    }

    public deleteOne = async (
        req: Request, res: Response, next: NextFunction) =>{
            const reviewId = req.params.reviewId
            
            try {
                const deletedReview = await this.dataAccess
                    .findByIdAndDelete(reviewId)
    
                if(deletedReview)
                    this.respondWithDeletedResource(
                    deletedReview.id, res)
            
                this.respondWithNotFound(res)
            } catch (error) {
                next(error)
            }    
    }

    private respondWithDeletedResource = (id: string, res: Response) =>{
        res.status(200).json({ message: 'Deleted', id})
    }

    private respondWithNotFound = (res: Response) =>{
        res.status(404).json({ message: 'Not found' })
    }
    
    public respondWithMethodNotAllowed = (
        req:Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed'})
    }
}