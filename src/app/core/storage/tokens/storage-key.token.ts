import { InjectionToken } from '@angular/core';

export const STORAGE_KEY_PREFIX = new InjectionToken<string>('LP-STORAGE', {
  providedIn: 'root',
  factory: () => 'LP-STORAGE',
});
