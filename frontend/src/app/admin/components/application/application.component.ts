import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { jobPosting } from 'src/app/_model/jobPosting.model';
import { JobpostService } from 'src/app/_service/jobpost.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit{


  // object 

  jobPost: jobPosting = {

    jobTitle: "",
    jobDescription: "",
    salary: "",
    experienceRequired:  "",
    educationQualification: "",
    applicationDeadline: "",
    contactInformation: " 92, Ali Bhaban, Lift 3 & 5, Kazi Nazrul Islam Avenue, Kawran Bazar, Dhaka   ||  +88-02-44810012-3 & +880 1927 666 222 ",
    
   


    responsibilities: [],
    requirements: [],    
    whatWeOffer: [],

    postTime: "",

  }

  // injecting the service where i http requests/method are made
  constructor(
    private jobPostSer: JobpostService,
    private router: Router
    ) {  }

  ngOnInit(): void {
    
  }




  // submit button method
  createJob(jobPostingForm: NgForm) {
    // console.log(this.jobPost);

    this.jobPostSer.createJob(this.jobPost).subscribe(
      (response: jobPosting) => {
        console.log(response);
      
        // this.getAllJobs();
        this.router.navigate(['/admin/careerList']);
        jobPostingForm.reset();
      },
              (error: HttpErrorResponse) => { console.log(error); }
    );
  }







}
