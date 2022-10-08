export interface OrderDetails{

    idOrder: Number,
    nameEstbalishment: String,
    IssueDate: String,
    items: Array<ItemDetails>,
    amount: number
}

export interface ItemDetails{

    nameConsumable: String,
    observation: String,
    quantity: Number,
    value: number
}