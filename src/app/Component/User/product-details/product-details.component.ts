import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  selectedImageUrl: string | undefined;
  selectedQuantity: number = 1;
  totalPrice: number = 0;
  selectedSize: string = 'S';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    const savedProduct = localStorage.getItem('selectedProduct');
    
    if (savedProduct) {
      this.product = JSON.parse(savedProduct);
    } else {
      this.product = this.productService.getProduct();
      if (this.product) {
        localStorage.setItem('selectedProduct', JSON.stringify(this.product));
      }
    }

    console.log('Product received:', this.product);

    if (this.product?.images?.length > 0) {
      this.selectedImageUrl = this.product.images[0].url;
    }

    this.updateTotalPrice();
  }

  updateMainImage(url: string) {
    this.selectedImageUrl = url;
  }

  increaseQuantity() {
    if (this.selectedQuantity < this.product?.quantity) {
      this.selectedQuantity++;
      this.updateTotalPrice();
    }
  }

  decreaseQuantity() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
      this.updateTotalPrice();
    }
  }

  updateTotalPrice() {
    this.totalPrice = this.selectedQuantity === 1 
      ? this.product?.productRate 
      : this.selectedQuantity * this.product?.productRate;
    
    console.log(this.totalPrice);
  }

  buyNow() {
    const productDetails = {
      productName: this.product?.productName,
      productId: this.product?._id,
      productImage: this.selectedImageUrl,
      quantity: this.selectedQuantity,
      size:this.selectedSize,
      productRate: this.product?.productRate,
      totalPrice: this.totalPrice
    };
console.log("productDetails");

    // Navigate to the product-order page and pass the product details
    this.router.navigate(['/product-order'], {
      state: { productDetails }
    });
  }
}
