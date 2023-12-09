import { Paginator } from "../z-library/HTTP/http-response"
import { Accessible } from "../z-library/bases/accessible"
import { HydratedUserDoc, User, UserModel } from "./model"

export class UsersDAL implements Accessible{
    public Model:UserModel
    constructor (model : UserModel){
        this.Model = model
    }

    public createNew = async(userData: User): Promise<HydratedUserDoc> =>{
        const user = new this.Model(userData)
        const savedUser = await user.save()

        return savedUser
    }

    public findByReferenceId = async(userId: string): Promise<HydratedUserDoc | null> =>{
        const user = await this.Model.findById(userId, '-password')
        return user
    }
    
    public findByEmail = async(email: string): Promise<HydratedUserDoc | null> =>{
        return await this.Model.findOne({ email })
    }

    public findWithPagination = async(pagination: Paginator): Promise<HydratedUserDoc[]> =>{
        const users = await this.Model.find({}, '-password')
            .skip(pagination.skipDocs)
            .limit(pagination.limit)
        
        return users
    }

    public findByIdAndUpdate = async(userID: string, updateData: User
        ): Promise<HydratedUserDoc | null> =>{
            return await this.Model.findByIdAndUpdate(userID, updateData)    
    }

    public findByIdAndDelete = async(userId: string): Promise<HydratedUserDoc | null>=>{
            return await this.Model.findByIdAndDelete(userId)
    }
}

