import { CartsController } from "./controller/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { app, connection } from "./config/config";
import { authenticator } from "./z-library/auth/auth";
import { DB } from "./z-library/db/db";
import { cartSchema } from "./data-access/model";

const dbConnection = connection.switch('e-commerce-carts')
const db = new DB(dbConnection)

const CartModel = db.createModel('Cart', cartSchema)
const dataAccess  = new DataAccess(CartModel)
const controller = new CartsController(dataAccess)

app.use('/carts', routesWrapper(controller, authenticator))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export {app}