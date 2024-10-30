import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jobPosting } from '../_model/jobPosting.model';
import { Observable } from 'rxjs';
import { CompletedTask } from '../_model/CompletedTask.model';

const BASIC_URL = 'https://admin.wetechhub.com/';
// const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class JobpostService {

  constructor(private httpClient: HttpClient) {}

  // create
  public createJob(jobPost: jobPosting): Observable<jobPosting>  {
    return this.httpClient.post<jobPosting>(
      BASIC_URL + 'api/admin/postNewJob',
      jobPost
    );
  }

  // Fetch all jobs
  public getAllJobs(): Observable<jobPosting[]> {
    return this.httpClient.get<jobPosting[]>(
      BASIC_URL + 'api/admin/getAllJobPosts'
    );
  }

  // public getAllJobsPages(pageIndex: number = 0, pageSize: number = 15) {
  //   return this.httpClient.get<jobPosting[]>(
  //     BASIC_URL + 'api/admin/getAllJobPosts'
  //   );
  // }



  // Get Jobs with Pagination
  public getAllJobsPages(pageIndex: number = 0, pageSize: number = 15): Observable<any> {
    return this.httpClient.get<any>(
      BASIC_URL + 'api/admin/getAllJobPosts?page=${pageIndex}&size=${pageSize}'
    );
  }




// Delete job post
  public deleteJobPost(id: number) {
    return this.httpClient.delete(BASIC_URL + `api/admin/deleteJobPost/${id}`);
  }

  // Delete job post
  public deleteCompleteJobPost(id: number) {
    return this.httpClient.delete(BASIC_URL + `api/admin/deleteCompleteJobPost/${id}`);
  }

    // Fetch job post by ID
  public getJobPostById(id: number) {
    return this.httpClient.get<jobPosting>(
      BASIC_URL + `api/admin/getJobPostById/${id}`
    );
  }


  public updateJobPost(id: number, updatedJobPost: jobPosting) {
    return this.httpClient.put<jobPosting>(
      BASIC_URL + `api/admin/updateJobPost/${id}`,
      updatedJobPost
    );
  }

   // Fetch active job posts
   public getActiveJobPosts(): Observable<jobPosting[]> {
    return this.httpClient.get<jobPosting[]>(BASIC_URL + `api/admin/job-postings`);
  }

    // Fetch completed job posts
    public getCompletedJobPosts(): Observable<CompletedTask[]> {
    return this.httpClient.get<CompletedTask[]>(BASIC_URL + `api/admin/getAllCompletedTasks`);
  }



}
