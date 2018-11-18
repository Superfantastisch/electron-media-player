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
  private _request = null;
  private _onlinePolling = null;

  constructor() {

    this._request = from(new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onerror = _ => resolve(false);
      xhr.ontimeout = _ => resolve(false);
      xhr.onload = _ => resolve(true);

      xhr.open('GET', this.uri);
      xhr.timeout = this.timeout;
      
      xhr.send();
    }));

    this._onlinePolling = timer(0, 5000).pipe(
      mergeMap(_ => this.isOnline$),
      tap(_ => console.log("Get online status")),
    )
  }

  // Does a simple http request to a website. Resolves to `true`, iff
  // website loaded successfully.
  private get isOnline$(): Observable<boolean> {
    return this._request;
  }

  get onlinePolling$(): Observable<number | boolean> {
    return this._onlinePolling;
  }

  get isOnline(): boolean {
    return this._isOnline;
  }

  public start() {
    this.onlinePolling$.subscribe(
      online => online ? this._isOnline = true : this._isOnline = false
    );
  }

}
