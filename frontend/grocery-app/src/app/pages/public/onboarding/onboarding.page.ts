// onboarding.page.ts
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataSharingService } from "../../../services/data-sharing.services";
import { Globals } from "../../../services/globals";
import { ToastController } from "@ionic/angular";
import axios from "axios";
import { Product } from "../../../services/globals";
import { CartService } from "../../../services/cart/cart.service";
import { Subscription } from "rxjs";
import { OrderService } from "../../../services/order/order.service";
import { AuthService } from "src/app/services/auth/auth.services";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.page.html",
  styleUrls: ["./onboarding.page.scss"],
})
export class OnboardingPage {
  onboardingForm: FormGroup;
  cartItems: Array<Product> = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataSharingService: DataSharingService,
    private toastController: ToastController,
    private cartService: CartService,
    public authServices: AuthService,
    private orderServices: OrderService
  ) {
    this.onboardingForm = this.fb.group({
      city: ["", Validators.required],
      area: ["", Validators.required],
      building: ["", Validators.required],
      flatNumber: ["", Validators.required],
      floor: ["", Validators.required],
    });
    this.cartItems = this.cartService.getCartItems();
  }

  ngOnInit() {
    if (this.authServices.isAuthenticated()) {
      this.onboardingForm.patchValue({
        city: localStorage.getItem("city"),
        area: localStorage.getItem("area"),
        building: localStorage.getItem("building"),
        flatNumber: localStorage.getItem("flatNumber"),
        floor: localStorage.getItem("floor"),
      });
    }
  }

  redirectToPaymentPage() {
    const formData = this.onboardingForm.value;
    //console.log("cartItems", this.cartItems);
    this.dataSharingService.setFormData(formData);
    console.log(this.dataSharingService.getFormData());
    this.router.navigate(["/tabs/payment"]);
  }
}
