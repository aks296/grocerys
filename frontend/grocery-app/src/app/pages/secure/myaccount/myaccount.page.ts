import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {

  localStorage: Storage = localStorage;
  profilePictureUrl : string = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";

  constructor() { }

  ngOnInit() {
  }

  signOut() {
    localStorage.clear();
    window.location.href = "/login";
  }
}
