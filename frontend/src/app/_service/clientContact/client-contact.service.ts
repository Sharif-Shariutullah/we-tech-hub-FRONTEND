import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contactModel } from 'src/app/_model/contact.model';


const BASIC_URL = 'https://admin.wetechhub.com/';
// const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ClientContactService {

  constructor(private httpClient: HttpClient) { }



  // create 
  public createContact(model: contactModel) {
    return this.httpClient.post<contactModel>(
      BASIC_URL + 'api/createContact',
      model
    );
  }

  // get/show 
  public getAllClientsContact() {
    return this.httpClient.get<contactModel[]>(
      BASIC_URL +  'api/getAlClientsContact'
    );
  }



}
