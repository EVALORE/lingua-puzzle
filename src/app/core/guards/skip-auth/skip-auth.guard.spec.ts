import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { skipAuthGuard } from './skip-auth.guard';

describe('skipAuthGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => skipAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
