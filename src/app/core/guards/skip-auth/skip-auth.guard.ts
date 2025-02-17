import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../storage/local-storage/local-storage.service';

export const skipAuthGuard: CanMatchFn = () => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  const isUserLogged = Boolean(localStorageService.getItem('user'));
  return isUserLogged ? router.createUrlTree(['']) : true;
};
