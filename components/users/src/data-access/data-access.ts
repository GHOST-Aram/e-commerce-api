import { HydratedUserDoc, IUser, User } from "./model"

export class UsersDAL{
    public createNew = async(userData: IUser
        ): Promise<HydratedUserDoc> =>{
        const user = new User(userData)
        const savedUser = await user.save()

        return savedUser
    }

    public findById = async(userId: string
        ): Promise<HydratedUserDoc | null> =>{
            const user = await User.findById(userId)
            return user
    }
    
    public findByEmail = async(email: string
        ): Promise<HydratedUserDoc | null> =>{
        return await User.findOne({ email })
    }

    public findMany = async(pagination: Paginator
        ): Promise<HydratedUserDoc[]> =>{
            const users = await User.find({}, '-password')
                .skip(pagination.skipDocs)
                .limit(pagination.limit)
            
            return users
    }

    public findByIdAndUpdate = async(
        userID: string, updateData: IUser
        ): Promise<HydratedUserDoc | null> =>{
            return User.findByIdAndUpdate(userID, updateData)    
    }

    public findByIdAndDelete = async(userId: string
        ): Promise<HydratedUserDoc | null> =>{
            return await User.findByIdAndDelete(userId)
    }
    }
export const usersDAL = new UsersDAL()
export interface Paginator{
    skipDocs: number,
    limit: number
}
