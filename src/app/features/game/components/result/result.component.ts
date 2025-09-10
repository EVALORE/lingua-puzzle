import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Puzzle, PuzzleArtwork } from '../../types/http-data';
import { NgOptimizedImage } from '@angular/common';
import { fullAudioPath } from '@shared/utils/fullAudioPath';
import { fullImagePath } from '@shared/utils/fullImagePath';

@Component({
  selector: 'app-result',
  imports: [NgOptimizedImage],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  public readonly puzzle = input.required<Puzzle>();

  protected readonly image = computed(() => fullImagePath(this.puzzle().artwork.fullImageSrc));
  protected readonly imageDescription = computed(() =>
    this.createArtworkDescription(this.puzzle().artwork),
  );
  protected readonly learned = computed(() =>
    this.puzzle().words.map((word) => [fullAudioPath(word.sentenceAudio), word.sentence]),
  );

  private createArtworkDescription({ author, name, year }: PuzzleArtwork): string {
    return `${author} - ${name} (${year})`;
  }
}
