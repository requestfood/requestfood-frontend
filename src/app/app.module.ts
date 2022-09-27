import { HeaderPageComponent } from './components/header-page/navbar/header-page.component';
import { UserService } from './services/userService.service';
import { EstablishmentService } from './services/establishmentService.service';
import { ClientService } from 'src/app/services/clientService.service';
import { LoginComponent } from './components/user/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginationComponent,
    HeaderPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ClientService, EstablishmentService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
