import { Paginator } from "../../z-library/bases/controller"
import { 
    HydratedUserDoc, 
    IUser, 
    User 
} from "../../data-access/model"
import { jest } from "@jest/globals"

export class UsersDAL{
    public createNew = jest.fn(async(
        userData: IUser): Promise<HydratedUserDoc> =>{
        return new User(userData)  
    })

    public findByReferenceId = jest.fn(async(userID: string
        ): Promise<HydratedUserDoc | null> =>{
            if(userID === '64c9e4f2df7cc072af2ac9e4'){
                const user = new User({
                    last_name: 'John',
                    first_name: 'Does',
                    email: 'johndoe@gmail.com'
                })

                return user
            }

            return null
    
    })

    public findByEmail = jest.fn(async(email: string
        ): Promise<HydratedUserDoc | null> =>{
        if(email === 'existingEmail@gmail.com')
            return new User({
                last_name: 'John',
                first_name: 'Does',
                email: 'existingEmail@gmail.com'
        })

        return null
    })
    
    public findWithPagination = jest.fn(async(
        pagination: Paginator): Promise<HydratedUserDoc[]> =>{
            return this.createFakeDocsArray(pagination.limit)
    })

    private createFakeDocsArray = (limit: number) =>{
        const users: HydratedUserDoc[] = []

        let userCount = 0
        while(userCount < limit){
            users.push(new User({
                first_name: 'John',
                last_name: 'Doe',
                email: 'johnDoes@gmail.com'
            }))

            userCount ++
        }

        return users
    }
   
    public findByIdAndDelete = jest.fn(
        async(userId: string): Promise<HydratedUserDoc | null> =>{
            if(userId === '64c9e4f2df7cc072af2ac9e4'){
                return new User({
                    first_name: 'John', 
                    last_name: 'Doe',
                    email: 'johndoe@gmail.com'
                })
            }

            return null
    })
    public findByIdAndUpdate = jest.fn(
        async(userId: string): Promise<HydratedUserDoc | null> =>{
            if(userId === '64c9e4f2df7cc072af2ac9e4'){
                return new User({
                    first_name: 'John', 
                    last_name: 'Doe',
                    email: 'johndoe@gmail.com'
                })
            }

            return null
    })  
}

export const usersDAL = new UsersDAL()