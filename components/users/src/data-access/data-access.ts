import { Paginator } from "../controller/controller"
import { HydratedUserDoc, IUser, User } from "./model"

export class UsersDAL{
    public createNewUser = (userData: IUser
        ): Promise<HydratedUserDoc> =>{
        const user = new User(userData)
        const savedUser = user.save()

        return savedUser
    }

    public findMultipleUsers = async(pagination: Paginator
        ): Promise<HydratedUserDoc[]> =>{
            const users = await User.find({}, '-password')
                .skip(pagination.skipDocs)
                .limit(pagination.limit)
            
            return users
    }

    
    public findUserByEmail = async(email: string
        ): Promise<HydratedUserDoc | null> =>{
        return await User.findOne({ email })
    }

    public findUserById = async(userId: string
        ): Promise<HydratedUserDoc | null> =>{
            const user = await User.findById(userId)
            return user
    }

    public findUserByIdAndDelete = async(userId: string
        ): Promise<HydratedUserDoc | null> =>{
            return await User.findByIdAndDelete(userId)
    }
    public findUserByIdAndUpdate = async(
        userID: string, updateData: IUser
        ): Promise<HydratedUserDoc | null> =>{
            return User.findByIdAndUpdate(userID, updateData)    
    }
}
export const usersDAL = new UsersDAL()

export interface PatchData{
    first_name?: string
    last_name?: string
    email?: string
    password: string
}