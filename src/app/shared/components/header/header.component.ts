import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocalStorageService } from '@core/storage/local-storage/local-storage.service';
import { User } from '@core/storage/types/user';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatDivider, MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly localStorage = inject(LocalStorageService);
  private readonly router = inject(Router);
  protected readonly user = this.formatUserFullName();

  protected logout(): void {
    this.localStorage.removeItem('user');
    void this.router.navigate(['auth']);
  }

  private getUser(): User | null {
    return this.localStorage.getItem('user');
  }

  private formatUserFullName(): string {
    const user = this.getUser();
    return user ? this.buildFullName(user) : '';
  }

  private buildFullName(user: User): string {
    return `${user.name} ${user.surname}`.trim();
  }
}
