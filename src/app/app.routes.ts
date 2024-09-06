import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { StartPageComponent } from './start/pages/start-page/start-page.component';

export const routes: Routes = [
  { path: 'auth', component: AuthPageComponent },
  { path: '', component: StartPageComponent },
];
