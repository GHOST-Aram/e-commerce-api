import { NextFunction, Request, Response } from "express";

export const mockAuth = (req: Request, res: Response, next: NextFunction) =>{
    const user = {_id: '64c9e4f2df7cc072af2ac8d4', isAdmin: true}

    req.user = user
    req.isAuthenticated = () => Boolean(req.user)
    next()
}