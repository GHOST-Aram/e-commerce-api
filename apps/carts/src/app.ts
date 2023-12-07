import { CartsController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { app } from "./config/config";
import logger from "morgan"
import { authenticator } from "./z-library/auth/auth";
import passport from "passport";
import { NextFunction, Request, Response } from "express";
import 'dotenv/config'

//Log requests
app.use(logger('dev'))

//Authenticate
const secretOrKey = process.env.TOKEN_SECRET
const usersDBString = process.env.USERSDB_URI

if(secretOrKey && usersDBString){

    try {
        authenticator.setUpAuthentication(usersDBString, secretOrKey)
        app.use(passport.initialize())
    } catch (error) {
        console.log(error)
    }
} else {
    throw new Error(
        'Secret Key or User auth DB connection string is Undefined. '
        +'Please provide all of them in enviromnet variables')
}



const controller = new CartsController(dataAccess)
app.use('/carts', passport.authenticate('jwt', { session: false }), 
(req: Request, res: Response, next: NextFunction) =>{
    if(req.user){
        console.log(req.user)
        next()
    } else{
        res.status(403).json({message: 'Forbidden. Access denied.'})
    }
},
routesWrapper(controller))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export {app}