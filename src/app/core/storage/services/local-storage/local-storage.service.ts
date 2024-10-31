import { Injectable, makeEnvironmentProviders, EnvironmentProviders } from '@angular/core';
import { StorageService } from '../storage/storage.service';

export interface LocalStorageStore {
  game: {
    level: number;
    round: number;
    sentenceIndex: number;
  };
  displayHints: {
    picture: boolean;
    audio: boolean;
    translation: boolean;
  };
  user: {
    firstName: string;
    surname: string;
  };
}

@Injectable()
export class LocalStorageService extends StorageService<LocalStorageStore> {
  constructor() {
    const prefix = 'LP';
    super(localStorage, prefix);
  }
}

export function provideLocalStorageService(): EnvironmentProviders {
  return makeEnvironmentProviders([LocalStorageService]);
}
