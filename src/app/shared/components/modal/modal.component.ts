import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '@core/services/modal/modal.service';
import { KeyValuePipe, NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'app-modal',
  imports: [
    NgComponentOutlet,
    KeyValuePipe,
    MatButton,
    MatCard,
    MatCardTitle,
    TitleCasePipe,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatCardFooter,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  private readonly modalService = inject(ModalService);
  public readonly config = this.modalService.modalConfig;
}
