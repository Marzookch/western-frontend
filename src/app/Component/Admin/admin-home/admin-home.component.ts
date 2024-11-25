import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  constructor(private router: Router) { }

  category(): void {
    this.router.navigate(['/category']); // Replace '/detail' with your desired route
  }
  addproduct(): void {
    this.router.navigate(['/product-adding']); // Replace '/detail' with your desired route
  }

  orderManagement(): void {
    this.router.navigate(['/order-management']); // Replace '/detail' with your desired route
  }

  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
