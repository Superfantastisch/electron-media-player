import { Injectable } from '@angular/core';
import { Observable, from, timer } from 'rxjs';
import { mergeMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {
  private uri: string = "https://storage.googleapis.com/shaka-demo-assets/";
  private timeout: number = 5000;
  private _isOnline: boolean;
  private _onlinePolling = null;

  constructor() {
    this._onlinePolling = timer(0, 5000).pipe(
      mergeMap(_ => this.isOnline$),
      tap(online => console.log("Get online status: " + online)),
    )
  }

  private newRequest$(uri: string, timeout = this.timeout): Observable<boolean> {
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

  // Does a simple http request to a website. Resolves to `true`, iff
  // website loaded successfully.
  private get isOnline$(): Observable<boolean> {
    return this.newRequest$(this.uri).pipe(
      map(online => this._isOnline = online),
    );;
  }

  get onlinePolling$(): Observable<number | boolean> {
    return this._onlinePolling;
  }

  get isOnline(): boolean {
    return this._isOnline;
  }

  public start() {
    this.onlinePolling$.subscribe();
  }

}
