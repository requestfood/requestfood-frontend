import { EstablishmentConsumableInfoComponent } from './components/establishment/consumable-info/consumable-info.component';
import { ClientConsumableInfoComponent } from './components/_client/consumable-info/consumable-info.component';
import { UserAlterPasswordComponent } from './components/user/user-update/user-alter-password/user-alter-password.component';
import { OrderStartComponent } from './components/_client/order-start/order-start.component';
import { EstablishmentProfileUpdateComponent } from './components/user/user-update/establishment/profile-update/profile-update.component';
import { ClientProfileUpdateComponent } from './components/user/user-update/_client/profile-update/profile-update.component';
import { ClientContactUpdateComponent } from './components/user/user-update/_client/contact-update/contact-update.component';
import { ClientComandasComponent } from './components/_client/client-comandas/client-comandas.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { HomeEstablishmentComponent } from './components/establishment/home-establishment/home-establishment.component';
import { ClientConsumableComponent } from './components/_client/client-consumable/client-consumable.component';
import { HomeClientComponent } from './components/_client/home-client/home-client.component';
import { CadastroEstablishmentComponent } from './components/establishment/cadastro/cadastro.component';
import { CadastroClientComponent } from './components/_client/cadastro/cadastro.component';
import { LoginComponent } from './components/user/login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateConsumableComponent } from './components/establishment/create-consumable/create-consumable.component';
import { CreateDishComponent } from './components/establishment/create-consumable/create-dish/create-dish.component';
import { CreateDrinkComponent } from './components/establishment/create-consumable/create-drink/create-drink.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'cadastroC',component: CadastroClientComponent},
  {path: 'cadastroE',component: CadastroEstablishmentComponent},
  {path: 'home-client/:id', component: HomeClientComponent},
  {path: 'consumables/:idEstablishment', component: ClientConsumableComponent},
  {path: 'home-establishment/:id',component: HomeEstablishmentComponent},
  {path: 'user-update', component: UserUpdateComponent, children: [
    {path: 'contact/:id', component: ClientContactUpdateComponent},
    {path: 'profile-client/:id', component: ClientProfileUpdateComponent},
    {path: 'profile-establishment/:id', component: EstablishmentProfileUpdateComponent},
    {path: 'password/:id', component: UserAlterPasswordComponent}
  ]},
  {path: 'comandasC/:id', component: ClientComandasComponent},
  {path: 'order-start/:idEstablishment', component: OrderStartComponent},
  {path: 'consumableC-info/:idEstablishment/:idConsumable', component: ClientConsumableInfoComponent},
  {path: 'consumableE-info/:idEstablishment/:idConsumable', component: EstablishmentConsumableInfoComponent},
  {path: 'onCadastrarConsumivel', component: CreateConsumableComponent},
  {path: 'createDish', component: CreateDishComponent},
  {path: 'createDrink', component: CreateDrinkComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
