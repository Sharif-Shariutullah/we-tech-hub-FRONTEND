import { Component, OnInit } from '@angular/core';
import { jobPosting } from '../_model/jobPosting.model';
import { JobpostService } from '../_service/jobpost.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-career-view-list',
  templateUrl: './career-view-list.component.html',
  styleUrls: ['./career-view-list.component.scss']
})
export class CareerViewListComponent implements OnInit{


  jobPost: jobPosting;

constructor( 
  private jobPostSer: JobpostService,
  private router: Router,
  private activatedRoute : ActivatedRoute
){ }






ngOnInit(): void {
this.jobPost = this.activatedRoute.snapshot.data['jobPosting'];
console.log(this.jobPost);
  this.getAllJobs();
}





  // data source which is array 
  jobDetails: jobPosting[] = [];

  // table colomn names 
  displayedColumns: string[] = ['ID', 'Job Title', 'Job Description', 'Salary', 'Experience', 'Education', 'Deadline', 'Contact', 'Edit', 'Delete'];


  public getAllJobs() {

    this.jobPostSer.getAllJobs().subscribe(
      (response: jobPosting[]) => {
        console.log(response);

        this.jobDetails = response;

      }, (error: HttpErrorResponse) => { console.log(error); }


    );
  }

}
