import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/userService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-start',
  templateUrl: './order-start.component.html',
  styleUrls: ['./order-start.component.css']
})
export class OrderStartComponent implements OnInit {

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  openEstablishment() {
    this.router.navigate(['/consumablesC/' + this.activatedRoute.snapshot.params['idEstablishment']])
    console.log(this.activatedRoute.snapshot.params['idEstablishment']);
  }

}
