import { Injectable, signal, Type } from '@angular/core';

export interface ModalConfig {
  component: Type<unknown>;
  inputs?: Record<string, unknown>;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public readonly modalConfig = signal<ModalConfig | null>(null);

  public openModal(config: ModalConfig): void {
    this.modalConfig.set(config);
  }

  public closeModal(): void {
    this.modalConfig.set(null);
  }
}
