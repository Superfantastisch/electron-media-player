import { Injectable } from '@angular/core';
import { Observable, from, timer } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {
  private uri: string = "https://ipv4.icanhazip.com/";
  private timeout: number = 5000;
  private _isOnline: boolean;

  constructor() { }

  // Does a simple http request to a website. Resolves to `true`, iff
  // website loaded successfully.
  private get isOnline$(): Observable<boolean> {
    return from(new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onerror = _ => resolve(false);
      xhr.ontimeout = _ => resolve(false);
      xhr.onload = _ => resolve(true);

      xhr.open('GET', this.uri);
      xhr.timeout = this.timeout;
      
      xhr.send();
    }));
  }

  get isOnline(): boolean {
    return this._isOnline;
  }

  public start() {
    timer(0, 5000).pipe(
      mergeMap(_ => this.isOnline$),
      tap(_ => console.log("Get online status")),
    ).subscribe(
      isOnline => isOnline ? this._isOnline = true : this._isOnline = false
    );
  }

}
