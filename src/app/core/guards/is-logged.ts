import { inject } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage/local-storage.service';

export function isLogged(): boolean {
  const localStorage = inject(LocalStorageService);
  return Boolean(localStorage.getItem('user'));
}
