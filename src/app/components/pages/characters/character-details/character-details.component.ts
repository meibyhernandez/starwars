import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@app/shared/inerface/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  characters:Observable<Character>;

  constructor(private route: ActivatedRoute, private characterSvc: CharacterService, private location:Location) { }

  ngOnInit(): void {

    this.route.params.pipe(take(1)).subscribe((params)=>{
      const url= params ['id'];
      this.characters = this.characterSvc.getDetails(url);
    })
  }

  onGoBack():void{
    this.location.back();
  }

  @Input()
  character: Character;

}
