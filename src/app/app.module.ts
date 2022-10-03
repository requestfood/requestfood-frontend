import { UserAlterPasswordComponent } from './components/user/user-update/user-alter-password/user-alter-password.component';
import { CardComandaComponent } from './components/_client/client-comandas/card-comanda/card-comanda.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { HomeEstablishmentComponent } from './components/establishment/home-establishment/home-establishment.component';
import { CreateConsumableComponent } from './components/establishment/create-consumable/create-consumable.component';
import { HomeClientComponent } from './components/_client/home-client/home-client.component';
import { ClientConsumableComponent } from './components/_client/client-consumable/client-consumable.component';
import { CadastroClientComponent } from './components/_client/cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { CadastroEstablishmentComponent } from './components/establishment/cadastro/cadastro.component';
import { PrecoHeaderComponent } from './components/header-page/preco-header/preco-header.component';
import { MenuItemEstablishmentComponent } from './components/header-page/menu-item-establishment/menu-item-establishment.component';
import { MenuItemClientComponent } from './components/header-page/menu-item-client/menu-item-client.component';
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
import { HttpClientModule } from '@angular/common/http';
import { ClientComandasComponent } from './components/_client/client-comandas/client-comandas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClientContactUpdateComponent } from './components/user/user-update/_client/contact-update/contact-update.component';
import { ClientProfileUpdateComponent } from './components/user/user-update/_client/profile-update/profile-update.component';
import { EstablishmentContactUpdateComponent } from './components/user/user-update/establishment/contact-update/contact-update.component';
import { EstablishmentProfileUpdateComponent } from './components/user/user-update/establishment/profile-update/profile-update.component';
import { ClientConsumableInfoComponent } from './components/_client/consumable-info/consumable-info.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginationComponent,
    HeaderPageComponent,
    MenuItemClientComponent,
    MenuItemEstablishmentComponent,
    PrecoHeaderComponent,
    CadastroEstablishmentComponent,
    CadastroClientComponent,
    ClientConsumableComponent,
    HomeClientComponent,
    CreateConsumableComponent,
    HomeEstablishmentComponent,
    UserUpdateComponent,
    ClientComandasComponent,
    CardComandaComponent,
    ClientContactUpdateComponent,
    ClientProfileUpdateComponent,
    EstablishmentContactUpdateComponent,
    EstablishmentProfileUpdateComponent,
    UserAlterPasswordComponent,
    ClientConsumableInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule
  ],
  providers: [ClientService, EstablishmentService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
