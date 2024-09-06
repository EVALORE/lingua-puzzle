import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LocalStorageService } from '../../core/storage/services/local-storage/local-storage.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let localStorage: jasmine.SpyObj<LocalStorageService>;
  let router: jasmine.SpyObj<Router>;
  const user = { firstName: 'pablo', surname: 'perez' };

  beforeEach(() => {
    localStorage = jasmine.createSpyObj('LocalStorageService', [
      'setItem',
      'getItem',
      'removeItem',
    ]);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorage },
        { provide: Router, useValue: router },
      ],
    });
    service = TestBed.inject(AuthService);
    localStorage = TestBed.inject(LocalStorageService) as typeof localStorage;
    router.navigate.and.returnValue(Promise.resolve(true));
    service.login(user);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login the user', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(localStorage.setItem).toHaveBeenCalledOnceWith('auth', user);
  });

  it('should redirect the user to the start page', () => {
    expect(router.navigate).toHaveBeenCalledOnceWith([''], { replaceUrl: true });
  });

  it('should logout the user', () => {
    service.logout();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(localStorage.removeItem).toHaveBeenCalledOnceWith('auth');
  });
});
