import { Component, Input, OnInit } from '@angular/core';

export interface InfoCard {
  icon: string;
  cardClass: string;
  title: string;
  content: any;
  footer: string;
}

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  @Input() icon: string = '';
  @Input() cardClass: string = 'card-header-warning';
  @Input() title: string = 'title';
  @Input() content: any = '';
  @Input() footer: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
