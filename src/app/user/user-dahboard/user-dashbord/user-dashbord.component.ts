import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MsgService } from 'src/app/shared/service/msg.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-dashbord',
  templateUrl: './user-dashbord.component.html',
  styleUrls: ['./user-dashbord.component.css']
})
export class UserDashbordComponent implements OnInit {
  rooms: any;

  constructor(
    public router:Router,
    public userService:UserService,
    public msgService :MsgService

  ) { }

  ngOnInit(): void {
    this.userService.getAllRoom().subscribe(
      (data:any)=>{
        this.rooms =data
        console.log("user dashbord",data)
      }
    )
  }

  onAdd(){
    this.router.navigate(['/admin/room/addroom'])
      }


}
