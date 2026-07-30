import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { PaymentService } from '../../../services/payment.service';
import { Package } from '../../../entities/package.entity';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  standalone: true,
  templateUrl: './package.component.html',
  host: { 'collision-id': 'PackageComponent' },
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./package.component.css'],
  imports: [RouterOutlet,
    RouterLink,
    TableModule,
    ButtonModule,
    NgFor,
    DialogModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    DropdownModule,
    TagModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    NgIf,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class PackageComponent implements OnInit {
  packages: Package[];
  pkg: Package;
  @ViewChild('dt2') dt2: Table;
  display: boolean = false;
  addPackageForm: FormGroup;
  editPackageForm: FormGroup;
  editPackageDialog: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.addPackageForm = this.formBuilder.group({
      packageName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      durationMonths: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.loadPackages();
  }

  loadPackages() {
    this.paymentService.findpackage().then(
      res => {
        this.packages = res as any[];
      },
      err => {
        console.log(err);
      }
    );
  }

  show() {
    this.display = true;
  }

  showDialog(pkg: any) {
    this.editPackageForm = this.formBuilder.group({
      packageId: [pkg.packageId],
      packageName: [pkg.packageName, Validators.required],
      price: [pkg.price, [Validators.required, Validators.min(0)]],
      description: [pkg.description, Validators.required],
      durationMonths: [pkg.durationMonths, [Validators.required, Validators.min(0)]],
    });
    this.editPackageDialog = true;
  }

  confirmDelete(packageId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this package?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.paymentService.delete(packageId).then(
          res => {
            let result: boolean = res["result"];
            if (result) {
              this.loadPackages();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Package deleted successfully' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete package' });
            }
          },
          err => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete package' });
          }
        );
      }
    });
  }

  submit() {
    if (this.addPackageForm.valid) {
      const packages = this.addPackageForm.value;
      const formData = new FormData();
      formData.append('sjson', JSON.stringify(packages));

      this.paymentService.createPackage(formData).then(
        res => {
          let result: boolean = res['result'];
          if (result) {
            this.display = false; // Close dialog after successful submission
            this.loadPackages(); // Reload packages
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Package added successfully' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add package' });
          }
        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add package' });
        }
      );
    }
  }

  submitEdit() {
    if (this.editPackageForm.valid) {
      const packages = this.editPackageForm.value;
      const formData = new FormData();
      formData.append('sjson', JSON.stringify(packages));

      this.paymentService.updatePackage(formData).then(
        res => {
          let result: boolean = res['result'];
          if (result) {
            this.editPackageDialog = false; // Close dialog after successful submission
            this.loadPackages(); // Reload packages
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Package updated successfully' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update package' });
          }
        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update package' });
        }
      );
    }
  }

  onGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt2.filterGlobal(inputElement.value, 'contains');
  }

  validateNumber(event: any) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }
}