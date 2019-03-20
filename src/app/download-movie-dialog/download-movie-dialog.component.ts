import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as shaka from 'shaka-player';
import { throwError } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { PlayerService } from '../services/player.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-download-movie-dialog',
  templateUrl: './download-movie-dialog.component.html',
  styleUrls: ['./download-movie-dialog.component.scss']
})
export class DownloadMovieDialogComponent implements OnInit {
  languages = new Array<String>();
  textLanguages = new Array<String>();
  variantTracks = new Array<shaka.shakaExtern.Track>();
  // variant tracks filtered by language selection
  langVariantTracks = new Array<shaka.shakaExtern.Track>();
  // tracks that finally should be downloaded
  finalVariantTracks = new Array<shaka.shakaExtern.Track>();

  variantTextTracks = new Array<shaka.shakaExtern.Track>();
  langVariantTextTracks = new Array<shaka.shakaExtern.Track>();

  // value for progressbar
  downloadProgress$ = new BehaviorSubject<number>(0);

  title = '';
  private _storage: shaka.offline.Storage = null;

  movieDownloadForm = this._fb.group({
    quality: ['', Validators.required],
    languages: ['', Validators.required],
    textLanguages: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<DownloadMovieDialogComponent>,
    private _playerService: PlayerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) { }

  // dialog control buttons
  onDownload(): void {
    // reset download progress
    this.setDownloadProgress(null, 0);
    // on success return shakaExtern.StoredContent
    this.downloadContent(this.data.movie.manifestUri, this.data.movie.name).then((content) => {
      // download progress on 100%
      this.setDownloadProgress(null, 1);
      // close dialog
      this.dialogRef.close(content);
    }).catch((error) => {
      // In the case of an error, re-enable the download button so
      // that the user can try to download another item.
      console.error(error);
    });
  }
  onCancel(): void {
    this.dialogRef.close(null);
  }

  // business logic for language change
  changeLanguage(event) {
    if (event && event !== '') {
      try {
        this.langVariantTracks = this.variantTracks.filter(vt => vt.language === event);
        this.movieDownloadForm.get('quality').setValue('');
      } catch (error) {
        console.error('can not filter variant tracks by language');
        console.error(error);
      } finally {
        this.movieDownloadForm.controls['quality'].enable();
      }
    }
  }

  // business logic for language change
  changeTextLanguage(event) {
    if (event && event !== '') {
      try {
        this.langVariantTextTracks = this.variantTextTracks.filter(vt => vt.language === event);
        console.log(this.langVariantTextTracks)
      } catch (error) {
        console.error('can not filter variant tracks by language');
        console.error(error);
      } finally {
        this.movieDownloadForm.controls['quality'].enable();
      }
    }
  }

  // business logic for quality change
  changeQuality(event) {
    if (event && event !== '') {
      try {
        this.finalVariantTracks = this.langVariantTracks
          .filter(vt => vt.with === event.with && vt.height === event.height && vt.bandwidth === event.bandwidth);
      } catch (error) {
        console.error('can not filter variant tracks by quality');
        console.error(error);
      }
    }
  }
  updateOnlineStatus(): boolean {
    return navigator.onLine;
  }
  setDownloadProgress = (content: any, progress: number) => {
    const x = progress * 100;
    this.downloadProgress$.next(x);
  }

  selectTracks = () => {
    try {
      let tracks = [];
      if (this.finalVariantTracks && this.finalVariantTracks.length > 0 ) {
        tracks = tracks.concat(this.finalVariantTracks);
      } else {
        throw new RangeError('no variant tracks available on download');
      }
      if (this.langVariantTextTracks && this.langVariantTextTracks.length > 0 ) {
        tracks = tracks.concat(this.langVariantTextTracks);
      } else {
        throw new RangeError('no variant text tracks available on download');
      }
      console.log(tracks)
      return tracks;
    } catch (error) {
      console.error('could not select tracks');
      console.error(error);
    }
  }

  downloadContent(manifestUri, name) {
    // Construct a metadata object to be stored along side the content.
    // This can hold any information the app wants to be stored with the
    // content.
    const metadata = {
      'title': name,
      'downloaded': Date(),
      'imageUrl': this.data.movie.imageUrl
    };

    return this._storage.store(manifestUri, metadata);
  }

  initStorage() {
    // Create a storage instance and configure it with optional
    // callbacks. Set the progress callback so that we visualize
    // download progress and override the track selection callback.
    this._storage = this._playerService.Storage;
    this._storage.configure({
      progressCallback: this.setDownloadProgress,
      trackSelectionCallback: this.selectTracks
    });
  }

  ngOnInit() {
    this.variantTracks = this.data.player.getVariantTracks();
    this.variantTextTracks = this.data.player.getTextTracks();
    this.languages = this.data.player.getAudioLanguages();
    this.textLanguages = this.data.player.getTextLanguages();

    // disable quality select on init since it is related to the language
    this.movieDownloadForm.get('quality').disable();
    this.updateOnlineStatus();
    this.initStorage();
  }
}
