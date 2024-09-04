import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user/user.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Service/shared/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  constructor(private userService: UserService,private router: Router,  private productService: ProductService ) {}

  ngOnInit(): void {
    this.loadProducts();
    localStorage.removeItem('selectedProduct');

  }
  loadProducts(): void {
    this.userService.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
        
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  onProductClick(product: any) {
    console.log('Navigating with product:', product); // Debugging line
    this.productService.setProduct(product); // Set the product in the shared service
    this.router.navigate(['product-details']);
  }
  
  
}
