import { createProxyMiddleware } from "http-proxy-middleware"

export const cartsProxy = createProxyMiddleware({
    target: 'http://localhost:3100',
    changeOrigin: true
})

export const ordersProxy = createProxyMiddleware({
    target: 'http://localhost:3200',
    changeOrigin: true
})

export const paymentsProxy = createProxyMiddleware({
    target: 'http://localhost:3300',
    changeOrigin: true
})

export const productsProxy = createProxyMiddleware({
    target: 'http://localhost:3400',
    changeOrigin: true
})

export const reviewsProxy = createProxyMiddleware({
    target: 'http://localhost:3500',
    changeOrigin: true
})

export const usersProxy = createProxyMiddleware({
    target: 'http://localhost:3600',
    changeOrigin: true
})

export const authProxy = createProxyMiddleware({
    target: 'http://localhost:3700',
    changeOrigin: true
})
