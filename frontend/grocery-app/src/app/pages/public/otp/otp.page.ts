// otp.page.ts
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DataSharingService } from "../../../services/data-sharing.services";
import { Globals } from "../../../services/globals";
import { ToastController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import axios from "axios";

@Component({
  selector: "app-otp",
  templateUrl: "./otp.page.html",
  styleUrls: ["./otp.page.scss"],
})
export class OtpPage implements OnInit {
  otpForm!: FormGroup;
  otpControls!: Array<any>; // Use the non-null assertion operator

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dataSharingService: DataSharingService,
    private globals: Globals,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.otpForm = this.fb.group({
      otp1: ["", [Validators.required, Validators.pattern(/^\d{1}$/)]],
      otp2: ["", [Validators.required, Validators.pattern(/^\d{1}$/)]],
      otp3: ["", [Validators.required, Validators.pattern(/^\d{1}$/)]],
      otp4: ["", [Validators.required, Validators.pattern(/^\d{1}$/)]],
    });

    // Get an array of controls for easier iteration in the template
    this.otpControls = Object.keys(this.otpForm.controls).map(
      (key) => this.otpForm.controls[key]
    );
  }

  successToast() {
    this.toastController
      .create({
        message: "Successfully registered. Please login to continue.",
        duration: 3000, // Duration of the toast in milliseconds
        position: "top",
        // Position of the toast on the screen ('top', 'bottom', 'middle')
        color: "success", // You can customize the color based on your app's theme
      })
      .then((toast) => {
        toast.present();
      });
  }

  errorToast(message: string) {
    this.toastController
      .create({
        message: message,
        duration: 3000, // Duration of the toast in milliseconds
        position: "top", // Position of the toast on the screen ('top', 'bottom', 'middle')
        color: "danger", // You can customize the color based on your app's theme
      })
      .then((toast) => {
        toast.present();
      });
  }


  async redirectToHome() {
    const formData = this.otpForm.value;
    this.dataSharingService.setFormData(formData);

    const userData = this.dataSharingService.getFormData();
    const postUrl = this.dataSharingService.loginMode
      ? `https://api.jykrasolutions.com/api/user/login`
      : `https://api.jykrasolutions.com/api/user/register`;
    //console.log("postUrl", userData);
    await axios
      .post(postUrl, userData)
      .then(async (response) => {
        
        if (
          response.data.message === "Invalid OTP for login" ||
          response.data.message === "User not registered"
        ) {
          // alert("Invalid Otp redirecting to the logIn Page ");
          this.errorToast("Invalid OTP. Please try again.");
        } else {
          if (this.dataSharingService.loginMode) {
            this.globals.authenticated = true;
            this.dataSharingService.clearFormData();
            this.globals.user.name = await response.data.name;
            this.globals.user.mobileNumber = await response.data.mobileNumber;
            this.globals.saveLocalData("loggedIn", "true");
            this.globals.saveLocalData("name", response.data.name);
            this.globals.saveLocalData(
              "mobileNumber",
              response.data.mobileNumber
            );
            this.globals.saveLocalData("userType", response.data.userType);
            this.globals.saveLocalData("userId", response.data.userId);
            this.globals.saveLocalData("city",response.data.city);
            this.globals.saveLocalData("area",response.data.area);
            this.globals.saveLocalData("building",response.data.building);
            this.globals.saveLocalData("flatNumber",response.data.flatNumber);
            this.globals.saveLocalData("floor",response.data.floor);

            this.router.navigate(["/tabs/home"]);
          } else {
            if (response.data.message === "User already exists") {
              this.errorToast("User already exists. Please login to continue.");
            } else {
              this.successToast();
            }
            this.dataSharingService.loginMode = true;
            this.router.navigate(["/login"]);
          }
        }
      })
      .catch((error) => {
        console.error("Error posting user information to the backend:", error);
        this.errorToast("Server is unreachable. Please try again later");
      });
  }
}
