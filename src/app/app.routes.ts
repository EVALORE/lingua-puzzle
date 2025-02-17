import { Routes } from '@angular/router';
import { isUserGuard } from './core/guards/isUser/is-user.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: '',
    loadComponent: () => import('./puzzle/puzzle.component').then((c) => c.PuzzleComponent),
    canActivate: [isUserGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
