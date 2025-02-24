import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { appGuard } from './core/guards/app/app.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canMatch: [authGuard],
    loadComponent: () => import('./auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: '',
    canMatch: [appGuard],
    loadComponent: () => import('./puzzle/puzzle.component').then((c) => c.PuzzleComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
