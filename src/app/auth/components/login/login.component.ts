import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInput, MatFormField, MatLabel, ReactiveFormsModule, MatButton, MatError, MatIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup<{
    firstName: FormControl<string | null>;
    surname: FormControl<string | null>;
  }>;

  private readonly authService = inject(AuthService);

  protected get firstName(): FormControl<string | null> {
    return this.loginForm.controls.firstName;
  }

  protected get surname(): FormControl<string | null> {
    return this.loginForm.controls.surname;
  }

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Z][a-zA-Z-]*$/),
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[A-Z][a-zA-Z-]*$/),
      ]),
    });
  }

  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const formData = this.loginForm.value;
    const user = {
      firstName: formData.firstName ?? '',
      surname: formData.surname ?? '',
    };
    this.authService.login(user);
  }
}
