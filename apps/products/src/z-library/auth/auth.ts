import { NextFunction, Response, Request, Application } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import mongoose from "mongoose"
import passport, { DoneCallback } from "passport"
import {ExtractJwt, Strategy, } from 'passport-jwt'
import 'dotenv/config'


class Authenticator{
    
    public configureStrategy = (authDBUri: string, secretOrKey: string) =>{
        passport.use( new Strategy(
            {
                secretOrKey: secretOrKey,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            }, async(jwt_payload: JwtPayload, done: DoneCallback) =>{
                try {
                    await mongoose.connect(authDBUri) 

                    const user = await mongoose.connection.db.collection('users')
                    .findOne({ email: jwt_payload.email})

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

    public initialize = (app:Application) =>{
        app.use(passport.initialize())
    }

    public authenticate = ( ) =>{
        return passport.authenticate('jwt',{ session: false})
    }

    public isAdminUser = (req: Request, res: Response, next: NextFunction) =>{
        const user:any = req.user
        if(user.isAdmin){
            next()
        } else {
            this.respondWithForbidden(res)
        }
    }

    private respondWithForbidden = (res: Response) =>{
        res.status(403).json({ message: 'Forbidden. Access denied'})
    }
}


export const authenticator = new Authenticator()