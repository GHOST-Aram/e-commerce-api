import { NextFunction, Request, Response } from "express";

export const mockAuth = (req: Request, res: Response, next: NextFunction) =>{
    if(req.body.customer){
        const user = {_id: req.body.customer, isAdmin: true }
        req.user = user
        req.isAuthenticated = () => Boolean(req.user)
        next()
    } else {
        res.status(401).json({ message: 'Unauthorised' })
    }
}