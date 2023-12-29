import { NextFunction, Response, Request } from "express"
import { DataAccess } from "../data-access/data-access"
import { HttpResponse } from "../z-library/HTTP/http-response"
import 'dotenv/config'
import { auth } from "../domain/authenticator"

export class AuthController extends HttpResponse {

    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        super()
        this.dataAccess = dataAccess
    }

    public signIn = async(req: Request, res: Response, next: NextFunction) =>{
        //Verify user details and issue authentication token
        const { email, password } = req.body

        const secretOrkey = process.env.TOKEN_SECRET

        try {
            if(secretOrkey){

                const user = await this.dataAccess.findUserByEmail(email)
                
                if(!user){
                    this.respondWithUnauthorised(res)
                } else {
                    const isValidPassword = auth.verifyPassword(user?.password, password)
    
                    if(!isValidPassword)
                        this.respondWithUnauthorised(res)
                } 
                
                const token = auth.issueToken({
                    email: user.email,
                    id: user._id ? user._id.toString() : user.id,
                }, secretOrkey )

                this.respondWithToken(token, res)  
            } else {
                throw new Error('Token secret not Found.')
            }
                
        } catch (error) {
            next(error)
            console.log(error)
        } 
    }
}