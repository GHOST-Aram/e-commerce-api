import { Router } from "express";
import * as proxies from "../proxies/proxy-config"

const endpoints = Router()

endpoints.use('/carts', proxies.cartsProxy)
endpoints.use('/orders', proxies.ordersProxy)
endpoints.use('/payments', proxies.paymentsProxy)
endpoints.use('/products', proxies.productsProxy)
endpoints.use('/users', proxies.usersProxy)
endpoints.use('/auth', proxies.authProxy)

export { endpoints } 