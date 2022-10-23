import { UserService } from './../../../services/User.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './../../core/dialog-confirm/dialog-confirm.component';
import { DialogConfirm } from './../../../models/core/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumableService } from 'src/app/services/ConsumableService.service';
import { ImageService } from 'src/app/services/core/image.service';
import { Component, OnInit } from '@angular/core';
import { delay, interval } from 'rxjs';

@Component({
  selector: 'app-consumable-info',
  templateUrl: './consumable-info.component.html',
  styleUrls: ['../../_client/client-consumable/consumable-info/consumable-info.component.css']
})
export class EstablishmentConsumableInfoComponent implements OnInit {

  role: string = ""

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private actRouter: ActivatedRoute,
    private consumableService: ConsumableService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  consumable = this.consumableService.getCurrentConsumable()

  getConsumableImage() {
    this.imageService.getImage('consumable', this.actRouter.snapshot.params['idConsumable']).subscribe((res: any) => {
      let retrieveResonse = res;
      let base64Data = retrieveResonse.image;
      this.consumable.image = 'data:image/jpeg;base64,' + base64Data;
    })
  }

  backPage() {
    this.router.navigate(['consumables/' + this.actRouter.snapshot.params['idEstablishment']])
  }

  removeConsumable() {
    const dialogData: DialogConfirm = {
      content: 'Realmente deseja deletar consumível ' + this.consumable.name + ' ?',
      confirmText: 'Sim',
      cancelText: 'Não'
    }

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: dialogData
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.consumableService.deleteConsumable(this.consumable.id).subscribe((res: any) => { })
        this.router.navigate(['consumables/' + JSON.parse(this.userService.getUserAutenticado()).id])
      }
    })
  }

  goToUpdateConsumable() {
    this.consumableService.getTypeConsumable(this.actRouter.snapshot.params['idConsumable']).subscribe((res: any) => {
      if (res.role == 'dish')
        this.router.navigate(['edit-dish/' + this.actRouter.snapshot.params['idEstablishment'] + '/' + this.actRouter.snapshot.params['idConsumable']])
      else
        this.router.navigate(['edit-drink/' + this.actRouter.snapshot.params['idEstablishment'] + '/' + this.actRouter.snapshot.params['idConsumable']])
    })
  }
}
