import { Response, Request } from "express";
import { UsersDAL } from "../data-access/data-access";
import { NextFunction } from "connect";
import { validationResult } from "express-validator";
import { HydratedUserDoc, IUser } from "../data-access/model";
import { isValidObjectId } from "mongoose";

export class UsersController{
    private dal: UsersDAL

    constructor(dataAccessLayer: UsersDAL){
        this.dal = dataAccessLayer
    }

    public AddNewUser = async(
        req: Request, res: Response, next: NextFunction) =>{
            
            const userData = req.body
            try {
                const user = await this.dal.findUserByEmail(
                    userData.email)

                if(user)
                    this.respondWithConflict(res)
                else {
                    const user = await this.dal.createNewUser(
                        userData)
                    this.respondWithCreatedResource(user, res)
                }
            } catch (error) {
                next(error)
            }
    }

    private respondWithConflict = (res: Response) =>{
        res.status(409).json(
            { message: 'User exists with same email' })
    }

    private respondWithCreatedResource = (
        resource: HydratedUserDoc, res: Response
        ) =>{
            res.location(`/users/${resource.id}`)
            res.status(201).json({
                message: 'Created',
                user: resource
            })
    }

    public getOneUser = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const userId = req.params.id

            try {
                const user = await this.dal.findUserById(userId)
                
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
    
    public getMultipleUsers = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const pagination = this.paginate(req)

            try {
                const users = await this.dal.findMultipleUsers(
                    pagination)
                this.respondWithFoundResource(users, res)
            } catch (error) {
                next(error)
            }
    }

    private respondWithFoundResource = (
        resource: HydratedUserDoc[] | HydratedUserDoc, 
        res: Response) =>{
            res.status(200).json({ resource: resource  })   
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

    public modifyOneUser = async(
        req: Request, res: Response, next: NextFunction) =>{
            const userId = req.params.id


            const patchData: IUser = req.body
            try {
                const user = await this.dal.findUserByIdAndUpdate(
                    userId, patchData)
                
                if(user)
                    this.respondWithChangedResource(
                        user.id,'Modified', res)

                this.respondWithNotFound(res)
            } catch (error) {
                next(error)
            } 

    }

    public updateOneUser = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const userId = req.params.id


            const userData = req.body
            try {
                const user = await this.dal.findUserByIdAndUpdate(
                    userId, userData)
                
                if(user)
                    this.respondWithChangedResource(
                        user.id, 'Updated', res)
                
                const newUser = await this.dal.createNewUser(userData)
                this.respondWithCreatedResource(newUser, res)
            } catch (error) {
                next(error)
            }
    }   

    private respondWithChangedResource = (
        userId: string, change:string, res: Response) => {
            res.location(`/users/${userId}`)
            res.status(200).json({ message: change})
    }

    public removeOneUser = async(
        req: Request, res: Response,next: NextFunction) =>{
            const userId = req.params.id

            try {
                const deletedUser = await this.dal.findUserByIdAndDelete(
                    userId)
                if(deletedUser)
                    this.respondWithDeletedResource(
                    deletedUser.id, res)
                
                this.respondWithNotFound(res)
            } catch (error) {
                next(error)
            }
    }

    private respondWithDeletedResource = (
        id: string, res: Response) =>{
            res.status(200).json({
                message: 'deleted',
                id: id
            })
    }

    public respondWithMethodNotAllowed = (req: Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed'})
    }

    public handleValidationErrors = (
        req: Request, res: Response, next: NextFunction) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({
                    message: 'Invalid input',
                    errors: errors.array()
                })
            } else{
                next()
            }
    }
}

export interface Paginator{
    skipDocs: number,
    limit: number
}
