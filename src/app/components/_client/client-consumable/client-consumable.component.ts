import { Component, OnInit, Input } from '@angular/core';
import { Page } from 'src/app/models/page';
import { ConsumableCard, EstablishmentWithConsumables } from '../../../models/EstablishmentWithConsumables';
import { EstablishmentService } from '../../../services/establishmentService.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-client-consumable',
  templateUrl: './client-consumable.component.html',
  styleUrls: ['./client-consumable.component.css']
})
export class ClientConsumableComponent implements OnInit {

  searchName: string = "";

  value: string = "";
  category: string = "";
  drink: boolean = false;

  @Input()
  page: Page = {
    content: [],
    pageable: {
      sort: null,
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      paged: false,
      unpaged: false
    },
    last: false,
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    first: false,
    numberOfElements: 0,
    empty: false,
    typeSearch: ""
  }

  establishmentWithConsumables: EstablishmentWithConsumables = {
    id: 0,
    name: "",
    consumables: this.page
  }

  consumablesCard: ConsumableCard = {
    id: 0,
    name: "",
    image: null,
    price: 0,
    description: ""
  }

  constructor(private service: EstablishmentService, private router: ActivatedRoute) {}

  ngOnInit(): void {
      this.getConsumables()
  }

  changePage(pageEvent: any){

    switch (pageEvent.typeSearch){

      case "consumable_name":
        this.getConsumableByName(pageEvent.page);
        break;
      case "consumable_price_desc":
        this.getConsumablePriceByDesc(pageEvent.page);
        break;
      case "consumable_price_asc":
        this.getConsumablePriceByAsc(pageEvent.page);
        break;
      case "dishes":
        this.getDishes(pageEvent.page)
        break;
      case "drinks":
        this.getDrinks(pageEvent.page)
        break;
      default:
        this.getConsumables(pageEvent.page);
        break;
    }
  }

  // Consumable
  getConsumables(page: number = 0){
      this.service.getEstablishmentWithConsumables(this.router.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
        this.establishmentWithConsumables = data;
        this.page = data.consumables;
        this.page.typeSearch = "";
      })

      this.drink = false;
  }

  getConsumablePriceByDesc(page: number = 0){
      switch(this.category) {
        case "dish":
          this.service.getAllDishByOrderByPriceByDesc(this.router.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
            this.establishmentWithConsumables = data
            this.page = data.consumables
          this.page.typeSearch = "consumable_price_desc";
          })
          break
        case "drink":
          this.service.getAllDrinkByOrderByPriceByDesc(this.router.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
            this.establishmentWithConsumables = data
            this.page = data.consumables
          this.page.typeSearch = "consumable_price_desc";
          })
          break
        default:
          this.service.getAllConsumableByOrderByPriceByDesc(this.router.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
            this.establishmentWithConsumables = data
            this.page = data.consumables
          this.page.typeSearch = "consumable_price_desc";
          })
      }
  }

  getConsumablePriceByAsc(page: number = 0){
    switch(this.category) {
        case "dish":
          this.service.getAllDishByOrderByPriceByAsc(this.router.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
            this.establishmentWithConsumables = data
            this.page = data.consumables
          this.page.typeSearch = "consumable_price_asc";
          })
          break
        case "drink":
          this.service.getAllDrinkByOrderByPriceByAsc(this.router.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
            this.establishmentWithConsumables = data
            this.page = data.consumables
          this.page.typeSearch = "consumable_price_asc";
          })
          break
        default:
          this.service.getAllConsumableByOrderByPriceByAsc(this.router.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
            this.establishmentWithConsumables = data
            this.page = data.consumables
          this.page.typeSearch = "consumable_price_asc";
          })
      }
  }

  // Dish
  getDishes(page: number = 0){
    this.service.getAllDish(this.router.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
      this.establishmentWithConsumables = data;
      this.page = data.consumables;
      this.page.typeSearch = "dishes";
    })

    this.drink = false;
  }

  // Drink
  getDrinks(page: number = 0){
    this.service.getAllDrink(this.router.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
      this.establishmentWithConsumables = data
      this.page = data.consumables
      this.page.typeSearch = "drinks";
    })
    this.drink = true;
  }

  getConsumableByName(page: number = 0): boolean{
    if(this.searchName == ""){
      switch (this.category){
        case "dish":
          this.getDishes()
          break
        case "drink":
          this.getDrinks()
          break
        default:
          this.getConsumables(0)
          break
      }
      return false;
    }

    switch (this.category){
      case "dish":
        this.service.getDishByName(this.router.snapshot.params['idEstablishment'], this.searchName, page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables;
          this.page.typeSearch = "consumable_name";
        })
        break
      case "drink":
        this.service.getDrinkByName(this.router.snapshot.params['idEstablishment'], this.searchName, page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables;
          this.page.typeSearch = "consumable_name";
        })
        break
      default:
        this.service.getConsumableByName(this.router.snapshot.params['idEstablishment'], this.searchName, page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables;
          this.page.typeSearch = "consumable_name";
        })
        break
    }

    return true;
  }

  // Select
  changeValue(value: string){
    if(value == "minor")
      this.getConsumablePriceByAsc()
    if(value == "major")
      this.getConsumablePriceByDesc()

  }
  changeCategory(category: string){
    if(category == "dish")
      this.getDishes()
    if(category == "drink")
      this.getDrinks()
    if(category == "all")
      this.getConsumables()
  }
}
