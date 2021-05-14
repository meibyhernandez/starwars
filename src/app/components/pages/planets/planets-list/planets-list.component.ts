import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Planets } from '@app/shared/inerface/planets.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { filter, take } from 'rxjs/operators';

type RequesInfo = {
  next: string;
};


@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {


  planets: Planets[] = [];
  planetas:Array<Planets>=[];

  next: null;
  id:string;

  private pageNum = 1;
  private query: string;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(private characterSvc: CharacterService, private route: ActivatedRoute, private router: Router) { this.onUrlChanged()}

  ngOnInit(): void {
    

    var ships=this.getPlanets(1);
    ships;
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.planets = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      });
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => {
      this.query = params['q'];
      this.getDataFromService();
    });
  }

  

  getPlanets(pageNum:number){
    if (pageNum) {
      this.characterSvc.getPlanets(pageNum)
      .subscribe((lstPlanets: Array<Planets>)=>{
        this.planetas=lstPlanets; 
      });
    }
    else{
      alert('No puede estar vacio');
      this.planetas=[];
    }
  }


  

  private getDataFromService(): void {
    this.characterSvc
      .searchPlanets(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res?.results?.length) {
          const { results } = res;
          this.planets = [...this.planets, ...results];
        }
        else {
          this.planets = [];
        }
      });
  }

}
