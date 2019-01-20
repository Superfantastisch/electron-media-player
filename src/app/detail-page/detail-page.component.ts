import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as shaka from 'shaka-player';
import { IMovie } from '../models/movies';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DownloadMovieDialogComponent } from '../download-movie-dialog/download-movie-dialog.component';



@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  movie: IMovie = null;
  isPlayerReady = false;
  player: shaka.Player;
  private _video: HTMLVideoElement;

  config: shaka.config;
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
  variantTracks = new Array<shaka.shakaExtern.Track>();

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  goBack(): void {
    this._router.navigate(['/']);
  }

  initPlayer(): void {
    this._video = this.videoPlayer.nativeElement;
    this.player = new shaka.Player(this._video);
    this.config = this.player.getConfiguration();
    console.log('config');
    console.log(this.config);

    setInterval(() => {
      this._updateRoutine();
    }, 1000);

    // Listen for error events.
    this.player.addEventListener('error', this.onErrorEvent);
    this.player.addEventListener('adaption', (event) => {
      console.log('adaption');
      const stats = this.player.getStats();
      this._updateVideoResolution(stats);
    });
    this.player.addEventListener('trackschanged', (event) => {
      console.log('trackschanged');
      const stats = this.player.getStats();
      this._updateVideoResolution(stats);
    });

    if (this.player && this.movie) {
      this.player.load(this.movie.manifestUri).then(() => {
        // This runs if the asynchronous load is successful.
        this.isPlayerReady = true;
        // selectable languages
        this.languages = this.player.getAudioLanguages();

        // log some informations
        const mfst = this.player.getManifest();
        console.log('manifest');
        console.log(mfst);
        const networkEngine = this.player.getNetworkingEngine();
        console.log('network engine');
        console.log(networkEngine);

        this.variantTracks = this.player.getVariantTracks();
      }).catch(this.onError); // onError is executed if the asynchronous load fails.
    }
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

  // update informations
  private _updateRoutine(): void {
    const stats = this.player.getStats();
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
    this.player.selectAudioLanguage(val);
  }

  changeResolution(val): void {
    this.player.selectVariantTrack(val, true);
  }

  openDownloadDialog(): void {
    const dialogRef = this.dialog.open(DownloadMovieDialogComponent, {
      width: '33%',
      data: {movie: this.movie, player: this.player}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
      }
    );
  }

  ngAfterViewInit() {
    // after view init the video element/ shaka player should be initialized
    this.initPlayer();
  }
}

