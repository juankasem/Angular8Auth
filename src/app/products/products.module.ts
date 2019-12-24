import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { DataTablesModule } from 'angular-datatables'; 

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
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
  ]
})
export class ProductsModule { }
