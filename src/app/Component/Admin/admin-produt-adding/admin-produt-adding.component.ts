import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/Service/admin/admin.service';

@Component({
  selector: 'app-admin-produt-adding',
  templateUrl: './admin-produt-adding.component.html',
  styleUrls: ['./admin-produt-adding.component.css']
})
export class AdminProdutAddingComponent implements OnInit {
  productName: string = '';
  quantity: number | null = null;
  description: string = '';
  category: string = '';
  sizes: string[] = ['S', 'M', 'L', 'XL']; // Example sizes
  selectedSizes: string[] = []; // To keep track of selected sizes
  categories: any[] = [];
  imagePreviews: string[] = [];
  errorMsg: string | null = null;

  private maxImageCount = 4;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.adminService.getCategoryList().subscribe(data => {
      console.log('Fetched categories:', data);
      // Temporarily disable filtering
      this.categories = data.category; // Show all categories
      // Apply filtering only if needed
      // this.categories = data.category.filter((c: any) => c.Status);
    }, error => {
      console.error('Error fetching categories:', error);
    });
  }
  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.errorMsg = null;

    if (files.length > this.maxImageCount) {
      this.errorMsg = 'You can only upload up to 4 images.';
      return;
    }

    this.imagePreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
        this.errorMsg = 'Only .jpg, .png, and .svg files are allowed.';
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(image: string): void {
    this.imagePreviews = this.imagePreviews.filter(img => img !== image);
  }

  onSizeChange(size: string, event: any): void {
    if (event.target.checked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    }
  }

  onSubmit(): void {
    if (!this.productName || this.quantity === null || !this.description || !this.category || this.selectedSizes.length === 0) {
      // Handle form validation and submission
      return;
    }

    const formData = {
      productName: this.productName,
      quantity: this.quantity,
      description: this.description,
      category: this.category,
      sizes: this.selectedSizes,
      images: this.imagePreviews
    };

    console.log('Form Data:', formData);
  }
}
