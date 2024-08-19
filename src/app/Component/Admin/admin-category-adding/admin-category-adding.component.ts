import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Service/admin/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-category-adding',
  templateUrl: './admin-category-adding.component.html',
  styleUrls: ['./admin-category-adding.component.css']
})
export class AdminCategoryAddingComponent implements OnInit {
  constructor(private router: Router , private adminService: AdminService ) { }
  inputValue: string = '';
  categories: any[] = [];

  ngOnInit(): void {
    this.loadCategories();
  }

  onSubmit(): void {
    if (this.inputValue) {
      console.log('Input value:', this.inputValue);
      const category =  this.inputValue
      // Add your logic here, e.g., send data to a service or update the view.
      console.log(category);
      
      this.adminService.categoryadding(category).subscribe(
        (result) => {
          Swal.fire('Success', 'Category added successfully', 'success');
        
        },
        (err) => {
          Swal.fire('Error', err.error.message || 'An error occurred', 'error');
        }
      );
      this.inputValue = '';
    }
  }

  loadCategories(): void {
    this.adminService.getCategoryList().subscribe(
      (response) => {
        this.categories = response.category;
        console.log(this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
        Swal.fire('Error', 'Failed to load categories', 'error'); // Optional
      }
    );
  }


  toggleStatus(categoryId: string, currentStatus: boolean | null): void {
    const newStatus = currentStatus === null || currentStatus === true ? false : true;
    this.adminService.updateCategoryStatus(categoryId, newStatus).subscribe(
      (result) => {
        this.loadCategories(); // Reload categories to reflect the status change
      },
      (error) => {
        console.error('Error updating category status:', error);
        Swal.fire('Error', 'Failed to update category status', 'error'); // Optional
      }
    );
  }
}
