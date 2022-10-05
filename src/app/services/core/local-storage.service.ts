import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public getUser(id: string): any {
    return this.storage.getItem(id)
  }

  public setUser(id:string, role: string){
    this.storage.setItem(id, role)
  }
  
}
