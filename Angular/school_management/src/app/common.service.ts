import { Injectable } from '@angular/core';
import {Observable,BehaviorSubject} from 'rxjs';
import { HttpClient , HttpHeaders , } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient:HttpClient) { }

  registerSubmit(register:any){
    console.log("Working COmmon Service",register)
    return this.httpClient.post(environment.apiurl+'register/registrationSubmitData', (register))
  }

  loginUser(login:any){
    console.log(login);
    return this.httpClient.post(environment.apiurl+'login/loginUser', (login))
  }

  getUserData(){
    return this.httpClient.get(environment.apiurl+'register/getUserData')
  }

  deleteUser(id:any){
    console.log(id);
    
    return this.httpClient.post(environment.apiurl+'register/deleteUser',{id:id})
  }

  editUser(id:any){
    return this.httpClient.post(environment.apiurl+'edit/editUser',{id:id})
  }

  updateUser(selectedId:any,editform:any){
    console.log("common update");
    
    return this.httpClient.post(environment.apiurl+'edit/updateUser',{selectedId:selectedId,editform:editform})
  }

  uploadProfilePic(value:any){
    return this.httpClient.post(environment.apiurl+'register/profile',value)
  }

  updateProfilePic(value:any){
    return this.httpClient.post(environment.apiurl+'register/updateUser',value)
  }
}