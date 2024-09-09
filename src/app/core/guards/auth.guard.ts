import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../storage/services/local-storage/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  const isUser = Boolean(localStorageService.getItem<string>('auth'));

  if (isUser && state.url === '/auth') {
    return router.createUrlTree(['']);
  }
  if (!isUser && state.url !== '/auth') {
    return router.createUrlTree(['auth']);
  }

  return true;
};
