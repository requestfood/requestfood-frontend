import { finalize } from 'rxjs';
export interface EstablishmentWithOrder{
id: number,
orders: Array<OrderWithDate>
}

export interface OrderWithDate{
    idOrder: number,
    nameClient: string,
    IssueDate: string,
    closingDate: string,
    status: string
}