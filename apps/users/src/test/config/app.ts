import { routesWrapper } from "./urls";
import { UsersDAL } from "../mocks/data-access";
import { UsersController } from "../../controller/controller";
import express from "express"
import { User } from "../../data-access/model";
import { mockAuth } from "../mocks/auth";

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const usersDAL = new UsersDAL(User)
const controller = new UsersController(usersDAL)
app.use('/users',mockAuth, routesWrapper(controller))

export { app }