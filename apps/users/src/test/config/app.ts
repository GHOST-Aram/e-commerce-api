import { routesWrapper } from "./urls";
import { UsersDAL } from "../mocks/data-access";
import { UsersController } from "../../controller/controller";
import express from "express"
import { User } from "../../data-access/model";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const usersDAL = new UsersDAL(User)
const controller = new UsersController(usersDAL)
app.use('/users', routesWrapper(controller))

export { app }