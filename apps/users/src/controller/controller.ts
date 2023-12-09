import { HttpResponse} from "../z-library/HTTP/http-response";
import { Controllable } from "../z-library/bases/controllable";
import { Response, Request } from "express";
import { UsersDAL } from "../data-access/data-access";
import { NextFunction } from "connect";
import { User } from "../data-access/model";

export class UsersController extends HttpResponse implements Controllable{

    private dataAccess: UsersDAL

    constructor(dataAccessLayer: UsersDAL){
        super()
        this.dataAccess = dataAccessLayer
    }

    public addNew = async(req: Request, res: Response, next: NextFunction) =>{

        const userData = req.body

        try {
            const user = await this.dataAccess.findByEmail(userData.email)

            if(user)
                this.respondWithConflict(res)
            else {
                const user = await this.dataAccess.createNew(userData)
                this.respondWithCreatedResource(user.id, res)
            }
        } catch (error) {
            next(error)
        }
    }

    public getOne = async(req: Request, res: Response, next: NextFunction) =>{
        const currentUSer = req.user

        if(currentUSer && req.isAuthenticated()){
            const userId = req.params.id
            
            try {
                const user = await this.dataAccess.findByReferenceId(userId)
                
                if(user === null)
                    this.respondWithNotFound(res)
                else     
                    this.respondWithFoundResource(user, res)
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
        }
    }
    
    public getMany = async(req: Request, res: Response, next: NextFunction) =>{
        const currentUSer = req.user

        if(currentUSer && req.isAuthenticated()){
            const pagination = this.paginate(req)
    
            try {
                const users = await this.dataAccess.findWithPagination(pagination)
                this.respondWithFoundResource(users, res)
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const currentUSer = req.user

        if(currentUSer && req.isAuthenticated()){
            const userId = req.params.id
            const userData = req.body
    
            try {
                const user = await this.dataAccess.findByIdAndUpdate(
                    userId, userData)
                
                if(user)
                    this.respondWithUpdatedResource(user.id, res)
                
                const userWithIncomingEmail = await this.dataAccess.findByEmail(userData.email)
                if(userWithIncomingEmail){
                    const updatedUser = await this.dataAccess.findByIdAndUpdate(
                        userWithIncomingEmail.id, userData
                    )
    
                    if(updatedUser)
                        this.respondWithUpdatedResource(updatedUser.id, res)
    
                } else {
                    const newUser = await this.dataAccess.createNew(userData)
                    this.respondWithCreatedResource(newUser.id, res)
                }
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
        }
    }   

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{

        const currentUSer = req.user
        
        if(currentUSer && req.isAuthenticated()){
            const userId = req.params.id
            const patchData: User = req.body
    
            try {
                const user = await this.dataAccess.findByIdAndUpdate(
                    userId, patchData)
                
                if(user)
                    this.respondWithModifiedResource(user.id, res)
                else
                    this.respondWithNotFound(res)
            } catch (error) {
                next(error)
            } 
        } else {
            this.respondWithUnauthorised(res)
        }
    }

    public deleteOne = async(req: Request, res: Response,next: NextFunction) =>{
        const currentUSer = req.user
        
        if(currentUSer && req.isAuthenticated()){
            const userId = req.params.id
    
            try {
                const deletedUser = await this.dataAccess.findByIdAndDelete(userId)
    
                if(deletedUser)
                    this.respondWithDeletedResource(deletedUser.id, res)
                else
                    this.respondWithNotFound(res)
            } catch (error) {
                next(error)
            }
        } else {
            this.respondWithUnauthorised(res)
        }
    }
}
