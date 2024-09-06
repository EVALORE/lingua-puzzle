import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../core/storage/services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly localStorage = inject(LocalStorageService);
  private readonly router = inject(Router);

  private readonly authKey = 'auth';

  public login(user: { firstName: string; surname: string }): void {
    this.localStorage.setItem(this.authKey, user);
    this.router.navigate([''], { replaceUrl: true }).catch(() => {
      // TODO implement Logger
    });
  }

  public logout(): void {
    this.localStorage.removeItem(this.authKey);
  }
}
