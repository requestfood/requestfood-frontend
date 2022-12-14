import { ImageService } from 'src/app/services/core/image.service';
import { UserService } from './../../../services/User.service';
import { Page } from '../../../models/core/page';
import { Component, OnInit, Input } from '@angular/core';
import { ConsumableCard, EstablishmentWithConsumables } from '../../../models/establishment/EstablishmentWithConsumables';
import { EstablishmentService } from '../../../services/EstablishmentService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumableService } from 'src/app/services/ConsumableService.service';


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

  alcoholic: string = "";

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

  constructor(
    private service: EstablishmentService,
    private userService: UserService,
    private actRouter: ActivatedRoute,
    private router: Router,
    private consumableService: ConsumableService,
    private imageService: ImageService
    ) { }

  ngOnInit(): void {
    this.getConsumables()
  }

  changePage(pageEvent: any) {

    switch (pageEvent.typeSearch) {

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
  getConsumables(page: number = 0) {
    this.service.getEstablishmentWithConsumables(this.actRouter.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
      this.establishmentWithConsumables = data;
      this.page = data.consumables;
      this.page.typeSearch = "";
      this.uploadImages(this.establishmentWithConsumables.consumables.content)
    })

    this.drink = false;
  }

  uploadImages(list: Array<any>) {

    for (let elemnt of list) {
      this.imageService.getImage('consumable', elemnt.id).subscribe((res: any) => {
        let retrieveResonse = res;
        let base64Data = retrieveResonse.image;
        elemnt.image = 'data:image/jpeg;base64,' + base64Data;
      })
    }
  }

  getConsumablePriceByDesc(page: number = 0) {
    switch (this.category) {
      case "dish":
        this.service.getAllDishByOrderByPriceByDesc(this.actRouter.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables
          this.page.typeSearch = "consumable_price_desc";
          this.uploadImages(this.establishmentWithConsumables.consumables.content)
        })
        break
      case "drink":
        this.service.getAllDrinkByOrderByPriceByDesc(this.actRouter.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables
          this.page.typeSearch = "consumable_price_desc";
          this.uploadImages(this.establishmentWithConsumables.consumables.content)
        })
        break
      default:
        this.service.getAllConsumableByOrderByPriceByDesc(this.actRouter.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables
          this.page.typeSearch = "consumable_price_desc";
          this.uploadImages(this.establishmentWithConsumables.consumables.content)
        })
    }
  }

  getConsumablePriceByAsc(page: number = 0) {
    switch (this.category) {
      case "dish":
        this.service.getAllDishByOrderByPriceByAsc(this.actRouter.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables
          this.page.typeSearch = "consumable_price_asc";
          this.uploadImages(this.establishmentWithConsumables.consumables.content)
        })
        break
      case "drink":
        this.service.getAllDrinkByOrderByPriceByAsc(this.actRouter.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables
          this.page.typeSearch = "consumable_price_asc";
          this.uploadImages(this.establishmentWithConsumables.consumables.content)
        })
        break
      default:
        this.service.getAllConsumableByOrderByPriceByAsc(this.actRouter.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables
          this.page.typeSearch = "consumable_price_asc";
          this.uploadImages(this.establishmentWithConsumables.consumables.content)
        })
    }
  }

  // Dish
  getDishes(page: number = 0) {
    this.service.getAllDish(this.actRouter.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
      this.establishmentWithConsumables = data;
      this.page = data.consumables;
      this.page.typeSearch = "dishes";
      this.uploadImages(this.establishmentWithConsumables.consumables.content)
    })

    this.drink = false;
  }

  // Drink
  getDrinks(page: number = 0) {
    this.service.getAllDrink(this.actRouter.snapshot.params['idEstablishment'], page).subscribe((data: EstablishmentWithConsumables) => {
      this.establishmentWithConsumables = data
      this.page = data.consumables
      this.page.typeSearch = "drinks";
      this.uploadImages(this.establishmentWithConsumables.consumables.content)
    })
    this.drink = true;
  }

  getAlcoholicDrink(alcoholic: boolean, page: number = 0) {
    this.service.getAllDrinkByAlcoholic(this.actRouter.snapshot.params['idEstablishment'], alcoholic, page).subscribe((data: EstablishmentWithConsumables) => {
      this.establishmentWithConsumables = data
      this.page = data.consumables
      this.uploadImages(this.establishmentWithConsumables.consumables.content)
    })
  }

  getConsumableByName(page: number = 0): boolean {
    if (this.searchName == "") {
      switch (this.category) {
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

    switch (this.category) {
      case "dish":
        this.service.getDishByName(this.actRouter.snapshot.params['idEstablishment'], this.searchName, page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables;
          this.page.typeSearch = "consumable_name";
          this.uploadImages(this.establishmentWithConsumables.consumables.content)
        })
        break
      case "drink":
        this.service.getDrinkByName(this.actRouter.snapshot.params['idEstablishment'], this.searchName, page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables;
          this.page.typeSearch = "consumable_name";
          this.uploadImages(this.establishmentWithConsumables.consumables.content)
        })
        break
      default:
        this.service.getConsumableByName(this.actRouter.snapshot.params['idEstablishment'], this.searchName, page).subscribe((data: EstablishmentWithConsumables) => {
          this.establishmentWithConsumables = data
          this.page = data.consumables;
          this.page.typeSearch = "consumable_name";
          this.uploadImages(this.establishmentWithConsumables.consumables.content)
        })
        break
    }

    return true;
  }

  // Select
  changeValue(value: string) {
    if (value == "minor")
      this.getConsumablePriceByAsc()
    if (value == "major")
      this.getConsumablePriceByDesc()

  }
  changeCategory(category: string) {
    if (category == "dish")
      this.getDishes()
    if (category == "drink")
      this.getDrinks()
    if (category == "all")
      this.getConsumables()
  }
  changeAlcoholic(alcoholic: string) {
    if (alcoholic == "yes")
      this.getAlcoholicDrink(true)
    if (alcoholic == "no")
      this.getAlcoholicDrink(false)
    if (alcoholic == "all")
      this.getDrinks()
  }

  openConsumable(currentConsumable: ConsumableCard) {
    this.consumableService.setCurrentConsumable(currentConsumable)

    if (this.userService.isClient()) {
      this.router.navigate(['consumableC-info/'+ this.establishmentWithConsumables.id +'/'+ currentConsumable.id])
    }else
    this.router.navigate(['consumableE-info/'+ this.establishmentWithConsumables.id +'/'+ currentConsumable.id])

  }
}
