import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from 'src/app/shared/service/guard.service';
import { MsgService } from 'src/app/shared/service/msg.service';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.css']
})
export class AdminDashbordComponent implements OnInit {
  users: any;

  constructor(public adminserv:AdminService,
    public msgService:MsgService) { }

  ngOnInit(): void {
    this.adminserv.getAllUser().subscribe(
      (data:any)=>{
        this.users =data;
        console.log('data dash',data)
      }
    ),
    (err:any)=>{
      console.log(err)
    }
  }

  deleteUser(id:string,i:number){
 const confirmRemove = confirm("Are you sure You Want To Delete This User")
if(confirmRemove){
  this.adminserv.removeUser(id).subscribe(
    (user:any)=>{
      this.msgService.showSuccess('Deleted')
      this.users.splice(i,1)
    },
    err=>{
      this.msgService.showErr('Try again')
    }
  )
}

}

}