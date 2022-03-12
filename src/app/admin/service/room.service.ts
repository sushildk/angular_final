import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
url:string
  token: string;
  constructor(
    public http:HttpClient
  ) {
    this.url = environment.baseUrl + '/room'
    this.token =localStorage.getItem('token')!
   }


   getOptions(){
     return{

       headers :new HttpHeaders({
         'Content-Type':'application/json',
         'token':this.token
       })
     }
   }
   addroom(data:any){
     return this.http.post(`${this.url}`,data,this.getOptions())

   }
   editRoom(id:string,data:any){
    return this.http.put(`${this.url}/${id}`,data,this.getOptions())
   }
   removeRoom(id:string){
     return this.http.delete(`${this.url}/${id}`,this.getOptions())

   }
   getById(id:string){
     return this.http.get(`${this.url}/${id}`,this.getOptions())
   }
   getByCategories(){
     return this.http.get(`${this.url}/categories`,this.getOptions())
   }
}
