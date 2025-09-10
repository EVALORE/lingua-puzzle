import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AudioDirective } from '@shared/directives/audio/audio.directive';
import { WordEntry } from '@features/game/types/http-data';

@Component({
  selector: 'app-hints',
  imports: [MatIconButton, MatIcon, AudioDirective],
  templateUrl: './hints.component.html',
  styleUrl: './hints.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintsComponent {
  public readonly word = input.required<WordEntry>();
  protected showTranslation = signal(false);

  protected readonly hints = computed(() => {
    const { sentenceAudio, sentenceTranslation } = this.word();
    return {
      audio: sentenceAudio,
      translation: sentenceTranslation,
    };
  });

  protected toggleTranslation(): void {
    this.showTranslation.set(!this.showTranslation());
  }
}
