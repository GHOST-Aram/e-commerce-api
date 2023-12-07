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
}


export const authenticator = new Authenticator()