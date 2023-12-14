import { AuthController } from "../../controller/controller";
import { dataAccess } from "../mocks/data-access";
import { routesWrapper } from "../../routes/urls";
import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const controller = new AuthController(dataAccess)

app.use('/auth', routesWrapper(controller))

export { app }