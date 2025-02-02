import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OrderService } from "src/app/services/order/order.service";
import axios from "axios";
import { AuthService } from "src/app/services/auth/auth.services";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.page.html",
  styleUrls: ["./order-details.page.scss"],
})
export class OrderDetailsPage implements OnInit {
  localStorage = localStorage;
  selectedCity: string = "";
  selectedArea: string = "";
  selectedBuilding: string = "";
  isAggregateRequirementsRequired: boolean = true;
  aggregatedRequirements: Array<any> = [];
  flatOrders: Array<any> = [];
  selectedOrder: any;

  constructor(
    private route: Router,
    public orderServices: OrderService,
    public authServices: AuthService
  ) {}

  ngOnInit() {
  }

  login(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.route.navigateByUrl("/login");
  }
}
