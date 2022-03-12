import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthModule } from './admin-auth.module';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';

const routes: Routes = [{

  path:'',
  component:AdminAuthComponent,
  children:[
    {
      path:'login',
      loadChildren:()=>import('./admin-login/admin-login.module').then(m=>m.AdminLoginModule)
    }
  
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuthRoutingModule { }
