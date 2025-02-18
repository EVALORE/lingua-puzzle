import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../storage/local-storage/local-storage.service';

export const isUserGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localStorage = inject(LocalStorageService);
  const isUser = Boolean(localStorage.getItem('user'));
  return isUser ? true : router.createUrlTree(['auth']);
};
