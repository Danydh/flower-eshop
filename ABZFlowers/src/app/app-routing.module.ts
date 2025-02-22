import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';
=======
import { LoginComponent } from './auth/login/login.component';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';
>>>>>>> a952398c9a83be8b75490eab90d5eda25619678d
import { AdminComponent } from './admin/admin.component';
import { ProductCreateComponent } from './home/products/product-create/product-create.component';
import { ProductListComponent } from './home/products/product-list/product-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { EventCreateComponent } from './events/event-create/event-create.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'admin-panel', component: AdminComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'login', component: LoginComponent },
=======
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

>>>>>>> a952398c9a83be8b75490eab90d5eda25619678d
  { path: 'cart', component: CartComponent },

  { path: 'list-product', component: ProductListComponent },
  { path: 'create-product', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:productId', component: ProductCreateComponent, canActivate: [AuthGuard] },

  { path: 'events', component: EventsComponent },
  { path: 'create-event', component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/event/:eventId', component: EventCreateComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
