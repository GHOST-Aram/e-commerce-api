import express, { Application } from "express"
import cors from "cors"
import helmet from "helmet"
import { authenticator } from "../z-library/auth/auth"
import logger from "morgan"
import passport from "passport";

const app: Application = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())

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
        +'Please provide all of them in enviroment variables')
}

export { app }

