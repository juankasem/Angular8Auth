import { Product } from '../interfaces/product';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {flatMap, first, shareReplay} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient) { }

   private baseUrl : string = "/api/product/getProducts";
   private addProductUrl : string = "/api/product/addProduct";
   private updateProductUrl: string = "api/product/updateProduct/";
   private deleteProductUrl : string ="api/product/deleteProduct/";

   private products$ : Observable<Product[]>;

   getProducts() : Observable<Product[]>
   {
     if (!this.products$)
     {
      this.products$ = this.http.get<Product[]>(this.baseUrl).pipe(shareReplay());
     }
     
     //if products exist in cache then return it
     return this.products$;
   }

   //get product by its id
   getProductById(id : number) : Observable<Product>
   {
     return this.getProducts().pipe(flatMap(result => result), first(product => product.productId == id))
   }

   //insert product
   insertProduct(product : Product) : Observable<Product>
   {
     return this.http.post<Product>(this.addProductUrl, product);
   }
   //update product
   updateProduct(id : number, product : Product) : Observable<Product>
    {
      return this.http.put<Product>(this.updateProductUrl + id, product);
    }

    //delete product
    deleteProduct(id : number): Observable<any>
    {
       return this.http.delete<any>(this.deleteProductUrl +id);
    }
    
    //clear cache
    clearCache()
    {
      this.products$ = null;
    }
}
