import { compare, hash } from "bcrypt"
import { HydratedDocument, Model, Schema, model } from "mongoose"

export interface IUser{
    first_name: string
    last_name: string
    email: string
    password: string
    isAdmin: boolean
}

interface UserMethods{
    isValidPassword:(password: string) => Promise<boolean>
}

interface UserVirtuals{
    name: string
}

type UserModel = Model<IUser,{}, UserMethods, UserVirtuals>

const userSchema = new Schema<IUser, UserModel, UserMethods,{}, UserVirtuals>({
    first_name: {
        type: String,
        minlength: 2,
        maxlength: 100,
        required: true
    },
    last_name:{
        type: String,
        minlength: 2,
        maxlength: 100,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 200,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 24,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
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

export type HydratedUserDoc = HydratedDocument<IUser, UserMethods & UserVirtuals>

export const User: UserModel = model<IUser, UserModel>(
    'User', userSchema)