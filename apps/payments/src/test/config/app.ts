import { PayController } from "../../controller/controller";
import { dataAccess } from "../mocks/data-access";
import { routesWrapper } from "./urls";
import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const controller = new PayController(dataAccess)

app.use('/payments', routesWrapper(controller))

export { app }