import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rooms } from 'src/app/admin/interface/roomSearch';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MsgService } from 'src/app/shared/service/msg.service';
import { UserService } from 'src/app/user/service/user.service';

 @Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  rooms : Rooms[] =[]
   address: any;


  constructor(public authservice:AuthService, public router:Router, public msgService:MsgService,
    public userService:UserService
    ) { }

  ngOnInit(): void {
    this.userService.getAllRoom().subscribe(
      (data:any)=>{
        this.rooms =data;
        // this.loading=true;
        console.log("dataFrom room",data)
      }
    )
  }

  LogOut(){
  this.authservice.removeToken();
  this.msgService.showSuccess('logOut Successful')
  this.router.navigate(['/main'])
  localStorage.clear()
}


Search(){
  if(this.address ==""){
    this.ngOnInit()
  }else{
    this.rooms =this.rooms.filter(res=>{
      return res.address.toLocaleLowerCase().match(this.address.toLocaleLowerCase());
    })
  }

}
}
