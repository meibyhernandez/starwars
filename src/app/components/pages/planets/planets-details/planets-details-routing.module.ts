import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsDetailsComponent } from './planets-details.component';

const routes: Routes = [{ path: '', component: PlanetsDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetsDetailsRoutingModule { }
