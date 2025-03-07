import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@core/storage/local-storage/local-storage.service';
import { User } from '@core/storage/types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly localStorage = inject(LocalStorageService);

  public readonly user = signal(this.localStorage.getItem('user'));

  public login(data: User): void {
    this.localStorage.setItem('user', {
      name: data.name,
      surname: data.surname,
    });
    void this.router.navigate(['']);
  }

  public logout(): void {
    this.localStorage.removeItem('user');
    void this.router.navigate(['auth']);
  }
}
