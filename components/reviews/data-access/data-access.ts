import { Paginator } from "../../../library/bases/controller"
import { Accessible } from "../../../library/bases/accessible"
import { HydratedReviewDoc, IReview, Review } from "./model"

export class ReviewDataAccess implements Accessible{
    public createNew = async(reviewData: IReview): Promise<HydratedReviewDoc> =>{
        const doc = new Review(reviewData)
        return await doc.save()
    }

    public findByReferenceId = async(refId: string): Promise<any> => {
        return await Review.findById(refId)
    }

    public findByProductId = async(productId: string, paginator: Paginator
        ) : Promise<HydratedReviewDoc[]> =>{

        return await Review.find({product: productId})
            .skip(paginator.skipDocs)
            .limit(paginator.limit)
           
    }

    public findWithPagination = async(paginator: Paginator): Promise<HydratedReviewDoc[]> =>{
        return await Review.find().skip(paginator.skipDocs)
            .limit(paginator.limit)
    }

    public findByIdAndUpdate = async(id: string, updateDoc: IReview
        ): Promise<HydratedReviewDoc | null> =>{
            return await Review.findByIdAndUpdate(
                id, updateDoc, { new: true })
    }

    public findByIdAndDelete = async(id: string): Promise<HydratedReviewDoc | null> =>{
        return await Review.findByIdAndDelete(id)
    }
}

export const dataAccess  = new ReviewDataAccess()