import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-hints',
  standalone: true,
  imports: [MatIcon, MatIconButton],
  templateUrl: './hints.component.html',
  styleUrl: './hints.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintsComponent {
  private readonly gameService = inject(GameService);
  protected showTranslation = false;
  protected sentence = this.gameService.sentence;
  protected sentenceAudio = new Audio();

  constructor() {
    effect(() => {
      this.sentenceAudio.src = `project-data/${this.sentence().audioExample}`;
    });
  }
}
