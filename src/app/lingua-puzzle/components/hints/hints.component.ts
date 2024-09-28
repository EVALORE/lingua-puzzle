import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { SentenceService } from '../../services/sentence/sentence.service';

@Component({
  selector: 'app-hints',
  standalone: true,
  imports: [MatIcon, MatIconButton],
  templateUrl: './hints.component.html',
  styleUrl: './hints.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintsComponent implements OnInit {
  private readonly sentenceService = inject(SentenceService);
  protected showTranslation = false;
  protected sentenceTranslate = signal('');
  protected sentenceAudio = new Audio();
  public ngOnInit(): void {
    this.sentenceService.sentence.subscribe((sentence) => {
      this.sentenceAudio.src = `project-data/${sentence.audioExample}`;
      this.sentenceTranslate.set(sentence.textExampleTranslate);
    });
  }
}
