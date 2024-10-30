import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { jobPosting } from 'src/app/_model/jobPosting.model';
import { JobpostService } from 'src/app/_service/jobpost.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-careerlist',
  templateUrl: './careerlist.component.html',
  styleUrls: ['./careerlist.component.scss'],
})
export class CareerlistComponent implements OnInit {


  dataSource: MatTableDataSource<any>; // Replace `any` with your specific model type
  totalItems: number = 0; // Total number of items for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild to access paginator

  loadJobDetails(pageIndex: number = 0, pageSize: number = 15) {
    this.jobPostSer
      .getAllJobsPages(pageIndex, pageSize)
      .subscribe((data: any) => {
        this.dataSource.data = data.items; // Assuming your API returns an array of items
        this.totalItems = data.total; // Assuming your API returns the total count of items
      });
  }

  // Method to handle pagination changes
  pageChanged(event: PageEvent) {
    this.loadJobDetails(event.pageIndex, event.pageSize);
  }

  // #--------------Backend--------------

  // object

  jobPost: jobPosting = {
    jobTitle: '',
    jobDescription: '',
    salary: "",
    experienceRequired: "",
    educationQualification: '',
    applicationDeadline: '',
    contactInformation:
      ' 92, Ali Bhaban, Lift 3 & 5, Kazi Nazrul Islam Avenue, Kawran Bazar, Dhaka   ||  +88-02-44810012-3 & +880 1927 666 222 ',

    responsibilities: [],
    requirements: [],
    whatWeOffer: [],

    postTime: "",
  };

  // injecting the service where i http requests/method are made
  constructor(
    private jobPostSer: JobpostService, 
    private router: Router) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.getAllJobs();
    this.loadJobDetails(); // Load initial data
  
  this.loadJobPosts();
  }

  // data source which is array
  jobDetails: jobPosting[] = [];

  // table colomn names
  displayedColumns: string[] = [
    '#',
    'ID',
    'Job Title',
    'Job Description',
    'Salary',
    'Experience',
    'Education',
    'Deadline',
    'Contact',
    'Responsibility',
    'Requirements',
    'What We Offer',
    'Edit',
    'Delete',
  ];

  public getAllJobs() {
    this.jobPostSer.getAllJobs().subscribe(
      (response: jobPosting[]) => {
        console.log(response);

        this.jobDetails = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }




  deleteJobPost(id: number) {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirmed, proceed with the deletion
        this.jobPostSer.deleteJobPost(id).subscribe(
          (response) => {
            console.log(response);
            this.getAllJobs(); // Refresh the list after deletion
            Swal.fire(
              'Deleted!',
              'Your job post has been deleted.',
              'success'
            );
          },
          (error: HttpErrorResponse) => {
            console.error('Error deleting job post:', error);
            Swal.fire(
              'Error!',
              'There was an issue deleting the job post.',
              'error'
            );
          }
        );
      } else {
        // User canceled the deletion
        Swal.fire(
          'Cancelled',
          'Your job post is safe :)',
          'error'
        );
      }
    });
  }
  




  // editJobPost
  editJobPost(id) {
    this.router.navigate(['/career-edit', id]);
    console.log(id);
  }









loadJobPosts() {
  this.jobPostSer.getActiveJobPosts().subscribe((data) => {
    this.jobDetails = data;
  });
}



}
