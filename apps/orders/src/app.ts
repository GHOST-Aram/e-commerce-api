import { OrdersController } from "./controller/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./test/config/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { app, connection } from "./config/config";
import { authenticator } from "./z-library/auth/auth";
import { DB } from "./z-library/db/db";
import { orderSchema } from "./data-access/model";

const dbConnection = connection.switch('e-commerce-orders')
const db = new DB(dbConnection)

const OrderModel = db.createModel('Order', orderSchema)

const dataAccess  = new DataAccess(OrderModel)
const controller = new OrdersController(dataAccess)

app.use('/orders',authenticator.authenticate(), routesWrapper(controller))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export { app }