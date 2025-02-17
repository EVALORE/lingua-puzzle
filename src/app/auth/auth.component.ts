import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { LocalStorageService } from '../core/storage/local-storage/local-storage.service';
import { LocalStorageStore } from '../core/storage/storage-store';

const nameInputValidators = [
  Validators.required,
  Validators.minLength(3),
  Validators.pattern(/^[A-Z][a-zA-Z-]*$/u),
];

const surnameInputValidators = [
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
  private readonly fb = inject(FormBuilder);
  private readonly localStorage = inject(LocalStorageService);

  protected readonly loginForm = this.fb.nonNullable.group({
    name: ['', nameInputValidators],
    surname: ['', surnameInputValidators],
  });

  protected submit(): void {
    this.login(this.loginForm.getRawValue());
  }

  private login(data: Omit<LocalStorageStore['user'], 'progress'>): void {
    this.localStorage.setItem('user', {
      name: data.name,
      surname: data.surname,
      progress: {},
    });
    void this.router.navigate(['']);
    console.log(this.localStorage.getItem('user'));
  }
}
