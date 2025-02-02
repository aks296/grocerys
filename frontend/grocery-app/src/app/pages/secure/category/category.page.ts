import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit {
  public segment: string = this.categoryServices.segment;
  constructor(public categoryServices:CategoryService) {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    //console.log("Segment changed", ev.detail.value);
    this.categoryServices.segmentChanged(ev.detail.value);
  }
}
