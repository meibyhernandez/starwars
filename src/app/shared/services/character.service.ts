import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '@environment/environment';
import {Character} from '@shared/inerface/character.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Planets } from '../inerface/planets.interface';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http:HttpClient) { }

  searchCharacters(query='', page=2){
    const filter=`${environment.baseUrlAPI}/?name=${query}&page=${page}`
    return this.http.get<Character[]>(filter);
  }

  searchPlanets(query='', page=2){
    const filter=`${environment.baseUrlAPI2}/?name=${query}&page=${page}`
    return this.http.get<Planets[]>(filter);
  }

  getPeoples(page:number):Observable<Array<Character>>{
    const lstPeople: Array<Character>=[];
    const urlPeople  = `${environment.baseUrlAPI}/?page=${page}`;
    
    return this.http.get<any>(urlPeople).pipe(
      map(people => {
        (people.results as Array<any>).forEach((registro: any) => {
           lstPeople.push({
             name: registro.name,
            height: registro.height,
            mass: registro.mass,
            url: registro.url
          });
        });
        return lstPeople;
         })
          );
  }

  getPlanets(page:number):Observable<Array<Planets>>{
    const lstPlanets: Array<Planets>=[];
    const urlPlanets  = `${environment.baseUrlAPI2}/?page=${page}`;
    
    return this.http.get<any>(urlPlanets).pipe(
      map(plane => {
        (plane.results as Array<any>).forEach((registro: any) => {
           lstPlanets.push({
             name: registro.name,
            rotation_period:registro.rotation_period,
            diameter:registro.diameter,
            climate:registro.climate,
            terrain:registro.terrain,
            population:registro.population,
            url: registro.url
          });
        });
        return lstPlanets;
         })
          );
  }

  getDetails(url:string){
    return this.http.get<Character>(`${url}`)
  }

  getDetailsPlanets(url:string){
    return this.http.get<Planets>(`${url}`)
  }

 




}
