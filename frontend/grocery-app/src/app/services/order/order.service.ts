import { Injectable } from "@angular/core";
import axios from "axios";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  orderDetail: any = [];
  orderItems: Array<any> = [];
  selectedOrder: any = {};
  totalOrderPrice: number = 0;

  orderNumber: any = "";
  orderDate: any = "";
  deliveryAddress: any = {};
  deliveryTime: string = "";
  progressStatus: string = "";
  recentOrderDetails: any = [];

  // building-admin related variables
  aggregatedRequirements: Array<any> = [];
  isAggregateRequirementsRequired: boolean = true;
  flatOrders: Array<any> = [];
  particularFlatOrders: any;
  totalPriceForParticularOrderOfFlat: number = 0;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

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

  getOrderDetails() {
    axios
      .get(
        `https://api.jykrasolutions.com/api/user/orders/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((res) => {
        // Clear existing data before fetching new order details
        this.orderItems = [];
        this.totalOrderPrice = 0;
        this.orderDetail = [];
        this.orderNumber = 0;
        this.deliveryAddress = {};
        this.deliveryTime = " ";
        this.orderDate = " ";
        this.progressStatus = " ";

        if (res.data.orders.length > 0) {
          res.data.orders.forEach((order: any) => {
            order.orderItems.forEach((item: any) => {
              this.totalOrderPrice += item.productPrice * item.productQuantity;
            });
            const orderSummary = {
              orderId: order.orderId,
              orderDate: order.orderDate,
              deliveryAddress: order.deliveryAddress,
              deliveryTime: order.deliveryTime,
              products: order.orderItems,
              totalOrderPrice: this.totalOrderPrice,
              progressStatus: order.progressStatus,
            };

            this.orderDetail.push(orderSummary);
            this.totalOrderPrice = 0;
          });

          // Sort orderDetail based on orderDate in descending order
          this.orderDetail.sort(
            (a: any, b: any) =>
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
        }
        //console.log(this.orderDetail);
      });
  }

  calculateOrderTotal(order: any) {
    this.totalOrderPrice = order.totalOrderPrice;
    console.log(this.totalOrderPrice);
   return order.totalOrderPrice;
  }

  getOrderDetailsById(orderId: any) {
    this.totalOrderPrice=0;
    this.selectedOrder = this.orderDetail.find(
      (order: any) => order.orderId === orderId
    );

    // this.selectedOrder.products.forEach((product:any)=>{
    // this.totalOrderPrice+=product.productPrice*product.productQuantity;
    // })
    // this.selectedOrder.totalOrderPrice=this.totalOrderPrice;
    console.log(this.selectedOrder);
    // console.log(this.totalOrderPrice)
    return this.selectedOrder;
  }

  clearOrderSummary() {
    // Clear order items array using splice
    this.orderItems.splice(0, this.orderItems.length);
    // Reset other properties to initial values
    this.totalOrderPrice = 0;
    this.orderNumber = 0;
    this.orderDate = new Date();
    this.deliveryAddress = {};
    this.deliveryTime = " ";
  }

  fetchAggregatedRequirements(
    selectedCity: string,
    selectedArea: string,
    selectedBuilding: string
  ) {
    this.isAggregateRequirementsRequired = true;
    this.aggregatedRequirements = [];
    if (selectedArea === "" || selectedBuilding === "") {
      // this.errorToast("Please select city and building");
      //console.log("Please select city and building");
      return;
    }
    axios
      .get(
        `https://api.jykrasolutions.com/api/user/aggregateRequirements?city=${selectedCity}&area=${selectedArea}&building=${selectedBuilding}`
      )
      .then((res) => {
        //console.log(res.data);
        if (res.data.length > 0) {
          res.data.forEach((requirement: any) => {
            this.aggregatedRequirements.push(requirement);
          });
        } else {
          // //console.log(this.aggregatedRequirements[0]);

          //console.log("No order Placed in your area");
          this.errorToast("No order Placed in your area");
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  }

  async fetchOrdersInformationOfFlat(
    selectedCity: string,
    selectedArea: string,
    selectedBuilding: string
  ) {
    this.isAggregateRequirementsRequired = false;
    const flatOrdersResult = await axios.get(
      `https://api.jykrasolutions.com/api/user/ordersLastDay?city=${selectedCity}&area=${selectedArea}&building=${selectedBuilding}`
    );
    this.flatOrders = flatOrdersResult.data;
    //console.log(this.flatOrders);
  }

  openFlatOrderDetail(flatOrder: any) {
    //console.log("flatOrder", flatOrder);
    this.totalPriceForParticularOrderOfFlat = 0;
    this.particularFlatOrders = flatOrder.orderDetails;
    this.particularFlatOrders.forEach((product: any) => {
      this.totalPriceForParticularOrderOfFlat +=
        product.price * product.quantity;
    });
    //console.log("particularFlatOrders", this.particularFlatOrders);
    this.router.navigate(["/order-details"]);
  }
}
