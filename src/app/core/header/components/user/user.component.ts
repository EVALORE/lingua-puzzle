import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { LogoutConfirmationComponent } from '../../../dialog/components/logout-confirmation/logout-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButton, JsonPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  @Input() public user!: string;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

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
    void this.router.navigate(['auth'], { replaceUrl: true });
  }

  public ngOnInit(): void {
    this.snackBar.open(`Welcome, ${this.user}`, 'close', { duration: 1500 });
  }
}
