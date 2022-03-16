import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MsgService } from 'src/app/shared/service/msg.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  constructor(public authservice:AuthService, public router:Router, public msgService:MsgService) { }

  ngOnInit(): void {
  }

  LogOut(){
  this.authservice.removeToken();
  this.msgService.showSuccess('logOut Successful')
  this.router.navigate(['/main'])
  localStorage.clear()
}
}
