import { Router } from "express";
import * as proxies from "../proxy-config/proxy-config"

const endpoints = Router()

endpoints.use('/carts', proxies.cartsProxy)
endpoints.use('/orders', proxies.ordersProxy)
endpoints.use('/payments', proxies.paymentsProxy)
endpoints.use('/products', proxies.productsProxy)
endpoints.use('/users', proxies.usersProxy)

export { endpoints } 