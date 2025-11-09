import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { PokemonDetailPage } from './pages/pokemon-detail/pokemon-detail.page';

export const routes: Routes = [
  // {
  //   path: 'home',
  //   loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: HomePage
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailPage
  }
];
