import express from 'express'
import { endpoints } from "./endpoints/endpoints";
import { httpErrors } from "./utils/http-errors";
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))

app.use('/', endpoints)

app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export { app } 