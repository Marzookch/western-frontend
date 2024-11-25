import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Service/admin/admin.service';

@Component({
  selector: 'app-admin-product-listing',
  templateUrl: './admin-product-listing.component.html',
  styleUrls: ['./admin-product-listing.component.css'],
})
export class AdminProductListingComponent implements OnInit {
  isSidebarCollapsed = false;
  products: any[] = []; // Original product list from the API
  filteredProducts: any[] = []; // Products to display (after filtering)
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  loadProducts(page: number = 1, limit: number = 10): void {
    this.adminService.getProducts(page, limit).subscribe(
      (response: any) => {
        this.products = response.products;
        this.filteredProducts = response.products; // Initialize filteredProducts
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
      },
      (error) => {
        console.error('Error fetching products', error);
        alert('Failed to load products. Please try again later.'); // Notify the user
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.productName.toLowerCase().includes(filterValue)
    );
  }


  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteProductById(productId).subscribe(
        (response) => {
          if (response && response.message) {
            alert(response.message); // Show the success message from backend
            this.loadProducts(this.currentPage); // Refresh the product list after deletion
          }
        },
        (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete the product.');
        }
      );
    }
  }
  
  
  
}
