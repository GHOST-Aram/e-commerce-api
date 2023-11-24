import { UsersDAL } from "../data-access/data-access";

export class UsersController{
    private dal: UsersDAL

    constructor(dataAccessLayer: UsersDAL){
        this.dal = dataAccessLayer
    }
}