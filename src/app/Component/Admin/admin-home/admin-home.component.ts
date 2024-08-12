import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  constructor(private router: Router) { }

  logout() {
    // Remove the JWT token and adminId from localStorage or perform any other logout actions
    localStorage.removeItem('orgaisertoken');
    localStorage.removeItem('organisaerId'); // Assuming you store the admin's ID as 'adminId'
    
    // Optionally clear other admin-related data from localStorage
    // Redirect to the login page or any other desired route
    this.router.navigate(['admin-login']); // Replace 'login' with your login route
  }

}
