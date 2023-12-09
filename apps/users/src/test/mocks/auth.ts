import { NextFunction, Request, Response } from "express";
import { User } from "../../data-access/model";

export const mockAuth = (req: Request, res: Response, next: NextFunction) =>{
    const user = new User({
        last_name: 'John',
        first_name: 'Does',
        email: 'johndoe@gmail.com'
    })
    req.user = user
    req.isAuthenticated = () =>Boolean(req.user)
    next()
}