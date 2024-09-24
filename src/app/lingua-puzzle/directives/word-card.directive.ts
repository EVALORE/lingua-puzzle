import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import { FlipAnimationService } from '../../shared/services/flip-animation.service';

@Directive({
  selector: '[appWordCard]',
  standalone: true,
  host: {
    '(click)': 'emitClick()',
  },
})
export class WordCardDirective implements AfterViewInit {
  private readonly fas = inject(FlipAnimationService);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public emitClick(): void {
    const componentElement = this.elementRef.nativeElement;
    this.fas.updateFirst(componentElement.getBoundingClientRect());
  }

  public ngAfterViewInit(): void {
    const componentElement = this.elementRef.nativeElement;
    this.fas.updateLast(componentElement.getBoundingClientRect());
    this.fas.proceedAnimation(componentElement);
  }
}
