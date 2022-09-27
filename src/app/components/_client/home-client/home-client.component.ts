import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clientService.service';
import { EstablishmentCard } from '../../../models/establishmentCard';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Page } from 'src/app/models/page';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent implements OnInit {

  establishments: Array<EstablishmentCard> = [];
  
  searchName: string = "";

  ativoSearchByName: boolean = false;
  
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
    typeSearch: "default"
  }

  establishmentCard: EstablishmentCard = {
    id: 0,
    name: "",
    image: null
  }

  constructor(private service: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.getEstablishments()
  }

  getEstablishments(page: number = 0): void {
    this.ativoSearchByName = false
    
    this.service.getEstablishmentsHome(page).subscribe((data: Page) => {
      this.page = data
      this.establishments = data.content;
    })
  }

  changePage(pageEvent: any){

    if(this.ativoSearchByName)  
      this.searchByName(pageEvent.page);
    else{
      this.getEstablishments(pageEvent.page);
    }
  }


  searchByName(page: number = 0): any{

    this.ativoSearchByName = true
    
    if(this.searchName == ""){
      this.getEstablishments(0)
      return false;
    }
    
    this.service.getEstablishmentByName(this.searchName, page).subscribe((data: Page) => {
      this.page = data;
      this.establishments = data.content
    })
    return true;
  }

  openEstablishment(idEstablishment: number) {
    this.router.navigate(['/consumablesC/' + idEstablishment])
    console.log(idEstablishment);
  }
}
