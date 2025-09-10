import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { isLogged } from '../is-logged';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  return isLogged() ? router.createUrlTree(['']) : true;
};
