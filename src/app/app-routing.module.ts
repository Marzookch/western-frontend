import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Component/common/landing-page/landing-page.component';
import { AdminLoginComponent } from './Component/Admin/admin-login/admin-login.component';
import { RegisterLoginPageComponent } from './Component/common/register-login-page/register-login-page.component';
import { AdminHomeComponent } from './Component/Admin/admin-home/admin-home.component';
import { AdminCategoryAddingComponent } from './Component/Admin/admin-category-adding/admin-category-adding.component';
import { AdminProdutAddingComponent } from './Component/Admin/admin-produt-adding/admin-produt-adding.component';
import { HomeComponent } from'./Component/User/home/home.component';
import { ProductDetailsComponent } from './Component/User/product-details/product-details.component'
import { UserGuard } from'./guard/user.guard'
import { AdminGuard } from'./guard/admin.guard'
import { ProductOrderComponent } from './Component/User/product-order/product-order.component'
import { ProfileComponent } from './Component/User/profile/profile.component';
import { ProfileAddressComponent } from './Component/User/profile-address/profile-address.component';
import { OrderDetilesComponent } from './Component/Admin/order-detiles/order-detiles.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'admin-login', component:AdminLoginComponent},
  { path: 'admin-home', component:AdminHomeComponent},
  { path: 'category', component:AdminCategoryAddingComponent},
  { path: 'product-adding', component:AdminProdutAddingComponent},
  { path: 'user-login', component:RegisterLoginPageComponent, canActivate: [UserGuard]},
  { path: 'user-home' , component:HomeComponent ,canActivate: [UserGuard] },
  { path: 'product-details', component: ProductDetailsComponent, canActivate: [UserGuard] },
  { path: 'product-order',component: ProductOrderComponent, canActivate: [UserGuard]},
  { path: 'user-profile',component: ProfileComponent, canActivate:[UserGuard]},
  { path: 'edit-address',component: ProfileAddressComponent, canActivate:[UserGuard]},
  { path: 'order-management',component: OrderDetilesComponent, canActivate:[AdminGuard]},



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
