import { jest } from '@jest/globals'
import { HydratedReviewDoc, IReview, Review } from '../../data-access/model'
import { Paginator } from '../../data-access/data-access'
import { reviewData } from './raw-data'
export class DataAccess{
    public createNewReview = jest.fn(async(input: IReview) =>{
        return new Review(input)
    })
    public findReviewByIdAndDelete = jest.fn(
        async(id: string): Promise<HydratedReviewDoc | null> =>{
            if(id === '64c9e4f2df7cc072af2ac9e4')
                return new Review(reviewData)

            return null
        }
    )
    public findReviewByIdAndUpdate = jest.fn(
        async(id: string): Promise<HydratedReviewDoc | null> =>{
            if(id === '64c9e4f2df7cc072af2ac9e4')
                return new Review(reviewData)

            return null
    })

    public findReviews = jest.fn(async(
        paginator: Paginator): Promise<HydratedReviewDoc[]> =>{
            return this.createReviewsArray(paginator.limit)
    })

    public findReviewsByProductId = jest.fn(async(
        productId: string, 
        paginator: Paginator
        ): Promise<HydratedReviewDoc[]> =>{
            let reviews: HydratedReviewDoc[] = []

            if(productId === '64c9e4f2df7cc072af2ac9e4')
                reviews = this.createReviewsArray(paginator.limit)

            return reviews
        })

    private createReviewsArray = (length: number
        ): HydratedReviewDoc[] =>{
            let count = 0
            const reviews: HydratedReviewDoc[] = []
            while (count < length){
                reviews.push(new Review(reviewData))
                count++
            }

            return reviews
    }
}

export const dataAccess = new DataAccess()