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
    //  content: '102',
     content: '',
     cardClass: 'card-header-warning',
     footer: 'Ügyfelek',
     icon: 'account_circle',
    },
    {
     title: 'Products',
     content: '',
    //  content: '321',
     cardClass: 'card-header-success',
     footer: 'Termékek',
     icon: 'store',
    },
    {
     title: 'Orders',
     content: '',
    //  content: 'sum1',
     cardClass: 'card-header-primary',
     footer: 'Rendelések',
     icon: 'content_paste',
    },
    {
     title: 'Bills',
     content: '',
    //  content: 'sum2',
     cardClass: 'card-header-info',
     footer: 'Számlák',
     icon: 'library_books',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
