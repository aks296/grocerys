import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public segment: string = "vegetables";

  constructor() { }
  
  segmentChanged(ev: any) {
    if (ev?.detail?.value){
      //console.log("Segment changed", ev.detail.value);
    this.segment = ev.detail.value;}else{
      //console.log("Segment changed", ev);
      this.segment = ev;
    }
  }
}
