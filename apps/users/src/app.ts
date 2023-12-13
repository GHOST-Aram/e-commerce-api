import { routesWrapper } from "./routes/urls";
import { UsersDAL } from "./data-access/data-access";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { UsersController } from "./controller/controller";
import { app, connection } from "./config/config";
import { DB } from "./z-library/db/db";
import { userSchema } from "./data-access/model";
import { authenticator } from "./z-library/auth/auth";


const db = new DB(connection.switch('e-commerce-users'))
const UserModel = db.createModel('User', userSchema)

const usersDAL = new UsersDAL(UserModel)
const controller = new UsersController(usersDAL)

app.use('/users',routesWrapper(controller, authenticator))

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export { app }