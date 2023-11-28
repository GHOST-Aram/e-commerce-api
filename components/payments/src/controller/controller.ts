import { DataAccess } from "../data-access/data-access"
export class Controller{

    private dal: DataAccess

    constructor(dataAccess: DataAccess){
        this.dal = dataAccess
    }
}