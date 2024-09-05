import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../core/storage/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly localStorage = inject(LocalStorageService);

  private readonly authKey = 'auth';

  public login(user: { firstName: string; surname: string }): void {
    this.localStorage.setItem(this.authKey, user);
  }

  public logout(): void {
    this.localStorage.removeItem(this.authKey);
  }
}
