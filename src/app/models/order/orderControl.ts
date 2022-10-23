import { ItemDetails } from './OrderDetails';

export interface OrderControl{
    idOrder: number,
    name: string,
    surname: string
    amount: number,
    items: Array<ItemDetails>
}