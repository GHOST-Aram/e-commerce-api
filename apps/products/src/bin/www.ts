import mongoose from "mongoose"
import { app } from "../app"

const MONGODB_URI = process.env.PRODUCTS_DB_URI

if(MONGODB_URI){
    mongoose.connect(MONGODB_URI).then(
        (result: any) =>{
            console.log('Application connected to Products DB.')
        }
    ).catch((error: any) =>{
        console.log('Error connecting to Products DB: ', error.message)
    })
} else {
    console.log(' Cannot connect to Products DB. Connection String is Empty.')
}


const PORT = process.env.CARTS_PORT || 3400
app.listen(PORT, () => console.log(`Running Products on http://localhost:${PORT}`))