import express, { Application } from "express"
import cors from "cors"
import helmet from "helmet"
import logger from "morgan"

const app: Application = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
// app.use(logger('dev'))


export { app }
