import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as shaka from 'shaka-player';
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
  isPlayerReady = false;
  isOfflinePlayback = false;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  // Returns a promise that resolves to the manifest uri depending on offline availability
  // Updates this.isOfflinePlayback accordingly.
  private retrieveManifestUri(contents: Array<shaka.StoredContent>): Promise<string> {
    return new Promise<string>(resolve => {
      const localContent = contents.find(element => {
        return element.originalManifestUri === this.movie.manifestUri;
      });

      if (localContent) {
        console.log('Found locally saved video');
        console.log('Title: ' + localContent.appMetadata.title);
        console.log('Uri: ' + localContent.offlineUri);
        this.isOfflinePlayback = true;
        resolve(localContent.offlineUri);
      } else {
        this.isOfflinePlayback = false;
        resolve(this.movie.manifestUri);
      }
    });
  }

  initPlayer(): void {
    const video = this.videoPlayer.nativeElement;
    console.log(video);
    const player = this.playerService.player;

    if (player) {
      // Load offline manifest uri, if existent. Load online manifest uri, otherwise.
      player
        .attach(video)
        .then(_ => {
          const storage = new shaka.offline.Storage(player);
          return storage.list();
        })
        .then(contents => {
          return this.retrieveManifestUri(contents);
        })
        .then(manifestUri => {
          return player.load(manifestUri);
        })
        .then(_ => {
          // This runs if the asynchronous load is successful.
          this.isPlayerReady = true;
          console.log('The video has now been loaded!');
        })
        .catch(e => {
          console.error(e);
        });
    }
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
