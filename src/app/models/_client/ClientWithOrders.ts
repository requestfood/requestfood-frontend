export interface ClientOrders{
    id: number,
    ordersClient: Array<OrderToClient>
}

export interface OrderToClient{
    idOrder: number,
    imageEstablishment: string,
    nameEstablishment: string,
    orderStatus: string,
    issueDate: string
}