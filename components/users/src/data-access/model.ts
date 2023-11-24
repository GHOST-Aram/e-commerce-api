import { compare, hash } from "bcrypt"
import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface IUser{
    first_name: string
    last_name: string
    email: string
    password: string
}

interface UserMethods{
    isValidPassword:(password: string) => Promise<boolean>
}

interface UserVirtuals{
    name: string
}

type UserModel = Model<IUser,{}, UserMethods, UserVirtuals>

const userSchema = new Schema<IUser, UserModel, 
UserMethods,{}, UserVirtuals>({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.virtual('name').get(function(){
    return `${this.first_name} ${this.last_name}`
})

userSchema.method('isValidPassword', 
    async function(password: string): Promise<boolean>{
        return await compare(password, this.password)
})

userSchema.pre('save', async function(){
    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword
})

export type HydratedUserDoc = HydratedDocument<IUser, 
UserMethods & UserVirtuals>

export const User: UserModel = model<IUser, UserModel>(
    'User', userSchema)