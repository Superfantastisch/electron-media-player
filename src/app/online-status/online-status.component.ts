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
  onlineStatus : boolean = null;
  
  constructor(
    private onlineStatusService: OnlineStatusService,
    ) { }

  ngOnInit() {
    // Update online status every 5s
    this.onlineStatusService.start();
  }

}