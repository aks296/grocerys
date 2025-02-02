import { Component } from "@angular/core";
import { Globals } from "./services/globals";
import { OrderService } from "./services/order/order.service";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  public localStorage = localStorage;
  constructor(public globals: Globals,private orderService:OrderService) {}

  logout() {
    // Clear the authentication status in localStorage
    this.globals.authenticated = false;
    this.globals.removeLocalData("loggedIn");
    this.globals.removeLocalData("name");
    this.globals.removeLocalData("mobileNumber");
    this.globals.removeLocalData("userId");
    this.globals.removeLocalData("userType");
    this.globals.removeLocalData("city");
    this.globals.removeLocalData("area");
    this.globals.removeLocalData("building");
    this.globals.removeLocalData("flatNumber");
    this.globals.removeLocalData("floor");
    this.orderService.clearOrderSummary();
  }
}
