import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '../../../core/services/modal/modal.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [NgComponentOutlet],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  private readonly modalService = inject(ModalService);
  public readonly config = this.modalService.modalConfig;
}
