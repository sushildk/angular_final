import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDahboardRoutingModule } from './user-dahboard-routing.module';
import { UserDashbordComponent } from './user-dashbord/user-dashbord.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [UserDashbordComponent, EdituserComponent, ProfileComponent],
  imports: [
    CommonModule,
    UserDahboardRoutingModule,
    ReactiveFormsModule

  ]
})
export class UserDahboardModule { }
