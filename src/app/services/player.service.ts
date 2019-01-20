import { Injectable } from '@angular/core';
import * as shaka from 'shaka-player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _player: shaka.Player = null;

  constructor() {
    console.log('player service constructor init player');
    this._initPlayer();
  }

  private _initPlayer(): void {
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

  public get Player(): shaka.Player {
    if (!this._player) {
      console.log('Create new player');
      this._initPlayer();
    }
    return this._player;
  }
}
