import * as ngrx from '@ngrx/store';
import { Store } from '@ngrx/store';

import { distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// from https://github.com/ngrx/platform/issues/915#issuecomment-416839798

export class MockStore<T> extends BehaviorSubject<T> {
  private readonly _selectorsToValues: Map<
    (...args: any[]) => any,
    any
  > = new Map();
  public dispatch = jasmine.createSpy();

  public select = jasmine.createSpy().and.callFake(
    (selector: any): Observable<any> => {
      return this.getObservableWithMockResult(selector).pipe(
        distinctUntilChanged()
      );
    }
  );

  constructor(
    initialState: T = null,
    private _returnNullForUnhandledSelectors = true
  ) {

    super(null);
    spyOnProperty(ngrx, 'select', 'get').and.callFake(() => {
      return selector => {
        return () =>
          this.getObservableWithMockResult(selector).pipe(
            distinctUntilChanged()
          );
      };
    });
  }

  private getObservableWithMockResult(selector: any): Observable<any> {
    let obs$: Observable<any>;

    if (this._selectorsToValues.has(selector)) {
      const value = this._selectorsToValues.get(selector);
      obs$ = value instanceof Observable ? value : this.pipe(map(() => value));
    } else {
      obs$ = this.pipe(
        map(
          () =>
            this._returnNullForUnhandledSelectors
              ? null
              : selector(this.getValue())
        )
      );
    }
    return obs$;
  }

// tslint:disable-next-line: no-shadowed-variable
  addSelectorStub<T>(
    cb: (...args: any[]) => T,
    mockedValue: T | Observable<T>
  ): this {
    this._selectorsToValues.set(cb, mockedValue);
    return this;
  }

  setState(state: T): this {
    this.next(state);
    return this;
  }

  setReturnNullForUnandledSelectors(value: boolean): this {
    this._returnNullForUnhandledSelectors = value;
    return this;
  }
}

export function provideMockStore(
  selectorStubs: {
    selector: (...args: any[]) => any;
    mockedValue: any | Observable<any>;
  }[] = []
) {
  const mockStore$ = new MockStore();
  selectorStubs.forEach(v =>
    mockStore$.addSelectorStub(v.selector, v.mockedValue)
  );
  return { provide: Store, useValue: mockStore$ };
}
