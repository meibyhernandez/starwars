import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  template: `
  <div class="container">
    <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" #buscarTexto>
                <button (click)="onSearch(buscarTexto.value)" class="btn btn-outline-primary" type="button">Buscar</button>
            </form> 
  </div>
  `,
  styles: ['input {width:100%}, {padding: 40px}'],
})
export class FormSearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSearch(value: string) {
   
      this.router.navigate(['/character-list', value], {
       queryParams: { q: value },
      });
    
  }
}
