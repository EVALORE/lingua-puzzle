import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { LogoutConfirmationComponent } from '../../../dialog/components/logout-confirmation/logout-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButton, JsonPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input() public user!: string;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  protected onLogout(): void {
    const dialogRef = this.dialog.open(LogoutConfirmationComponent, {
      // eslint-disable-next-line id-denylist
      data: { confirm: this.onLogoutConfirm.bind(this) },
    });

    dialogRef.afterClosed().subscribe((isLogoutConfirmed: boolean) => {
      if (isLogoutConfirmed) {
        this.onLogoutConfirm();
      }
    });
  }

  private onLogoutConfirm(): void {
    this.authService.logout();
    this.router.navigate(['auth'], { replaceUrl: true }).catch(() => {
      // TODO implement Logger
    });
  }
}
