import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Character } from '@app/shared/inerface/character.interface';
import { CharacterService } from '@app/shared/services/character.service';

import { filter, take } from "rxjs/operators"

type RequesInfo = {
  next: string;
};


@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  charac:any[]=[];
  next: null;
  id:string;


  SelectedCharacter: Character;

  private pageNum = 1;
  private query: string;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;



  constructor(private characterSvc: CharacterService, private route: ActivatedRoute, private router: Router) { this.onUrlChanged() }

  ngOnInit(): void {
    this.route.params.subscribe ( params => {
      this.id = params['termino'];
      this.getMovie(this.id);   
    })

    //this.getCharactersByQuery();
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
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

  getPeop(pageNum:number){
    if (pageNum) {
      this.characterSvc.getPeoples(pageNum)
      .subscribe((lstPeople: Array<Character>)=>{
        this.characters=lstPeople; 
      });
    }
    else{
      alert('No puede estar vacio');
      this.characters=[];
    }
  }

  onSelect(character: Character) {
    this.SelectedCharacter = character;
  }

  
  getMovie(index:string){   
    this.characters.filter(x=>x.name.toLowerCase().includes(index));

    /*this.characterSvc.getPeoples().subscribe(
      data => {
        //Object.values(this.charac).filter(x=>x.name.toLowerCase().includes(index));
        this.charac = this.charac.filter(x=>x.name.toLowerCase().includes(index));
      },
      error=>{
        console.log(error);
      });*/
  }

  private getDataFromService(): void {
    this.characterSvc
      .searchCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res?.results?.length) {
          const { results } = res;
          this.characters = [...this.characters, ...results];
        }
        else {
          this.characters = [];
        }
      });
  }

}
