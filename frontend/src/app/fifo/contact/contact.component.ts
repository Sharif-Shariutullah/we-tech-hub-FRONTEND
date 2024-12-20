import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { contactModel } from 'src/app/_model/contact.model';
import { ClientContactService } from 'src/app/_service/clientContact/client-contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit{
  // 1. injecting the service where i http requests/method are made

  constructor(
    private router: Router,
    private service: ClientContactService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  clientContactObject: contactModel = {
    companyName: '',
    companyAddress: '',
    clientName: '',
    email: '',
    companyPhone: '',
    companyMobileNumber: '',
    message: '',
  };

  // submit button method
  createContact(ContactForm: NgForm) {
    // console.log(this.clientContactObject);



  // Show loading SweetAlert before sending the form
  Swal.fire({
    title: 'Submitting your application...',
    text: 'Please wait while we process your data.',
    allowOutsideClick: false,  // Prevent closing by clicking outside
    didOpen: () => {
      Swal.showLoading();  // Show loading animation
    }
  });

    this.service.createContact(this.clientContactObject).subscribe(
      (response: contactModel) => {
        
        //sweet alert
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "We got your Message!  We Contact with you as soon as possible",
          showConfirmButton: false,
          timer: 2500
        });



        // ContactForm.reset();  
        ContactForm.resetForm();

      },
      (error: HttpErrorResponse) => {
        console.log(error);


        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.'
        });
      }
    );
  }
}
