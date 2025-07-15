import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicledetailaddComponent } from './vehicledetailadd/vehicledetailadd.component';
import { VehicledetaildetailComponent } from './vehicledetaildetail/vehicledetaildetail.component';

const routes: Routes = [
  {
  path:'add',
  component:VehicledetailaddComponent
},
{
  path:'details',
  component:VehicledetaildetailComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicledetailsRoutingModule { }
