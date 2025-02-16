import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTimes]',
})
export class TimesDirective {
  private readonly vcr = inject(ViewContainerRef);
  private readonly template = inject(TemplateRef);
  public readonly times = input.required<number>({ alias: 'appTimes' });

  constructor() {
    effect(() => {
      this.repeat();
    });
  }

  private repeat(): void {
    this.vcr.clear();
    for (let i = 0; i < this.times(); i += 1) {
      this.vcr.createEmbeddedView(this.template, { $implicit: i });
    }
  }
}
