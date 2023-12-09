import { Paginator } from "../../z-library/HTTP/http-response"
import { 
    HydratedUserDoc, 
    User, 
    UserModel
} from "../../data-access/model"
import { jest } from "@jest/globals"

export class UsersDAL{
    public Model: UserModel

    constructor(model: UserModel){
        this.Model= model
    }
    public createNew = jest.fn(async(
        userData: User): Promise<HydratedUserDoc> =>{
        return new this.Model(userData)  
    })

    public findByReferenceId = jest.fn(async(userID: string
        ): Promise<HydratedUserDoc | null> =>{
            if(userID === '64c9e4f2df7cc072af2ac9e4'){
                const user = new this.Model({
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
            return new this.Model({
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
            users.push(new this.Model({
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
                return new this.Model({
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
                return new this.Model({
                    first_name: 'John', 
                    last_name: 'Doe',
                    email: 'johndoe@gmail.com'
                })
            }

            return null
    })  
}
