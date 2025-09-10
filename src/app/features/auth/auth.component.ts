import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { UserStateService } from '@core/stores/user-state/user-state.service';

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
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly user = inject(UserStateService);

  protected readonly loginForm = this.fb.group({
    name: ['', namingRealityValidators],
    surname: ['', namingRealityValidators],
  });

  protected submit(): void {
    this.user.login(this.loginForm.getRawValue());
  }
}
