import { Page } from 'src/app/models/core/page';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: 'pagination.component.html', 
  styleUrls:['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    
    @Input("page") public set value(page: Page){
       this.page = page;
    }
    
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
    };

    
    @Output() 
    public paginationEvent: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {}

    changePage(p: Number){
      if(this.page.pageable.pageNumber <= this.page.totalPages && this.page.pageable.pageNumber >= 0){
        this.page.pageable.pageNumber = this.page.pageable.pageNumber + p;
      }
      this.paginationEvent.emit({page: this.page.pageable.pageNumber, typeSearch: this.page.typeSearch});
    }
}