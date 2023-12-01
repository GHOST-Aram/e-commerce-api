import mongoose from "mongoose"
import { app } from "../app"

const MONGODB_URI = process.env.USERS_DB_URI

    if(MONGODB_URI){
        mongoose.connect(MONGODB_URI).then(
            (result: any) =>{
                console.log('Application connected to Users DB.')
            }
        ).catch((error: any) =>{
            console.log('Error connecting to Users DB: ', error.message)
        })
    } else {
        console.log(' Cannot connect to DB. Connection String is Empty.')
    }


const PORT = process.env.CARTS_PORT || 3600
app.listen(PORT, () => console.log(`Running users on http://localhost:${PORT}`))