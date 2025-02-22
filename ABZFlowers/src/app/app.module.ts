import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';
=======
import { LoginComponent } from './auth/login/login.component';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';
>>>>>>> a952398c9a83be8b75490eab90d5eda25619678d
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CartComponent } from './cart/cart.component';
import { EventsComponent } from './events/events.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProductCreateComponent } from './home/products/product-create/product-create.component';

import { ProductListComponent } from './home/products/product-list/product-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './home/products/products.module';
import { EventsModule } from './events/events.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
<<<<<<< HEAD
    LoginComponent,
    MyAccountComponent,
=======
    LoginDashboardComponent,
>>>>>>> a952398c9a83be8b75490eab90d5eda25619678d
    ContactUsComponent,
    CartComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    ProductsModule,
    AuthModule,
    EventsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
