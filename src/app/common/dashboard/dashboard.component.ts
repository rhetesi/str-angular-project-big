import { Component, OnInit } from '@angular/core';
import { InfoCard } from '../info-card/info-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cards: InfoCard[] = [
    {
     title: 'Customers',
     content: '102',
     cardClass: 'card-header-warning',
     footer: 'ide is jön vmi',
     icon: 'account_circle',
    },
    {
     title: 'Products',
     content: '321',
     cardClass: 'card-header-success',
     footer: 'ide is jön vmi',
     icon: 'store',
    },
    {
     title: 'Orders',
     content: 'sum1',
     cardClass: 'card-header-danger',
     footer: 'ide is jön vmi',
     icon: 'info_outline',
    },
    {
     title: 'Bills',
     content: 'sum2',
     cardClass: 'card-header-info',
     footer: 'ide is jön vmi',
     icon: 'update',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
