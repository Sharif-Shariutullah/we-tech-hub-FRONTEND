import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jobPosting } from 'src/app/_model/jobPosting.model';
import { JobpostService } from 'src/app/_service/jobpost.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-post-edit',
  templateUrl: './job-post-edit.component.html',
  styleUrls: ['./job-post-edit.component.scss'],
})
export class JobPostEditComponent implements OnInit {



  constructor(
    private jobPostSer: JobpostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  // ngOnInit(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.editJobPostById(+id);
  //   }
  // }

  jobPost: jobPosting;
  id: number;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.jobPostSer.getJobPostById(this.id).subscribe((data: jobPosting) => {
      this.jobPost = data; // Pre-fill the form with existing data
    });
  }

  careerModel: jobPosting[] = [];
  errorMessage: string | null = null; // To hold any error messages
  model: jobPosting | null = null;








  public getAllJobs() {
    this.jobPostSer.getAllJobs().subscribe(
      (response: jobPosting[]) => {
        console.log(response);

        this.careerModel = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  editJobPostById(id: number): void {
    this.jobPostSer.getJobPostById(id).subscribe({
      next: (data) => {
        this.model = data;
        console.log('--------' + this.model);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }






  // keep typing 
  trackByIndex(index: number, obj: any): any {
    return index; // or return obj.id if you have a unique identifier
}


  // Method to add a new responsibility field
  addResponsibility() {
    this.jobPost.responsibilities.push('');
  }


 // Method to remove a responsibility by index
  removeResponsibility(index: number) {
    this.jobPost.responsibilities.splice(index, 1);
  }







  // Method to add a new responsibility field
  addRequirements() {
    this.jobPost.requirements.push('');
  }


 // Method to remove a responsibility by index
  removeRequirements(index: number) {
    this.jobPost.requirements.splice(index, 1);
  }






  // Method to add a new responsibility field
  addWhatWeOffer() {
    this.jobPost.whatWeOffer.push('');
  }


 // Method to remove a responsibility by index
  removeWhatWeOffer(index: number) {
    this.jobPost.whatWeOffer.splice(index, 1);
  }













  // submit button method
  UpdateJobPost(jobPostingForm: NgForm) {
  

    this.jobPostSer.updateJobPost(this.id, this.jobPost).subscribe(
      (response) => {
      
        console.log('Job post updated successfully', response);


    Swal.fire({
      icon: "success",
      title: "Update",
      text: "Successfully updated Career",
      showConfirmButton: false,
      timer: 2500
    });


        // this.getAllJobs();
        this.router.navigate(['/admin/careerList']);
        jobPostingForm.reset();
      },
              (error: HttpErrorResponse) => { 
                console.error('Error updating job post', error);

                
                Swal.fire({
                                  icon: 'error',
                                  title: 'Oops...',
                                  text: 'Something went wrong! Please think what is your mistake.'
                                });
                
                console.log(error); }
    );
  }










}
