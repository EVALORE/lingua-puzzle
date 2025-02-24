import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { isLogged } from '../is-logged';

export const appGuard: CanMatchFn = () => {
  const router = inject(Router);
  return isLogged() ? true : router.createUrlTree(['auth']);
};
