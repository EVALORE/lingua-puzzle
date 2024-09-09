import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { WINDOW } from '../../tokens/window.token';
import { STORAGE_KEY_PREFIX } from '../../tokens/storage-key.token';
import { Inject, Injectable } from '@angular/core';

@Injectable()
class mockStorage extends StorageService {
  constructor(@Inject(WINDOW) window: Window, @Inject(STORAGE_KEY_PREFIX) prefix: string) {
    super(window.localStorage, prefix);
  }
}

describe('StorageService', () => {
  let service: StorageService;
  const itemValue = { sanction: 'port' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        mockStorage,
        {
          provide: STORAGE_KEY_PREFIX,
          useValue: 'LP-STORAGE',
        },
        {
          provide: WINDOW,
          useValue: window,
        },
      ],
    });
    service = TestBed.inject(mockStorage);
    service.setItem('pablo', itemValue);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should receive correct length of items', () => {
    service.clear();
    expect(service.length).withContext('before adding').toBe(0);
    service.setItem('pablo', { sanction: 'port' });
    expect(service.length).withContext('after adding').toBe(1);
  });

  it('should get the correct item value', () => {
    expect(service.getItem<typeof itemValue>('pablo')).toEqual(itemValue);
  });

  it('should get the otherwise value', () => {
    const otherwiseValue = 'no pablo';
    expect(service.getItem('escobar', otherwiseValue)).toBe(otherwiseValue);
  });

  it('should remove item correctly', () => {
    service.removeItem('pablo');
    expect(service.getItem('pablo')).toBe(null);
  });

  it('should get the key name by index', () => {
    const prefix = TestBed.inject(STORAGE_KEY_PREFIX);
    expect(service.key(0)).toEqual(`${prefix}.pablo`);
  });
});
