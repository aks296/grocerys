import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/public/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/public/signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/public/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./pages/public/otp/otp.module').then(m => m.OtpPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/public/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path:'payment',
    loadChildren:()=>import('./pages/secure/payment/payment.module').then(m=>m.PaymentPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/secure/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./pages/secure/order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'order-sucess',
    loadChildren: () => import('./pages/secure/order-sucess/order-sucess.module').then( m => m.OrderSucessPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/secure/payment/payment.module').then( m => m.PaymentPageModule)
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
