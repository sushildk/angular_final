import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MsgService } from 'src/app/shared/service/msg.service';
import { environment } from 'src/environments/environment';
import { Rooms } from '../../interface/roomSearch';
import { RoomService } from '../../service/room.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  rooms: Rooms
  loading = false;
  fileToUpload= [];
  url: string;

  constructor(
    public router:Router,
    public msgService:MsgService,
    public roomservice:RoomService,
    public authService:AuthService,
    public activatedRoue:ActivatedRoute
    

  ) { 
  this.rooms = {
    _id:'',
      address :"",
      numberOfRoom:0,
      price:'',
      description:'',
      phoneNumber:'',
      categories:'',
      image:[]

  }
 
    this.url = environment.baseUrl + '/room'

  }

  ngOnInit(): void {
    if(!this.rooms){
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
 


  }
addRoomform = new FormGroup({
  address : new FormControl(null),
  numberOfRoom : new FormControl(null),
  price : new FormControl(null),
  description : new FormControl(null),
  phoneNumber : new FormControl(null,[Validators.minLength(10)]),
  categories : new FormControl(null),



})
get addRoomFormControl(){
  return this.addRoomform.controls;

}
// onroomedit(){
//   this.roomservice.editRoom(this.rooms._id,this.addRoomform.value).subscribe(
//     (data:any)=>{
//       this.msgService.showSuccess('updated')
//       this.router.navigate(['/admin/room'])
//     },
//     err=>{
//       this.msgService.showErr(err)
//     }
//   )

// }
onroomedit(){
  if (this.addRoomform.valid){
    console.log("this is from room form" ,this.addRoomform.value)
    this.rooms = this.addRoomform.value

  
    this.roomservice.upload(this.rooms,this.fileToUpload,'PUT',this.url).subscribe(
      (data:any)=>{
    this.addRoomform.reset();
        this.router.navigate(['/admin/room'])
        console.log("data on register",data)
      },
      (err)=>{
        console.log("error from form",err)
        this.msgService.showErr(err.error.message)
      }
    )

    this.msgService.showSuccess('Room Added')
  }
}

fileUpload(event:any){
this.fileToUpload = event.target.files
  console.log('eventttt',event.target.files)

}

}
