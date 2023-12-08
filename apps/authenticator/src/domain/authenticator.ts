import { compareSync } from "bcrypt"
import jwt from 'jsonwebtoken'


export class Authenticator{

    public verifyPassword = (savedPassword: string, incomingPassword: string): boolean =>{
        return compareSync(incomingPassword, savedPassword)
    }

    public issueToken = (user: User, secretOrkey: string): string =>{
        return jwt.sign({
            email: user.email,
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
}

export const auth = new Authenticator