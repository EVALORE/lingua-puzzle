import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { WINDOW } from '../../tokens/window.token';
import { STORAGE_KEY_PREFIX } from '../../tokens/storage-key.token';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WINDOW, useValue: window },
        {
          provide: STORAGE_KEY_PREFIX,
          useValue: 'LP-STORAGE',
        },
      ],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
