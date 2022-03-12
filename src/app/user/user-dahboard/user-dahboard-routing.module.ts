import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdituserComponent } from './edituser/edituser.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDashbordComponent } from './user-dashbord/user-dashbord.component';

const routes: Routes = [
  {
    path:'',
    component:UserDashbordComponent
  },
  {
    path:'editUser/:id',
    component:EdituserComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDahboardRoutingModule { }
