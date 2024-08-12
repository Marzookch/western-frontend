import { Component } from '@angular/core';
import { AdminService } from 'src/app/Service/admin/admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private adminService: AdminService , private router: Router) {}

  validaEmail(email: string): boolean {
    const validRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return validRegex.test(email);
  }

  onSubmit() {
    console.log(this.email , this.password);
    
    if (this.email === '' || this.password === '') {
      Swal.fire('Error', 'Please enter all the fields', 'error');
    } else if (!this.validaEmail(this.email)) {
      Swal.fire('Error', 'Please enter a valid email', 'error');
    } else {
      this.adminService.adminlogin(this.email, this.password).subscribe(
        (result) => {
          this.adminService.storeToken(result.token);
          // Store the user ID in local storage
          localStorage.setItem('adminId', result.adminId);

          this.router.navigate(['/admin-home']);
        },
        (err) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
    }
  }
}
