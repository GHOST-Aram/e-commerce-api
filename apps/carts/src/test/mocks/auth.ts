import { NextFunction, Request, Response } from "express";

export const mockAuth = (req: Request, res: Response, next: NextFunction) =>{
    if(req.body.customer){
        const user = {_id: req.body.customer }
        req.user = user
        next()
    } else {
        res.status(401).json({ message: 'Unauthorised' })
    }
}