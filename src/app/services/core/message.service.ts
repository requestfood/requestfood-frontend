import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: string = ""
  
  constructor(private snackBar: MatSnackBar) {}

  add(newMessage: string, action = 'OK'){
    this.snackBar.open(newMessage, action) 
    
  }
}
