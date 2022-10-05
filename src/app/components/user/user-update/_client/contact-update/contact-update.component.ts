import { catchError, empty, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../../../services/userService.service';
import { ContactUpdate } from '../../../../../models/user/UserUpdate';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ClientContactUpdateComponent implements OnInit {

  currentContactUpdate: ContactUpdate = {
    phone: "",
    email: ""
  }

  newContactUpdate: ContactUpdate = {
    phone: "",
    email: ""
  }

  constructor(
    private userService: UserService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.getContact(this.router.snapshot.params['id']).subscribe((data: any) => {
      this.currentContactUpdate = data
    });
  }

  doSave() {
    if (this.newContactUpdate.email == "")
      this.newContactUpdate.email = this.currentContactUpdate.email
    else if (this.newContactUpdate.phone == "")
      this.newContactUpdate.phone = this.currentContactUpdate.phone

    this.userService.updateContact(this.newContactUpdate, this.router.snapshot.params['id'])
      .pipe(
        catchError(err => {
          if (err.error.text == undefined)
            alert(err.error.message)
          else
            alert(err.error.text)

          return of();
        })
      )
      .subscribe(data => { })


  }

}
