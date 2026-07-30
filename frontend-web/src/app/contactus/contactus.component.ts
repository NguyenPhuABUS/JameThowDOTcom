import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Contact } from '../entities/contact.entity';
import { ContactService } from '../services/contact.service';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './contactus.component.html',
  host: { 'collision-id': 'ContactUsComponent' }
})
export class ContactUsComponent implements OnInit {
  addContactForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) { }
  ngOnInit(): void {
    this.addContactForm = this.formBuilder.group({
      name: '',
      email: '',
      message: '',
      createdAt: new Date().toISOString(),
    });
  }
  submit() {
    let contact: Contact = this.addContactForm.value as Contact;
    let str_json: string = JSON.stringify(contact);
    let formData = new FormData();
    formData.append('sjson', str_json);
    this.contactService.create(formData).then(
        res => {
            let result: boolean = res['Result'];
            if (!result) {
              alert('Success')
              this.ngOnInit();
            } else {
                alert('Failed');
            }
        },
        err => {
            alert('Failed');
            console.log(err);
        }
    );
}

}
