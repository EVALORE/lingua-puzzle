import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

interface Hints {
  audio?: string;
  translation?: string;
}

@Component({
  selector: 'app-hints',
  imports: [MatIconButton, MatIcon],
  templateUrl: './hints.component.html',
  styleUrl: './hints.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintsComponent {
  public hints = input.required<Hints>();
  public audio = computed(() => new Audio(this.hints().audio));

  protected showTranslation = false;

  protected toggleTranslation(): void {
    this.showTranslation = !this.showTranslation;
  }
}
