import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AudioDirective } from '../../../shared/directives/audio/audio.directive';

interface Hints {
  audio?: string;
  translation?: string;
}

@Component({
  selector: 'app-hints',
  imports: [MatIconButton, MatIcon, AudioDirective],
  templateUrl: './hints.component.html',
  styleUrl: './hints.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintsComponent {
  public readonly hints = input.required<Hints>();
  protected showTranslation = signal(false);

  protected toggleTranslation(): void {
    this.showTranslation.set(!this.showTranslation());
  }
}
