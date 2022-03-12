import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/admin/service/room.service';
import { MsgService } from 'src/app/shared/service/msg.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
premium: any
normal: any
urgent:any
  rooms: any;
  constructor(
    public roomService:RoomService,
    public router:Router,
    public msgService:MsgService
  ) { }

  ngOnInit(): void {
    if(!this.premium){
      this.roomService.getByCategories().subscribe(
        (data:any)=>{
          this.premium=data[0]
          this.urgent =data[1]
          this.normal =data[2]
          console.log("this is data",data)
          this.rooms = data[0].concat(data[1].concat(data[2]))
          let length =this.rooms.length
          this.rooms =this.rooms.splice(4, length-8)
          console.log('ysssss',this.rooms)
        },
        err =>{
          this.msgService.showErr(err)
        }
      )
      
    }
  }

}
