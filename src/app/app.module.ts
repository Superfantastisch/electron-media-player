import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { OnlineStatusComponent } from './online-status/online-status.component';
import { IsOnlinePipe } from './is-online.pipe';
import { DownloadMovieComponent } from './download-movie/download-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    DetailPageComponent,
    OnlineStatusComponent,
    IsOnlinePipe,
    DownloadMovieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule, MatIconModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
