import { OrderStatus } from './orderStatus';
export interface ClientOrders{
    id: number,
    ordersClient: OrderToClient[]
}

export interface OrderToClient{
    idOrder: number,
    imageEstablishment: string,
    nameEstablishment: string,
    orderStatus: OrderStatus,
    issueDate: string
}