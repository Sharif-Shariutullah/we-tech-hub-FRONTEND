import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { videoPostModel } from 'src/app/_model/videoPost.model';

@Injectable({
  providedIn: 'root'
})
export class VideoPostService {


  constructor(private httpClient: HttpClient) {}

  // create 
  public createVideo(videoMod: videoPostModel) {
    return this.httpClient.post<videoPostModel>(
      'https://admin.wetechhub.com/api/admin/postNewVideo',
      videoMod
    );
  }

  // get/show 
  public getAllVideo() {
    return this.httpClient.get<videoPostModel[]>(
      'https://admin.wetechhub.com/api/admin/getAllVideo'
    );
  }

  //delete 
  public deleteVideo(id: number) {
    return this.httpClient.delete(
      `https://admin.wetechhub.com/api/admin/deleteVideo/${id}`
    );
  }



  
  // edit 
  public getVideoById(id) {
    return this.httpClient.get<videoPostModel>(
      `https://admin.wetechhub.com/api/getVideoById/${id}`
    );
  }

}