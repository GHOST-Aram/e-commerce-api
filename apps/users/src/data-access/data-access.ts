import { Paginator } from "../z-library/HTTP/http-response"
import { Accessible } from "../z-library/bases/accessible"
import { HydratedUserDoc, User } from "./model"

export class UsersDAL implements Accessible{

    public createNew = async(userData: User): Promise<HydratedUserDoc> =>{
        const user = new User(userData)
        const savedUser = await user.save()

        return savedUser
    }

    public findByReferenceId = async(userId: string): Promise<HydratedUserDoc | null> =>{
        const user = await User.findById(userId)
        return user
    }
    
    public findByEmail = async(email: string): Promise<HydratedUserDoc | null> =>{
        return await User.findOne({ email })
    }

    public findWithPagination = async(pagination: Paginator): Promise<HydratedUserDoc[]> =>{
        const users = await User.find({}, '-password')
            .skip(pagination.skipDocs)
            .limit(pagination.limit)
        
        return users
    }

    public findByIdAndUpdate = async(userID: string, updateData: User
        ): Promise<HydratedUserDoc | null> =>{
            return await User.findByIdAndUpdate(userID, updateData)    
    }

    public findByIdAndDelete = async(userId: string): Promise<HydratedUserDoc | null>=>{
            return await User.findByIdAndDelete(userId)
    }
}

export const usersDAL = new UsersDAL()

