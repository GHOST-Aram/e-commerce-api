import { NextFunction, Request, Response } from "express";

export const mockAuth = (req: Request, res: Response, next: NextFunction) =>{
    const user = {_id: req.body.customer }
    req.user = user
    next()
}