import { jest } from '@jest/globals'
import { IReview, Review } from '../../data-access/model'
export class DataAccess{
    public createNewReview = jest.fn(async(input: IReview) =>{
        return new Review(input)
    })
}

export const dataAccess = new DataAccess()