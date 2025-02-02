import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSucessPage } from './order-sucess.page';

describe('OrderSucessPage', () => {
  let component: OrderSucessPage;
  let fixture: ComponentFixture<OrderSucessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderSucessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
