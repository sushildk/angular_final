import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHeaderComponent } from './layout/user-header/user-header.component';
import { UserFooterComponent } from './layout/user-footer/user-footer.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './service/user.service';


@NgModule({
  declarations: [UserHeaderComponent, UserFooterComponent, UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule

  ],
  providers:[UserService]
})
export class UserModule { }
