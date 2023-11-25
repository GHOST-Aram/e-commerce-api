import { HydratedReviewDoc, IReview, Review } from "./model"

export class DataAccess{
    public createNewReview = async(reviewData: IReview
        ): Promise<HydratedReviewDoc> =>{
            const doc = new Review(reviewData)
            return await doc.save()
    }
}

export const dataAccess  = new DataAccess()