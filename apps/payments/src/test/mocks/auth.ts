import { NextFunction, Response, Request } from "express";

export const mockAuth = (req: Request, res: Response, next:NextFunction) =>{
    const user = {_id: '64c9e4f2df7cc072af2ac9e8', isAdmin: true }

    req.user = user
    next()
}