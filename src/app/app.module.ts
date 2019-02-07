import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
   MatListModule,
   MatProgressBarModule,
   MatSelectModule,
   MatSnackBarModule } from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { OnlineStatusComponent } from './online-status/online-status.component';
import { IsOnlinePipe } from './is-online.pipe';
import { DownloadMovieDialogComponent } from './download-movie-dialog/download-movie-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    DetailPageComponent,
    OnlineStatusComponent,
    IsOnlinePipe,
    DownloadMovieDialogComponent
  ],
  entryComponents: [
    DownloadMovieDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatProgressBarModule, MatSelectModule, MatSnackBarModule,
    MatChipsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
