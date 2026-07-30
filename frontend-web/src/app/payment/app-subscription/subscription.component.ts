import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NgxPayPalModule, IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OrderService } from '../../services/payment.service';
import { PackageService } from '../../services/package.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Package } from '../../entities/package.entity';
import { DialogModule } from 'primeng/dialog';
import { NotificationService } from '../../services/Notification.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgxPayPalModule, HttpClientModule, CommonModule, DialogModule],
  templateUrl: './subscription.component.html'
})
export class SubscriptionComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  public packages: Package[] = [];
  public selectedPackage: Package | null = null;
  public displayDialog: boolean = false;
  private isBrowser: boolean;

  constructor(
    private orderService: OrderService, 
    private packageService: PackageService, 
    private router: Router,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadPackages();
  }

  private loadPackages(): void {
    this.packageService.findAll().then(packages => {
      this.packages = packages;
    }).catch(error => {
      console.error('Error loading packages', error);
    });
  }

  public selectPackage(pkg: Package): void {
    this.selectedPackage = pkg;
    if (this.isBrowser) {
      this.displayDialog = true;
    }
  }

  private initConfig(pkg: Package): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'Afc_7E2coq0MkrS-hyvJDYf5ywoXWN3h6VlEvtMeCXkzYq4AoU0FlyRwVix0x9_cEd_TZ6u4eceDXY6k',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: pkg.price.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: pkg.price.toString()
              }
            }
          },
          items: [{
            name: pkg.packageName,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'USD',
              value: pkg.price.toString(),
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        actions.order.get().then(details => {
          console.log('Order approved but not authorized', details);
          this.saveOrder(details, pkg);
        });
      },
      onClientAuthorization: (data) => {
        console.log('Order completed', data);
        this.notificationService.sendMessage('success', 'Success', 'Order completed successfully');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.notificationService.sendMessage('info', 'Cancelled', 'Order was cancelled');
      },
      onError: err => {
        console.log('OnError', err);
        this.notificationService.sendMessage('error', 'Error', 'An error occurred during the payment process');
      },
      onClick: (data, actions) => {
        const username = sessionStorage.getItem('username');
        if (!username) {
          alert('Bạn chưa đăng nhập');
          this.router.navigate(['/login']);
          return actions.reject();
        }
        console.log('onClick', data, actions);
        return actions.resolve();
      }
    };
  }

  private saveOrder(details: any, pkg: Package): void {
    const paymentData = {
      Username: sessionStorage.getItem('username'),
      Amount: details.purchase_units[0].amount.value,
      PaymentMethod: 'PayPal',
      PackageId: pkg.packageId
    };

    const formData = new FormData();
    for (const key in paymentData) {
      if (paymentData.hasOwnProperty(key)) {
        formData.append(key, paymentData[key] as string);
      }
    }

    this.orderService.updateSubscriptionAndSavePayment(formData).then(response => {
      console.log('Order saved successfully', response);
      this.notificationService.sendMessage('success', 'Success', 'Order saved successfully');
    }).catch(error => {
      console.error('Error saving order', error);
      this.notificationService.sendMessage('error', 'Error', 'Failed to save order');
    });
  }

  public closeDialog(): void {
    this.displayDialog = false;
    this.selectedPackage = null;
    this.payPalConfig = undefined;
  }

  public onDialogShow(): void {
    if (this.selectedPackage) {
      this.initConfig(this.selectedPackage);
    }
  }
}
