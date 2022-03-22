import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
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
  styleUrls: ['./edit-room.component.css'],
})
export class EditRoomComponent implements OnInit {
  rooms: Rooms = {
    _id: '',
    image: [],
    address: '',
    numberOfRoom: 0,
    phoneNumber: '',
    price: '',
    description: '',
    categories: '',
  };
  loading = false;
  fileToUpload = [];
  url: string;

  constructor(
    public router: Router,
    public msgService: MsgService,
    public roomservice: RoomService,
    public authService: AuthService,
    public activatedRoue: ActivatedRoute
  ) {
    // this.rooms = {
    //   _id: '',
    //   address: '',
    //   numberOfRoom: 0,
    //   price: '',
    //   description: '',
    //   phoneNumber: '',
    //   categories: '',
    //   image: [],
    // };

    this.url = environment.baseUrl + '/room';
  }

  ngOnInit(): void {
    const roomId = this.activatedRoue.snapshot.params['id'];
    this.roomservice.getById(roomId).subscribe(
      (data: any) => {
        this.rooms = data;
        console.log('roomdata from ', this.rooms);
        this.loading = true;
      },
      (err) => {
        this.msgService.showErr(err);
      }
    );
  }

  addRoomform = new FormGroup({
    address: new FormControl(''),
    numberOfRoom: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    phoneNumber: new FormControl('', [Validators.minLength(10)]),
    categories: new FormControl(''),
  });
  // editRoom() {
  //   this.addRoomFormControl.address.setValue(this.rooms.address);
  // }

  get addRoomFormControl() {
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
  onroomedit() {
    if (this.addRoomform.valid) {
      console.log('this is from room form', this.addRoomform.value);
      // this.rooms = this.addRoomform.value;
      this.rooms = this.checkFormData(this.addRoomform.value, this.rooms);

      this.roomservice
        .upload(this.rooms, this.fileToUpload, 'PUT', this.url)
        .subscribe(
          (data: any) => {
            // this.addRoomform.reset();
            this.router.navigate(['/admin/room']);
            console.log('data on register', data);
          },
          (err) => {
            console.log('error from form', err);
            this.msgService.showErr(err.error.message);
          }
        );

      this.msgService.showSuccess('Room Added');
    }
  }

  fileUpload(event: any) {
    this.fileToUpload = event.target.files;
    console.log('eventttt', event.target.files);
  }
  checkFormData(form: any, room: Rooms) {
    if (form.address) room.address = form.address;
    if (form.numberOfRoom) room.numberOfRoom = form.numberOfRoom;
    if (form.price) room.price = form.price;
    if (form.description) room.description = form.description;
    if (form.phoneNumber) room.phoneNumber = form.phoneNumber;
    if (form.categories) room.categories = form.categories;
    return room;
  }
}
