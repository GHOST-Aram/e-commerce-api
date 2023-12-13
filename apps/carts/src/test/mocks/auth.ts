import { NextFunction, Request, Response } from "express";

const authenticate = () => {
    return (req: Request, res: Response, next: NextFunction) =>{
        if(req.body.customer){
            const user = {_id: req.body.customer, isAdmin: true }
            req.user = user
            req.isAuthenticated = () => Boolean(req.user)
            next()
        } else {
            res.status(401).json({ message: 'Unauthorised' })
        }
    }
}

const allowAdminUser = (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user

    if(user.isAdmin){
        next()
    } else{
        res.status(403).json({ message: 'Forbidden' })
    }
}

export const authenticator = { authenticate, allowAdminUser }

