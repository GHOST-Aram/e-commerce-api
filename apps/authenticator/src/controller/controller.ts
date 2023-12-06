import { DataAccess } from "../data-access/data-access"


export class AuthController {

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        this.dal = dataAccess
    }

    
}