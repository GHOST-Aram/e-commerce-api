import mongoose from "mongoose"

export class Connection {

    private initialConnection: mongoose.Connection

    constructor(intialDbUri: string){
        this.initialConnection = mongoose.createConnection(intialDbUri)
        
    }

    public getInitial = (): mongoose.Connection =>{
        return this.initialConnection
    }

    public switch = (newdBName: string): mongoose.Connection =>{
        return this.initialConnection.useDb(newdBName)
    }
}