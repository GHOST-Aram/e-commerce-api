import { routesWrapper } from "./routes/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { ProductsController } from "./controller/controller";
import { ProductsDAL } from "./data-access/data-access";
import { app, connection } from "./config/config";


const dataAccess = new ProductsDAL(connection.switch('e-commerce-products'))
const controller = new ProductsController(dataAccess)

app.use('/products', routesWrapper(controller))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export { app }