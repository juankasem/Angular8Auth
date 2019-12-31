import { Product } from './../../interfaces/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  @Input() product : Product;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private productService : ProductService) { }
  

  ngOnInit() {
    let id = + this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe(res => {
      this.product = res;
    })
  }

}
