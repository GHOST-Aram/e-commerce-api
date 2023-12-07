import express, { Application } from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from 'morgan'

export class Server{

    private app:Application
    constructor(app: Application){
        this.app = app
    }

    public useJSONPayloads = () =>{
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())

    }

    public allowCrossOriginResourceSharing = () =>{
        this.app.use(cors())
    }

    public enforceSecurity = () =>{
        this.app.use(helmet())
    }

    public logRequestsandResponses = () =>{
        this.app.use(morgan('dev'))
    }

}