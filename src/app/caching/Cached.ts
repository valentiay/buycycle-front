import {Observable, ReplaySubject} from 'rxjs';
import {flatMap} from 'rxjs/operators';

export class Cached<T> {
  private value: ReplaySubject<T> = new ReplaySubject(0);
  isStarted = false;

  constructor(private init: () => Observable<T>) {
  }

  get(): Observable<T> {
    if (this.isStarted) {
      return this.value;
    } else {
      return this.forceGet();
    }
  }

  forceGet(): Observable<T> {
    this.isStarted = true;
    return this
      .init()
      .pipe(
        flatMap(value => {
          this.value.next(value);
          return this.value;
        })
      );
  }

  invalidate() {
    this.value.complete();
    this.isStarted = false;
    this.value = new ReplaySubject(0);
  }
}
