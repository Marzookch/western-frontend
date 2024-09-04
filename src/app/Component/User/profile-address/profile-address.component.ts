import { Component } from '@angular/core';
import { UserService } from 'src/app/Service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-address',
  templateUrl: './profile-address.component.html',
  styleUrls: ['./profile-address.component.css']
})
export class ProfileAddressComponent {
  isOpen = false;
  user = {
    address: '',
    city: '',
    name: '',
    email: '',
    number: '',
    postcode: '',
    landmark: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  

  openSidebar() {
    this.isOpen = true;
  }

  closeSidebar() {
    this.isOpen = false;
  }

  save() {
    // Save the changes via API call
    this.closeSidebar();
  }

  saveAddress(): void {
    this.userService.updateUserDetails(this.user).subscribe(
      (response) => {
        console.log('Address updated successfully:', response);
        this.router.navigate(['/profile']); // Redirect back to profile page after saving
      },
      (error) => {
        console.error('Error updating address:', error);
      }
    );
  }
}
