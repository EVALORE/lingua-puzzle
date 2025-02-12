import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
export class HintsComponent implements OnInit {
  public hintsToShow = input.required<HintsToShow>();
  protected showTranslation = false;
  public audio = new Audio();

  public setAudioSrc(src?: string): void {
    this.audio.src = src ?? '';
  }

  public ngOnInit(): void {
    this.setAudioSrc(this.hintsToShow().audio);
  }
}
