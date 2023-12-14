import express, { Application } from "express"
import { Server } from "../z-library/server/server"
import 'dotenv/config'

const app: Application = express()
const server = new Server(app)

server.useJSONPayloads()
server.allowCrossOriginResourceSharing()
server.enforceSecurity()
server.logRequestsandResponses()

const PORT = Number(process.env.CARTS_PORT) || 5000
server.listenToRequests(PORT, 'Gateway')

export { app }

