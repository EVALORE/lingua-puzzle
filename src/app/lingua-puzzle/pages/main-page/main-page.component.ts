import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatCard } from '@angular/material/card';
import { WordCardComponent } from '../../components/word-card/word-card.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatCard, WordCardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  private readonly gameService = inject(GameService);
  protected source = this.gameService.source;
  protected result = this.gameService.result;

  public moveToSource(wordIndex: number): void {
    this.gameService.moveToSource(wordIndex);
  }

  public moveToResult(wordIndex: number): void {
    this.gameService.moveToResult(wordIndex);
  }
}
