import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StationComponent} from "./station/station.component";

const routes: Routes = [
  {
    path: 'station/:id/:state',
    component: StationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
