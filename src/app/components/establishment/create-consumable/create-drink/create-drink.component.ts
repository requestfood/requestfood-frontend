import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirm } from './../../../../models/core/dialog';
import { DialogConfirmComponent } from './../../../core/dialog-confirm/dialog-confirm.component';
import { UserService } from './../../../../services/User.service';
import { MessageService } from 'src/app/services/core/message.service';
import { ConsumableService } from 'src/app/services/ConsumableService.service';
import { Drink } from './../../../../models/consumables/drink';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-drink',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.css']
})
export class CreateDrinkComponent implements OnInit {

  currentTab: number = 0;

  uploadImage: File = new File(["foo"], "foo.txt", {
    type: "text/plain",
  })
  postResponse: any;
  successResponse: string = "";

  newDrink: Drink = {
    id: 0,
    idEstablishment: JSON.parse(this.userService.getUserAutenticado()).id,
    name: "",
    categoryDrink: "",
    price: null,
    description: "",
    image: File,
    alcoholic: false
  }

  constructor(
    private router: Router,
    private service: ConsumableService,
    private message: MessageService,
    private userService: UserService,
    private dialog: MatDialog,
    private http: HttpClient,
    private actRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  alterStep(n: number) {
    if (this.currentTab == 0 && n == -1)
      this.router.navigate(['onCadastrarConsumivel'])
    if (this.currentTab >= 0 && this.currentTab <= 2) {
      this.currentTab = this.currentTab + n;
    }
  }
  onCadastrarConsumivel() {
    this.router.navigate(['onCadastrarConsumivel'])
  }

  doRegister() {
    this.service.postDrink(this.newDrink).subscribe((data: any) => {
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
        } else
          this.router.navigate(['consumables/' + JSON.parse(this.userService.getUserAutenticado()).id])
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
    textSkip: "Pular. Obs: Será cadastrado uma imagem padrão.",
    textButton: "Concluir",
    typeObject: "DRINK",
    id: 0
  }

}
