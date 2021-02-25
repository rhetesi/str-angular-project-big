import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { ListOrderComponent } from './pages/list-order/list-order.component';

const routes: Routes = [
  {
   path: '',
   component: DashboardComponent,
  },
  
  {
    path: 'orders',
    component: ListOrderComponent,
  },
  // {
  //   path: 'orders/:id',
  //   component: EditOrderComponent,
  // },
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
