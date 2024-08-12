import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Component/common/landing-page/landing-page.component';
import { AdminLoginComponent } from './Component/Admin/admin-login/admin-login.component';
import { RegisterLoginPageComponent } from './Component/common/register-login-page/register-login-page.component';
import { AdminHomeComponent } from './Component/Admin/admin-home/admin-home.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'admin-login', component:AdminLoginComponent},
  { path: 'login',component:RegisterLoginPageComponent},
  {path: 'admin-home', component:AdminHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
