import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnlineStatusService } from './online-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isOnline: Subscription;

  constructor(private _onlineStatusService: OnlineStatusService) {}

  ngOnInit() {
    // start checking online status
    this._onlineStatusService.start();
  }

  ngOnDestroy() {
    this._onlineStatusService.stop();
  }


}
