import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from "../services/globals";
import { OrderService } from "../services/order/order.service";
@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.page.html",
  styleUrls: ["./tabs.page.scss"],
})
export class TabsPage implements OnInit {
  public localStorage = localStorage;

  constructor(
    private route: Router,
    public globals: Globals,
    public orderServices: OrderService
  ) {}

  ngOnInit() {
    if (this.localStorage.getItem("loggedIn") === "true") {
      if (this.localStorage.getItem("userType")?.toLowerCase() === "customer")
        this.orderServices.getOrderDetails();
      // //console.log("clicked");
    }
  }

  redirectToHome() {
    this.route.navigate(["/home"]);
  }

  redirectToCategoryPage() {
    this.route.navigate(["tabs/category"]);
  }

  redirectToCartPage() {
    this.route.navigate(["/cart"]);
  }

  redirectToOrderDetailsPage() {
    this.route.navigate(["/order-details"]);
  }

  redirectToMyAccountPage() {
    this.route.navigate(["/myaccount"]);
  }

  onOrderTabClick() {
    if (this.localStorage.getItem("loggedIn") === "true") {
      if (this.localStorage.getItem("userType")?.toLowerCase() === "customer")
        this.orderServices.getOrderDetails();
    }
  }
}
