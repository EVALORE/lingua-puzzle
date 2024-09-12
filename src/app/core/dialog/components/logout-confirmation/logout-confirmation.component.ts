import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

interface DialogData {
  confirm: () => void;
}

@Component({
  selector: 'app-logout-confirmation',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatDialogContainer,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './logout-confirmation.component.html',
  styleUrl: './logout-confirmation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutConfirmationComponent {
  public readonly dialogRef = inject(MatDialogRef<LogoutConfirmationComponent>);
  public readonly dialogData = inject<DialogData>(MAT_DIALOG_DATA);

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    this.dialogRef.close();
    this.dialogData.confirm();
  }
}
