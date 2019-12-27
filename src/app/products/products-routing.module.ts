import { AuthGuardService } from './../guards/auth-guard.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: ProductListComponent, canActivate: [AuthGuardService]},
  { path: 'product-list', component : ProductListComponent},
  { path : ':id', component : ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 
})
export class ProductsRoutingModule { }
