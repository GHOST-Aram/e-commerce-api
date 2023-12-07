import express, { Application } from "express"
import { authenticator } from "../z-library/auth/auth"
import { Server } from "../z-library/server/server"

const app: Application = express()
const server = new Server(app)

server.useJSONPayloads()
server.allowCrossOriginResourceSharing()
server.enforceSecurity()
server.logRequestsandResponses()

//Authenticate
const secretOrKey = process.env.TOKEN_SECRET
const usersDBString = process.env.USERSDB_URI
try {
    if(secretOrKey && usersDBString){
        authenticator.configureStrategy(usersDBString, secretOrKey)
        authenticator.initialize(app)
    } else {
        throw new Error(
            'Secret Key or User auth DB connection string is Undefined. '
            +'Please provide all of them in enviroment variables')
    }
} catch (error: any) {
    console.log(error.message)
}

export { app }

