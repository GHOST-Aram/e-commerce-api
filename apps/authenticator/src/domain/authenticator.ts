import { compareSync } from "bcrypt"
import jwt from 'jsonwebtoken'


export class Authenticator{

    public verifyPassword = (savedPassword: string, incomingPassword: string): boolean =>{
        return compareSync(incomingPassword, savedPassword)
    }

    public issueToken = (user: User, secretOrkey: string): string =>{
        return jwt.sign({
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            isAdmin: user.isAdmin
        }, 
        secretOrkey, 
        
        {
            expiresIn: '30d',
            subject: user.id
        })
    }
}

interface User{
    id: string
    email: string
    first_name: string
    last_name: string
    isAdmin: boolean
}

export const auth = new Authenticator