import { Injectable } from '@angular/core';
import * as shaka from 'shaka-player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _player: shaka.Player = null;
  private _storage: shaka.offline.Storage = null;

  constructor() {
    this._initPlayer();
  }

  private _initPlayer(): void {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this._player = new shaka.Player();
      // init local storage
      this.initStorage(this._player);
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

  initStorage(player: shaka.Player) {
    // Create a storage instance and configure it with optional
    // callbacks. Set the progress callback so that we visualize
    // download progress and override the track selection callback.
    this._storage = new shaka.offline.Storage(player);
  }

  public get Player(): shaka.Player {
    if (!this._player) {
      this._initPlayer();
    }
    return this._player;
  }
  public get Storage(): shaka.offline.Storage {
    return this._storage;
  }
}
