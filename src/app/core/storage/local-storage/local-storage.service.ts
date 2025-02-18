import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { StorageService } from '../storage.abstract';
import { localStorageStore } from '../storageStore';

export class LocalStorageService extends StorageService<localStorageStore> {
  constructor() {
    const prefix = 'LP';
    super(localStorage, prefix);
  }
}

export function provideLocalStorageService(): EnvironmentProviders {
  return makeEnvironmentProviders([LocalStorageService]);
}
