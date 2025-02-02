import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../../../services/cart/cart.service";
import { Product } from "../../../services/globals";
import { OrderService } from "../../../services/order/order.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  cartItems: Array<Product> = [];

  constructor(public cartService: CartService, public router: Router,private orderServices:OrderService) {
    this.cartItems = this.cartService.getCartItems();
  }

  ngOnInit() {}

  redirectToCheckout() {
    this.router.navigate(["/tabs/onboarding"]);
    //console.log("Redirecting to checkout page");
  }
}
