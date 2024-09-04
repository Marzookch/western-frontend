import { Component,HostListener,Input } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}
  @Input() product: any;
  showDropdown: string | null = null;

  // Toggle the dropdown menu
  toggleDropdown(dropdown: string): void {
    this.showDropdown = this.showDropdown === dropdown ? null : dropdown;
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.showDropdown = null;
    }
  }

  redirectToUserProfile() {
    // Navigate to the user's profile page
    this.router.navigate(['/user-profile']);
  }

  logout() {
    // Clear user data from localStorage or sessionStorage
    localStorage.removeItem('userToken'); // Example: clear the token
    localStorage.removeItem('selectedProduct'); // Clear any other relevant data
    sessionStorage.removeItem('authToken'); 
    // Redirect to the login page or home page after logging out
    this.router.navigate(['/user-login']);
  }

}
