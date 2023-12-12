import { jest } from '@jest/globals'
import { 
        HydratedReviewDoc, 
        IReview, 
        ReviewModel 
} from '../../data-access/model'
import { Paginator } from '../../z-library/HTTP/http-response'
import { reviewData } from './raw-data'

export class DataAccess{

    public Model: ReviewModel

    constructor(model: ReviewModel){
        this.Model = model
    }

    public createNew = jest.fn(async(input: IReview) =>{
        return new this.Model(input)
    })

    public findByReferenceId = jest.fn(async(id: string
        ): Promise<HydratedReviewDoc | null> =>{
            if( id === '99c9e4f2df7cc072af2ac9e4'){ 
                const notAuthoredByCurrentUser = new this.Model({
                    author: '77c6e4f2df7cc072af2ac9e8',//Not current user
                    product: '64c9e4f2df7cc072af2ac9e8',
                    content: 'Lorem ipsos'
                })
                
                return notAuthoredByCurrentUser
            } else if(id === '64c9e4f2df7cc072af2ac9e4'){ 
                const authoredByCUrrentUser =  new this.Model({
                    author: '64c9e4f2df7cc072af2ac9e8',//Current user Id
                    product: '64c9e4f2df7cc072af2ac9e8',
                    content: 'Lorem ipsol'
                })
                return authoredByCUrrentUser
            } else if (id === '64c9e4f2df7cc072af2ac8e4'){//404 id
                return null
            }

            return new this.Model(reviewData)
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
                reviews.push(new this.Model(reviewData))
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
            if(id === '64c9e4f2df7cc072af2ac9e4'){
                const authoredByCUrrentUser =  new this.Model({
                    author: '64c9e4f2df7cc072af2ac9e8',//Current user Id
                    product: '64c9e4f2df7cc072af2ac9e8',
                    content: 'Lorem ipsis'
                })
                return authoredByCUrrentUser
            } 
                       
            return null   //Not Found
            
    })

    public findByIdAndDelete = jest.fn(
        async(id: string): Promise<HydratedReviewDoc | null> =>{
            if(id === '64c9e4f2df7cc072af2ac9e4')
                return new this.Model(reviewData)
    
            return null
        }
    )
}