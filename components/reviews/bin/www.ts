import mongoose from "mongoose"
import { app } from "../app"

const MONGODB_URI = process.env.REVIEWS_DB_URI

    if(MONGODB_URI){
        mongoose.connect(MONGODB_URI).then(
            (result: any) =>{
                console.log('Application connected to Reviews DB.')
            }
        ).catch((error: any) =>{
            console.log('Error connecting to Reviews DB: ', error.message)
        })
    } else {
        console.log(' Cannot connect to Reviews DB. Connection String is Empty.')
    }


const PORT = process.env.CARTS_PORT || 3500
app.listen(PORT, () => console.log(`Running Reviews on http://localhost:${PORT}`))