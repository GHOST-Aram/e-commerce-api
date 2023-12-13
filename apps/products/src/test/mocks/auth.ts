import { NextFunction, Request, Response } from "express";

const authenticate = () =>{
    return (req: Request, res: Response, next: NextFunction) =>{
        const user = {_id: '64c9e4f2df7cc072af2ac8d4', isAdmin: true}

        req.user = user
        req.isAuthenticated = () => Boolean(req.user)
        next()
    }
}

const allowAdminUser = (req: Request, res: Response, next: NextFunction) =>{
    const user: any = req.user
    if(user.isAdmin){
        next()
    } else {
        res.status(403).json({ message: "Forbidden" })
    }
}

export const authenticator = { authenticate, allowAdminUser }