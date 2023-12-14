import { app } from "./config/config";
import { endpoints } from "./endpoints/endpoints";
import { httpErrors } from "./utils/http-errors";


app.use('/', endpoints)

app.use(httpErrors.handleUnknownUrls)
app.use(httpErrors.handleServerErrors)
