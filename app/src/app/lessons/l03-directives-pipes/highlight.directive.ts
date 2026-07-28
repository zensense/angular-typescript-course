import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// An "attribute directive" changes the behavior/appearance of the element
// it's placed on, without adding its own template (that's what makes it
// different from a component). Angular's own `ngClass`/`ngStyle` are
// examples of built-in attribute directives; this one is a hand-written
// equivalent so you can see how they work under the hood.
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight = '#fff59d'; // lets callers write [appHighlight]="'#color'"

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
