import mongoose, { HydratedDocument } from "mongoose"

export class DataAccess{
    
    public findUserByEmail = async(email: string
        ): Promise<HydratedDocument<any> | null> =>{
       return await mongoose.connection.db.collection('users').findOne({ email })
    }    
}

export const dataAccess  = new DataAccess()