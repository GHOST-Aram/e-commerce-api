import { Response, Request } from "express";
import { UsersDAL } from "../data-access/data-access";
import { NextFunction } from "connect";
import { HydratedUserDoc, IUser } from "../data-access/model";
import { Paginator } from "../data-access/data-access";

export class UsersController{
    private dataAccess: UsersDAL

    constructor(dataAccessLayer: UsersDAL){
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
                this.respondWithCreatedResource(user, res)
            }
        } catch (error) {
            next(error)
        }
    }

    private respondWithConflict = (res: Response) =>{
        res.status(409).json({ message: 'User exists with same email' })
    }

    private respondWithCreatedResource = (resource: HydratedUserDoc, res: Response) =>{
        res.location(`/users/${resource.id}`)
        res.status(201).json({ message: 'Created' })
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

    private respondWithNotFound = (res: Response) =>{
        res.status(404).json({ message: 'User ID not found'})
    }

    private respondWithFoundResource = (
        resource: HydratedUserDoc[] | HydratedUserDoc, res: Response) =>{
            res.status(200).json({ resource: resource  })   
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

    private paginate = (req: Request): Paginator =>{
        const page = Number(req.query.page)
        const limit = Number(req.query.limit)
        const skipDocs = (page - 1) * limit

        if(!page || !limit){
            return { skipDocs: 0, limit: 10 }
        }

        return { skipDocs, limit }
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
                this.respondWithCreatedResource(newUser, res)
            }
        } catch (error) {
            next(error)
        }
    }   

    private respondWithUpdatedResource = (userId: string, res: Response) => {
        res.location(`/users/${userId}`)
        res.status(200).json({ message: 'Updated'})
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

    private respondWithModifiedResource = (userId: string, res: Response) => {
        res.location(`/users/${userId}`)
        res.status(200).json({ message: 'Modified'})
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

    private respondWithDeletedResource = (id: string, res: Response) =>{
        res.status(200).json({ message: 'deleted', id })
    }

    public respondWithMethodNotAllowed = (req: Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed'})
    }
}
