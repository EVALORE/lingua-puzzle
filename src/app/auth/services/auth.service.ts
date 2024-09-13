import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../../core/storage/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly localStorage = inject(LocalStorageService);
  private readonly router = inject(Router);

  private readonly authKey = 'auth';

  private readonly isUser$$ = new BehaviorSubject<{ firstName: string; surname: string } | null>(
    this.localStorage.getItem(this.authKey),
  );
  public readonly isUser$ = this.isUser$$.asObservable();

  public login(user: { firstName: string; surname: string }): void {
    this.isUser$$.next(user);
    this.localStorage.setItem(this.authKey, user);
    void this.router.navigate([''], { replaceUrl: true });
  }

  public logout(): void {
    this.isUser$$.next(null);
    this.localStorage.removeItem(this.authKey);
  }
}
