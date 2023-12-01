import mongoose from "mongoose"
import { app } from "../app"
import logger from "morgan"

const MONGODB_URI = process.env.ORDERS_DB_URI

if(MONGODB_URI){
    mongoose.connect(MONGODB_URI).then(
        (result: any) =>{
            console.log('Application connected to Orders DB.')
        }
    ).catch((error: any) =>{
        console.log('Error connecting to Orders DB: ', error.message)
    })
} else {
    console.log(' Cannot connect to Orders DB. Connection String is Empty.')
}


const PORT = process.env.CARTS_PORT || 3200
app.listen(PORT, () => console.log(`Running Orders on http://localhost:${PORT}`))
app.use(logger('dev'))
