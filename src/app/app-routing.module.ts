import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Component/common/landing-page/landing-page.component';
import { AdminLoginComponent } from './Component/Admin/admin-login/admin-login.component';
import { RegisterLoginPageComponent } from './Component/common/register-login-page/register-login-page.component';
import { AdminHomeComponent } from './Component/Admin/admin-home/admin-home.component';
import { AdminCategoryAddingComponent } from './Component/Admin/admin-category-adding/admin-category-adding.component';
import { AdminProdutAddingComponent } from './Component/Admin/admin-produt-adding/admin-produt-adding.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'admin-login', component:AdminLoginComponent},
  { path: 'login',component:RegisterLoginPageComponent},
  { path: 'admin-home', component:AdminHomeComponent},
  { path: 'category', component:AdminCategoryAddingComponent},
  { path: 'product-adding', component:AdminProdutAddingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
