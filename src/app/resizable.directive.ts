import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective {
  private el: HTMLElement;
  private startX: number;
  private startWidth: number;
  private resizing = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.el = element.nativeElement;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.startX = event.clientX;
    this.startWidth = this.el.offsetWidth;
    this.resizing = true;
  }

  @HostListener('document:mouseup', [])
  onMouseUp() {
    this.resizing = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.resizing) {
      return;
    }

    const width = this.startWidth + (event.clientX - this.startX);
    this.renderer.setStyle(this.el, 'width', `${width}px`);
  }
}
