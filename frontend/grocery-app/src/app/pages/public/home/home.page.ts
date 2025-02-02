import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../services/data-sharing.services";
import { Product } from "../../../services/globals";
import { CartService } from "../../../services/cart/cart.service";
import { CategoryService } from "src/app/services/category/category.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(
    private route: Router,
    private dataSharingService: DataSharingService,
    private cartService: CartService,
    public categoryServices: CategoryService
  ) {}

  public segment: string = "vegetables";

  ngOnInit() {
    // this.products.quantity = 0;
  }

  products: Product[] = [
    {
      productId: 1,
      name: "Broccoli",
      variant: "1lb",
      price: 3.99,
      oldPrice: 4.99,
      quantity: 0,
    },
    {
      productId: 2,
      name: "Orange",
      variant: "1lb",
      price: 1.99,
      oldPrice: 2.99,
      quantity: 0,
    },
    {
      productId: 3,
      name: "Milk",
      variant: "1 gallon",
      price: 3.99,
      oldPrice: 4.50,
      quantity: 0,
    },
    {
      productId: 4,
      name: "Tomato",
      variant: "1lb",
      price: 1.99,
      oldPrice: 2.99,
      quantity: 0,
    },
  ];

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    //console.log("Removing from cart", product);
    this.cartService.removeFromCart(product.productId);
  }
  

  listGreenVegies() {
    this.route.navigate(["/tabs/category"]);
    this.categoryServices.segmentChanged("vegetables");
    //console.log("clicked veggie");
  }

  listFruits() {
    this.route.navigate(["/tabs/category"]);
    this.categoryServices.segmentChanged("fruits");
  }

  listDairyProducts() {
    this.route.navigate(["/tabs/category"]);
    this.categoryServices.segmentChanged("dairy");
  }

  listFruitsVegies() {
    this.route.navigate(["/tabs/category"]);
    this.categoryServices.segmentChanged("vegetables");
  }

  listBakeryItems() {
    this.route.navigate(["/tabs/category"]);
    this.categoryServices.segmentChanged("bakery");
  }

  listFineDairyProducts() {
    this.route.navigate(["/tabs/category"]);
    this.categoryServices.segmentChanged("dairy");
  }
}
