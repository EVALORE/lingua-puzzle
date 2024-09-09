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
  onConfirm: () => void;
}

@Component({
  selector: 'app-dialog-confirmation',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatDialogContainer,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogConfirmationComponent {
  public readonly dialogRef = inject(MatDialogRef<DialogConfirmationComponent>);
  public readonly dialogData = inject<DialogData>(MAT_DIALOG_DATA);

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    this.dialogRef.close();
    this.dialogData.onConfirm();
  }
}
