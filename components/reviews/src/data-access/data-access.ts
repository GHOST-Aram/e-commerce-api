import { HydratedReviewDoc, IReview, Review } from "./model"

export class DataAccess{
    public createNewReview = async(reviewData: IReview
        ): Promise<HydratedReviewDoc> =>{

            const doc = new Review(reviewData)
            return await doc.save()
    }

    public findReviewsByProductId = async(
        productId: string, paginator: Paginator
        ) : Promise<HydratedReviewDoc[]> =>{

            return await Review.find({product: productId})
                .skip(paginator.skipDocs)
                .limit(paginator.limit)
           
    }

    public findRandomReviews = async(paginator: Paginator
        ): Promise<HydratedReviewDoc[]> =>{
            return await Review.find().skip(paginator.skipDocs)
                .limit(paginator.limit)
    }

    public findReviewByIdAndUpdate = async(id: string, updateDoc: IReview
        ): Promise<HydratedReviewDoc | null> =>{
            return await Review.findByIdAndUpdate(
                id, updateDoc, { new: true })
    }

    public findReviewByIdAndDelete = async(id: string
        ): Promise<HydratedReviewDoc | null> =>{
            return await Review.findByIdAndDelete(id)
    }
}

export const dataAccess  = new DataAccess()
export interface Paginator{
    skipDocs: number,
    limit: number
}