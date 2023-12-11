import { ReviewsController } from "../../controller/controller";
import { Review } from "../../data-access/model";
import { DataAccess } from "../mocks/data-access";
import { routesWrapper } from "./urls";
import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const dataAccess = new DataAccess(Review)
const controller = new ReviewsController(dataAccess)

app.use('/reviews', routesWrapper(controller))

export { app }