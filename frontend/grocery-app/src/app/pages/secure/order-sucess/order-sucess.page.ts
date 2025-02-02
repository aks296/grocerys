import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-sucess',
  templateUrl: './order-sucess.page.html',
  styleUrls: ['./order-sucess.page.scss'],
})
export class OrderSucessPage implements OnInit {

  constructor(public orderServices : OrderService,public router : Router) { }

  ngOnInit() {
  }

  viewOrderDetails()
  {
    this.orderServices.getOrderDetails();
    this.router.navigate(["/tabs/orders"])
  }
}
