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

  movieDownloadForm = this._fb.group({
    quality: ['', Validators.required],
    languages: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<DownloadMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) { }

  onDownload(): void {
    console.log('submit');
    console.log(this.movieDownloadForm.value);
    console.log(this.movieDownloadForm.controls.languages.valid);
  }

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

  ngOnInit() {
    this.variantTracks = this.data.player.getVariantTracks();
    console.log('this.variantTracks');
    console.log(this.variantTracks);
    this.languages = this.data.player.getAudioLanguages();
    this.movieDownloadForm.get('quality').disable();
    // this.movieDownloadForm.valueChanges.subscribe(val => {
    //   console.log('value change');
    //   console.log(val);
    //   if (val) {
    //     if (val.languages !== '' && this.movieDownloadForm.controls.languages.valid) {
    //       this.movieDownloadForm.controls.quality.patchValue({disabled: false});
    //     }
    //   }
    // });
  }

}
