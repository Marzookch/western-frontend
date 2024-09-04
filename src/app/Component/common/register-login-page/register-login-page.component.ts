import { Component } from '@angular/core';
import { UserService } from 'src/app/Service/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-login-page',
  templateUrl: './register-login-page.component.html',
  styleUrls: ['./register-login-page.component.css'],
})
export class RegisterLoginPageComponent {
  constructor(private userService: UserService, private router: Router) {}

  showRegisterFields = false;
  showForgotPassword = false;
  showOTP = false;

  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '', number: '' };
  forgotPasswordData = { email: '' };
  otpData = { otp: '' };

  toggleRegisterFields() {
    this.showRegisterFields = !this.showRegisterFields;
    this.showForgotPassword = false;
    this.showOTP = false;
  }

  toggleForgotPassword() {
    this.showForgotPassword = !this.showForgotPassword;
    this.showRegisterFields = false;
    this.showOTP = false;
  }

  toggleOTP() {
    this.showOTP = !this.showOTP;
    this.showRegisterFields = false;
    this.showForgotPassword = false;
  }

  login() {
    console.log('Login data:', this.loginData);
    this.userService.login(this.loginData.email, this.loginData.password)
      .subscribe(
        (response) => {
          console.log(response);
          
          // Store the token in session storage
          sessionStorage.setItem('authToken', response.token);

            this.router.navigate(['/user-home']);  
        },
        (error) => {
          console.error('Login error', error);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error.error.message || 'An error occurred during login. Please try again.',
          });
        }
      );
  }
  signup() {
    this.userService
      .signUp(
        this.registerData.email,
        this.registerData.password,
        this.registerData.name,
        this.registerData.number
      )
      .subscribe(
        (response) => {
          console.log('Register successful', response);
          this.toggleOTP(); // Show OTP fields after successful registration
        },
        (error) => {
          console.error('Register error', error);
        }
      );
  }

  resetPassword() {
    console.log('Forgot Password data:', this.forgotPasswordData);
    // Implement password reset logic
  }

  submitOTP() {
    console.log('OTP submitted:', this.otpData.otp);
    this.userService.otpVerify(this.otpData.otp).subscribe(
      (response) => {
        console.log('OTP verification successful', response);
        this.toggleOTP(); // Hide OTP fields after successful verification
        this.toggleRegisterFields(); // Show the login form after successful OTP verification
      },
      (error) => {
        console.error('OTP verification error', error);
        Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: 'Invalid OTP. Please try again.',
        });
      }
    );
  }
}
