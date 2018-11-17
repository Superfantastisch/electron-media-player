import { Component, OnInit } from '@angular/core';
import { Observable, timer, from } from 'rxjs';
import { take, map, mergeMap, tap } from 'rxjs/operators';

import { OnlineStatusService } from '../online-status.service';

@Component({
  selector: 'app-online-status',
  templateUrl: './online-status.component.html',
  styleUrls: ['./online-status.component.scss']
})
export class OnlineStatusComponent implements OnInit {
  onlineStatus : Observable<boolean> = null;
  onlineStatus2 : boolean = true;
  
  constructor(
    private onlineStatusService: OnlineStatusService,
    ) { }

  ngOnInit() {
    this.onlineStatus = timer(0, 5000).pipe(
      mergeMap(_ => this.onlineStatusService.isOnline),
      tap(_ => console.log("Get online status")),
    );
  }

}
