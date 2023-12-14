import express, { Application } from "express"
import { Server } from "../z-library/server/server"
import 'dotenv/config'
import mongoose from "mongoose"

const app: Application = express()
const server = new Server(app)

server.useJSONPayloads()
server.allowCrossOriginResourceSharing()
server.enforceSecurity()
server.logRequestsandResponses()


const MONGODB_URI = process.env.USERSDB_URI

if(MONGODB_URI){
    mongoose.connect(MONGODB_URI).then(
        (result: any) =>{
            console.log('Application connected to Authentication DB.')
        }
    ).catch((error: any) =>{
        console.log('Error connecting to Authentication DB: ', error.message)
    })
} else {
    console.log(' Cannot connect to Authentication DB. Connection String is Empty.')
}


const PORT = Number(process.env.CARTS_PORT) || 3700
server.listenToRequests(PORT, 'Authenticator')

export { app }

