import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { MatCard } from '@angular/material/card';

export interface Card {
  word: string;
  replace: boolean;
  id?: number;
  first?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  last?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

@Component({
  selector: 'app-word-card',
  standalone: true,
  imports: [MatCard],
  templateUrl: './word-card.component.html',
  styleUrl: './word-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordCardComponent implements AfterViewInit {
  public card = input.required<Card>();

  public onClick = output();

  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public emitClick(): void {
    const componentElement = this.elementRef.nativeElement;
    const { top, left, width, height } = componentElement.getBoundingClientRect();
    this.card().first = { top, left, width, height };
    componentElement.classList.add('active');
    this.onClick.emit();
  }

  public ngAfterViewInit(): void {
    const componentElement = this.elementRef.nativeElement;
    componentElement.classList.remove('active');

    const card = this.card();

    const { top, left, width, height } = componentElement.getBoundingClientRect();
    card.last = { top, left, width, height };

    if (card.first) {
      const { first, last } = card;
      const deltaX = (first.left - last.left).toString();
      const deltaY = (first.top - last.top).toString();
      const deltaW = (first.width / last.width).toString();
      const deltaH = (first.height / last.height).toString();
      componentElement.animate(
        [
          {
            transformOrigin: 'top left',
            transform: `
              translate(${deltaX}px, ${deltaY}px)
              scale(${deltaW}, ${deltaH})
  `,
          },
          {
            transformOrigin: 'top left',
            transform: 'none',
          },
        ],
        {
          duration: 400,
          easing: 'ease-in-out',
          fill: 'both',
        },
      );
    }
  }
}
