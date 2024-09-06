import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { AuthService } from '../../../../auth/services/auth.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    await TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authService }],
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
    // eslint-disable-next-line dot-notation
    component['onLogout']();
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
