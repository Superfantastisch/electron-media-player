import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as shaka from 'shaka-player';
import { IMovie } from '../models/movies';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { DownloadMovieDialogComponent } from '../download-movie-dialog/download-movie-dialog.component';
import { MovieService } from '../services/movie.service';
import { PlayerService } from '../services/player.service';

import { from, Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';
import { OnlineStatusService } from '../online-status.service';



@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  movie: IMovie = null;
  isPlayerReady = false;
  private _player: shaka.Player;
  private _video: HTMLVideoElement;
  private _storage: shaka.offline.Storage = null;

   // isOnline
   isOnline$: Subscription;
   isOnline = true;

  /**
   * display informations
   */
  // current resolution
  videoResolution = '';
  // The bandwidth required for the current streams (total, in bit/sec)
  streamBandwidth = '';
  // The current estimated network bandwidth (in bit/sec)
  networkBandwith = '';
  languages = new Array<String>();
  textLanguages = new Array<String>();
  variantTracks = new Array<shaka.shakaExtern.Track>();

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _movieService: MovieService,
    private _playerService: PlayerService,
    private _onlineStatusService: OnlineStatusService,
    private _snackBar: MatSnackBar
  ) { }

  goBack(): void {
    this._router.navigate(['/']);
  }

  initPlayer(): void {
    this._video = this.videoPlayer.nativeElement;
    this._player = this._playerService.Player;
    this._player.setTextTrackVisibility(true);

    this._player.attach(this._video).then(() => {
      // Listen for events.
      this._player.addEventListener('error', this.onErrorEvent);
      this._player.addEventListener('adaption', (event) => {
        const stats = this._player.getStats();
        this._updateVideoResolution(stats);
      });
      this._player.addEventListener('trackschanged', (event) => {
        const stats = this._player.getStats();
        this._updateVideoResolution(stats);
      });
      // update stats
      setInterval(() => {
        this._updateRoutine();
      }, 1000);
      // Try to load a manifest.
      // This is an asynchronous process.
      this._playVideo();
    });
  }
  // load resources and play Video
  private _playVideo() {
    // this.movie.offlineUri = result.offlineUri;
    this._player.unload().then(() => {
      let manifestUri = '';
      // do we have an offline uri?
      if (this.movie.offlineUri && this.movie.offlineUri !== '') {
        manifestUri = this.movie.offlineUri;
      } else if (this.isOnline) { // are we online?
        manifestUri = this.movie.manifestUri;
      } else { // we are offline and do not have an offline uri
        manifestUri = null;
        this.openSnackBar('You are offline', 'Please go back to start page');
      }
      if (manifestUri) {
        from(this._player.load(manifestUri)).pipe(
          retry(3)
        ).subscribe({
          next: _ => {
            this._video.play();
            this.variantTracks = this._player.getVariantTracks();
            this.languages = this._player.getAudioLanguages();
            this.textLanguages = this._player.getTextLanguages();
          },
          error: e => {
            console.error('Error loading manifest:  ' + e);
            // this.isLoading = false;
          }
        });
      }
    });
  }
  // Error handling
  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }

  // warn the user, that he is offline
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // update informations
  private _updateRoutine(): void {
    const stats = this._player.getStats();
    this._updateVideoResolution(stats);
    this._updateBufferInformations(stats);
  }
  private _updateVideoResolution(stats: shaka.shakaExtern.stats): void {
    this.videoResolution = `${stats.width} x ${stats.height}`;
  }
  private _updateBufferInformations(stats: shaka.shakaExtern.stats): void {
    this.streamBandwidth = `Required Bandwith: ${stats.streamBandwidth} bit/sec`;
    this.networkBandwith = `Current Bandwidth: ${stats.estimatedBandwidth} bit/sec`;
  }

  changeLanguage(val): void {
    this._player.selectAudioLanguage(val);
  }

  changeTextLanguage(val) : void {
    this._player.selectTextLanguage(val)
  }

  changeResolution(val): void {
    if (val) {
      // Disable adaptive streaming in favor of constant resolution
      this._player.configure({abr: {enabled: false}});
      this._player.selectVariantTrack(val, true);
    } else {
      // Set to adaptive streaming
      this._player.configure({abr: {enabled: true}});
    }
  }

  openDownloadDialog(): void {
    const dialogRef = this.dialog.open(DownloadMovieDialogComponent, {
      width: '33%',
      data: { movie: this.movie, player: this._player }
    });
    // on closing dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const mClone = Object.assign({}, this.movie);
        mClone.offlineUri = result.offlineUri;
        this.movie = mClone;
        this._movieService.updateMovies(this._storage);
        this._playVideo();
      }
    });
  }
  // delete downloaded movie
  deleteMovie(): void {
    this._storage.remove(this.movie.offlineUri).then(val => {
      const mClone = Object.assign({}, this.movie);
      mClone.offlineUri = '';
      this.movie = mClone;
      this._movieService.updateMovies(this._storage);
      this._playVideo();
    });
  }

  getOnlineStatus() {
    this.isOnline$ = this._onlineStatusService.onlinePolling$.subscribe(val => {
      if (this.isOnline !== val) {
        this.isOnline = val;
        this._movieService.updateMovies(this._storage, this.isOnline);
        if (!this.isOnline && this.movie.offlineUri === '') {
          this.openSnackBar('Warning', 'You are offline');
        }
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params) {
          this.movie = params as IMovie;
        }
      },
      err => {
        console.error('can not get movie');
        console.error(err);
        // Todo: bring the error for the user on screen
      }
    );
    this._storage = this._playerService.Storage;
    this.getOnlineStatus();
  }

  ngAfterViewInit() {
    // after view init the video element/ shaka player should be initialized
    this.initPlayer();
  }
}

