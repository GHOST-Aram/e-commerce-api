import { Paginator } from "../../z-library/HTTP/http-response"
import { 
    HydratedUserDoc, 
    User, 
    UserModel
} from "../../data-access/model"
import { jest } from "@jest/globals"

const ID_OF_EXISTING_DOCUMENT = '64c9e4f2df7cc072af2ac9e4'

export class UsersDAL{
    public Model: UserModel

    constructor(model: UserModel){
        this.Model= model
    }
    public createNew = jest.fn(

        async(userData: User): Promise<HydratedUserDoc> =>{

            const mockUser = new this.Model(userData)  
            return mockUser
        }
    )

    public findByReferenceId = jest.fn(

        async(userID: string): Promise<HydratedUserDoc | null> =>{

            if(userID === ID_OF_EXISTING_DOCUMENT){
                const mockFoundUser = new this.Model({
                    last_name: 'John',
                    first_name: 'Does',
                    email: 'johndoe@gmail.com'
                })

                return mockFoundUser

            } else return null
        }
    )

    public findByEmail = jest.fn(

        async(email: string): Promise<HydratedUserDoc | null> =>{

            const existingDocumentEmail = 'existingEmail@gmail.com'

            if(email === existingDocumentEmail){

                const mockDocumentWithExistingEmail =  new this.Model({
                    last_name: 'John',
                    first_name: 'Does',
                    email: 'existingEmail@gmail.com'
                })

                return mockDocumentWithExistingEmail

            } else return null
        }
    )
    
    public findWithPagination = jest.fn(
        
        async( pagination: Paginator): Promise<HydratedUserDoc[]> =>{

            const mockUsers =  this.createMockUsersArray(pagination.limit)
            return mockUsers
        }
    )

    private createMockUsersArray = (limit: number) =>{

        const mockUsers: HydratedUserDoc[] = []

        let userCount = 0
        while(userCount < limit){
            mockUsers.push(new this.Model({
                first_name: 'John',
                last_name: 'Doe',
                email: 'johnDoes@gmail.com'
            }))

            userCount ++
        }

        return mockUsers
    }
   
    public findByIdAndDelete = jest.fn(

        async(userId: string): Promise<HydratedUserDoc | null> =>{

            if(userId === ID_OF_EXISTING_DOCUMENT){
                const mockDeletedUserDoc =  new this.Model({
                    first_name: 'John', 
                    last_name: 'Doe',
                    email: 'johndoe@gmail.com'
                })

                return mockDeletedUserDoc

            } else return null
        }
    )

    public findByIdAndUpdate = jest.fn(

        async(userId: string): Promise<HydratedUserDoc | null> =>{

            if(userId === ID_OF_EXISTING_DOCUMENT){
                const mockUpdatedUserDoc =  new this.Model({
                    first_name: 'John', 
                    last_name: 'Doe',
                    email: 'johndoe@gmail.com'
                })

                return mockUpdatedUserDoc

            } else return null
        }
    )  
}
