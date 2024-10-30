import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FifoServicesModel } from 'src/app/_model/servicePost.model';

@Injectable({
  providedIn: 'root'
})
export class ServicePostService {


  constructor(private httpClient: HttpClient) {}


  
  // create 
  public createFifoService(fifoSerMod: FifoServicesModel) {
    return this.httpClient.post<FifoServicesModel>(
      'https://admin.wetechhub.com/api/admin/postService',
      fifoSerMod
    );
  }


  // get/show all 
  public getAllFifoServices() {
    return this.httpClient.get<FifoServicesModel[]>(
      'https://admin.wetechhub.com/api/admin/getAllServices'
    );
  }

  //delete 
  public deleteFifoServices(id: number) {
    return this.httpClient.delete(
      `https://admin.wetechhub.com/api/admin/deleteService/${id}`
    );
    // return this.httpClient.delete("https://admin.wetechhub.com/api/admin/deleteService/"+id);
  }




  
  // edit
  public getFifoServiceById(id) {
    return this.httpClient.get<FifoServicesModel>(
      `https://admin.wetechhub.com/api/getServiceById/${id}`
    );
    // return this.httpClient.get<jobPosting>("https://admin.wetechhub.com/api/getServiceById/"+id));
  }
}
