import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { StartPageComponent } from './start/pages/start-page/start-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthPageComponent, canActivate: [authGuard] },
  { path: '', component: StartPageComponent, canActivate: [authGuard] },
];
