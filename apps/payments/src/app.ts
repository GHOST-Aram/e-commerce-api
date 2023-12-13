import { PayController } from "./controller/controller";
import { DataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { app, connection } from "./config/config";
import { authenticator } from "./z-library/auth/auth";
import { DB } from "./z-library/db/db";
import { paymentSchema } from "./data-access/model";


const dbConnection = connection.switch('e-commerce-payments')
const db = new DB(dbConnection)
const PaymentModel = db.createModel('Payment', paymentSchema)

const dataAccess = new DataAccess(PaymentModel)
const controller = new PayController(dataAccess)

app.use('/payments', routesWrapper(controller, authenticator))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export { app }