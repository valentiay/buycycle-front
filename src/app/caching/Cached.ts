import {BehaviorSubject, Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';

export class Cached<T> {
  private value: BehaviorSubject<T>;

  constructor(private init: () => Observable<T>) {
  }

  get(): Observable<T> {
    if (!this.value) {
      return this.forceGet();
    } else {
      return this.value;
    }
  }

  forceGet(): Observable<T> {
    if (!this.value) {
      this.value = new BehaviorSubject(null);
    }
    return this
      .init()
      .pipe(
        flatMap(value => {
          this.value.next(value);
          return this.value;
        })
      );
  }
}
