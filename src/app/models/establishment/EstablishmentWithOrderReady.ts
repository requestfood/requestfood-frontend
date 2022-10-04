
export interface EstablishmentWithOrderReady{

    id: number,
    name: string,
    ordersFinised: Array<OrderReady>;

}

export interface OrderReady{

    idOrder: number,
    nameClient: string,
    closingDate: string
}