import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order/order.service";
import { AuthService } from "src/app/services/auth/auth.services";
import { Router, NavigationEnd } from "@angular/router";
import { ToastController } from "@ionic/angular";
import axios from "axios";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.page.html",
  styleUrls: ["./orders.page.scss"],
})
export class OrdersPage implements OnInit {
  localStorage = localStorage;
  selectedCity: string = localStorage.getItem("city") ?? "";;
  selectedArea: string = localStorage.getItem("area") ?? "";;
  selectedBuilding: string = localStorage.getItem("building") ?? "";
  isAggregateRequirementsRequired: boolean = true;
  aggregatedRequirements: Array<any> = [];
  flatOrders: Array<any> = [];
  selectedOrder: any;

  constructor(
    public orderServices: OrderService,
    public authServices: AuthService,
    private router: Router,
    private toastController: ToastController,
  ) {}

  // ngOnInit() {
  //   if (this.authServices.isAuthenticated()) {
  //     if (this.localStorage.getItem("userType")?.toLowerCase() === "customer") {
  //       this.orderServices.getOrderDetails();
  //     } else {
  //       //console.log("User is not a customer");
  //       // Set initial values from localStorage
  //       this.selectedCity = localStorage.getItem("city") ?? ""; // Provide an empty string as the default value
  //       this.selectedArea = localStorage.getItem("area") ?? "";
  //       this.selectedBuilding = localStorage.getItem("building") ?? "";
  //       this.orderServices.fetchAggregatedRequirements(this.selectedCity,this.selectedArea,this.selectedBuilding);
  //     }
  //   }
  // }

  ngOnInit() {
    // Subscribe to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the user is authenticated
        if (this.authServices.isAuthenticated()) {
          // Check if the user is a customer
          if (this.localStorage.getItem("userType")?.toLowerCase() === "customer") {
            this.orderServices.getOrderDetails();
          } else {
            // Set initial values from localStorage
            this.selectedCity = localStorage.getItem("city") ?? "";
            this.selectedArea = localStorage.getItem("area") ?? "";
            this.selectedBuilding = localStorage.getItem("building") ?? "";
            // Fetch aggregated requirements
            this.orderServices.fetchAggregatedRequirements(this.selectedCity, this.selectedArea, this.selectedBuilding);
          }
        }
      }
    });
  }
  


  openOrderDetails(order: any) {
    this.orderServices.getOrderDetailsById(order.orderId);
    this.orderServices.calculateOrderTotal(order);
    this.router.navigate(["/order-details"]);
  }

  login(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.router.navigateByUrl("/login");
  }
}
