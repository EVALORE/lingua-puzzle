import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LocalStorageService } from '../../core/storage/services/local-storage/local-storage.service';

describe('AuthService', () => {
  let service: AuthService;
  let localStorage: jasmine.SpyObj<LocalStorageService>;
  const user = { firstName: 'pablo', surname: 'perez' };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocalStorageService', [
      'setItem',
      'getItem',
      'removeItem',
    ]) as typeof localStorage;

    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useValue: spy }],
    });
    service = TestBed.inject(AuthService);
    localStorage = TestBed.inject(LocalStorageService) as typeof localStorage;
    service.login(user);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login the user', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(localStorage.setItem).toHaveBeenCalledOnceWith('auth', user);
  });

  it('should logout the user', () => {
    service.logout();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(localStorage.removeItem).toHaveBeenCalledOnceWith('auth');
  });
});
