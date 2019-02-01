import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as shaka from 'shaka-player';
import { MovieService } from '../services/movie.service';
import { IMovie } from '../models/movies';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { retry } from 'rxjs/operators';
import { PlayerService } from '../services/player.service';

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
  video: HTMLVideoElement = null;
  manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

  constructor(
    private movieService: MovieService,
    private readonly _playerService: PlayerService,
    private router: Router
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

    const player = this._playerService.Player;
    console.log('init player');
    console.log(player);
    // attach media element
    player.attach(this.video).then(() => {
      // Try to load a manifest.
      // This is an asynchronous process.
      from(player.load(this.manifestUri)).pipe(
        retry(3)
      ).subscribe({
        next: _ => this.video.play(),
        error: e => {
          console.error('Error loading manifest:  ' + e);
          this.isLoading = false;
        }
      });
    });
  }

  getRandomMovieManifestUrl(length: number = 1) {
    const index = Math.floor((Math.random() * length) + 1);
    console.log(this.movies[index].manifestUri);
    this.manifestUri = this.movies[index].manifestUri;
  }
  // get all movies from movies api
  getMovies(): void {
    this.movieService.movies$.subscribe(movies => {
      if (movies && movies.length > 0) {
        this.movies = movies;
        this.getRandomMovieManifestUrl(this.movies.length - 1);
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
    this.initPlayer();
  }
}
