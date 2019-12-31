import { AccountService } from './../../services/account.service';
import { ProductService } from './../../services/product.service';
import { Observable, from } from 'rxjs';
import { Product } from './../../interfaces/product';
import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

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

  constructor(private accountService : AccountService,
              private productService : ProductService, 
              private modalService : BsModalService,
              private fb : FormBuilder,
              private chRef : ChangeDetectorRef,
              private router : Router) { }

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
       this.chRef.detectChanges();
       this.dtTrigger.next()
     });

    this.accountService.currentUserRole.subscribe(res =>{
      this.userRoleStatus = res;
    })
    
   //Modal message
   this.modalMessage = "All fields are mandatory";

   //Initialize Add Product properties
    let validateImageUrl : string = '^(https?:\/\/.*\.(?:png|jpg))$';

    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.description = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
    this.price = new FormControl('', [Validators.required, Validators.maxLength(150)]);
    this.imageUrl = new FormControl('', Validators.pattern(validateImageUrl));
     
    this.insertForm = this.fb.group({
      'name' : this.name,
      'description' : this.description,
      'price' : this.price,
      'imageUrl' : this.imageUrl,
      'outOfStock' : true
    });

    //Initialize Update product properties
    this.updatedName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.updatedDescription = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000)]);
    this.updatedPrice = new FormControl('', [Validators.required, Validators.maxLength(150)]);
    this.updatedImageUrl = new FormControl('', Validators.pattern(validateImageUrl));
    this.id = new FormControl();

    this.updateForm = this.fb.group({
      'id' : this.id,
      'updatedName' : this.updatedName,
      'updatedDescription' : this.updatedDescription,
      'updatedPrice' : this.updatedPrice,
      'updatedImageUrl' : this.updatedImageUrl,
      'outOfStock' : true
    });
  }

  onAddProduct()
  {
    this.modalRef = this.modalService.show(this.modal);  
  }

  onSubmit()
  {
    let newProduct = this.insertForm.value;

    this.productService.insertProduct(newProduct).subscribe(res =>{
         this.productService.clearCache();
         this.products$ = this.productService.getProducts();

         this.products$.subscribe(newList =>{
           this.products = newList;
           this.modalRef.hide();
           this.insertForm.reset();
           this.reRender();         
         });
         console.log("New Product added.")
    }, err =>{

    })
  }

  //Load the update modal
  onUpdateModal(product : Product) : void
  {
     this.id.setValue(product.productId);
     this.updatedName.setValue(product.name);
     this.updatedDescription.setValue(product.description);
     this.updatedPrice.setValue(product.price);
     this.updatedImageUrl.setValue(product.imageUrl);

     this.updateForm.setValue({
      'id' : this.id,
      'updatedName' : this.updatedName,
      'updatedDescription' : this.updatedDescription,
      'updatedPrice' : this.updatedPrice,
      'updatedImageUrl' : this.updatedImageUrl,
      'outOfStock' : true
    });

    this.modalRef = this.modalService.show(this.editModal);
  }

   //Update an existing product
  onUpdate()
  {
      let editedProduct = this.updateForm.value;
      this.productService.updateProduct(editedProduct.id, editedProduct).subscribe(res =>{
        console.log('product updated');
        this.productService.clearCache();
        this.products$ = this.productService.getProducts();
        this.products$.subscribe(updatedList =>{
            this.products = updatedList;
            this.modalRef.hide();
            this.reRender();
        });
      });
  }
  
  //method to delete Product
  onDelete(product : Product) : void
  {
    this.productService.deleteProduct(product.productId).subscribe(res =>{
      this.productService.clearCache();
      this.products$ = this.productService.getProducts();
      this.products$.subscribe(newList =>
        {
         this.products = newList;
         this.reRender();
      })
    })
  }
   
  //method to diplay product details
  onSelect(product : Product) : void
   {
     this.selectedProduct = product;
     this.router.navigateByUrl("/products/" + product.productId);
   }

  // We will use this method to destroy old table and re-render new table
   reRender(){
      this.dtElement.dtInstance.then((dtInstance : DataTables.Api) =>{
        
      // Destroy the table first in the current context
      dtInstance.destroy();
        
      // Call the dtTrigger to rerender again
      this.dtTrigger.next()
      })
   }
   
   ngOnDestroy()
   {
     //Unsbscribe from the dataTable
     this.dtTrigger.unsubscribe();
   }
}
