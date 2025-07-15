import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'home', component:HomeComponent,
    children:[
      {path: 'index', component:IndexComponent},
      
      {
        path: 'User',
        loadChildren: () => import('./user/user-routing.module').then(c => c.UserRoutingModule)
      },
 {
        path: 'vehicledetail',
        loadChildren: () => import('./vehicledetails/vehicledetails-routing.module').then(c => c.VehicledetailsRoutingModule)
      },

     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
