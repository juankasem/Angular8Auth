import { ProductService } from './../../services/product.service';
import { Observable, from } from 'rxjs';
import { Product } from './../../interfaces/product';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //For the adding product form
   insertForm : FormGroup;
   name : FormControl;
   price : FormControl;
   description : FormControl;
   imageUrl : FormControl;
  
  //For updating the product
  updateForm : FormGroup;
  id : FormControl;
  updatedName : FormControl;
  updatedPrice : FormControl;
  updatedDescription : FormControl;
  updatedImageUrl : FormControl;


   //Add Modal
   @ViewChild('template',{static : false}) modal : TemplateRef<any>;

   //Update Modal
   @ViewChild('editTemplate',{static : false}) editModal : TemplateRef<any>;
  

   //Modal Properties
   modalMessage : string;
   modalRef : BsModalRef;
   selectedProduct : Product;
   products$ : Observable<Product[]>;
   products : Product[] = [];
   userRoleStatus : string;

   //DataTable properties
   dtOptions : DataTables.Settings = {};
   dtTrigger : Subject<any> = new Subject();

   @ViewChild(DataTableDirective, {static : false}) dtElement : DataTableDirective;
  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType : 'full_numbers',
      pageLength : 5,
      autoWidth : true,
      order : [[0,'desc']]
    };

     this.products$ = this.productService.getProducts();
      this.products$.subscribe(res => {
       this.products = res;
       this.dtTrigger.next()
     })
  }
}
