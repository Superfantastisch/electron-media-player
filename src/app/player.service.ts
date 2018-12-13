import { Injectable } from '@angular/core';
import * as shaka from 'shaka-player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _player: shaka.Player = null;

  constructor() {
    console.log("player service");
  }

  public initPlayer(): void {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this._player = new shaka.Player();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

  public get player(): shaka.Player {
    if (!this._player) {
      console.log("Create new player");
      this.initPlayer();
    }
    return this._player;
  }
}
