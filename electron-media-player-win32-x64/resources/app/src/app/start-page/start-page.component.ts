import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as shaka from 'shaka-player';
import { MovieService } from '../services/movie.service';
import { IMovie } from '../models/movies';
import { Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';
import { PlayerService } from '../services/player.service';
import { OnlineStatusService } from '../online-status.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  player: shaka.Player = null;
  // show loading spinner until video element is loaded
  isLoading = true;
  // movies collection
  movies$: Subscription;
  movies: Array<IMovie> = [];
  // isOnline
  isOnline$: Subscription;
  isOnline = false;
  // video element
  video: HTMLVideoElement = null;
  manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
  // storage
  private _storage: shaka.offline.Storage;

  constructor(
    private _movieService: MovieService,
    private readonly _playerService: PlayerService,
    private router: Router,
    private _onlineStatusService: OnlineStatusService
  ) { }

  selectMovie(movie: IMovie) {
    this.router.navigate(['/detail-page', movie]);
  }

  initPlayer(): void {
    // Create a Player instance.
    this.video = this.videoPlayer.nativeElement;
    // silence on the starting page
    this.video.muted = true;
    // fires when the video is ready to play
    this.video.oncanplay = () => {
      this.isLoading = false;
    };

    this.player = this._playerService.Player;
    // attach media element
    this.player.attach(this.video).then(() => {
      // Try to load a manifest.
      // This is an asynchronous process.
      if (this.isOnline) {
        from(this.player.load(this.manifestUri)).pipe(
          retry(3)
        ).subscribe({
          next: _ => this.video.play(),
          error: e => {
            console.error('Error loading manifest:  ' + e);
            this.isLoading = false;
          }
        });
      }
    });
  }
  // get all movies from movies api
  getMovies(): void {
    // movies subscription
    this.movies$ = this._movieService.movies$.subscribe(val => {
      if (val) {
        this.movies = val;
      }
    });
  }

  getOnlineStatus() {
    this.isOnline$ = this._onlineStatusService.onlinePolling$.subscribe(val => {
      if (this.isOnline !== val) {
        this.isOnline = val;
        this._movieService.updateMovies(this._storage, this.isOnline);
        // when it is online check weather we have a video running otherwise load one
        if (this.isOnline && this.player && this.player.getManifestUri() === null) {
          from(this.player.load(this.manifestUri)).pipe(
            retry(3)
          ).subscribe({
            next: _ => this.video.play(),
            error: e => {
              console.error('Error loading manifest:  ' + e);
              this.isLoading = false;
            }
          });
        }
      }
    });
  }

  // checking for scroll events
  onScroll(event): void {
    // while user is scrolling down -> the background video should be paused
    if (event.target.scrollTop !== 0 && this.video) {
      this.video.pause();
    } else {
      // if the user is on the top position, the video should play
      this.video.play();
    }
  }

  ngOnInit() {
    // get the movies list from the mocked movies api
    this.getMovies();
    // update the movies list
    this._storage = this._playerService.Storage;
    if (this._storage) {
      this.getOnlineStatus();
      this._movieService.updateMovies(this._storage, this.isOnline);
    } else {
      console.error('no storage, could not update movies');
    }
  }

  ngAfterViewInit() {
    // after view init the video element/ shaka player should be initialized
    this.initPlayer();
  }

  ngOnDestroy() {
    if (this.movies$) {
      this.movies$.unsubscribe();
    }
    if (this.isOnline$) {
      this.isOnline$.unsubscribe();
    }
  }
}
