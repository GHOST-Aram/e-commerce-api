import { HydratedUserDoc, IUser, User } from "./model"

export class UsersDAL{
    public createNewUser = (userData: IUser
        ): Promise<HydratedUserDoc> =>{
        const user = new User(userData)
        const savedUser = user.save()

        return savedUser
    }

    public findUserByEmail = async(email: string
        ): Promise<HydratedUserDoc | null> =>{
        return await User.findOne({ email })
    }
}

export const usersDAL = new UsersDAL()