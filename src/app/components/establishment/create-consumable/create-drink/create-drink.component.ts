import { MatDialog } from '@angular/material/dialog';
import { DialogConfirm } from './../../../../models/core/dialog';
import { DialogConfirmComponent } from './../../../core/dialog-confirm/dialog-confirm.component';
import { UserService } from './../../../../services/User.service';
import { MessageService } from 'src/app/services/core/message.service';
import { ConsumableService } from 'src/app/services/ConsumableService.service';
import { Drink } from './../../../../models/consumables/drink';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-drink',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.css']
})
export class CreateDrinkComponent implements OnInit {

  currentTab: number = 0;
  
  newDrink: Drink = {
    id: 0,
    idEstablishment: JSON.parse(this.userService.getUserAutenticado()).id,
    name: "",
    categoryDrink: "",
    price: 0,
    description: "",
    image: null,
    alcoholic: false
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
    }else if (this.currentTab >= 0 && this.currentTab <= 3) {
      this.currentTab = this.currentTab + n;  
    }
  }
  onCadastrarConsumivel(){
     this.router.navigate(['onCadastrarConsumivel'])
    }

    doRegister(){
      this.service.postDrink(this.newDrink).subscribe(() => {
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
