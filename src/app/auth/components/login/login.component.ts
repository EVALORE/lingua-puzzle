import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInput, MatFormField, MatLabel, ReactiveFormsModule, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup<{
    firstName: FormControl<string | null>;
    surname: FormControl<string | null>;
  }>;

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
    });
  }

  protected onSubmit(): void {
    // TODO implement logic
  }
}
