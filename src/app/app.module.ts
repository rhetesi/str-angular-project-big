import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ListCustomerComponent } from './pages/list-customer/list-customer.component';
import { ListOrderComponent } from './pages/list-order/list-order.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './common/navbar/navbar.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ListBillComponent } from './pages/list-bill/list-bill.component';
import { EditProductComponent } from './editor/edit-product/edit-product.component';
import { EditCustomerComponent } from './editor/edit-customer/edit-customer.component';
import { EditOrderComponent } from './editor/edit-order/edit-order.component';
import { FilterPipe } from './pipes/filter.pipe';
import { InfoCardComponent } from './common/info-card/info-card.component';
import { SumPipe } from './pipes/sum.pipe';
<<<<<<< HEAD
import { EditBillComponent } from './editor/edit-bill/edit-bill.component';
=======
import { BarChartComponent } from './common/chart/bar-chart/bar-chart.component';
import { PieChartComponent } from './common/chart/pie-chart/pie-chart.component';
>>>>>>> origin/Gabi

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
    EditCustomerComponent,
    EditOrderComponent,
    FilterPipe,
    InfoCardComponent,
    SumPipe,
<<<<<<< HEAD
    EditBillComponent,
=======
    BarChartComponent,
    PieChartComponent,
>>>>>>> origin/Gabi
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      // timeOut: 5000,
      // positionClass: 'toast-top-right'
    }),
    ToastContainerModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
