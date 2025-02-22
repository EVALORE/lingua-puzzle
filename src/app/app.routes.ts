import {Routes} from '@angular/router';
import {isUserGuard} from './core/guards/is-user/is-user.guard';
import {skipAuthGuard} from './core/guards/skip-auth/skip-auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then((c) => c.AuthComponent),
    canMatch: [skipAuthGuard],
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
