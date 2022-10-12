export interface OrderDetails{

    idOrder: Number,
    nameEstablishment: String,
    issueDate: string,
    items: Array<ItemDetails>,
    amount: number
}

export interface ItemDetails{

    idItem: number,
    nameConsumable: String,
    observation: String,
    quantity: Number,
    value: number
}