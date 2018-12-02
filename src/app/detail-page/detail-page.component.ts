import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as shaka from 'shaka-player'
import { MovieService } from '../movie.service';
import { IMovie } from '../models/movies';
import { Router, ActivatedRoute } from '@angular/router';
import { MATERIAL_SANITY_CHECKS_FACTORY } from '@angular/material/core/typings/common-behaviors/common-module';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  movie: IMovie = null;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  goBack(): void {
    this.router.navigate(['/']);
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

  initPlayer(): void {
    // const video = getElementById('videoPlayer');
    const video = this.videoPlayer.nativeElement;
    console.log(video);
    const player = new shaka.Player(video);
    player.load(this.movie.manifestUri).then(function () {
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!');
    }).catch((e) => {console.error(e)});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.movie = (params as IMovie);
      }
    }, err => {
      console.error('can not get movie');
      console.error(err);
    });
  }

  ngAfterViewInit() {
    // after view init the video element/ shaka player should be initialized
    this.setupComponent();
  }

}
