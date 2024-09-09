import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterLoginPageComponent } from './Component/common/register-login-page/register-login-page.component';
import { LandingPageComponent } from './Component/common/landing-page/landing-page.component';
import { HeaderComponent } from './Component/common/header/header.component';
import { AdminLoginComponent } from './Component/Admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './Component/Admin/admin-home/admin-home.component';
import { AdminService } from './Service/admin/admin.service';
import { AdminCategoryAddingComponent } from './Component/Admin/admin-category-adding/admin-category-adding.component';
import { AdminHeaderComponent } from './Component/Admin/admin-header/admin-header.component';
import { AdminProdutAddingComponent } from './Component/Admin/admin-produt-adding/admin-produt-adding.component';
import { HomeComponent } from './Component/User/home/home.component';
import { ProductDetailsComponent } from './Component/User/product-details/product-details.component';
import { ProductOrderComponent } from './Component/User/product-order/product-order.component';
import { ProfileComponent } from './Component/User/profile/profile.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ProfileAddressComponent } from './Component/User/profile-address/profile-address.component';
import { OrderDetilesComponent } from './Component/Admin/order-detiles/order-detiles.component'

@NgModule({
  declarations: [
    AppComponent,
    RegisterLoginPageComponent,
    LandingPageComponent,
    HeaderComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminCategoryAddingComponent,
    AdminHeaderComponent,
    AdminProdutAddingComponent,
    HomeComponent,
    ProductDetailsComponent,
    ProductOrderComponent,
    ProfileComponent,
    ProfileAddressComponent,
    OrderDetilesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Import FormsModule here
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  providers: [AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
