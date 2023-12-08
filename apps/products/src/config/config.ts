import express, { Application } from "express"
import { authenticator } from "../z-library/auth/auth"
import { Server } from "../z-library/server/server"
import 'dotenv/config'

const app: Application = express()
const server = new Server(app)

server.useJSONPayloads()
server.allowCrossOriginResourceSharing()
server.enforceSecurity()
server.logRequestsandResponses()

const dbUri = process.env.USERSDB_URI || ''
server.connectToDB(dbUri, 'Authentication')


const secretOrKey = process.env.TOKEN_SECRET
if(secretOrKey){
    authenticator.configureStrategy(secretOrKey)
    authenticator.initialize(app)
} else {
    console.log(
        'Secret Key is Undefined. '
        +'Please provide all of them in enviroment variables')
}

const PORT = Number(process.env.PRODUCTS_PORT) || 3400
server.listenToRequests(PORT, 'Products')

export { app }

