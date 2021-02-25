import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ListCustomerComponent } from './pages/list-customer/list-customer.component';
import { ListOrderComponent } from './pages/list-order/list-order.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './common/navbar/navbar.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ListBillComponent } from './pages/list-bill/list-bill.component';
import { EditProductComponent } from './editor/edit-product/edit-product.component';
import { EditOrderComponent } from './editor/edit-order/edit-order.component';
import { FilterPipe } from './pipes/filter.pipe';
import { InfoCardComponent } from './common/info-card/info-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ListCustomerComponent,
    ListOrderComponent,
    NavbarComponent,
    DashboardComponent,
    ListProductComponent,
    ListBillComponent,
    EditProductComponent,
    EditOrderComponent,
    FilterPipe,
    InfoCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
