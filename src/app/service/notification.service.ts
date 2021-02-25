import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title)
  }

  showHTMLMessage(message: string, title: string, timespan: number) {
    this.toastr.success(message, title, {
      enableHtml: true,
      timeOut: timespan
    })
  }

  showSuccessWithTimeout(message: string, title: string, timespan: number) {
    this.toastr.success(message, title, {
      enableHtml: true,
      timeOut: timespan
      // titleClass: tClass,
      // messageClass: tClass,
    })
  }
}
