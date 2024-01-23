import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNotReturned]'
})
export class NotReturnedDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.color = "red";
  }

}