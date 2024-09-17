import { Injectable } from '@angular/core';

interface ElementProperties {
  width: number;
  height: number;
  top: number;
  left: number;
}

@Injectable({
  providedIn: 'root',
})
export class FlipAnimationService {
  private first: ElementProperties | null = null;
  private last: ElementProperties | null = null;

  public updateFirst(value: ElementProperties): void {
    this.first = value;
  }

  public updateLast(value: ElementProperties): void {
    this.last = value;
  }

  public get initialPosition(): string {
    if (!this.first || !this.last) {
      return 'none';
    }
    const { top, left } = this.first;
    const { top: lastTop, left: lastLeft } = this.last;
    const deltaTop = (top - lastTop).toString();
    const deltaLeft = (left - lastLeft).toString();
    return `${deltaLeft}px, ${deltaTop}px`;
  }

  public get initialScale(): string {
    if (!this.first || !this.last) {
      return '1, 1';
    }
    const { width, height } = this.first;
    const { width: lastWidth, height: lastHeight } = this.last;
    const deltaW = (width / lastWidth).toString();
    const deltaH = (height / lastHeight).toString();
    return `${deltaW}, ${deltaH}`;
  }

  public proceedAnimation(element: HTMLElement): void {
    element.animate(
      [
        {
          transformOrigin: 'top left',
          transform: `
              translate(${this.initialPosition})
              scale(${this.initialScale})`,
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
