import { routesWrapper } from "./routes/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { ProductsController } from "./controller/controller";
import { ProductsDAL } from "./data-access/data-access";
import { app, connection } from "./config/config";
import { productSchema } from "./data-access/model";
import { DB } from "./z-library/db/db";

const dbConnection = connection.switch('e-commerce-products')
const db = new DB(dbConnection)

const Product = db.createModel('Product', productSchema)
const dataAccess = new ProductsDAL(Product)
const controller = new ProductsController(dataAccess)

app.use('/products', routesWrapper(controller))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export { app }