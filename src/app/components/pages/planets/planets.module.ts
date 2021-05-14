import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsDetailsComponent } from './planets-details/planets-details.component';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';

const myComponents = [
  PlanetsDetailsComponent,
 PlanetsListComponent
]


@NgModule({
  declarations: [
    ...myComponents,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  exports:[
    ...myComponents
  ]
})
export class PlanetsModule { }
