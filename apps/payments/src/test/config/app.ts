import { PayController } from "../../controller/controller";
import { routesWrapper } from "../../routes/urls";
import express from 'express'
import { DataAccess } from "../mocks/data-access";
import { Payment } from "../../data-access/model";
import { authenticator } from "../mocks/auth";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const dataAccess = new DataAccess(Payment)
const controller = new PayController(dataAccess)

app.use('/payments', routesWrapper(controller, authenticator ))

export { app }