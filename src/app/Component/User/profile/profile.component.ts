import { Component, OnInit, Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/Service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
    number: '',
    address: '',
    houseaddress: '',
    city: '',
    post: '',
    landmark: '',
  };
  isSlideBarOpen = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(
      (data) => {
        this.user = data;
        console.log('User details:', this.user);
      },
      (error) => {
        console.error('Error fetching user details:', error);
        if (error.status === 401 || error.status === 403) {
          // Handle unauthorized or access denied error
          // Redirect to login or show appropriate message
        }
      }
    );
  }

  toggleSidebar() {
    this.isSlideBarOpen = !this.isSlideBarOpen; // Toggle the sidebar visibility
  }

  openSidebar() {
    this.renderer.addClass(document.getElementById('sidebar'), 'show');
  }

  openEditModal() {
    Swal.fire({
      title: 'Edit Profile',
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px; box-sizing: border-box;">
          <!-- Name and Email in one line -->
          <div style="display: flex; gap: 10px;">
            <input id="swal-input1" class="swal2-input" placeholder="Full Name" value="${this.user.name}" style="flex: 1; max-width: calc(50% - 10px); box-sizing: border-box;">
            <input id="swal-input2" class="swal2-input" placeholder="Email" value="${this.user.email}" style="flex: 1; max-width: calc(50% - 10px); box-sizing: border-box;">
          </div>
  
          <!-- Number and Post in one line -->
          <div style="display: flex; gap: 10px;">
            <input id="swal-input3" class="swal2-input" placeholder="Phone Number" value="${this.user.number}" style="flex: 1; max-width: calc(50% - 10px); box-sizing: border-box;">
            <input id="swal-input4" class="swal2-input" placeholder="Post Code" value="${this.user.post}" style="flex: 1; max-width: calc(50% - 10px); box-sizing: border-box;">
          </div>
  
          <!-- City and Address in one line -->
          <div style="display: flex; gap: 10px;">
            <input id="swal-input5" class="swal2-input" placeholder="City" value="${this.user.city}" style="flex: 1; max-width: calc(50% - 10px); box-sizing: border-box;">
            <input id="swal-input6" class="swal2-input" placeholder="Address" value="${this.user.address}" style="flex: 1; max-width: calc(50% - 10px); box-sizing: border-box;">
          </div>
  
          <!-- Landmark on a separate line -->
          <div style="display: flex; justify-content: center;">
            <input id="swal-input7" class="swal2-input" placeholder="Landmark" value="${this.user.landmark}" style="flex: 1; max-width: 100%; box-sizing: border-box;">
          </div>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const email = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const number = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;
        const post = (
          document.getElementById('swal-input4') as HTMLInputElement
        ).value;
        const city = (
          document.getElementById('swal-input5') as HTMLInputElement
        ).value;
        const address = (
          document.getElementById('swal-input6') as HTMLInputElement
        ).value;
        const landmark = (
          document.getElementById('swal-input7') as HTMLInputElement
        ).value;

        if (
          !name ||
          !email ||
          !number ||
          !post ||
          !city ||
          !address ||
          !landmark
        ) {
          Swal.showValidationMessage('Please fill out all fields');
          return false;
        }

        // Update the user object with new values
        this.user = {
          ...this.user,
          name,
          email,
          number,
          post,
          city,
          address,
          landmark,
        };

        // Return undefined to satisfy the function return type
        return undefined;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Call API to save changes
        this.userService.updateUserDetails(this.user).subscribe(
          (response) => {
            console.log('Profile updated successfully:', response);
            Swal.fire('Success', 'Profile updated successfully', 'success');
          },
          (error) => {
            console.error('Error updating profile:', error);
            Swal.fire(
              'Error',
              'There was an error updating the profile',
              'error'
            );
          }
        );
      }
    });
  }
  submitForm() {
    // Handle form submission
    this.userService.updateUserDetails(this.user).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        Swal.fire('Success', 'Profile updated successfully', 'success');
        this.closeSidebar();
      },
      (error) => {
        console.error('Error updating profile:', error);
        Swal.fire('Error', 'There was an error updating the profile', 'error');
      }
    );
  }

  closeSidebar() {
    this.isSlideBarOpen = false; // Hide the sidebar
  }
}
