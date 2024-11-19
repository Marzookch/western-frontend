import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as QRCode from 'qrcode';
import { UserService } from 'src/app/Service/user/user.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css'],
})
export class ProductOrderComponent implements OnInit {
  productDetails: any;
  user: any = {
    name: '',
    email: '',
    number: '',
    address: '',
    houseaddress: '',
    city: '',
    post: '',
    landmark: '',
    addresses: [], // Added addresses array here
  };
  selectedAddress: any = {};
  selectedShippingMethod: string | null = null;
  selectedPaymentMethod: string | null = null;
  showError: boolean = false;
  qrCodeUrl: string | null = null; // Store the generated QR code URL

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getuserdata();
    this.productDetails = history.state.productDetails;
    console.log('Product Details:', this.productDetails);
  }

  getuserdata() {
    this.userService.getUserDetails().subscribe(
      (data) => {
        this.user = data;
        console.log('User details:', this.user);
        // Default selected address is the first one in the array
        if (this.user.addresses && this.user.addresses.length > 0) {
          this.selectedAddress = this.user.addresses[0]; // Select first address by default
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
        if (error.status === 401 || error.status === 403) {
          // Handle unauthorized or access denied error
        }
      }
    );
  }

  onAddressSelect(event: any) {
    const index = event.target.value; // Get the selected index
    this.selectedAddress = this.user.addresses[index]; // Update selectedAddress based on index
  }

  finalizePayment(transactionId: string) {
    // You can now use the transaction ID for further processing
    console.log('Payment finalized with Transaction ID:', transactionId);
    // Example: Save payment details to your server or navigate to another page

    // Redirect or complete form submission logic
    this.router.navigate(['/payment-success'], {
      state: { transactionId, productDetails: this.productDetails },
    });
  }

  onContinue() {
    if (!this.selectedShippingMethod || !this.selectedPaymentMethod) {
      // If any option is not selected, show an error message
      this.showError = true;
      Swal.fire(
        'Error',
        'Please select both a shipping method and a payment method.',
        'error'
      );
    } else {
      console.log(this.selectedPaymentMethod);

      // Check if the selected payment method is "Online Payment"
      if (this.selectedPaymentMethod === 'Online Payment') {
        const upiId = 'ddhanusjith-1@okhdfcbank'; // Your UPI ID
        const amount = this.productDetails?.totalPrice || 100; // Set product amount or any default amount

        Swal.fire({
          title: 'Select Payment Method',
          html: `
            <div>
              <input type="radio" id="qrCodePayment" name="paymentMethod" value="qrCode" />
              <label for="qrCodePayment">Pay with QR Code</label><br />
              <input type="radio" id="upiIdPayment" name="paymentMethod" value="upiId" />
              <label for="upiIdPayment">Pay with UPI ID</label>
            </div>`,
          showCancelButton: true,
          confirmButtonText: 'Proceed',
          preConfirm: () => {
            const selectedPaymentMethod = (
              document.querySelector(
                'input[name="paymentMethod"]:checked'
              ) as HTMLInputElement
            )?.value;
            if (!selectedPaymentMethod) {
              Swal.showValidationMessage('Please select a payment method');
              return false;
            }
            return selectedPaymentMethod;
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const selectedPaymentMethod = result.value;

            if (selectedPaymentMethod === 'qrCode') {
              // Generate and show the QR code with a 6-minute timer
              this.showQRCodeWithTimer(upiId, amount);
            } else if (selectedPaymentMethod === 'upiId') {
              // Show UPI ID details and a copy button
              Swal.fire({
                title: 'Pay with UPI ID',
                html: `
    <p>UPI ID: <strong>${upiId}</strong></p>
    <p>Amount: <strong>${amount} INR</strong></p>
    <button id="copyButton" class="swal2-confirm swal2-styled" style="background-color: #3085d6; color: white;">
      Copy UPI ID
    </button>
  `,
                showCancelButton: true, // Allows a cancel button
                confirmButtonText: 'I have Paid',
                showLoaderOnConfirm: false, // Disable loader on confirm, so it doesn't close the popup
                didOpen: () => {
                  const copyButton =
                    Swal.getPopup()?.querySelector('#copyButton')!;

                  // Prevent the Swal from closing when the Copy button is clicked
                  copyButton.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevents the modal from closing

                    navigator.clipboard
                      .writeText(upiId)
                      .then(() => {
                        // Show a toast alert for the copy action without closing the main Swal
                        Swal.fire({
                          icon: 'success',
                          title: 'UPI ID copied to clipboard!',
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 1500,
                          timerProgressBar: true,
                        });
                      })
                      .catch(() => {
                        // Show a toast error if copy fails without closing the main Swal
                        Swal.fire({
                          icon: 'error',
                          title: 'Failed to copy UPI ID!',
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 1500,
                          timerProgressBar: true,
                        });
                      });
                  });
                },
                preConfirm: () => {
                  return this.promptForTransactionId();
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.showOrderConfirmationPopup(); // Show final popup after successful payment
                }
              });
            }
          }
        });
      } else {
        // Proceed to the next step or submit the form for other payment methods
        this.showError = false;
        Swal.fire({
          title: 'Payment Successful!',
          text: 'Your payment has been confirmed.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Track Your Order',
          cancelButtonText: 'Go Home',
        }).then((result) => {
          if (result.isConfirmed) {
            // Logic to track the order (e.g., navigate to order tracking page)
            console.log('Track Order clicked');
            this.router.navigate(['/track-order']); // Example of navigation to track order page
          } else {
            // Logic to go back home (e.g., navigate to home page)
            console.log('Go Home clicked');
            this.router.navigate(['/home']); // Example of navigation to home page
          }
        });
        this.sendOrderDetailsCashonDelivery();
      }
    }
  }

  // Show QR code with a 6-minute timer
  showQRCodeWithTimer(upiId: string, amount: number) {
    const upiString = `upi://pay?pa=${upiId}&pn=YourName&am=${amount}&cu=INR`;

    // Generate the QR code
    QRCode.toDataURL(upiString, (err, qrCodeUrl) => {
      if (err) {
        console.error('Error generating QR code:', err);
        return;
      }

      // Timer variables
      let timeLeft = 6 * 60; // 6 minutes in seconds
      const interval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        // Update the timer display in SweetAlert
        Swal.update({
          html: `
            <div>
              <p>Time left: <strong>${minutes}:${
            seconds < 10 ? '0' : ''
          }${seconds}</strong></p>
              <p>Scan this QR code and pay using your UPI app:</p>
              <img src="${qrCodeUrl}" alt="QR Code" width="200" height="200" />
            </div>
          `,
        });

        // If time runs out, close the SweetAlert and stop the timer
        if (timeLeft <= 0) {
          clearInterval(interval);
          Swal.fire(
            'QR Code Expired',
            'The QR code has expired. Please try again.',
            'error'
          );
        }
      }, 1000); // Update every second

      // Show the QR code with the timer in SweetAlert
      Swal.fire({
        title: 'Scan to Pay',
        html: `
          <div>
            <p>Time left: <strong>6:00</strong></p>
            <p>Scan this QR code and pay using your UPI app:</p>
            <img src="${qrCodeUrl}" alt="QR Code" width="200" height="200" />
          </div>
        `,
        confirmButtonText: 'I have Paid',
        willClose: () => {
          // Clear the interval when the SweetAlert is closed
          clearInterval(interval);
        },
        preConfirm: () => {
          clearInterval(interval); // Stop the timer if the user confirms
          return this.promptForTransactionId();
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.showOrderConfirmationPopup(); // Show final popup after successful payment
        }
      });
    });
  }

  // Prompt the user for transaction ID after payment
  // Prompt the user for transaction ID after payment
  promptForTransactionId(): Promise<any> {
    return Swal.fire({
      title: 'Enter Transaction ID',
      input: 'text',
      inputLabel: 'Please enter the last 6 digits of the UPI transaction ID',
      inputPlaceholder: 'Enter transaction ID',
      inputAttributes: {
        maxlength: '6',
        minlength: '6',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: (transactionId) => {
        if (!transactionId || transactionId.length !== 6) {
          Swal.showValidationMessage(
            'Please enter a valid 6-digit transaction ID'
          );
          return false;
        }
        return transactionId;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const transactionId = result.value;
        // Call sendOrderDetails after transaction ID is confirmed
        this.sendOrderDetails(transactionId);

        // Handle the transaction ID here
        console.log('Transaction ID:', transactionId);
        Swal.fire('Success', 'Payment confirmed!', 'success');
        return transactionId;
      }
    });
  }

  // Show order confirmation popup with two buttons (Track Order and Go Home)
  showOrderConfirmationPopup() {
    Swal.fire({
      title: 'Payment Successful!',
      text: 'Your payment has been confirmed.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Track Your Order',
      cancelButtonText: 'Go Home',
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic to track the order (e.g., navigate to order tracking page)
        console.log('Track Order clicked');
        this.router.navigate(['/track-order']); // Example of navigation to track order page
      } else {
        // Logic to go back home (e.g., navigate to home page)
        console.log('Go Home clicked');
        this.router.navigate(['/home']); // Example of navigation to home page
      }
    });
  }

  sendOrderDetails(transactionId: string) {
    const userDetails = {
      userId: this.user._id,
      name: this.user.name,
      number: this.user.number,
    };
    const orderDetails = {
      product: this.productDetails,
      selectedAddress: this.selectedAddress,
      selectedShippingMethod: this.selectedShippingMethod,
      selectedPaymentMethod: this.selectedPaymentMethod,
      transactionId,
      userDetails,
    };

    console.log(orderDetails);

    this.userService.ordering(orderDetails).subscribe((response) => {
      console.log('Register successful', response);
    });
  }

  sendOrderDetailsCashonDelivery() {
    const userDetails = {
      userId: this.user._id,
      name: this.user.name,
      number: this.user.number,
    };
    const orderDetails = {
      product: this.productDetails,
      selectedAddress: this.selectedAddress,
      selectedShippingMethod: this.selectedShippingMethod,
      selectedPaymentMethod: this.selectedPaymentMethod,
      userDetails,
    };
    console.log(orderDetails);
    this.userService.ordering(orderDetails).subscribe((response) => {
      console.log('Register successful', response);
    });
  }

  // Handle cancel button
  onCancel() {
    // Handle cancel action here, like resetting the form or redirecting.
  }
}
