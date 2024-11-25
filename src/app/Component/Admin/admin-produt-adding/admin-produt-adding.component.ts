import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Service/admin/admin.service';
import Swal from 'sweetalert2';
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
  imagePreviews: string[] = []; // To store image previews as base64 strings
  productRate :string = '';
  supplierproductRate :string = '';
  errorMsg: string | null = null;

  private maxImageCount = 4;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.adminService.getCategoryList().subscribe(data => {
      console.log('Fetched categories:', data);
      this.categories = data.category; // Show all categories
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

    this.imagePreviews = []; // Clear previous previews

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
        this.errorMsg = 'Only .jpg, .png, and .svg files are allowed.';
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result); // Store base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(img: string): void {
    this.imagePreviews = this.imagePreviews.filter(image => image !== img);
  }

  onSizeChange(size: string, event: any): void {
    if (event.target.checked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    }
  }

  onSubmit(): void {
    if (!this.productName || this.quantity === null || !this.description || !this.category || this.selectedSizes.length === 0 || !this.imagePreviews.length) {
      return;
    }

    const formData = new FormData();
    formData.append('productName', this.productName);
    formData.append('quantity', this.quantity!.toString());
    formData.append('productDescription', this.description);
    formData.append('categoryId', this.category);
    formData.append('productRate', this.productRate.toString());
    formData.append('supplierproductRate', this.supplierproductRate.toString());
    
    this.selectedSizes.forEach((size, index) => {
      formData.append(`size[${index}]`, size);
    });

    // Append each image file
    this.imagePreviews.forEach((img, index) => {
      const blob = this.dataURItoBlob(img); // Convert base64 to Blob
      formData.append('images', blob, `image${index}.png`);
    });

    console.log('Submitting FormData:', formData);

    this.adminService.addProduct(formData).subscribe(
      (response) => {
        Swal.fire('Success', 'Product added successfully', 'success');
        
      },
      (error) => {
        console.error('Error adding product:', error);
           Swal.fire('Error', 'Failed to add product', 'error'); 
      }
    );
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
