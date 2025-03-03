import { Injectable, signal, Type } from '@angular/core';

export interface ModalConfig {
  component: Type<unknown>;
  title?: string;
  inputs?: Record<string, unknown>;
  actions?: Record<string, () => void>;
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
