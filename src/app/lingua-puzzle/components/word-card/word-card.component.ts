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
import { FlipAnimationService } from '../../../shared/services/flip-animation.service';

export interface Card {
  word: string;
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

  private readonly fas = inject(FlipAnimationService);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public emitClick(): void {
    const componentElement = this.elementRef.nativeElement;
    this.fas.updateFirst(componentElement.getBoundingClientRect());
    this.onClick.emit();
  }

  public ngAfterViewInit(): void {
    const componentElement = this.elementRef.nativeElement;
    this.fas.updateLast(componentElement.getBoundingClientRect());
    this.fas.proceedAnimation(componentElement);
  }
}
