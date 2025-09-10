import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { StorageService } from '../storage.abstract';
import { LocalStorageStore } from '../storage-store';

export class LocalStorageService extends StorageService<LocalStorageStore> {
  constructor() {
    const prefix = 'LP';
    super(localStorage, prefix);
  }
}

export function provideLocalStorageService(): EnvironmentProviders {
  return makeEnvironmentProviders([LocalStorageService]);
}
