import { jest } from '@jest/globals'
import { HydratedReviewDoc, IReview, Review } from '../../data-access/model'
import { Paginator } from '../../z-library/bases/controller'
import { reviewData } from './raw-data'
export class DataAccess{
    public createNew = jest.fn(async(input: IReview) =>{
        return new Review(input)
    })

    public findByReferenceId = jest.fn(async(id: string
        ): Promise<HydratedReviewDoc | null> =>{
            return new Review(reviewData)
    })
    
    public findByProductId = jest.fn(async(
        productId: string, 
        paginator: Paginator
        ): Promise<HydratedReviewDoc[]> =>{
            let reviews: HydratedReviewDoc[] = []

            if(productId === '64c9e4f2df7cc072af2ac9e4')
                reviews = this.createDocumentsArray(paginator.limit)

            return reviews
    })

    private createDocumentsArray = (length: number
        ): HydratedReviewDoc[] =>{
            let count = 0
            const reviews: HydratedReviewDoc[] = []
            while (count < length){
                reviews.push(new Review(reviewData))
                count++
            }

            return reviews
    }

    public findWithPagination = jest.fn(async(
        paginator: Paginator): Promise<HydratedReviewDoc[]> =>{
            return this.createDocumentsArray(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(
        async(id: string): Promise<HydratedReviewDoc | null> =>{
            if(id === '64c9e4f2df7cc072af2ac9e4')
                return new Review(reviewData)

            return null
    })

    public findByIdAndDelete = jest.fn(
        async(id: string): Promise<HydratedReviewDoc | null> =>{
            if(id === '64c9e4f2df7cc072af2ac9e4')
                return new Review(reviewData)
    
            return null
        }
    )
}


export const dataAccess = new DataAccess()