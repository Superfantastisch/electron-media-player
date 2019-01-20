import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as shaka from 'shaka-player';
@Component({
  selector: 'app-download-movie-dialog',
  templateUrl: './download-movie-dialog.component.html',
  styleUrls: ['./download-movie-dialog.component.scss']
})
export class DownloadMovieDialogComponent implements OnInit {
  languages = new Array<String>();
  variantTracks = new Array<shaka.shakaExtern.Track>();
  title = '';
  storage: shaka.offline.Storage = null;

  movieDownloadForm = this._fb.group({
    quality: ['', Validators.required],
    languages: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<DownloadMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) { }

  // dialog control buttons
  onDownload(): void {
    console.log('submit');
    console.log(this.movieDownloadForm.value);
    console.log(this.movieDownloadForm.controls.languages.valid);
    this.setDownloadProgress(null, 0);
    this.downloadContent(this.data.movie.manifestUri, this.data.movie.name).then(() => {
      console.log('success on downlaod');
      this.setDownloadProgress(null, 1);
      console.log('offline list');
      console.log(this.storage.list());
    })
    .catch((error) => {
      // In the case of an error, re-enable the download button so
      // that the user can try to download another item.
      console.error(error);
    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  // business logic for language change
  changeLanguage(event) {
    if (event && event !== '') {
      try {
        this.variantTracks = this.variantTracks.filter(vt => vt.language === event);
      } catch (error) {
        console.error('can not filter variant tracks by language');
        console.error(error);
      }
      this.movieDownloadForm.controls['quality'].enable();
    }
  }
  updateOnlineStatus(): boolean {
    console.log('online status');
    console.log(navigator.onLine);
    return navigator.onLine;
  }
  setDownloadProgress(content, progress) {
    console.log('set download progress');
    console.log(progress);
  }

  selectTracks(tracks) {
    // Store the highest bandwidth variant.
    const found = tracks
      .filter(function (track) { return track.type === 'variant'; })
      .sort(function (a, b) { return a.bandwidth - b.bandwidth; })
      .pop();
    console.log('Offline Track bandwidth: ' + found.bandwidth);
    return [found];
  }

  downloadContent(manifestUri, name) {
    // Construct a metadata object to be stored along side the content.
    // This can hold any information the app wants to be stored with the
    // content.
    const metadata = {
      'title': name,
      'downloaded': Date()
    };

    return this.storage.store(manifestUri, metadata);
  }

  initStorage(player: shaka.Player) {
    // Create a storage instance and configure it with optional
    // callbacks. Set the progress callback so that we visualize
    // download progress and override the track selection callback.
    this.storage = new shaka.offline.Storage(player);
    this.storage.configure({
      progressCallback: this.setDownloadProgress,
      trackSelectionCallback: this.selectTracks
    });
  }

  ngOnInit() {
    this.variantTracks = this.data.player.getVariantTracks();
    this.languages = this.data.player.getAudioLanguages();
    // disable quality select on init since it is related to the language
    this.movieDownloadForm.get('quality').disable();
    this.updateOnlineStatus();
    this.initStorage(this.data.player);
  }

}
