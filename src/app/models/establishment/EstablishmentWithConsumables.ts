import { Time } from "@angular/common"
import { Page } from "../core/page"

export interface EstablishmentWithConsumables{

    id: number,
    name: string,
    consumables: Page;

}

export interface ConsumableCard{

    id: number,
    image: any,
    name: string,
    price: number,
    description: string
}