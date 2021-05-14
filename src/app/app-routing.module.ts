import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',

  },
  {

    path: 'home', loadChildren: () =>
      import('./components/pages/home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'character-list', loadChildren: () =>
      import('./components/pages/characters/character-list/character-list.module').then(m => m.CharacterListModule)
  },
  {
    path: 'character-list/:value', loadChildren: () =>
      import('./components/pages/characters/character-list/character-list.module').then(m => m.CharacterListModule)
  },
  {
    path: 'character-details/:id', loadChildren: () =>
      import('./components/pages/characters/character-details/character-details.module').then(m => m.CharacterDetailsModule)
  },

  { path: 'planets-list', loadChildren: () => import('./components/pages/planets/planets-list/planets-list.module').then(m => m.PlanetsListModule) },

  { path: 'planets-details', loadChildren: () => import('./components/pages/planets/planets-details/planets-details.module').then(m => m.PlanetsDetailsModule) },

  { path: 'register', loadChildren: () => import('./components/register/register.component').then(m => m.RegisterComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
