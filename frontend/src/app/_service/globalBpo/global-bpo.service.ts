import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { globalBpoModel } from 'src/app/_model/globalBpo.model';


// Model of ImageGB

interface ImageGB {
  img: string; 
  caption: string;
}

interface GlobalBPO {
  id: number;
  title: string;
  subtitle: string;
  postDate: string; 
  details: string;
  images: ImageGB[];
  thumbnailImage: string; 
}


@Injectable({
  providedIn: 'root'
})
export class GlobalBpoService {


  
  private baseUrl = 'https://admin.wetechhub.com/api/admin'; 
  // private baseUrl = 'http://localhost:8080/api/admin'; 

  constructor(private http: HttpClient) {}


  public createGlobalBPO(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/createGlobalBPO`, formData)
  }


  public getAllGlobalBPOs(): Observable<GlobalBPO[]> {
    return this.http.get<GlobalBPO[]>(`${this.baseUrl}/getAllGlobalBPOs`).pipe(
      catchError(this.handleError) // Handle any errors here
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Log the error or display a user-friendly message
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }



  public deleteGlobalBPO(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteGlobalBPO/${id}`);
  }


  
  public getGlobalBPOById(id: number) : Observable<globalBpoModel> {
    return this.http.get<globalBpoModel>(
       `${this.baseUrl}/getGlobalBPOById/${id}`
    );
  }

  public updateGlobalBPO(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateGlobalBPO/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }
  







}

