import { Response, Request } from "express";
import { UsersDAL } from "../data-access/data-access";
import { NextFunction } from "connect";
import { validationResult } from "express-validator";
import { HydratedUserDoc } from "../data-access/model";
import { isValidObjectId } from "mongoose";

export class UsersController{
    private dal: UsersDAL

    constructor(dataAccessLayer: UsersDAL){
        this.dal = dataAccessLayer
    }

    public AddNewUser = async(
        req: Request, res: Response, next: NextFunction) =>{
            this.handleValidationErrors(req, res)
            
            const userData = req.body
            try {
                const user = await this.dal.findUserByEmail(userData.email)
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

    private handleValidationErrors = (
        req: Request, res: Response) =>{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                res.status(400).json({
                    message: 'Invalid input',
                    errors: errors.array()
                })
            }
    }

    private respondWithConflict = (res: Response) =>{
        res.status(409).json(
            {message: 'User exists with same email'})
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

    public getMultipleUsers = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const pagination = this.paginate(req)

            try {
                const users = await this.dal.findMultipleUsers(
                    pagination)
                res.status(200).json({ users  })
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

    public getOneUser = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const userId = req.params.id
            this.handleInvalidId(userId, res)

            try {
                const user = await this.dal.findUserById(userId)
                if(!user)
                    res.status(404).json(
                        { message: 'User not found'})
                        
                res.status(200).json({ user })
            } catch (error) {
                next(error)
            }
    }

    private handleInvalidId = (id: string, res: Response) =>{
        if(!isValidObjectId(id))
            res.status(400).json({ message: 'Invalid user id'})
    }

    public updateAllUsers = (req: Request, res: Response) =>{
        res.status(405).json({ message: 'Method not allowed'})
    }

    public updateOneUser = async(
        req: Request, res: Response, next: NextFunction
        ) =>{
            const userId = req.params.id
            this.handleInvalidId(userId, res)

            this.handleValidationErrors(req, res)

            const userData = req.body
            try {
                const user = await this.dal.findUserByIdAndUpdate(
                    userId, userData)
                
                if(user)
                    this.respondWithUpdatedResource(user.id, res)
                
                const newUser = await this.dal.createNewUser(userData)
                this.respondWithCreatedResource(newUser, res)
            } catch (error) {
                next(error)
            }
    }   

    private respondWithUpdatedResource = (
        userId: string, res: Response) => {
            res.location(`/users/${userId}`)
            res.status(200).json({ message: 'Updated'})
    }

    private respondWith404Error = (res: Response) =>{
        res.status(404).json({ message: 'User ID not found'})
    }
}

export interface Paginator{
    skipDocs: number,
    limit: number
}