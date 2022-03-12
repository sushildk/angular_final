import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MsgService } from 'src/app/shared/service/msg.service';
import { RoomService } from '../../service/room.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  rooms: any;
  loading = false;

  constructor(
    public router:Router,
    public msgService:MsgService,
    public roomservice:RoomService,
    public authService:AuthService,
    public activatedRoue:ActivatedRoute
    

  ) { }

  ngOnInit(): void {
    const roomId = this.activatedRoue.snapshot.params["id"]
    this.roomservice.getById(roomId).subscribe(
      (data:any)=>{
        this.rooms =data
        console.log("roomdata from ", this.rooms)
        this.loading=true;
      },
      err=>{
        this.msgService.showErr(err)
      }
    )


  }
addRoomform = new FormGroup({
  address : new FormControl(''),
  // numberOfRoom : new FormControl(''),
  // price : new FormControl(''),
  // description : new FormControl(''),
  // phoneNumber : new FormControl('',[Validators.minLength(10)]),
  // categories : new FormControl(''),



})
get addRoomFormControl(){
  return this.addRoomform.controls;

}
onedit(){
  console.log(this.addRoomform.value)
  this.roomservice.editRoom(this.rooms.id,this.addRoomform.value).subscribe(
    (data:any)=>{
      this.msgService.showSuccess('updated')
      this.router.navigate(['/admin/room'])
    },
    err=>{
      this.msgService.showErr(err)
    }
  )

}

}
