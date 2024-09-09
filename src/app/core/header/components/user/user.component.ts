import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { DialogConfirmationComponent } from '../../../dialog/components/dialog-confirmation/dialog-confirmation.component';
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
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      // eslint-disable-next-line id-denylist
      data: { onConfirm: this.onLogoutConfirm.bind(this) },
    });

    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (value) {
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
