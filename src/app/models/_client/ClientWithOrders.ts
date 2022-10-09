export interface ClientOrders{
    id: number,
    ordersClient: OrderToClient[]
}

export interface OrderToClient{
    idOrder: number,
    imageEstablishment: string,
    nameEstablishment: string,
    orderStatus: string,
    issueDate: string
}