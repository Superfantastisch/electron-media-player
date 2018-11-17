import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { take, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {
  private uri : string = "https://ipv4.icanhazip.com/";
  private timeout : number = 5000;

  constructor() { }

  // Does a simple http request to a website. Resolves to `true`, iff
  // website loaded successfully.
  get isOnline(): Observable<boolean> {
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
}
