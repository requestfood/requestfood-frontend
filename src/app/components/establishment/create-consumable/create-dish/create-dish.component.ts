import { ItemDetails } from './../../../../models/order/OrderDetails';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './../../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from './../../../../models/core/dialog';
import { UserService } from './../../../../services/User.service';
import { MessageService } from 'src/app/services/core/message.service';
import { ConsumableService } from 'src/app/services/ConsumableService.service';
import { Dish } from './../../../../models/consumables/dish';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.css']
})
export class CreateDishComponent implements OnInit {

  currentTab: number = 0;
  
  uploadImage: File = new File(["foo"], "foo.txt", {
    type: "text/plain",
  })
  postResponse: any;
  successResponse: string = "";

  newDish: Dish = {
    id: 0,
    idEstablishment: JSON.parse(this.userService.getUserAutenticado()).id,
    name: "",
    categoryDish: "",
    price: null,
    description: "",
    image: File
  }

  constructor(
    private router: Router,
    private service: ConsumableService,
    private message: MessageService,
    private userService: UserService,
    private dialog: MatDialog,
    private actRouter: ActivatedRoute,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
  }
  
  alterStep(n: number) {
    if (this.currentTab >= 0 && this.currentTab <= 2) {
      this.currentTab = this.currentTab + n;
    }
  }

  doRegister(){
    this.service.postDish(this.newDish).subscribe((data: any) => {
      const dialogData: DialogConfirm = {
        content: 'Deseja cadastrar uma imagem?',
        confirmText: 'Sim',
        cancelText: 'Não'
      }
  
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: dialogData
      })
  
      dialogRef.afterClosed().subscribe((result: any) => {
  
        if (result) {
          this.textOptionsImage.id = data.id
          this.onRegisterImage = true
        }else
          this.router.navigate(['consumableE-info/' + JSON.parse(this.userService.getUserAutenticado()).id + '/' + data.id])
      })

      this.message.add('Consumable registered succesfully')
    })
  }

  public onFileSelected(event: any) {
    this.uploadImage = event.target.files[0];
  }

  onRegisterImage: boolean = false

  textOptionsImage: any = {
    title: "Insira a imagem para seu novo consumível",
    textSkip: "Pular",
    textButton: "Concluir",
    typeObject: "DISH",
    id: 0
  }

}