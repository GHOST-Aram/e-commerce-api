import { Response, Request } from "express";
import { UsersDAL } from "../data-access/data-access";
import { NextFunction } from "connect";
import { IUser } from "../data-access/model";
import { BaseController } from "../../../library/bases/controller";

export class UsersController extends BaseController{
    private dataAccess: UsersDAL

    constructor(dataAccessLayer: UsersDAL){
        super()
        this.dataAccess = dataAccessLayer
    }

    public AddNew = async(req: Request, res: Response, next: NextFunction) =>{
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
        const userId = req.params.id

        try {
            const user = await this.dataAccess.findById(userId)
            
            if(user === null)
                this.respondWithNotFound(res)
            else     
                this.respondWithFoundResource(user, res)
        } catch (error) {
            next(error)
        }
    }
    
    public getMany = async(req: Request, res: Response, next: NextFunction) =>{
        const pagination = this.paginate(req)

        try {
            const users = await this.dataAccess.findMany(pagination)
            this.respondWithFoundResource(users, res)
        } catch (error) {
            next(error)
        }
    }

    public updateOne = async(req: Request, res: Response, next: NextFunction) =>{
        const userId = req.params.id
        const userData = req.body

        try {
            const user = await this.dataAccess.findByIdAndUpdate(
                userId, userData)
            
            if(user)
                this.respondWithUpdatedResource(user.id, res)
            else{
                const newUser = await this.dataAccess.createNew(userData)
                this.respondWithCreatedResource(newUser.id, res)
            }
        } catch (error) {
            next(error)
        }
    }   

    public modifyOne = async(req: Request, res: Response, next: NextFunction) =>{
        const userId = req.params.id
        const patchData: IUser = req.body

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
    }

    public removeOne = async(req: Request, res: Response,next: NextFunction) =>{
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
    }
}
