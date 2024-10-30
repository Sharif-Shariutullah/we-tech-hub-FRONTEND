import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompletedTask } from 'src/app/_model/CompletedTask.model';
import { JobpostService } from 'src/app/_service/jobpost.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-completed-list-component',
  templateUrl: './completed-list-component.component.html',
  styleUrls: ['./completed-list-component.component.scss']
})
export class CompletedListComponentComponent implements OnInit {


  dataSource: MatTableDataSource<any>;
  totalItems: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private jobPostSer: JobpostService,
    private router: Router) {


    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.loadCompletedDetails();
    this.loadJobPosts();
  }

  complete: CompletedTask[] = [];


  jobPost: CompletedTask = {
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





  // table colomn names
  displayedColumns: string[] = [
    '#',
    'ID',
    'Job Title',
    'Salary',
    'Experience',
    'Education',
    'Deadline',
    'Delete',
  ];



  public getAllJobs() {
    this.jobPostSer.getAllJobs().subscribe(
      (response: CompletedTask[]) => {
        console.log(response);

        this.complete = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


  // Method to load completed job details
  loadCompletedDetails(pageIndex: number = 0, pageSize: number = 15) {
    this.jobPostSer
      .getCompletedJobPosts()
      .subscribe((data: any) => {
        this.dataSource.data = data.items;
        this.totalItems = data.total;
      });
  }

  loadJobPosts() {
    this.jobPostSer.getCompletedJobPosts().subscribe((data) => {
      this.complete = data;
    });
  }





  // Method to handle pagination changes
  pageChanged(event: PageEvent) {
    this.loadCompletedDetails(event.pageIndex, event.pageSize);
  }

  deleteCompletedJobPost(id: number) {
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
        this.jobPostSer.deleteCompleteJobPost(id).subscribe(
          (response) => {
            console.log(response);
            this.loadCompletedDetails(); // Refresh the list after deletion
            Swal.fire('Deleted!', 'Your Completed job post has been deleted.', 'success');
            location.reload();

          },
          (error: HttpErrorResponse) => {
            console.error('Error deleting job post:', error);
            Swal.fire('Error!', 'There was an issue deleting the job post.', 'error');
          }
        );
      } else {
        Swal.fire('Cancelled', 'Your job post is safe :)', 'error');
      }
    });
  }
}
