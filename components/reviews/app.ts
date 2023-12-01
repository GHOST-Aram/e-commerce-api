import { ReviewsController } from "./controller/controller";
import { dataAccess } from "./data-access/data-access";
import { routesWrapper } from "./routes/urls";
import { app } from "./config/config";

const controller = new ReviewsController(dataAccess)

app.use('/reviews', routesWrapper(controller))

//Handle errors
app.use(controller.handleUnknownUrls)
app.use(controller.handleServerErrors)

export { app }
