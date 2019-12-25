import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path : '', component : HomeComponent, pathMatch: 'full'},
  { path : 'home', component : HomeComponent},
  { path : 'login', component: LoginComponent},
  { path : 'register', component : RegistrationComponent},
  { path : 'products', loadChildren: './products/products.module#ProductsModule'},
  { path : 'access-denied', component: AccessDeniedComponent },
  { path : '**', component : HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
