import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface photoUploadModel {
  id: number;
  title: string;
  subtitle: string;
  postDate: string; 
  details: string;
  images: ImageGallery[];
  thumbnailImage: string; 
}

interface ImageGallery {
  img: string; 
  caption: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhotoUploadService {




  constructor(private http: HttpClient) {}

  private baseUrl = 'https://admin.wetechhub.com/api/admin'; 
  // private baseUrl = 'http://localhost:8080/api/admin'; 





  public createGallery(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/createGallery`, formData)
  }


  public getAllGallery(): Observable<photoUploadModel[]> {
    return this.http.get<photoUploadModel[]>(`${this.baseUrl}/getAllGallery`).pipe(
      catchError(this.handleError) // Handle any errors here
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }



  public deleteGallery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteGallery/${id}`);
  }


  
  public getGalleryById(id: number) : Observable<photoUploadModel> {
    return this.http.get<photoUploadModel>(
       `${this.baseUrl}/getGalleryById/${id}`
    );
  }

  public updateGallery(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateGallery/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }
  



}
