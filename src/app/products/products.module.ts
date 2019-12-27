import { JwtInterceptor } from './../_helpers/jwt.interceptor';
import { AuthGuardService } from './../guards/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { DataTablesModule } from 'angular-datatables'; 

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
   ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ]
})
export class ProductsModule { }
