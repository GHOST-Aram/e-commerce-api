import { ReviewsController } from "../../controller/controller";
import { dataAccess } from "../mocks/data-access";
import { routesWrapper } from "./urls";
import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const controller = new ReviewsController(dataAccess)

app.use('/reviews', routesWrapper(controller))

export { app }