import { JobApplicant } from './../_model/JobApplicant.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASIC_URL = 'https://admin.wetechhub.com/';
// const BASIC_URL = 'http://localhost:8080/';


@Injectable({
  providedIn: 'root'
})
export class JobApplicantService {

  constructor(private httpClient: HttpClient) { }



  // create a new Application with PDF upload
  public applyForNewJob(formData: FormData) {
    return this.httpClient.post<JobApplicant>( BASIC_URL + 'api/applyForNewJob', formData);
  }

  // get or show all Application
  public getAllApplication() {
    return this.httpClient.get<JobApplicant[]>( BASIC_URL +  'api/getAllJobApplicant');
  }

  // Download PDF by applicant ID
  public downloadPdf(applicantId: number) {
    return this.httpClient.get(BASIC_URL + `api/downloadPdf/${applicantId}`, {
      responseType: 'blob'
    });
  }




}

