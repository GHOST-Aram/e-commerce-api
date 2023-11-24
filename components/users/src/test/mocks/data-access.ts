import { HydratedUserDoc, IUser, User } from "../../data-access/model"

export class UsersDAL{
    public createNewUser = jest.fn(async(userData: IUser) =>{
        return new User(userData)  
    })

    public findUserByEmail = jest.fn(async(email: string
        ): Promise<HydratedUserDoc | null> =>{
        if(email === 'existingEmail@gmail.com')
            return new User({
                last_name: 'John',
                first_name: 'Does',
                email: 'existingEmail@gmail.com'
        })

        return null
    })
}

export const usersDAL = new UsersDAL()