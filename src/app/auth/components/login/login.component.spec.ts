import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['login']) as typeof authService;

    await TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: spy }],
      imports: [LoginComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    ({ componentInstance: component } = fixture);
    authService = TestBed.inject(AuthService) as typeof authService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register the user on submit', () => {
    component['onSubmit']();
    expect(authService.login).toHaveBeenCalledTimes(1);
  });
});
