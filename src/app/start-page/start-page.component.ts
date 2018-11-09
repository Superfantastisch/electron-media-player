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

  constructor(
    private movieService: MovieService
  ) { }

  initPlayer(): void {
    // Create a Player instance.
    const video = this.videoPlayer.nativeElement;
    video.muted = true;
    // fires when the video is ready to play
    video.oncanplay = () => {
      this.isLoading = false;
    };

    const player = new shaka.Player(video);

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

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setupComponent();
    this.getMovies();
  }

}
