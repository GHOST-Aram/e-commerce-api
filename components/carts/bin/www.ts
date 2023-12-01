import mongoose from "mongoose"
import { app } from "../app"
import logger from "morgan"

const MONGODB_URI = process.env.CARTS_DB_URI

if(MONGODB_URI){
    mongoose.connect(MONGODB_URI).then(
        (result: any) =>{
            console.log('Application connected to Carts DB.')
        }
    ).catch((error: any) =>{
        console.log('Error connecting to Carts DB: ', error.message)
    })
} else {
    console.log(' Cannot connect to Carts DB. Connection String is Empty.')
}

const PORT = process.env.CARTS_PORT || 3100
app.listen(PORT, () => console.log(`Running Carts on http://localhost:${PORT}`))
app.use(logger('dev'))