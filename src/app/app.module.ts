import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterLoginPageComponent } from './Component/common/register-login-page/register-login-page.component';
import { LandingPageComponent } from './Component/common/landing-page/landing-page.component';
import { HeaderComponent } from './Component/common/header/header.component';
import { AdminLoginComponent } from './Component/Admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './Component/Admin/admin-home/admin-home.component';
import { AdminService } from './Service/admin/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterLoginPageComponent,
    LandingPageComponent,
    HeaderComponent,
    AdminLoginComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Import FormsModule here
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
