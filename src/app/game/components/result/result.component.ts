import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Puzzle, PuzzleArtwork } from '../../types/http-data';
import { environment } from '../../../../environments/environment';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-result',
  imports: [NgOptimizedImage],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  public readonly puzzle = input.required<Puzzle>();

  protected readonly image = computed(() => this.fullImagePath(this.puzzle().artwork.fullImageSrc));
  protected readonly imageDescription = computed(() =>
    this.createArtworkDescription(this.puzzle().artwork),
  );
  protected readonly learned = computed(() =>
    this.puzzle().words.map((word) => [word.sentenceAudio, word.sentenceTranslation]),
  );

  private fullImagePath(path: string): string {
    return `${environment.imagesFolderUrl}/${path}`;
  }

  private createArtworkDescription({ author, name, year }: PuzzleArtwork): string {
    return `${author} - ${name} (${year})`;
  }
}
