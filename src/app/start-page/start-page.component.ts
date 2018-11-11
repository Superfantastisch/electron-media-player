import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as shaka from 'shaka-player';
import { MovieService } from '../movie.service';
import { IMovie } from '../models/movies';

const manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  // show loading spinner until video element is loaded
  isLoading = true;
  // movies collection
  movies: Array<IMovie>;
  // video element
  video = null;

  constructor(
    private movieService: MovieService
  ) { }

  initPlayer(): void {
    // Create a Player instance.
    this.video = this.videoPlayer.nativeElement;
    this.video.muted = true;
    // fires when the video is ready to play
    this.video.oncanplay = () => {
      this.isLoading = false;
    };

    const player = new shaka.Player(this.video);

    // Attach player to the window to make it easy to access in the JS console.
    // window.player = this.player;

    // Listen for error events.
    player.addEventListener('error', ErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player.load(manifestUri).then(() => {
      // This runs if the asynchronous load is successful.
      // console.log('The video has now been loaded!');
    }).catch(onerror);  // onError is executed if the asynchronous load fails.
  }

  setupComponent(): void {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }
  // get all movies from movies api
  getMovies(): void {
    this.movieService.movies$.subscribe(movies => {
      if (movies && movies.length > 0) {
        this.movies = movies;
      }
    }, err => {
      console.error(err);
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
  }

  ngAfterViewInit() {
    // after view init the video element/ shaka player should be initialized
    this.setupComponent();
  }

}