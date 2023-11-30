import { HydratedReviewDoc, IReview, Review } from "./model"
import { Paginator } from "../../../library/bases/controller"

export class DataAccess{
    public createNew = async(reviewData: IReview): Promise<HydratedReviewDoc> =>{
        const doc = new Review(reviewData)
        return await doc.save()
    }

    public findByProductId = async(productId: string, paginator: Paginator
        ) : Promise<HydratedReviewDoc[]> =>{

            return await Review.find({product: productId})
                .skip(paginator.skipDocs)
                .limit(paginator.limit)
           
    }

    public findRandomDocs = async(paginator: Paginator): Promise<HydratedReviewDoc[]> =>{
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

export const dataAccess  = new DataAccess()