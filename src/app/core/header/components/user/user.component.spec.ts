import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
      imports: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.logout on logout', () => {
    router.navigate.and.returnValue(Promise.resolve(true));
    // eslint-disable-next-line dot-notation
    component['onLogout']();
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });

  it('should call navigate to auth page on logout', waitForAsync(() => {
    router.navigate.and.returnValue(Promise.resolve(true));
    // eslint-disable-next-line dot-notation
    component['onLogout']();
    expect(router.navigate).toHaveBeenCalledWith(['auth'], { replaceUrl: true });
  }));
});
