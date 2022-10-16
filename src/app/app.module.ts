import { ItemInfoComponent } from './components/_client/order-start/bag-items/item-info/item-info.component';
import { HttpErrorInterceptor } from './components/core/interceptors/http-error.interceptor';
import { LoadingInterceptor } from './components/core/interceptors/loading.interceptor';
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
import { LoginComponent } from './components/user/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AppComponent } from './app.component';
import { PaginationComponent } from './components/core/pagination/pagination.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientComandasComponent } from './components/_client/client-comandas/client-comandas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClientContactUpdateComponent } from './components/user/user-update/_client/contact-update/contact-update.component';
import { ClientProfileUpdateComponent } from './components/user/user-update/_client/profile-update/profile-update.component';
import { EstablishmentProfileUpdateComponent } from './components/user/user-update/establishment/profile-update/profile-update.component';
import { ClientConsumableInfoComponent } from './components/_client/client-consumable/consumable-info/consumable-info.component';
import { DialogConfirmComponent } from './components/core/dialog-confirm/dialog-confirm.component';
import { LoadingComponent } from './components/core/loading/loading.component';
import { CreateDishComponent } from './components/establishment/create-consumable/create-dish/create-dish.component';
import { CreateDrinkComponent } from './components/establishment/create-consumable/create-drink/create-drink.component';
import { BagItemsComponent } from './components/_client/order-start/bag-items/bag-items.component';
import { UploadEstablishmentImageComponent } from './components/establishment/cadastro/upload-establishment-image/upload-establishment-image.component';
import { OrderDetailsComponent } from './components/_client/client-comandas/order-details/order-details.component';
import { ItemDetailsComponent } from './components/_client/client-comandas/order-details/item-details/item-details.component';
import { EstablishmentOrderComponent } from './components/establishment/establishment-order/establishment-order.component';
import { OrderCardComponent } from './components/establishment/establishment-order/order-card/order-card.component';
import { UpdateDishComponent } from './components/establishment/update-dish/update-dish.component';
import { UpdateDrinkComponent } from './components/establishment/update-drink/update-drink.component';
import { ImageComponent } from './components/core/image-register/image.component';

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
    EstablishmentProfileUpdateComponent,
    UserAlterPasswordComponent,
    ClientConsumableInfoComponent,
    DialogConfirmComponent,
    LoadingComponent,
    CreateDishComponent,
    CreateDrinkComponent,
    BagItemsComponent,
    ItemInfoComponent,
    UploadEstablishmentImageComponent,
    OrderDetailsComponent,
    ItemDetailsComponent,
    EstablishmentOrderComponent,
    OrderCardComponent,
    UpdateDishComponent,
    UpdateDrinkComponent
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS, 
    useClass: LoadingInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
