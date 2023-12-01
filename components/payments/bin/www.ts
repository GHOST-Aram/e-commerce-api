import mongoose from "mongoose"
import { app } from "../app"

const MONGODB_URI = process.env.PAYMENTS_DB_URI

    if(MONGODB_URI){
        mongoose.connect(MONGODB_URI).then(
            (result: any) =>{
                console.log('Application connected to Payments DB.')
            }
        ).catch((error: any) =>{
            console.log('Error connecting to Payments DB: ', error.message)
        })
    } else {
        console.log(' Cannot connect to Payments DB. Connection String is Empty.')
    }


const PORT = process.env.CARTS_PORT || 3300
app.listen(PORT, () => console.log(`Running Payments on http://localhost:${PORT}`))