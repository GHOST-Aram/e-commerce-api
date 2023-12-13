import { routesWrapper } from "../../routes/urls";
import { UsersDAL } from "../mocks/data-access";
import { UsersController } from "../../controller/controller";
import express from "express"
import { User } from "../../data-access/model";
import { authenticator } from "../mocks/auth";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const usersDAL = new UsersDAL(User)
const controller = new UsersController(usersDAL)
app.use('/users', routesWrapper(controller, authenticator))

export { app }