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
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    email: user.email,
                    id: user._id ? user._id.toString() : user.id,
                    isAdmin: user?.isAdmin
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

    private respondWithUnauthorised = (res: Response) =>{
        res.status(401).json({message: 'Unauthorised'})
    }

    private respondWithToken = (token: string, res: Response) =>{
        res.status(200).json({ token })
    }
    
}