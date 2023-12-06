import { jest } from "@jest/globals"
import { hash, hashSync } from "bcrypt"
import mongoose, { HydratedDocument, Schema } from "mongoose"


export class DataAccess{
    public findUserByEmail = jest.fn(async(email: string): Promise<HydratedDocument<any> | null> =>{
        if(email === 'correctEmail@gmail.com'){
            const password = 'CorrectPassword2030'

            const hashedPassword = await hash(password, 10)

            return new User({
                first_name: 'John',
                last_name: 'Doe',
                email: 'CorrectPassword2030',
                password: hashedPassword
            })
        } else{
            return null
        }
    })
}

const User = mongoose.model('User', new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
}))

export const dataAccess = new DataAccess()