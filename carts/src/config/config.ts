import express, { Application } from "express"
import cors from "cors"
import helmet from "helmet"


const app: Application = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())

export { app }

