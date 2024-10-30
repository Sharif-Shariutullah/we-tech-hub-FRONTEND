import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { teamModel } from 'src/app/_model/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) {}
  
  // create 
  public createTeam(team: teamModel) {
    return this.httpClient.post<teamModel>(
      'https://admin.wetechhub.com/api/admin/postNewTeamMember',
      team
    );
  }

  // get/show 
  public getAllTeam() {
    return this.httpClient.get<teamModel[]>(
      'https://admin.wetechhub.com/api/admin/getAllTeamMember'
    );
  }

  //delete 
  public deleteTeam(id: number) {
    return this.httpClient.delete(
      `https://admin.wetechhub.com/api/admin/deleteTeamMember/${id}`
    );
    // return this.httpClient.delete("https://admin.wetechhub.com/api/admin/deleteTeamMember/"+id);
  }




  
  // edit 
  public getTeamById(id) {
    return this.httpClient.get<teamModel>(
      `https://admin.wetechhub.com/api/getTeamMemberById/${id}`
    );
    // return this.httpClient.get<teamModel>("https://admin.wetechhub.com/api/getTeamMemberById/"+id));
  }
}
