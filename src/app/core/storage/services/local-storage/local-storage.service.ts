import { Inject, Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { WINDOW } from '../../tokens/window.token';
import { STORAGE_KEY_PREFIX } from '../../tokens/storage-key.token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends StorageService {
  constructor(@Inject(WINDOW) window: Window, @Inject(STORAGE_KEY_PREFIX) prefix: string) {
    super(window.localStorage, prefix);
  }
}
