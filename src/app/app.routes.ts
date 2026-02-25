import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing-page/pricing-page'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page'),
  },
  {
    path: 'pokemons',
    loadComponent: () => import('./pages/pokemons-page/pokemons-page'),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon-page/pokemon-page'),
  },
  {
    path: '**',
    redirectTo: () => {
      return 'about';
    },
  },
];
