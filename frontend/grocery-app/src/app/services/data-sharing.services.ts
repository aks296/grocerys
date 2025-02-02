// data-sharing.service.ts
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class DataSharingService {
  private formData: any = {};
  public loginMode: boolean = true;

  setFormData(data: any) {
    this.formData = { ...this.formData, ...data };
  }

  getFormData() {
    return this.formData;
  }

  clearFormData() {
    this.formData = {};
  }
}
