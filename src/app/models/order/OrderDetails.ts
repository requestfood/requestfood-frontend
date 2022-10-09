export interface OrderDetails{

    idOrder: Number,
    nameEstablishment: String,
    IssueDate: String,
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