import { Item } from "../data-access/model";

export const itemTotal = (
    cummulative: number, current: Item) =>{
        return cummulative + current.price * current.quantity
}