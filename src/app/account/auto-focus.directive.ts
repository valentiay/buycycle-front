import {AfterContentInit} from '@angular/core';
import {Directive} from '@angular/core';
import {ElementRef} from '@angular/core';
import {OnChanges} from '@angular/core';
import {OnDestroy} from '@angular/core';
import {SimpleChanges} from '@angular/core';

const BASE_TIMER_DELAY = 10;

@Directive({
  selector: '[autofocus], [appAutofocus]',
})
export class AutoFocusDirective implements AfterContentInit, OnChanges, OnDestroy {

  public shouldFocusElement: any;
  public timerDelay: number;

  private elementRef: ElementRef;
  private timer: number;

  constructor(elementRef: ElementRef) {

    this.elementRef = elementRef;

    this.shouldFocusElement = '';
    this.timer = null;
    this.timerDelay = BASE_TIMER_DELAY;

  }

  public ngAfterContentInit(): void {
    if (this.shouldFocusElement === '') {

      this.startFocusWorkflow();

    }

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.timerDelay && (typeof (this.timerDelay) !== 'number')) {
      if (isNaN(this.timerDelay = +this.timerDelay)) {

        this.timerDelay = BASE_TIMER_DELAY;

      }

    }
    if (changes.shouldFocusElement) {

      (this.shouldFocusElement)
        ? this.startFocusWorkflow()
        : this.stopFocusWorkflow()
      ;

    }

  }

  public ngOnDestroy(): void {

    this.stopFocusWorkflow();

  }

  private startFocusWorkflow(): void {
    if (this.timer) {

      return;

    }

    this.timer = setTimeout(
      (): void => {

        this.timer = null;
        this.elementRef.nativeElement.focus();

      },
      this.timerDelay
    );

  }

  private stopFocusWorkflow(): void {

    clearTimeout(this.timer);
    this.timer = null;

  }

}
