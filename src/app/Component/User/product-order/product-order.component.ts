import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {
  productDetails: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.productDetails = history.state.productDetails;
    console.log('Product Details:', this.productDetails);
  }
}
