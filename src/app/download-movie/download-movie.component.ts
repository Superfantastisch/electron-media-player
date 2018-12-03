import { Component, OnInit, Input } from '@angular/core';
import * as shaka from 'shaka-player';
import { PlayerService } from '../player.service';
import { IMovie } from '../models/movies';

@Component({
  selector: 'app-download-movie',
  templateUrl: './download-movie.component.html',
  styleUrls: ['./download-movie.component.scss']
})
export class DownloadMovieComponent implements OnInit {
  @Input() movie: IMovie;
  storage: shaka.offline.Storage = null;
  buttonMessage = 'Download for offline usage';

  constructor(private playerService: PlayerService) {}

  store() {
    var metadata = {
      title: this.movie.name,
      downloaded: new Date()
    };
    this.storage.store(this.movie.manifestUri, metadata).then(_ => {
      console.log('Download finished');
      this.buttonMessage = 'Download finished';
    });
  }

  removeAll() {
    console.log('Delete all');
    this.storage.list().then(contents => {
      contents.forEach(element => {
        this.storage.remove(element.offlineUri);
      });
      shaka.offline.Storage.deleteAll();
    });
  }

  private setDownloadProgress(content: shaka.StoredContent, progress: number) {
    console.log('Download progress: ' + progress);
  }

  ngOnInit() {
    const player = this.playerService.player;
    if (!player) {
      return;
    }
    this.storage = new shaka.offline.Storage(player);
    this.storage.configure({
      progressCallback: this.setDownloadProgress
    });
  }
}
