import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth/auth.guard';
import { appGuard } from '@core/guards/app/app.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canMatch: [authGuard],
    loadComponent: () => import('./features/auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: '',
    canMatch: [appGuard],
    loadComponent: () => import('./features/game/game.component').then((c) => c.GameComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
