import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { EditOrderComponent } from './editor/edit-order/edit-order.component';
import { ListBillComponent } from './pages/list-bill/list-bill.component';
import { ListCustomerComponent } from './pages/list-customer/list-customer.component';
import { ListOrderComponent } from './pages/list-order/list-order.component';
import { ListProductComponent } from './pages/list-product/list-product.component';

const routes: Routes = [
  {
   path: '',
   component: DashboardComponent,
  },
  {
   path: 'customers',
   component: ListCustomerComponent,
  },
  {
   path: 'products',
   component: ListProductComponent,
  },
  {
    path: 'orders',
    component: ListOrderComponent,
  },
  {
    path: 'orders/:id',
    component: EditOrderComponent,
  },
  {
   path: 'bills',
   component: ListBillComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
