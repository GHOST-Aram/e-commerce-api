import { NextFunction, Response, Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import mongoose from "mongoose"
import passport, { DoneCallback } from "passport"
import {ExtractJwt, Strategy, } from 'passport-jwt'
import 'dotenv/config'


class Authenticator{
    
    public setUpAuthentication = (authDBUri: string, secretOrKey: string) =>{
        passport.use( new Strategy(
            {
                secretOrKey: secretOrKey,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            }, async(jwt_payload: JwtPayload, done: DoneCallback) =>{
                try {
                    await mongoose.connect(authDBUri) 

                    const user = mongoose.connection.db.collection('users')
                        .findOne({ id: jwt_payload.sub})

                    if(!user){
                        return done(null, false)
                    } else {
                        return done(null, user)
                    }
                } catch (error) {
                    return done(error, false)   
                } finally{
                    mongoose.connection.close()
                }
            }
        ))
        
    }

    public isAdminUser = (req: Request, res: Response, next: NextFunction) =>{
        const user:any = req.user
        if(user.isAdmin){
            next()
        } else {
            this.respondWithForbidden(res)
        }
    }

    public respondWithForbidden = (res: Response) =>{
        res.status(403).json({ message: 'Forbidden. Access denied'})
    }
}


export const authenticator = new Authenticator()