import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSource = new Subject<{ severity: string, summary: string, detail: string }>();
  message$ = this.messageSource.asObservable();

  sendMessage(severity: string, summary: string, detail: string) {
    this.messageSource.next({ severity, summary, detail });
  }
}
