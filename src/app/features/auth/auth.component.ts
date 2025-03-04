import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { LocalStorageService } from '@core/storage/local-storage/local-storage.service';
import { User } from '@core/storage/types/user';

const namingRealityValidators = [
  Validators.required,
  Validators.minLength(3),
  Validators.pattern(/^[A-Z][a-zA-Z-]*$/u),
];

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatButton],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly localStorage = inject(LocalStorageService);

  protected readonly loginForm = this.fb.group({
    name: ['', namingRealityValidators],
    surname: ['', namingRealityValidators],
  });

  protected submit(): void {
    this.login(this.loginForm.getRawValue());
  }

  private login(data: User): void {
    this.localStorage.setItem('user', {
      name: data.name,
      surname: data.surname,
    });
    void this.router.navigate(['']);
  }
}
