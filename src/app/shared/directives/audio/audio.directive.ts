import { computed, Directive, input } from '@angular/core';
import { fullAudioPath } from '../../../game/utils/fullAudioPath';

@Directive({
  selector: '[appAudio]',
  host: {
    '(click)': 'playAudio()',
  },
})
export class AudioDirective {
  public readonly src = input.required<string>({ alias: 'appAudio' });
  private audio = computed(() => new Audio(fullAudioPath(this.src())));

  public playAudio(): void {
    void this.audio().play();
  }
}
