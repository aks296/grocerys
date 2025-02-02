import { Injectable } from "@angular/core";

export interface Product {
  productId: number;
  name: string;
  variant: string;
  price: number;
  oldPrice: number;
  quantity: number;
}

@Injectable({
  providedIn: "root",
})
export class Globals {
  public APP_INITIALIZED = "app.initialized";
  public APP_NEW_USER = "app.newUser";
  public APP_EXISTING_USER = "app.existingUser";
  public AUTH_TOKEN = "grocery.token";
  public ROLE = "grocery.role";
  public PROVIDER = "grocery.provider";
  public USER = "grocery.user";
  public CUSTOMER = "grocery.customer";
  public authenticated: boolean = false;
  public serverErrMsg: string =
    "Internet or server error occuerred. Please try again.";
  public SUCCESS = "success";
  public FAILURE = "failure";
  public PRDUCTS = "grocery.products";

  public user: any = {
    name: "",
    mobileNumber: "",
    otp: "",
  };

  public localUser: any = {
    userName: "",
    mobileNumber: "",
  };

  isEmpty(value: any) {
    if (value == null || value == undefined || value.length == 0) {
      return true;
    }
    return false;
  }

  saveLocalData = function (key: string, value: string) {
    localStorage.setItem(key, value);
  };

  getLocalData = function (key: string) {
    return localStorage.getItem(key);
  };

  removeLocalData = function (key: string) {
    return localStorage.removeItem(key);
  };
}
