import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './../../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from './../../../../models/core/dialog';
import { UserService } from './../../../../services/User.service';
import { MessageService } from 'src/app/services/core/message.service';
import { ConsumableService } from 'src/app/services/ConsumableService.service';
import { Dish } from './../../../../models/consumables/dish';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.css']
})
export class CreateDishComponent implements OnInit {

  currentTab: number = 0;

  newDish: Dish = {
    id: 0,
    idEstablishment: JSON.parse(this.userService.getUserAutenticado()).id,
    name: "",
    categoryDish: "",
    price: 0,
    description: "",
    image: null
  }

  constructor(
    private router: Router,
    private service: ConsumableService,
    private message: MessageService,
    private userService: UserService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }
  
  alterStep(n: number) {
    if (this.currentTab == 0 && n == -1){
      this.router.navigate(['onCadastrarConsumivel'])
    }
    else if (this.currentTab >= 0 && this.currentTab <= 3) {
      this.currentTab = this.currentTab + n;
    }
  }

  doRegister(){
    this.service.postDish(this.newDish).subscribe(() => {
      const dialogData: DialogConfirm = {
        content: 'Deseja cadastrar uma imagem?',
        confirmText: 'Sim',
        cancelText: 'Não'
      }
  
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        data: dialogData
      })
  
      dialogRef.afterClosed().subscribe(result => {
  
        if (result) {
          this.currentTab = 3;
        }else
          this.router.navigate(['consumables/' + JSON.parse(this.userService.getUserAutenticado()).id])
      })

      this.message.add('Consumable registered succesfully')
    })
  }

}