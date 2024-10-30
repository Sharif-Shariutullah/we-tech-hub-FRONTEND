import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { newsPostModel } from 'src/app/_model/newsPost.model';

const BASIC_URL = "https://admin.wetechhub.com/";
// const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class NewsPostService {
  constructor(private http: HttpClient) {}

  addNews(NewsDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/postNews', NewsDto);
  }

  getAllNews(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/news');
  }

  deleteNews(id: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/news/${id}`);
  }

  getNewsById(id: number): Observable<newsPostModel> {
    return this.http.get<newsPostModel>(
      BASIC_URL + `api/admin/news/details/${id}`
    );
  }

  // Update news by ID
  updateNews(id: number, NewsDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/admin/news/${id}`, NewsDto);
  }


}
