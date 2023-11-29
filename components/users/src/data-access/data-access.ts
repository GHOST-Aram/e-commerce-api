import { HydratedUserDoc, IUser, User } from "./model"

export class UsersDAL{
    public createNew = async(userData: IUser
        ): Promise<HydratedUserDoc> =>{
        const user = new User(userData)
        const savedUser = await user.save()

        return savedUser
    }

    public findMany = async(pagination: Paginator
        ): Promise<HydratedUserDoc[]> =>{
            const users = await User.find({}, '-password')
                .skip(pagination.skipDocs)
                .limit(pagination.limit)
            
            return users
    }

    
    public findByEmail = async(email: string
        ): Promise<HydratedUserDoc | null> =>{
        return await User.findOne({ email })
    }

    public findById = async(userId: string
        ): Promise<HydratedUserDoc | null> =>{
            const user = await User.findById(userId)
            return user
    }

    public findByIdAndDelete = async(userId: string
        ): Promise<HydratedUserDoc | null> =>{
            return await User.findByIdAndDelete(userId)
    }
    public findByIdAndUpdate = async(
        userID: string, updateData: IUser
        ): Promise<HydratedUserDoc | null> =>{
            return User.findByIdAndUpdate(userID, updateData)    
    }
}
export const usersDAL = new UsersDAL()
export interface Paginator{
    skipDocs: number,
    limit: number
}
