import { Injectable } from '@angular/core';
import { Observable, from, timer, Subject } from 'rxjs';
import { mergeMap, tap, map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {
  private DEFAULTS = {
    uri: "https://storage.googleapis.com/shaka-demo-assets/",
    timeout: 5000
  };
  private unsubscribe$ = new Subject();
  private _isOnline: boolean;

  constructor() { }

  // Returns a simple http request to a website. Resolves to `true`, iff
  // website loaded successfully.
  private newRequest$(uri = this.DEFAULTS.uri, timeout = this.DEFAULTS.timeout)
    : Observable<boolean> {
    return from(new Promise<boolean>((resolve) => {
      const xhr = new XMLHttpRequest();

      xhr.onerror = _ => resolve(false);
      xhr.ontimeout = _ => resolve(false);
      xhr.onload = _ => resolve(true);

      xhr.open('GET', uri);
      xhr.timeout = timeout;
      
      xhr.send();
    }));
  }

  // Sets new online status if http request is done.
  private get isOnline$(): Observable<boolean> {
    return this.newRequest$().pipe(
      map(online => this._isOnline = online),
    );;
  }

  // Creates http requests every x seconds to determine online status.
  get onlinePolling$(): Observable<number | boolean> {
    return timer(0, 5000).pipe(
      mergeMap(_ => this.isOnline$),
      tap(online => console.log("Get online status: " + online)),
      takeUntil(this.unsubscribe$),
    );
  }

  get isOnline(): boolean {
    return this._isOnline;
  }

  public start() {
    this.onlinePolling$.subscribe();
  }

  public stop(offlineMode = true) {
    if (offlineMode) {
      this._isOnline = false;
    }
    
    this.unsubscribe$.next();
  }

}
