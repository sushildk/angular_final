import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MsgService } from 'src/app/shared/service/msg.service';
import { BookingService } from '../../service/booking.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-dashbord',
  templateUrl: './user-dashbord.component.html',
  styleUrls: ['./user-dashbord.component.css']
})
export class UserDashbordComponent implements OnInit {
  rooms: any;
  cart: any;
 

  constructor(
    public router:Router,
    public userService:UserService,
    public msgService :MsgService,
    public bookingservice:BookingService

  ) { 

  }

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

      book(id:string){
        this.bookingservice.addBookingRoom(id).subscribe(
          (data:any)=>{
          console.log('bookong data',data)
          },
          err=>{
            this.msgService.showErr(err.error.message)
            console.log('errrrrrrrr',err)
          }
        )
      }


  addTocart(room:any){
    // console.log('cart:',this.cart)
    if(this.cart){
      const roomsId = this.cart.split(', ');
      let check:boolean = true;
      for(let i=0;i<roomsId.length;i++){
        if(roomsId[i] == room._id){
          check = false
        }
       }      
       if(check){
        this.cart = this.cart + ', '+room._id;
        // console.log('cart:',this.cart)
        JSON.stringify(localStorage.setItem('cart',this.cart))
        // this.getCartId(localStorage.getItem('cart'));
       }else{
         this.msgService.showInfo('Youhave already added this room')
       }

    }
    else{
      // console.log('room:',room)
      this.cart = room._id;
      // console.log("append cart:",this.cart)
      JSON.stringify(localStorage.setItem('cart',this.cart))
    }
    // const cartRooomssss = this.getCartId()
    // console.log('haha:',cartRooomssss)
  }




}
