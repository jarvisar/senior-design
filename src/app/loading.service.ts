import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading$$.asObservable().pipe(startWith(false));
  // Loading spinner
  setLoading(isLoading: boolean) {
    this.isLoading$$.next(isLoading);
  }
  constructor() { }
}
