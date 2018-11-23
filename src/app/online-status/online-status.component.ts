import { Component, OnInit } from '@angular/core';
import { OnlineStatusService } from '../online-status.service';

@Component({
  selector: 'app-online-status',
  templateUrl: './online-status.component.html',
  styleUrls: ['./online-status.component.scss']
})
export class OnlineStatusComponent implements OnInit {
  // Don't use this variable to determine offline playback.
  // Use onlineStatusService.isOnline instead.
  private isOfflineMode;
  
  constructor(
    private onlineStatusService: OnlineStatusService,
    ) {
    // Load this variable per config file?
    this.isOfflineMode = false;
  }

  toggleOfflineMode() {
    if (this.isOfflineMode) {
      this.onlineStatusService.start();
    } else {
      this.onlineStatusService.stop();
    }
    this.isOfflineMode = !this.isOfflineMode;
  }

  ngOnInit() {
    if (!this.isOfflineMode)
      this.onlineStatusService.start();
  }

}