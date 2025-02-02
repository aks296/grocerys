import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ToastController } from "@ionic/angular";
import { CartService } from "src/app/services/cart/cart.service";
import { OrderService } from "../../../services/order/order.service";
import { AuthService } from "src/app/services/auth/auth.services";
import { DataSharingService } from "../../../services/data-sharing.services";

import axios from "axios";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.page.html",
  styleUrls: ["./payment.page.scss"],
})
export class PaymentPage implements OnInit {
  paymentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    public cartServices: CartService,
    private orderServices: OrderService,
    private authServices: AuthService,
    private toastController: ToastController,
    private dataSharingService: DataSharingService
  ) {}
  

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}')]],
      cardHolderName: ['', Validators.required],
      expirationDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])\/([0-9]{2})')]],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]]
    });

     // Automatically add hyphens to card number input
     this.paymentForm?.get('cardNumber')?.valueChanges.subscribe(value => {
      if (value.length === 4 || value.length === 9 || value.length === 14) {
        this.paymentForm.patchValue({ cardNumber: value + '-' });
      }
    });
  }


  successToast(message: string) {
    this.toastController
      .create({
        message: message,
        duration: 3000, // Duration of the toast in milliseconds
        position: "bottom",
        // Position of the toast on the screen ('top', 'bottom', 'middle')
        color: "success", // You can customize the color based on your app's theme
      })
      .then((toast) => {
        toast.present();
      });
  }

  errorToast(message: string) {
    this.toastController
      .create({
        message: message,
        duration: 3000, // Duration of the toast in milliseconds
        position: "top", // Position of the toast on the screen ('top', 'bottom', 'middle')
        color: "danger", // You can customize the color based on your app's theme
      })
      .then((toast) => {
        toast.present();
      });
  }

  async redirectToOrderSuccess() {
    const userId = localStorage.getItem("userId");

    if (this.authServices.isAuthenticated() && this.cartServices.cartItems.length>0) {
      
      axios
        .post(`https://api.jykrasolutions.com/api/user/placeOrder/${userId}`, {
          cartItems: this.cartServices.getCartItems(),
          address: this.dataSharingService.getFormData(),
          orderTime: new Date(),
        })
        .then((response) => {
          this.dataSharingService.clearFormData();

          this.orderServices.recentOrderDetails = [];
          this.successToast(response.data.message);
          this.orderServices.recentOrderDetails.push(response.data);
          //console.log(this.orderServices.recentOrderDetails[0]);
          this.cartServices.clearCart();
          this.orderServices.getOrderDetails();
          this.router.navigate(["/tabs/order-sucess"]);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });
    } else {
      this.errorToast("Please login to place order");
      this.router.navigate(["/login"]);
    }
  }

}
