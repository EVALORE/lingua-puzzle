import {ChangeDetectionStrategy, Component, effect, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

interface HintsToShow {
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
  public hints = input.required<HintsToShow>();
  public audio = new Audio();
  protected showTranslation = false;


  private onNewHints = effect(() => {
    this.setAudioSrc(this.hints().audio);
  });

  protected toggleTranslation(): void {
    this.showTranslation = !this.showTranslation;
  }

  public setAudioSrc(src?: string): void {
    if (!src) {
      return;
    }
    this.audio.pause();
    this.audio = new Audio(src);
    this.audio.load();
  }
}
