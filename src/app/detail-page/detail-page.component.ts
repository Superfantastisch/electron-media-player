import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as shaka from 'shaka-player'
import { MovieService } from '../movie.service';
import { IMovie } from '../models/movies';
import { Router, ActivatedRoute } from '@angular/router';
import { MATERIAL_SANITY_CHECKS_FACTORY } from '@angular/material/core/typings/common-behaviors/common-module';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  movie: IMovie = null;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  initPlayer(): void {
    // const video = getElementById('videoPlayer');
    const video = this.videoPlayer.nativeElement;
    console.log(video);
    const player = this.playerService.player;

    if (player) {
      player.attach(video).then(_ => {
        return player.load(this.movie.manifestUri);
      }).then(_ => {
         // This runs if the asynchronous load is successful.
         console.log('The video has now been loaded!');
      }).catch((e) => {console.error(e)});
    }
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
    this.initPlayer();
  }

}
