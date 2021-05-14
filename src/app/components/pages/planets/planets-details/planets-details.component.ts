import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planets } from '@app/shared/inerface/planets.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-planets-details',
  templateUrl: './planets-details.component.html',
  styleUrls: ['./planets-details.component.scss']
})
export class PlanetsDetailsComponent implements OnInit {

  planets:Observable<Planets>;
  
  constructor(private route: ActivatedRoute, private characterSvc: CharacterService, private location:Location) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params)=>{
      const url= params ['id'];
      this.planets = this.characterSvc.getDetailsPlanets(url);
    })
  }
  onGoBack():void{
    this.location.back();
  }

}
