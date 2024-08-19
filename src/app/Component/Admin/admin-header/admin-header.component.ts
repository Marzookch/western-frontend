import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(private router: Router) { }

  logout() {
    // Remove the JWT token and adminId from localStorage or perform any other logout actions
    localStorage.removeItem('orgaisertoken');
    localStorage.removeItem('organisaerId'); // Assuming you store the admin's ID as 'adminId'
    

    this.router.navigate(['admin-login']); // Replace 'login' with your login route
  }
}
