import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../services/data-sharing.services";
import { Globals } from "../../../services/globals";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  loginForm!: FormGroup;
  forDataTobeSendForAdminRegistration: any = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dataSharingService: DataSharingService,
    public globals: Globals
  ) {
    this.globals.authenticated = false;
    this.initializeLoginForm();
  }

  private initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      userType: ["", [Validators.required]],
      name: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
      mobileNumber: [
        "",
        [Validators.required, Validators.pattern("^[0-9]{10}$")],
      ],
      city: ["", [Validators.required]],
      area: ["", [Validators.required]],
      building: ["", [Validators.required]],
      flatNumber: ["", Validators.required],
      floor: ["", Validators.required]
    });

    this.updateValidators();
  }

  private updateValidators(): void {
    const nameControl = this.loginForm.get("name");
    const mobileNumberControl = this.loginForm.get("mobileNumber");
    const cityControl = this.loginForm.get("city");
    const areaControl = this.loginForm.get("area");
    const buildingControl = this.loginForm.get("building");
    const flatNumberControl = this.loginForm.get("flatNumber");
    const floorControl = this.loginForm.get("floor");


    if (this.dataSharingService.loginMode) {
      nameControl?.clearValidators();
      cityControl?.clearValidators();
      areaControl?.clearValidators();
      buildingControl?.clearValidators();
      flatNumberControl?.clearValidators();
      floorControl?.clearValidators();
      mobileNumberControl?.setValidators([
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),
      ]);
    } else {
      nameControl?.setValidators([
        Validators.required,
        Validators.pattern("^[a-zA-Z ]+$"),
      ]);
      mobileNumberControl?.setValidators([
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),
      ]);
    }

    nameControl?.updateValueAndValidity();
    mobileNumberControl?.updateValueAndValidity();
  }

  public loginMode(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.dataSharingService.loginMode = true;
    this.updateValidators();
  }

  public signUpMode(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.dataSharingService.loginMode = false;
    this.updateValidators();
  }

  redirectToOTP() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // if (formData.userType === "Admin") {
      //   this.forDataTobeSendForAdminRegistration = {
      //     userType: formData.userType,
      //     name: formData.name,
      //     mobileNumber: formData.mobileNumber,
      //     city: formData.city,
      //   };
      // } else {
      //   this.forDataTobeSendForAdminRegistration = formData;
      // }
      const dataToSend = this.dataSharingService.loginMode
        ? { mobileNumber: formData.mobileNumber, userType: formData.userType }
        : formData;

      this.dataSharingService.setFormData(dataToSend);
      this.router.navigate(["/otp"]);
    } else {
      Object.values(this.loginForm.controls).forEach((control) =>
        control.markAsTouched()
      );
    }
  }

  onUserTypeChange() {
    const userTypeControl = this.loginForm.get("userType");
    const userType = userTypeControl?.value;
    //console.log("userType", userType);
    const areaControl = this.loginForm.get("area");
    const buildingCOntrol = this.loginForm.get("building");

    // if (userType === "Admin") {
    //   areaControl?.clearValidators();
    //   areaControl?.updateValueAndValidity();
    //   buildingCOntrol?.clearValidators();
    //   buildingCOntrol?.updateValueAndValidity();
    // } else {
    //   areaControl?.setValidators([Validators.required]),
    //     buildingCOntrol?.setValidators([Validators.required]);
    // }
  }
}
