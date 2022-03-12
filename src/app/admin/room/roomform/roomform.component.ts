import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/shared/service/msg.service';
import { RoomService } from '../../service/room.service';
import{AuthService } from './../../../auth/service/auth.service'

@Component({
  selector: 'app-roomform',
  templateUrl: './roomform.component.html',
  styleUrls: ['./roomform.component.css']
})
export class RoomformComponent implements OnInit {
  room: any;


  constructor(
    public router:Router,
    public msgService:MsgService,
    public roomservice:RoomService,
    public authService:AuthService,
    

  ) { }

  ngOnInit(): void {
  }
addRoomform = new FormGroup({
  address : new FormControl(null,[Validators.required]),
  numberOfRoom : new FormControl(null,[Validators.required]),
  price : new FormControl(null,[Validators.required]),
  description : new FormControl(null,[Validators.required]),
  phoneNumber : new FormControl(null,[Validators.required,Validators.minLength(10)]),
  categories : new FormControl(null,[Validators.required]),



})
get addRoomFormControl(){
  return this.addRoomform.controls;

}

onRegister(){
  if (this.addRoomform.valid){
    console.log("this is from room form" ,this.addRoomform.value)
    this.room = this.addRoomform.value

    this.roomservice.addroom(this.room).subscribe(
      (data:any)=>{
        this.addRoomform.reset();
        this.router.navigate(['/admin/room'])
      }
    )

    this.msgService.showSuccess('Room Added')
  }
}

}



