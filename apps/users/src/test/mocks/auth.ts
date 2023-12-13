import { NextFunction, Request, Response } from "express";
import { User } from "../../data-access/model";

const authenticate = () =>{

    return (req: Request, res: Response, next: NextFunction) =>{
        const user = new User({
            last_name: 'John',
            first_name: 'Does',
            email: 'johndoe@gmail.com',
            isAdmin: true
        })
        req.user = user
        req.isAuthenticated = () =>Boolean(req.user)
        next()
    }
} 

const allowAdminUser = (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user
    if(user.isAdmin){
        next()
    }
    else{
        res.status(403).json({ message: "Forbidden" })
    }
}

export const authenticator = { authenticate, allowAdminUser}