import { HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/services/core/message.service';
import { OrderService } from './../../../services/Order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/User.service';
import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/core/image.service';

@Component({
  selector: 'app-order-start',
  templateUrl: './order-start.component.html',
  styleUrls: ['./order-start.component.css']
})
export class OrderStartComponent implements OnInit {

  startedOrder: boolean = true

  currentEstablishment = this.service.getCurrentEstablishment();

  retrievedImage: any;

  constructor(
    private service: OrderService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private httpClient: HttpClient,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    if (!this.userService.isClient()) {
      this.router.navigate([''])
    } else if (this.currentEstablishment.id == 0)
      this.router.navigate(['home-client/' + JSON.parse(this.userService.getUserAutenticado()).id])

    this.getImage()
  }

  doCreateOrder() {
    if (this.userService.isClient()) {

      if (!localStorage.getItem('order')) {
        let order = {
          idEstablishment: this.currentEstablishment.id,
          idClient: JSON.parse(this.userService.getUserAutenticado()).id
        }

        this.service.postOrder(order)

          .subscribe(
            (data: any) => {
              this.service.setOrder(data)
              this.service.novaComanda.emit(data)
            })

        this.router.navigate(['/consumables/' + this.currentEstablishment.id])
      } else {
        this.messageService.add('Você precisa finalizar a comanda atual')
      }
    } else
      this.router.navigate(['']);
  }

  openMenu() {
    if (this.userService.isClient())
      this.router.navigate(['/consumables/' + this.currentEstablishment.id])
    else
      this.router.navigate(['']);
  }

  onBack() {
    if (this.userService.isClient()) {
      this.router.navigate(['/home-client/' + JSON.parse(this.userService.getUserAutenticado()).id]);
    } else
      this.router.navigate(['']);
  }

  getImage(){
    this.imageService.getImage(this.actRouter.snapshot.params['idEstablishment']).subscribe((res: any) => {
      let retrieveResonse = res;
      let base64Data = retrieveResonse.image;
      this.currentEstablishment.image = 'data:image/jpeg;base64,' + base64Data;
    })
  }
}
