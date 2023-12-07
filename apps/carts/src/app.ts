import { CartsController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./test/config/urls";
import { httpErrors } from "./z-library/HTTP/http-errors";
import { app } from "./config/config";
import passport from "passport";
import 'dotenv/config'



const controller = new CartsController(dataAccess)
app.use('/carts', 
    passport.authenticate('jwt', { session: false }), 
    routesWrapper(controller)
)

//Handle errors -- Unknown path
app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)


export {app}