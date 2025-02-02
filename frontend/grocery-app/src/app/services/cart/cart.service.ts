import { Injectable } from "@angular/core";
import { Product } from "../globals";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor() {}

  cartItems: Array<Product> = [];
  totalCartValue: number = 0; // Total amount to be paid for checkout

  addToCart(product: Product) {
    const index = this.cartItems.findIndex(
      (item) => item.productId === product.productId
    );
    if (index !== -1) {
      this.cartItems[index].quantity++;
      this.totalCartValue += product.price;
    } else {
      product.quantity += 1;
      this.totalCartValue += product.price;
      //console.log("total cart value", this.totalCartValue);
      this.cartItems.push(product);
    }
  }

  removeFromCart(productId: number) {
    const index = this.cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (index !== -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
        this.totalCartValue -= this.cartItems[index].price;
      } else {
        this.totalCartValue -= this.cartItems[index].price;
        this.cartItems[index].quantity = 0;
        this.cartItems.splice(index, 1);
      }
    }
  }

  clearCart() {
    this.cartItems.forEach((item) => {
      item.quantity = 0;
    });
    this.cartItems.splice(0, this.cartItems.length);
    this.totalCartValue = 0;
  }

  getCartItems() {
    return this.cartItems;
  }
}
