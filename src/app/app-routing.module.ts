import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOrderComponent } from './page/list-order/list-order.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: DashboardComponent,
  // },
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
