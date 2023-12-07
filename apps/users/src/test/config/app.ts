import { routesWrapper } from "./urls";
import { usersDAL } from "../mocks/data-access";
import { UsersController } from "../../controller/controller";
import express from "express"

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const controller = new UsersController(usersDAL)
app.use('/users', routesWrapper(controller))

export { app }