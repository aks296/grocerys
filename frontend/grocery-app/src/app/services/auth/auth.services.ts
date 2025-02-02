import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from "../globals";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  resMessage!: string;

  constructor(private router: Router, private globals: Globals) {}

  isAuthenticated() {
    return localStorage.getItem("loggedIn") === "true";
  }

  // Get user
  // getSession() {
  //   this.globals.getLocalData("loggedIn");
  // }

  getUser() {
    return this.globals.localUser;
  }

  // Sign out
  async signOut() {
    this.globals.removeLocalData(this.globals.USER);
    this.globals.removeLocalData(this.globals.AUTH_TOKEN);
    this.globals.removeLocalData(this.globals.PROVIDER);
    this.globals.authenticated = false;
    this.router.navigateByUrl("/signin");
  }
}
