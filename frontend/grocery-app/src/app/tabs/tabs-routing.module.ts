import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

// const routes: Routes = [
//   {
//     path: 'tabs',
//     component: TabsPage,
//     children: [      
//       {
//         path: '',
//         redirectTo: '/login',
//         pathMatch: 'full'
//       },
//       {
//         path: 'home',
//         loadChildren: () => import('../pages/public/home/home.module').then(m => m.HomePageModule)
//       },
//       {
//         path: 'category',
//         loadChildren: () => import('../pages/secure/category/category.module').then(m => m.CategoryPageModule)
//       },
//       {
//         path: 'cart',
//         loadChildren: () => import('../pages/secure/cart/cart.module').then(m => m.CartPageModule)
//       },
//       {
//         path: 'order-details',
//         loadChildren: () => import('../pages/secure/order-details/order-details.module').then(m => m.OrderDetailsPageModule)
//       },
//       {
//         path: 'order-sucess',
//         loadChildren: () => import('../pages/secure/order-sucess/order-sucess.module').then(m => m.OrderSucessPageModule)
//       },
//       {
//         path: 'orders',
//         loadChildren: () => import('../pages/secure/orders/orders.module').then(m => m.OrdersPageModule)
//       },
//       {
//         path:'onboarding',
//         loadChildren:()=>import('../pages/public/onboarding/onboarding.module').then(m=>m.OnboardingPageModule)
//       },
//       {
//         path: 'myaccount',
//         loadChildren: () => import('../pages/secure/myaccount/myaccount.module').then(m => m.MyaccountPageModule)
//       },
      
//       {
//         path: 'tabs',
//         loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule)
//       },
//     ]
//   },
//   {
//     path: '',
//     redirectTo: '/login',
//     pathMatch: 'full'
//   }
// ];


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [      
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/public/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'category',
        loadChildren: () => import('../pages/secure/category/category.module').then(m => m.CategoryPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../pages/secure/cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'order-details',
        loadChildren: () => import('../pages/secure/order-details/order-details.module').then(m => m.OrderDetailsPageModule)
      },
      {
        path: 'order-sucess',
        loadChildren: () => import('../pages/secure/order-sucess/order-sucess.module').then(m => m.OrderSucessPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../pages/secure/orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path:'onboarding',
        loadChildren:()=>import('../pages/public/onboarding/onboarding.module').then(m=>m.OnboardingPageModule)
      },
      {
        path: 'myaccount',
        loadChildren: () => import('../pages/secure/myaccount/myaccount.module').then(m => m.MyaccountPageModule)
      },
      
      {
        path: 'tabs',
        loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path:'payment',
        loadChildren:()=>import('../pages/secure/payment/payment.module').then(m=>m.PaymentPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
