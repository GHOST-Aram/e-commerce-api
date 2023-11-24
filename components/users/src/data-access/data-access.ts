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

    public findUserById = async(userId: string
        ): Promise<HydratedUserDoc | null> =>{
            const user = await User.findById(userId)
            return user
    }
    
    public findUserByEmail = async(email: string
        ): Promise<HydratedUserDoc | null> =>{
        return await User.findOne({ email })
    }
}

export const usersDAL = new UsersDAL()