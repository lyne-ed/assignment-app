import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appReturned]'
})
export class ReturnedDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.color = "green";
  }

}